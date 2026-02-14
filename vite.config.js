import { defineConfig } from 'vite';
import { resolve } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import liveReload from 'vite-plugin-live-reload';
import { browserSyncPlugin } from './vite/plugins/browser-sync.js';
import { imageWebpPlugin } from './vite/plugins/image-webp.js';
import { scssCompilePlugin } from './vite/plugins/scss-compile.js';
import { THEME_CONFIG } from './vite/config/theme.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  plugins: [
    // SCSSコンパイルプラグイン
    scssCompilePlugin({
      srcDir: resolve(__dirname, 'src/scss'),
      destDir: resolve(__dirname, THEME_CONFIG.assetsPath),
      watch: true,
      style: 'expanded',
      sourceMap: false,
    }),
    // 画像のWebP変換プラグイン
    imageWebpPlugin({
      srcDir: resolve(__dirname, 'src/img'),
      destDir: resolve(__dirname, THEME_CONFIG.imgPath),
      watch: true,
    }),
    // BrowserSync - WordPressのローカル環境を自動リロード
    browserSyncPlugin(),
    // PHPファイルの自動リロード（フォールバック）
    liveReload([
      `${THEME_CONFIG.themePath}/**/*.php`,
      `${THEME_CONFIG.themePath}/**/*.css`,
      `${THEME_CONFIG.themePath}/**/*.js`,
    ]),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "sass:math";`,
      },
    },
  },
  build: {
    outDir: THEME_CONFIG.assetsPath,
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
    // WordPressのローカル環境をプロキシ
    proxy: {
      '/': {
        target: 'https://person-local-wp.dev',
        changeOrigin: true,
        secure: false, // 自己署名証明書を許可
        ws: true, // WebSocketもプロキシ
      },
    },
  },
});
