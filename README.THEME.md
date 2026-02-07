# テーマ名の変更方法

WordPressテーマ名を変更する場合は、以下の手順に従ってください。

## 1. 設定ファイルを編集

`vite/config/theme.config.json`ファイルを開き、`themeName`を変更してください。

```json
{
  "themeName": "新しいテーマ名",
  ...
}
```

## 2. テーマディレクトリをリネーム

実際のテーマディレクトリもリネームしてください。

```bash
mv dest/app/wp-content/themes/roleup_2026 dest/app/wp-content/themes/新しいテーマ名
```

## 3. 設定が反映されるファイル

以下のファイルで設定が自動的に反映されます（すべて`vite/config/theme.config.json`を参照）：

- `vite/config/theme.js` - テーマ設定の読み込み
- `vite.config.js` - Viteのビルド設定
- `bs-config.cjs` - BrowserSyncの設定
- 各種プラグイン設定

- `vite.config.js` - Viteのビルド設定
- `bs-config.cjs` - BrowserSyncの設定
- 各種プラグイン設定

## 注意事項

- テーマ名を変更した後は、開発サーバーを再起動してください
- WordPressのデータベースでテーマ名が参照されている場合は、そちらも更新が必要です
