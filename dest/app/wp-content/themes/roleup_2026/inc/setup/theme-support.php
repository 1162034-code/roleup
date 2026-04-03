<?php
if (! defined('ABSPATH')) exit;

  /**
	 * wp_headから必要のないタグを削除
	 */
	remove_action('wp_head', 'rsd_link');
	remove_action('wp_head', 'wlwmanifest_link');
	remove_action('wp_head', 'wp_shortlink_wp_head');
	remove_action('wp_head', 'wp_generator');
	remove_action('wp_head', 'adjacent_posts_rel_link_wp_head');
	remove_action('wp_head', 'rest_output_link_wp_head');
	remove_action('wp_head', 'wp_oembed_add_host_js');
	remove_action('wp_head', 'wp_oembed_add_discovery_links');
	remove_action('wp_head', 'print_emoji_detection_script', 7 );
	remove_action('wp_print_styles', 'print_emoji_styles' );
	remove_action('wp_head', 'rel_canonical');

	function remove_my_global_styles() {
		wp_dequeue_style( 'global-styles' );
	}
	add_action( 'wp_enqueue_scripts', 'remove_my_global_styles' );

  /**
   * WordPressのバージョンを隠す
   */
  remove_action('wp_head', 'wp_generator');
  add_filter('style_loader_src', 'custom__style_style_loader_src', 9999);
  add_filter('script_loader_src', 'custom__style_style_loader_src', 9999);
  function custom__style_style_loader_src($src) {
    if (false !== strpos($src, 'ver=')) $src = remove_query_arg('ver', $src);
    return $src;
  }

  /**
   * テーマのセットアップ
   */
  function theme_setup() {
    // アイキャッチ画像をサポート
    add_theme_support('post-thumbnails');
  }
  add_action('after_setup_theme', 'theme_setup');

  /**
   * カラーパレットを追加
   */
  function add_color_palette() {
    add_theme_support( 'editor-color-palette', [
      [
        'name' => 'Orange',
        'slug' => 'orange',
        'color' => '#ec6d54',
      ],
      [
        'name' => 'Green',
        'slug' => 'green',
        'color' => '#00934c',
      ],
      [
        'name' => 'Blue',
        'slug' => 'blue',
        'color' => '#3896ce',
      ],
      [
        'name' => 'Yellow',
        'slug' => 'yellow',
        'color' => '#eec22c',
      ],
    ] );
  }
  add_action( 'after_setup_theme', 'add_color_palette' );

  /**
   * ブロックエディターにテーマスタイルを適用
   */
  function add_block_editor_styles() {
    // ブロックエディターでテーマのエディタースタイルを有効化
    add_theme_support( 'editor-styles' );
    // エディター専用の軽量CSSを読み込む（管理画面の投稿画面内に適用される）
    add_editor_style( 'assets/css/editor-style.css' );
  }
  add_action( 'after_setup_theme', 'add_block_editor_styles' );

  /**
   * タイトルタグを有効化
   */
  add_action('after_setup_theme', function () {
    add_theme_support('title-tag');
  });

  /**
   * タイトルセパレータを設定
   */
  add_filter('document_title_separator', function () {
    return ' | ';
  });

  /**
	 * Contact Form 7の自動pタグ無効
	 */
	add_filter('wpcf7_autop_or_not', 'wpcf7_autop_return_false');
	function wpcf7_autop_return_false() {
		return false;
	}

	/**
	 * 管理画面のメニューからコメントを非表示
	 */
	function edit_admin_menus() {
		global $menu;
		remove_menu_page ( 'edit-comments.php' );
	}
	add_action( 'admin_menu', 'edit_admin_menus' );

  /**
   * 【管理画面】投稿メニューを非表示
   */
  // function remove_menus () {
  //   global $menu;
  //   remove_menu_page( 'edit.php' );
  // }
  // add_action('admin_menu', 'remove_menus');

  /**
   * contact form 7 バリデーションチェック
   */
	// add_filter('wpcf7_validate_email', 'custom_email_validation_filter', 20, 2);
	// add_filter('wpcf7_validate_email*', 'custom_email_validation_filter', 20, 2);
	// function custom_email_validation_filter($result, $tag) {
	// 	$name = $tag['name'];
	// 	if ($name == 'your-email') {
	// 		$value = isset($_POST[$name]) ? trim($_POST[$name]) : "";
	// 		if (! is_email($value)) {
	// 			$result->invalidate($tag, "正しいメールアドレスを入力してください。");
	// 		}
	// 	} elseif ($name == 'your-email-confirm') {
	// 		$value = isset($_POST[$name]) ? trim($_POST[$name]) : "";
	// 		$original_email = isset($_POST['your-email']) ? trim($_POST['your-email']) : "";

	// 		// メールアドレス形式チェック
	// 		if (! is_email($value)) {
	// 			$result->invalidate($tag, "正しいメールアドレスを入力してください。");
	// 		}
	// 		// 一致チェック
	// 		elseif ($value !== $original_email) {
	// 			$result->invalidate($tag, "メールアドレスが一致しません。");
	// 		}
	// 	}
	// 	return $result;
	// }

	// add_filter('wpcf7_validate_tel', 'custom_phone_validation_filter', 20, 2);
	// add_filter('wpcf7_validate_tel*', 'custom_phone_validation_filter', 20, 2);

	// function custom_phone_validation_filter($result, $tag) {
	// 	$name = $tag['name'];
	// 	if ($name == 'your-tel') {
	// 		$value = isset($_POST[$name]) ? trim($_POST[$name]) : "";
	// 		$pattern = '/^\d{2,4}-?\d{2,4}-?\d{4}$/';
	// 		if (!preg_match($pattern, $value)) {
	// 			$result->invalidate($tag, "正しい電話番号を入力してください。(例: 03-1234-5678 または 0312345678)");
	// 		}
	// 	}
	// 	return $result;
	// }

	// add_filter('wpcf7_validate_text', 'custom_text_validation_filter', 20, 2);
	// add_filter('wpcf7_validate_text*', 'custom_text_validation_filter', 20, 2);

	// function custom_text_validation_filter($result, $tag) {
	// 	$name = $tag['name'];
	// 	if ($name == 'your-kana') {
	// 		$value = isset($_POST[$name]) ? trim($_POST[$name]) : "";

	// 		// カタカナチェック（全角カタカナとスペースのみ許可）
	// 		$pattern = '/^[ァ-ヾ\s]+$/u';
	// 		if (!preg_match($pattern, $value)) {
	// 			$result->invalidate($tag, "フリガナは全角カタカナで入力してください。");
	// 		}
	// 	}
	// 	return $result;
	// }
