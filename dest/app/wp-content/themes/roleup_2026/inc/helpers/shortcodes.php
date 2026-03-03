<?php
if (! defined('ABSPATH')) exit;

  //テーマディレクトリー
  function theme_directory_shortcode() {
    return get_theme_file_uri();
  }
  add_shortcode('theme_dir', 'theme_directory_shortcode');

  //srcsetにショートコードを反映
  add_filter('wp_kses_allowed_html', 'my_wp_kses_allowed_html', 10, 2);
  function my_wp_kses_allowed_html($tags, $context) {
    $tags['source']['srcset'] = true;
    return $tags;
  }

	// ホームURLを出力するショートコード
  function my_custom_home_url_shortcode() {
    return esc_url(home_url());
  }
  add_shortcode('home_url', 'my_custom_home_url_shortcode');

  // パンくずリストを出力するショートコード
  function my_custom_breadcrumb_shortcode() {
    return get_template_part('template-parts/breadcrumb');
  }
  add_shortcode('breadcrumb', 'my_custom_breadcrumb_shortcode');
