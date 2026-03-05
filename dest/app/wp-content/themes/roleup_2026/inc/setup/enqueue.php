<?php
if (! defined('ABSPATH')) exit;

/* スタイル読み込み */
add_action( 'wp_enqueue_scripts', 'custom_enqueue_styles' );
function custom_enqueue_styles() {
	// SimpleBar専用スタイル
	if ( is_page( 'about' ) ) {
    wp_enqueue_style( 'style-simplebar', get_theme_file_uri( 'assets/css/vendor/simplebar.css' ), array() );
	}

	wp_enqueue_style( 'style-theme', get_theme_file_uri( 'assets/css/style.css' ) );

	// フロントページ専用スタイル
	if ( is_front_page() ) {
		wp_enqueue_style( 'style-home', get_theme_file_uri( 'assets/css/page/home/index.css' ), array('style-theme') );
	}

  // Aboutページ専用スタイル
  if ( is_page( 'about' ) ) {
    wp_enqueue_style( 'style-about', get_theme_file_uri( 'assets/css/page/about/index.css' ), array('style-theme') );
  }
}

/* スクリプト読み込み */
add_action( 'wp_enqueue_scripts', 'custom_wp_enqueue_scripts' );
function custom_wp_enqueue_scripts() {
  if ( is_page( 'about' ) ) {
    wp_enqueue_script( 'script-simplebar', get_theme_file_uri( 'assets/js/vendor/simplebar.min.js' ), array(), false, true );
  }

	wp_enqueue_script( 'script-common', get_theme_file_uri( 'assets/js/common.js' ), array(), false, true );
}

add_filter('script_loader_tag', 'add_type_attribute', 10, 3);
function add_type_attribute($tag, $handle, $src) {
	$handles = ['script-common'];
	if ( !in_array($handle, $handles, true) ) {
		return $tag;
	}
	// scriptタグにtype="module"を追加
	$tag = '<script type="module" src="' . esc_url( $src ) . '"></script>';

	return $tag;
}

// add_filter('script_loader_tag', 'add_defer', 10, 3);
// function add_defer($tag, $handle, $src) {
// 	$handles = ['script-image-map-resizer', 'script-form'];
// 	if ( !in_array($handle, $handles, true) ) {
// 		return $tag;
// 	}
// 	// scriptタグにdeferを追加
// 	$tag = '<script defer src="' . esc_url( $src ) . '"></script>';

// 	return $tag;
// }

/* URLにバージョンパラメータを追加するフィルター */
add_filter('style_loader_src', 'add_version_parameter', 999, 2);
add_filter('script_loader_src', 'add_version_parameter', 999, 2);

function add_version_parameter($src, $handle) {
  // テーマの特定のスタイルとスクリプトのみを対象にする
  if (strpos($handle, 'style-') !== 0 && strpos($handle, 'script-') !== 0) {
    return $src;
  }

  // クエリパラメータを除去したURL
  $file_url  = preg_replace('/\?.*/', '', $src);
  $theme_url  = get_theme_file_uri('');
  $theme_path = get_theme_file_path('');

  // テーマ配下URLのみに限定
  if (strpos($file_url, $theme_url) !== 0) {
    return $src;
  }

  // 対応するファイルパスを生成
  $file_path = str_replace($theme_url, $theme_path, $file_url);
  if (!file_exists($file_path)) {
    return $src;
  }

  $version = filemtime($file_path);

  // 既存のver/vを除去してから付与
  $src = remove_query_arg(array('ver', 'v'), $src);
  return add_query_arg('v', $version, $src);
}
