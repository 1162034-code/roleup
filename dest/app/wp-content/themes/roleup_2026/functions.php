<?php

$inc_files = [
  // テーマ初期設定
  'setup/theme-support',
  'setup/enqueue',
  'setup/opening',
  // コンテンツ
  'content/post-types/news',
  // ヘルパー
  'helpers/template-tags',
  'helpers/shortcodes',
];

foreach ($inc_files as $file) {
  require get_theme_file_path('inc/' . $file . '.php');
}
