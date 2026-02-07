import { readFile, writeFile, mkdir, readdir } from 'fs/promises';
import { existsSync } from 'fs';
import { resolve, dirname, relative } from 'path';
import * as sass from 'sass';
import { watch } from 'chokidar';

/**
 * SCSSファイルをCSSにコンパイルするViteプラグイン
 */
export function scssCompilePlugin(options = {}) {
  const {
    srcDir,
    destDir,
    watch: watchMode = false,
    style = 'expanded',
    sourceMap = false,
  } = options;

  let watcher = null;

  /**
   * SCSSファイルをコンパイル
   */
  async function compileScss(inputPath, outputPath) {
    try {
      const result = sass.compile(inputPath, {
        style,
        sourceMap,
        loadPaths: [dirname(inputPath), srcDir, resolve(srcDir, 'foundation')],
      });

      // 出力先ディレクトリが存在しない場合は作成
      const outputDir = dirname(outputPath);
      if (!existsSync(outputDir)) {
        await mkdir(outputDir, { recursive: true });
      }

      await writeFile(outputPath, result.css);
      
      if (sourceMap && result.sourceMap) {
        await writeFile(`${outputPath}.map`, JSON.stringify(result.sourceMap));
      }

      console.log(`✓ Compiled: ${inputPath} -> ${outputPath}`);
    } catch (error) {
      console.error(`✗ Error compiling ${inputPath}:`, error.message);
    }
  }

  /**
   * pageディレクトリ内のSCSSファイルを再帰的に検索
   */
  async function findPageScssFiles(dir, baseDir = srcDir) {
    const entries = [];
    try {
      const items = await readdir(dir, { withFileTypes: true });
      for (const item of items) {
        const fullPath = resolve(dir, item.name);
        if (item.isDirectory()) {
          // ディレクトリの場合は再帰的に検索
          const subEntries = await findPageScssFiles(fullPath, baseDir);
          entries.push(...subEntries);
        } else if (item.isFile() && item.name.endsWith('.scss') && item.name === 'index.scss') {
          // index.scssファイルをエントリーポイントとして追加
          const relativePath = relative(baseDir, fullPath).replace(/\.scss$/, '.css');
          entries.push({
            input: fullPath,
            output: resolve(destDir, 'css', relativePath),
          });
        }
      }
    } catch (error) {
      // ディレクトリが存在しない場合は無視
    }
    return entries;
  }

  /**
   * すべてのSCSSエントリーポイントをコンパイル
   */
  async function compileAll() {
    const entries = [
      {
        input: resolve(srcDir, 'style.scss'),
        output: resolve(destDir, 'css/style.css'),
      },
      {
        input: resolve(srcDir, 'editor-style.scss'),
        output: resolve(destDir, 'css/editor-style.css'),
      },
    ];

    // pageディレクトリ内のSCSSファイルを検索
    const pageDir = resolve(srcDir, 'page');
    if (existsSync(pageDir)) {
      const pageEntries = await findPageScssFiles(pageDir);
      entries.push(...pageEntries);
    }

    for (const entry of entries) {
      if (existsSync(entry.input)) {
        await compileScss(entry.input, entry.output);
      }
    }
  }

  return {
    name: 'scss-compile-plugin',
    buildStart: async () => {
      // ビルド開始時に全SCSSをコンパイル
      if (existsSync(srcDir)) {
        console.log(`\n🎨 Compiling SCSS from ${srcDir}...`);
        await compileAll();
        console.log('✓ SCSS compilation completed\n');
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
        console.log(`\n🔍 Setting up SCSS file watcher...`);
        console.log(`   Source directory: ${srcDir}`);
        
        // chokidarのwatchパターン（絶対パスでglobパターンを指定）
        const watchPattern = `${srcDir}/**/*.scss`;
        console.log(`   Watch pattern: ${watchPattern}`);
        
        // ファイル変更ハンドラー
        const handleFileChange = async (path) => {
          try {
            // パスを正規化（絶対パスに変換）
            const normalizedPath = resolve(path);
            console.log(`\n🎨 SCSS changed: ${normalizedPath}`);
            
            if (!existsSync(normalizedPath)) {
              console.log(`   ⚠️  File does not exist, skipping...`);
              return;
            }
            
            const relativePath = relative(srcDir, normalizedPath);
            console.log(`   Relative path: ${relativePath}`);
            
            // 変更されたファイルがエントリーポイント（index.scss）の場合はそのファイルのみ再コンパイル
            // それ以外の場合はすべて再コンパイル
            const isIndexScss = normalizedPath.endsWith('index.scss') || relativePath.endsWith('index.scss');
            
            if (isIndexScss) {
              console.log(`   → Compiling single entry point: ${relativePath}`);
              // 該当するindex.scssのみコンパイル
              if (relativePath === 'style.scss') {
                await compileScss(normalizedPath, resolve(destDir, 'css/style.css'));
              } else if (relativePath === 'editor-style.scss') {
                await compileScss(normalizedPath, resolve(destDir, 'css/editor-style.css'));
              } else if (relativePath.startsWith('page/')) {
                const cssPath = relativePath.replace(/\.scss$/, '.css');
                await compileScss(normalizedPath, resolve(destDir, 'css', cssPath));
              }
            } else {
              // 依存ファイルが変更された場合はすべて再コンパイル
              console.log(`   → Recompiling all entry points (dependency changed)`);
              await compileAll();
            }
            
            // ブラウザをリロード
            if (server && server.ws) {
              server.ws.send({ type: 'full-reload' });
            }
          } catch (error) {
            console.error(`   ❌ Error handling file change:`, error);
          }
        };

        // chokidarでwatchを開始
        watcher = watch(watchPattern, {
          ignored: [/node_modules/, /\.git/, /\.DS_Store/],
          persistent: true,
          ignoreInitial: true,
          awaitWriteFinish: {
            stabilityThreshold: 200,
            pollInterval: 50,
          },
          usePolling: false,
          followSymlinks: false,
          atomic: true,
        });

        watcher
          .on('ready', () => {
            console.log(`✅ SCSS watcher is ready and monitoring files`);
          })
          .on('error', (error) => {
            console.error(`❌ SCSS watcher error:`, error);
          })
          .on('change', (path) => {
            console.log(`[DEBUG] Change event: ${path}`);
            handleFileChange(path);
          })
          .on('add', (path) => {
            console.log(`[DEBUG] Add event: ${path}`);
            handleFileChange(path);
          })
          .on('unlink', (path) => {
            console.log(`[DEBUG] Unlink event: ${path}`);
            compileAll().then(() => {
              if (server && server.ws) {
                server.ws.send({ type: 'full-reload' });
              }
            });
          });

        // 初回コンパイル
        compileAll();

        console.log(`\n👀 Watching SCSS files in ${srcDir}...\n`);
      } else {
        console.log(`⚠️  SCSS watcher not started: watchMode=${watchMode}, srcDir exists=${existsSync(srcDir)}`);
      }
    },
    // ViteのHMRフックも使用（より確実な方法）
    handleHotUpdate({ file, server }) {
      // SCSSファイルが変更された場合
      if (file.endsWith('.scss') && file.startsWith(srcDir)) {
        console.log(`\n🔥 Hot update detected: ${file}`);
        const relativePath = relative(srcDir, file);
        const isIndexScss = file.endsWith('index.scss') || relativePath.endsWith('index.scss');
        
        if (isIndexScss) {
          // エントリーポイントの場合は該当ファイルのみコンパイル
          if (relativePath === 'style.scss') {
            compileScss(file, resolve(destDir, 'css/style.css'));
          } else if (relativePath === 'editor-style.scss') {
            compileScss(file, resolve(destDir, 'css/editor-style.css'));
          } else if (relativePath.startsWith('page/')) {
            const cssPath = relativePath.replace(/\.scss$/, '.css');
            compileScss(file, resolve(destDir, 'css', cssPath));
          }
        } else {
          // 依存ファイルの場合はすべて再コンパイル
          compileAll();
        }
        
        // ブラウザをリロード
        server.ws.send({ type: 'full-reload' });
      }
    },
  };
}
