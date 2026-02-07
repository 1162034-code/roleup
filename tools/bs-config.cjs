const fs = require('fs');
const path = require('path');

// テーマ設定を読み込む
const themeConfigPath = path.resolve(__dirname, '../vite/config/theme.config.json');

if (!fs.existsSync(themeConfigPath)) {
  throw new Error(`Theme config file not found: ${themeConfigPath}`);
}

const themeConfig = JSON.parse(fs.readFileSync(themeConfigPath, 'utf-8'));

if (!themeConfig.themeName) {
  throw new Error('themeName is required in theme.config.json');
}

// themeNameから自動的にパスを生成
const themeName = themeConfig.themeName;
const themePath = `dest/app/wp-content/themes/${themeName}`;

module.exports = {
  files: [
    `${themePath}/**/*.php`,
    `${themePath}/**/*.css`,
    `${themePath}/**/*.js`,
  ],
  proxy: 'https://person-local-wp.dev',
  https: true,
  port: 3000,
  ui: {
    port: 3003,
  },
  open: false,
  notify: false,
  ghostMode: false,
};
