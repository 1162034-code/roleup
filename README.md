# ガイドライン

## 環境
- Viteが使える環境
- Nodeはバージョン：v25.2.1 (2024.12月時点)

## 使い方
- ダウンロードしたフォルダを開く
- ターミナルを開き、`npm i（npm install）` とコマンドを入力
- node_modulesとpackage-lock.jsonが生成されるのを確認する
- 「 `npm start` 」とコマンドを入力すると開発サーバーが起動します
- **画像の監視・変換を行う場合は、別のターミナルで `npm run img:watch` を実行してください**

## コマンド一覧

| コマンド | 説明 |
|---------|------|
| `npm start` | 開発サーバー起動（SCSS監視・Lint監視） |
| `npm run build` | 本番用ビルド（圧縮・最適化） |
| `npm run lint:js` | JavaScriptのコードチェック |
| `npm run lint:js:fix` | JavaScriptの自動修正 |
| `npm run lint:style` | SCSSのコードチェック |
| `npm run lint:style:fix` | SCSSの自動修正 |
| `npm run img:convert` | 画像のWebP変換・圧縮（一括実行） |
| `npm run img:watch` | 画像の変更監視・自動変換（別ターミナルで実行） |

## 仕様
- **開発サーバー**: Vite（ポート5173）
- **SCSS**: `src/scss` フォルダ内で記述。Globインポート（`@use "dir/**"`）対応。
- **画像**: `src/img` に格納すると、自動的にWebP変換・圧縮可能です（`npm run img:watch` 使用）。
- **出力先**: コンパイルされたCSSと画像は `dest/assets` フォルダ内に出力されます。
- **JS**: `dest/assets/js` 内で記述。ESLintによる品質管理導入済み。
- **ネットワークアクセス**: スマホやタブレットからローカル環境（`http://192.168.x.x:5173`）にアクセス可能。

## 画像変換機能について
詳細は `vite-scripts/README.md` を参照してください。
- WebP変換のON/OFFや画質設定は `vite-scripts/image.config.js` で変更可能です。
- **注意**: 画像監視は `npm start` に含まれていません。別途 `npm run img:watch` を実行してください。

## scssについて
本テンプレートのcssは` FLOCSS `で構成されています。
仕様については、下記を参照ください。
https://github.com/hiloki/flocss

### デフォルトとして設定している仕様について
- スマホファーストが前提の仕様です。
- rem記述を前提としています。（` foundation/global/function `で設定しています。rem(10) 等）。

#### 変数
CSSカスタムプロパティを使用しています。（` foundation/global/setting `）

- font-familyやcolorなどはこちらにまとめておくと便利です。
- 一通りのeasingも設定しています。

#### メディアクエリ
` foundation/global/media-queries ` に設定しています。
- スマホのみの場合（768px以下）：`  @include mq(tab, max) ` または ` @include ltSP `
- スマホ以上、タブレット以上の場合(769px以上)：` @include mq(tab) ` または ` @include gtTAB `
- PC表示、タブレットサイズ以上の場合（1024px以上）：` @include mq(pc) `
- タブレットのみ（769px〜1024px）：` @include rangePCSP `

### ページ毎のスタイル設定
ページ毎に設定する場合は、「` /src/scss/page/~ `」内にてフォルダを追加してください。
例）` /src/scss/page/home/index.scss `

## Lint設定の説明

### Stylelint (CSS/SCSS)
- **extends**: `stylelint-config-standard-scss`, `stylelint-config-recess-order`
- **ルール**: FLOCSS命名規則、プロパティ順序、重複チェックなど
- **自動修正**: `npm run lint:style:fix` で多くのエラーを自動修正可能

### ESLint (JavaScript)
- **ルール**: モダンなJavaScript (ES2022)、セミコロン必須、シングルクォート推奨、`var`禁止など
- **自動修正**: `npm run lint:js:fix` で多くのエラーを自動修正可能

### 許容範囲について
本テンプレートには、scssの一貫性を保つために` stylelint `を使用しています。
` flocss `で設定していますが、一部許容しているものもあります。
下記を参考にしてください。

- 基本的なflocssの書き方
.l-container            /* レイアウト */
.c-button__item          /* 要素 */
.p-header               /* プロジェクト */
.u-hidden               /* ユーティリティ */
.js-modal               /* JavaScript用 */
.is-active              /* JavaScriptなどで操作されるクラス */
.c-button--primary        /* 通常のモディファイア */
.-primary                /* ハイフンから始まるモディファイア */

- プレフィックスなしのクラス名も許容しています。（基本的には.l- .p- .c- 内で使用していただくのがいいですが、自由に設計してください。）
.thumbnail           /* プレフィックスなしのクラス名 */
.text               /* プレフィックスなしのクラス名 */
.button             /* プレフィックスなしのクラス名 */
.card-title         /* ハイフン付きのプレフィックスなしクラス名 */

- プラグイン内にはアンダースコア2つ（__）で連結される場合があるため、下記も許容していますが、基本的にはflocssの仕様に従ってください。（あくまでプラグイン内の許容です。）
.splide__pagination__page  /* splideプラグイン */
.anyplugin__element__sub  /* その他のプラグイン */
