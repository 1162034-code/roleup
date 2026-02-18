<?php
if (! defined('ABSPATH')) exit;

/**
 * オープニングのバリエーション設定
 *
 * 切り替え: add_filter で 'a' | 'b' | 'c' | 'd' | 'e' を返す
 *
 * a: カーテン＋段階的リビール（ロゴ・タイトル・サブタイトル・ラインが順に表示）
 * b: GORA KADAN風（背景のKen Burnsズーム＋穏やかなフェードイン）
 * c: DAC風（テキストのclip-pathリビール、Making Good Taste風）
 * d: NELU風（背景＋下から上にカーテンが上がる＋テキストリビール）
 * e: 縦ブラインド（左から右へ縦ストリップが順にスライドして開く）
 */
add_filter('roleup_opening_variant', function () {
  return 'b'; // ここを 'b' | 'c' | 'd' | 'e' に変更して別案を確認
});
