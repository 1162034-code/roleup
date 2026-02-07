import { defineConfig } from 'vite';
import { resolve } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import liveReload from 'vite-plugin-live-reload';
import { imageWebpPlugin } from './vite-plugins/image-webp-plugin.js';
import { scssCompilePlugin } from './vite-plugins/scss-compile-plugin.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  plugins: [
    // SCSSコンパイルプラグイン
    scssCompilePlugin({
      srcDir: resolve(__dirname, 'src/scss'),
      destDir: resolve(__dirname, 'dest/app/wp-content/themes/roleup_2026/assets'),
      watch: true,
      style: 'expanded',
      sourceMap: false,
    }),
    // PHPファイルの自動リロード
    liveReload([
      'dest/app/wp-content/themes/roleup_2026/**/*.php',
      'dest/app/wp-content/themes/roleup_2026/**/*.css',
      'dest/app/wp-content/themes/roleup_2026/**/*.js',
    ]),
    // 画像のWebP変換プラグイン
    imageWebpPlugin({
      srcDir: resolve(__dirname, 'src/img'),
      destDir: resolve(__dirname, 'dest/app/wp-content/themes/roleup_2026/assets/img'),
      watch: true,
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "sass:math";`,
      },
    },
  },
  build: {
    outDir: 'dest/app/wp-content/themes/roleup_2026/assets',
    emptyOutDir: false,
    rollupOptions: {
      input: {
        style: resolve(__dirname, 'src/scss/style.scss'),
        'editor-style': resolve(__dirname, 'src/scss/editor-style.scss'),
      },
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name.endsWith('.css')) {
            return 'css/[name][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        },
      },
    },
    cssCodeSplit: false,
    watch: {
      include: ['src/scss/**/*.scss'],
    },
  },
  server: {
    watch: {
      usePolling: true,
    },
    port: 5173,
    strictPort: false,
    proxy: {
      // WordPressのプロキシ設定（必要に応じて調整）
      '/wp-content': {
        target: 'https://person-local-wp.dev',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
