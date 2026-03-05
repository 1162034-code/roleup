/**
 * BrowserSyncプラグイン
 * WordPressのローカル環境を自動リロードするためのViteプラグイン
 */
import { create } from 'browser-sync';
import { resolve } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { THEME_CONFIG } from '../config/theme.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = resolve(__dirname, '../../');

// 環境変数からURLを取得（デフォルトはWordPressのローカル環境）
const WORDPRESS_URL = process.env.WP_URL || 'https://person-local-wp.dev';
const USE_LOCALHOST = process.env.USE_LOCALHOST === 'true';

/**
 * BrowserSync設定
 */
const BROWSER_SYNC_CONFIG = {
  // Viteの開発サーバーをプロキシ（ViteがWordPressをプロキシしている）
  // BrowserSyncはViteサーバー（localhost:5173）をプロキシします
  proxy: USE_LOCALHOST ? 'http://localhost:3000' : 'http://localhost:5173',

  // BrowserSyncのポート（プロキシモードでは、このポートでプロキシされたサイトにアクセス）
  port: 3000,

  // UIポート
  ui: {
    port: 3003,
  },

  // HTTPS設定
  // BrowserSync自体はHTTPで起動し、HTTPSサイトをプロキシする
  https: false,

  // その他の設定
  open: false,
  notify: true, // 通知を有効化（デバッグ用）
  ghostMode: false,

  // リロード設定
  reloadOnRestart: true,

  // スクロール同期を無効化（WordPressでは不要な場合が多い）
  scrollProportionally: false,

  // リロードの遅延（ファイル変更後のリロードまでの待機時間）
  // より迅速なリロードのために短縮
  reloadDelay: 100,

  // インジェクション設定（CSS/JSの変更を検知）
  injectChanges: true,

  // ログレベル（デバッグ用）
  logLevel: 'debug', // デバッグモードで詳細なログを出力

  // ファイル変更の検知方法（最適化）
  watchOptions: {
    ignoreInitial: false, // 初回スキャンも実行
    awaitWriteFinish: {
      stabilityThreshold: 100, // ファイル書き込み完了の待機時間を短縮（300ms → 100ms）
      pollInterval: 50, // ポーリング間隔を短縮（100ms → 50ms）
    },
    usePolling: true, // macOSでのファイル監視を確実にする
    interval: 100, // ポーリング間隔（ms）
    binaryInterval: 300, // バイナリファイルのポーリング間隔（ms）
  },

  // ミドルウェア設定（必要に応じて）
  middleware: [],

  // リロード時のイベント（デバウンス時間を短縮）
  reloadDebounce: 100, // デバウンス時間を短縮（300ms → 100ms）

  // プロキシのリライト設定（WordPressのURLを正しく処理）
  rewriteRules: [
    // ルートURLのみの場合: href="https://person-local-wp.dev" → href="/"
    {
      match: /https?:\/\/person-local-wp\.dev(?=["'\s>])/g,
      replace: '/',
    },
    // パス付きURL: ドメイン部分を削除して相対パスに
    {
      match: /https?:\/\/person-local-wp\.dev/g,
      replace: '',
    },
  ],

  // デバッグ用: ファイル変更をログ出力
  logFileChanges: true,

  // ファイル監視の設定を強化
  watch: true,
  watchEvents: ['change', 'add', 'unlink'],

  // リロード設定を強化
  reload: true,
  reloadThrottle: 0, // リロードのスロットルを無効化（即座にリロード）

  // ファイル監視の感度を向上
  watchThrottle: 0, // ファイル監視のスロットルを無効化
};

/**
 * BrowserSync Viteプラグイン
 */
export function browserSyncPlugin() {
  let bsInstance = null;

  return {
    name: 'browser-sync',
    configureServer(server) {
      // ファイルパターンを設定（相対パス）
      const filesToWatch = [
        `${THEME_CONFIG.themePath}/**/*.php`,
        `${THEME_CONFIG.themePath}/**/*.css`,
        `${THEME_CONFIG.themePath}/**/*.js`,
      ];

      console.log('\n📁 BrowserSync Plugin:');
      console.log(`   Files to watch:`);
      filesToWatch.forEach(pattern => {
        const resolved = resolve(projectRoot, pattern);
        console.log(`     - ${pattern}`);
        console.log(`       Resolved: ${resolved}`);
      });
      console.log(`   CWD: ${projectRoot}\n`);

      // BrowserSyncの設定
      const bsConfig = {
        ...BROWSER_SYNC_CONFIG,
        files: filesToWatch,
        cwd: projectRoot,
      };

      // BrowserSyncインスタンスを作成
      bsInstance = create('browser-sync');

      // BrowserSyncを初期化
      bsInstance.init(bsConfig, (err, bs) => {
        if (err) {
          console.error('❌ BrowserSync initialization error:', err);
          return;
        }
        console.log('✅ BrowserSync Plugin initialized');
        console.log(`   Local: http://localhost:${bsConfig.port}`);
        console.log(`   UI: http://localhost:${bsConfig.ui.port}`);
        console.log('   ⚡ Optimized for fast file detection\n');

        // ファイル変更のイベントリスナーを追加（デバッグ用）
        bs.emitter.on('file:changed', (data) => {
          console.log(`[BrowserSync] File changed: ${data.path}`);
        });

        bs.emitter.on('reload', (data) => {
          console.log(`[BrowserSync] Reloading: ${data.files ? data.files.join(', ') : 'all files'}`);
        });

        // ファイル監視の開始を確認
        bs.emitter.on('stream:changed', (data) => {
          console.log(`[BrowserSync] Stream changed: ${data.path}`);
        });
      });
    },
    closeBundle() {
      if (bsInstance) {
        bsInstance.exit();
      }
    },
  };
}
