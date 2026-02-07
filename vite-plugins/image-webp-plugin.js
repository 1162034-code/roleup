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
  async function processFile(filePath) {
    const relativePath = relative(srcDir, filePath);
    const ext = extname(filePath).toLowerCase();
    
    if (!supportedFormats.includes(ext)) {
      return;
    }

    const outputPath = ext === '.svg'
      ? resolve(destDir, relativePath)
      : resolve(destDir, relativePath).replace(ext, '.webp');

    // 出力先ディレクトリが存在しない場合は作成
    const outputDir = dirname(outputPath);
    if (!existsSync(outputDir)) {
      await mkdir(outputDir, { recursive: true });
    }

    await convertToWebP(filePath, outputPath);
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
      // ビルド終了時にウォッチャーを停止
      if (watcher) {
        watcher.close();
      }
    },
    configureServer(server) {
      // 開発サーバー起動時にウォッチャーを開始
      if (watchMode && existsSync(srcDir)) {
        console.log(`\n🔍 Setting up image file watcher...`);
        watcher = watch(`${srcDir}/**/*.{jpg,jpeg,png,webp,gif,svg}`, {
          ignored: [/node_modules/, /\.git/],
          persistent: true,
          ignoreInitial: true,
          awaitWriteFinish: {
            stabilityThreshold: 300,
            pollInterval: 100,
          },
        });

        watcher
          .on('ready', () => {
            console.log(`✅ Image watcher is ready and monitoring files`);
          })
          .on('error', (error) => {
            console.error(`❌ Image watcher error:`, error);
          })
          .on('add', async (path) => {
            console.log(`\n📸 New image detected: ${relative(srcDir, path)}`);
            await processFile(path);
            server.ws.send({ type: 'full-reload' });
          })
          .on('change', async (path) => {
            console.log(`\n📸 Image changed: ${relative(srcDir, path)}`);
            await processFile(path);
            server.ws.send({ type: 'full-reload' });
          })
          .on('unlink', (path) => {
            console.log(`\n🗑️  Image deleted: ${relative(srcDir, path)}`);
            // 削除されたファイルのWebPも削除
            const ext = extname(path).toLowerCase();
            const webpPath = resolve(destDir, relative(srcDir, path)).replace(ext, '.webp');
            if (existsSync(webpPath)) {
              import('fs/promises').then(({ unlink }) => unlink(webpPath));
            }
            server.ws.send({ type: 'full-reload' });
          });

        console.log(`\n👀 Watching images in ${srcDir}...\n`);
      }
    },
  };
}
