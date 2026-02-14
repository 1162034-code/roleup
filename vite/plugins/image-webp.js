import { readdir, stat, mkdir, copyFile } from 'fs/promises';
import { existsSync } from 'fs';
import { resolve, dirname, extname, join, relative } from 'path';
import sharp from 'sharp';
import { watch } from 'chokidar';

/**
 * 画像をWebP形式に変換・圧縮するViteプラグイン
 */
export function imageWebpPlugin(options = {}) {
  const {
    srcDir,
    destDir,
    watch: watchMode = false,
    quality = 80,
    maxWidth = 1920,
    maxHeight = 1920,
  } = options;

  let watcher = null;
  let scanInterval = null;
  let processedFiles = new Set(); // 処理済みファイルを記録

  // サポートされている画像形式
  const supportedFormats = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg'];

  /**
   * 画像をWebPに変換
   */
  async function convertToWebP(inputPath, outputPath) {
    try {
      const ext = extname(inputPath).toLowerCase();
      
      // SVGはそのままコピー
      if (ext === '.svg') {
        await copyFile(inputPath, outputPath);
        console.log(`✓ Copied: ${relative(srcDir, inputPath)} -> ${relative(destDir, outputPath)}`);
        return;
      }

      // WebPは既にWebP形式なので、最適化のみ
      if (ext === '.webp') {
        await sharp(inputPath)
          .resize(maxWidth, maxHeight, {
            fit: 'inside',
            withoutEnlargement: true,
          })
          .webp({ quality })
          .toFile(outputPath);
        console.log(`✓ Optimized: ${relative(srcDir, inputPath)} -> ${relative(destDir, outputPath)}`);
        return;
      }

      // その他の画像形式をWebPに変換
      if (supportedFormats.includes(ext)) {
        await sharp(inputPath)
          .resize(maxWidth, maxHeight, {
            fit: 'inside',
            withoutEnlargement: true,
          })
          .webp({ quality })
          .toFile(outputPath);
        console.log(`✓ Converted: ${relative(srcDir, inputPath)} -> ${relative(destDir, outputPath)}`);
      }
    } catch (error) {
      console.error(`✗ Error converting ${inputPath}:`, error.message);
    }
  }

  /**
   * ディレクトリ構造を維持しながら画像を変換
   */
  async function processDirectory(dir, baseDir = srcDir) {
    try {
      if (!existsSync(dir)) {
        console.warn(`⚠️  Directory not found: ${dir}`);
        return;
      }

      const entries = await readdir(dir, { withFileTypes: true });

      for (const entry of entries) {
        const fullPath = resolve(dir, entry.name);
        const relativePath = relative(baseDir, fullPath);
        const destPath = resolve(destDir, relativePath);

        if (entry.isDirectory()) {
          // ディレクトリの場合は再帰的に処理
          const destDirPath = resolve(destDir, relativePath);
          if (!existsSync(destDirPath)) {
            await mkdir(destDirPath, { recursive: true });
          }
          await processDirectory(fullPath, baseDir);
        } else if (entry.isFile()) {
          const ext = extname(entry.name).toLowerCase();
          if (supportedFormats.includes(ext)) {
            // 出力先ディレクトリが存在しない場合は作成
            const outputDir = dirname(destPath);
            if (!existsSync(outputDir)) {
              await mkdir(outputDir, { recursive: true });
            }

            // WebPファイル名に変更（SVGは除く）
            const outputPath = ext === '.svg'
              ? destPath
              : destPath.replace(ext, '.webp');

            await convertToWebP(fullPath, outputPath);
          }
        }
      }
    } catch (error) {
      console.error(`Error processing directory ${dir}:`, error.message);
    }
  }

  /**
   * 単一ファイルを処理
   */
  async function processFile(filePath, skipCheck = false) {
    const relativePath = relative(srcDir, filePath);
    const ext = extname(filePath).toLowerCase();
    
    if (!supportedFormats.includes(ext)) {
      console.log(`ℹ️  Skipping unsupported format: ${ext}`);
      return;
    }

    // ファイルが存在するか確認
    if (!existsSync(filePath)) {
      console.warn(`⚠️  File does not exist: ${filePath}`);
      return;
    }

    const outputPath = ext === '.svg'
      ? resolve(destDir, relativePath)
      : resolve(destDir, relativePath).replace(ext, '.webp');

    // 既に処理済みかどうかをチェック（スキップフラグがfalseの場合）
    if (!skipCheck && processedFiles.has(filePath)) {
      // ファイルの更新時刻をチェック
      try {
        const { stat } = await import('fs/promises');
        const inputStats = await stat(filePath);
        const outputExists = existsSync(outputPath);
        
        if (outputExists) {
          const outputStats = await stat(outputPath);
          // 入力ファイルが出力ファイルより新しい場合のみ再処理
          if (inputStats.mtime <= outputStats.mtime) {
            return;
          }
        }
      } catch (error) {
        // エラーが発生した場合は処理を続行
      }
    }

    // 出力先ディレクトリが存在しない場合は作成
    const outputDir = dirname(outputPath);
    if (!existsSync(outputDir)) {
      await mkdir(outputDir, { recursive: true });
    }

    await convertToWebP(filePath, outputPath);
    processedFiles.add(filePath);
  }

  /**
   * ディレクトリを再帰的にスキャンして新しいファイルを検出
   */
  async function scanForNewFiles(dir = srcDir) {
    if (!existsSync(dir)) {
      return;
    }

    try {
      const entries = await readdir(dir, { withFileTypes: true });
      
      for (const entry of entries) {
        const fullPath = resolve(dir, entry.name);
        
        if (entry.isDirectory()) {
          // ディレクトリの場合は再帰的にスキャン
          await scanForNewFiles(fullPath);
        } else if (entry.isFile()) {
          const ext = extname(entry.name).toLowerCase();
          
          if (supportedFormats.includes(ext)) {
            // まだ処理されていないファイルを処理
            if (!processedFiles.has(fullPath)) {
              const relativePath = relative(srcDir, fullPath);
              console.log(`\n🔍 Found new file during scan: ${relativePath}`);
              await processFile(fullPath, true);
            }
          }
        }
      }
    } catch (error) {
      // エラーは無視（ディレクトリが存在しない場合など）
    }
  }

  return {
    name: 'image-webp-plugin',
    buildStart: async () => {
      // ビルド開始時に全画像を変換
      if (existsSync(srcDir)) {
        console.log(`\n🖼️  Converting images from ${srcDir} to ${destDir}...`);
        await processDirectory(srcDir);
        console.log('✓ Image conversion completed\n');
      } else {
        console.warn(`⚠️  Source image directory not found: ${srcDir}`);
      }
    },
    buildEnd: () => {
      // ビルド終了時にウォッチャーとスキャンインターバルを停止
      if (watcher) {
        watcher.close();
      }
      if (scanInterval) {
        clearInterval(scanInterval);
      }
    },
    configureServer(server) {
      // 開発サーバー起動時に初期変換を実行
      if (existsSync(srcDir)) {
        console.log(`\n🖼️  Converting images from ${srcDir} to ${destDir}...`);
        processDirectory(srcDir).then(() => {
          console.log('✓ Image conversion completed');
          // 処理済みファイルリストを更新（再帰的に）
          const updateProcessedFiles = async (dir = srcDir) => {
            try {
              const entries = await readdir(dir, { withFileTypes: true });
              for (const entry of entries) {
                const fullPath = resolve(dir, entry.name);
                if (entry.isDirectory()) {
                  await updateProcessedFiles(fullPath);
                } else if (entry.isFile()) {
                  const ext = extname(entry.name).toLowerCase();
                  if (supportedFormats.includes(ext)) {
                    processedFiles.add(fullPath);
                  }
                }
              }
            } catch (error) {
              // エラーは無視
            }
          };
          updateProcessedFiles();
        }).catch((error) => {
          console.error('✗ Image conversion error:', error);
        });
      } else {
        console.warn(`⚠️  Source image directory not found: ${srcDir}`);
      }

      // 開発サーバー起動時にウォッチャーを開始
      if (watchMode && existsSync(srcDir)) {
        console.log(`\n🔍 Setting up image file watcher...`);
        
        // ウォッチャーパターン（相対パス、srcDirを基準）
        const watchPattern = '**/*.{jpg,jpeg,png,webp,gif,svg}';
        
        watcher = watch(watchPattern, {
          cwd: srcDir, // 作業ディレクトリをsrcDirに設定
          ignored: [/node_modules/, /\.git/, /\.DS_Store/],
          persistent: true,
          ignoreInitial: true, // 初期スキャンは実行しない（既にprocessDirectoryで処理済み）
          usePolling: true, // macOSでのファイル監視を確実にする
          interval: 100, // ポーリング間隔（ms）
          binaryInterval: 300, // バイナリファイルのポーリング間隔（ms）
          depth: 10, // 監視するディレクトリの深さを指定
          awaitWriteFinish: {
            stabilityThreshold: 500, // ファイル書き込み完了の待機時間（少し長めに設定）
            pollInterval: 100, // ポーリング間隔
          },
        });

        watcher
          .on('ready', () => {
            console.log(`✅ Image watcher is ready and monitoring files`);
            console.log(`   Watching pattern: ${watchPattern}`);
            console.log(`   CWD: ${srcDir}`);
            
            // 定期的にディレクトリをスキャンして新しいファイルを検出（5秒ごと）
            scanInterval = setInterval(() => {
              scanForNewFiles();
            }, 5000);
            console.log(`   Periodic scan enabled (every 5 seconds)`);
          })
          .on('error', (error) => {
            console.error(`❌ Image watcher error:`, error);
          })
          .on('add', async (path, stats) => {
            // pathは相対パス（srcDir基準）なので、絶対パスに変換
            const absolutePath = resolve(srcDir, path);
            
            console.log(`\n🔔 [DEBUG] add event fired for: ${path}`);
            console.log(`   Absolute path: ${absolutePath}`);
            if (stats) {
              console.log(`   File size: ${stats.size} bytes`);
            }
            
            // ファイルが完全に書き込まれるまで待機（最大2秒）
            let retries = 20;
            while (!existsSync(absolutePath) && retries > 0) {
              await new Promise(resolve => setTimeout(resolve, 100));
              retries--;
            }
            
            // ファイルが存在するか確認
            if (!existsSync(absolutePath)) {
              console.log(`⚠️  File not found after waiting: ${relative(srcDir, absolutePath)}`);
              return;
            }
            
            const ext = extname(absolutePath).toLowerCase();
            if (!supportedFormats.includes(ext)) {
              console.log(`ℹ️  Unsupported file format: ${ext}`);
              return;
            }
            
            console.log(`\n📸 New image detected: ${relative(srcDir, absolutePath)}`);
            try {
              await processFile(absolutePath);
              console.log(`✓ Successfully converted: ${relative(srcDir, absolutePath)}`);
            } catch (error) {
              console.error(`✗ Error processing new image ${absolutePath}:`, error.message);
              console.error(`   Stack:`, error.stack);
            }
            server.ws.send({ type: 'full-reload' });
          })
          .on('addDir', (path) => {
            // ディレクトリが追加された場合のログ
            console.log(`\n📁 New directory detected: ${path}`);
          })
          .on('change', async (path) => {
            // pathは相対パス（srcDir基準）なので、絶対パスに変換
            const absolutePath = resolve(srcDir, path);
            
            // ファイルが存在するか確認
            if (!existsSync(absolutePath)) {
              console.log(`ℹ️  File not found (may have been deleted): ${relative(srcDir, absolutePath)}`);
              return;
            }
            
            console.log(`\n📸 Image changed: ${relative(srcDir, absolutePath)}`);
            try {
              await processFile(absolutePath);
              console.log(`✓ Successfully updated: ${relative(srcDir, absolutePath)}`);
            } catch (error) {
              console.error(`✗ Error processing changed image ${absolutePath}:`, error.message);
            }
            server.ws.send({ type: 'full-reload' });
          })
          .on('unlink', async (path) => {
            // pathは相対パス（srcDir基準）なので、絶対パスに変換
            const absolutePath = resolve(srcDir, path);
            const ext = extname(absolutePath).toLowerCase();
            const relativePath = relative(srcDir, absolutePath);
            
            console.log(`\n🗑️  Image deleted: ${relative(srcDir, absolutePath)}`);
            
            // SVGファイルが削除された場合は、出力先のファイルは削除しない（WebPのみ運用のため）
            if (ext === '.svg') {
              console.log(`ℹ️  SVG file deleted - output file will not be removed (WebP only workflow)`);
              server.ws.send({ type: 'full-reload' });
              return;
            }
            
            // その他の画像ファイルが削除された場合は、対応するWebPファイルも削除
            const outputPath = resolve(destDir, relativePath).replace(ext, '.webp');
            
            if (existsSync(outputPath)) {
              try {
                const { unlink } = await import('fs/promises');
                await unlink(outputPath);
                console.log(`✓ Deleted output file: ${relative(destDir, outputPath)}`);
              } catch (error) {
                console.error(`✗ Error deleting output file ${outputPath}:`, error.message);
              }
            } else {
              console.log(`ℹ️  Output file not found (may have been already deleted): ${relative(destDir, outputPath)}`);
            }
            
            server.ws.send({ type: 'full-reload' });
          });

        console.log(`\n👀 Watching images in ${srcDir}...`);
        console.log(`   Pattern: ${watchPattern}`);
        console.log(`   Use polling: true (for macOS compatibility)\n`);
      }
    },
  };
}
