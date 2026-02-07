/**
 * WordPressテーマ設定
 * テーマ名を変更する場合は、theme.config.jsonのthemeNameを変更してください
 */
import { readFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// build/config/theme.config.jsonを読み込む
const configPath = resolve(__dirname, 'theme.config.json');

if (!existsSync(configPath)) {
  throw new Error(`Theme config file not found: ${configPath}`);
}

const config = JSON.parse(readFileSync(configPath, 'utf-8'));

if (!config.themeName) {
  throw new Error('themeName is required in theme.config.json');
}

// themeNameから自動的にパスを生成
const themeName = config.themeName;
const basePath = `dest/app/wp-content/themes/${themeName}`;

export const THEME_CONFIG = {
  themeName,
  themePath: basePath,
  assetsPath: `${basePath}/assets`,
  cssPath: `${basePath}/assets/css`,
  imgPath: `${basePath}/assets/img`,
};
