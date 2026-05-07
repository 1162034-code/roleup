<?php
if (! defined('ABSPATH')) exit;

function privacy_custom_post_type()
{
  $labels = array(
    'name'         => '個人情報保護方針',
    'singular_name'       => '個人情報保護方針',
    'add_new_item'        => '新しい個人情報保護方針を追加',
    'add_new'             => '新規追加',
    'edit_item'           => '個人情報保護方針を編集',
    'new_item'            => '新しい個人情報保護方針',
    'view_item'           => '個人情報保護方針を表示',
    'not_found'           => '個人情報保護方針はありません',
    'not_found_in_trash'  => 'ゴミ箱に個人情報保護方針はありません',
    'search_items' => '個人情報保護方針を検索'
  );
  $args = array(
    'labels'        => $labels,
    'public'        => true,
    'show_ui'       => true,
    'query_var'     => true,
    'hierarchical'  => false,
    'menu_position' => 5,
    'has_archive'   => false,
    'publicly_queryable' => false,
    'exclude_from_search' => true,
    'show_in_rest' => true,
    'supports' => array(
      'title',
      'editor',
      'page-attributes',
      'author'
    ),
    'menu_icon' => 'dashicons-shield'
  );
  register_post_type('privacy', $args);
}
add_action('init', 'privacy_custom_post_type');

/**
 * 個人情報保護方針の投稿にnoindexを追加
 */
function add_noindex_to_privacy()
{
  if (is_singular('privacy')) {
    echo '<meta name="robots" content="noindex, nofollow">' . "\n";
  }
}
add_action('wp_head', 'add_noindex_to_privacy', 1);

/**
 * 個人情報保護方針をショートコードで表示
 * 使用例: [privacy_policy id="123"]
 * 使用例: [privacy_policy id="123" title="true"] タイトルも表示
 */
function privacy_policy_shortcode($atts)
{
  $atts = shortcode_atts(array(
    'id' => '',
    'title' => 'false',
  ), $atts);

  if (empty($atts['id'])) {
    return '<p>投稿IDが指定されていません。</p>';
  }

  $post = get_post($atts['id']);

  if (!$post || $post->post_type !== 'privacy') {
    return '<p>指定された個人情報保護方針が見つかりません。</p>';
  }

  if ($post->post_status !== 'publish') {
    return '<p>この投稿は公開されていません。</p>';
  }

  $output = '';

  if ($atts['title'] === 'true') {
    $output .= '<h2>' . esc_html($post->post_title) . '</h2>';
  }

  $output .= apply_filters('the_content', $post->post_content);

  return $output;
}
add_shortcode('privacy_policy', 'privacy_policy_shortcode');

/**
 * 管理画面の一覧にショートコードカラムを追加
 */
function privacy_add_shortcode_column($columns)
{
  $new_columns = array();
  foreach ($columns as $key => $value) {
    $new_columns[$key] = $value;
    if ($key === 'title') {
      $new_columns['shortcode'] = 'ショートコード';
    }
  }
  return $new_columns;
}
add_filter('manage_privacy_posts_columns', 'privacy_add_shortcode_column');

/**
 * ショートコードカラムの内容を表示
 */
function privacy_show_shortcode_column($column, $post_id)
{
  if ($column === 'shortcode') {
    echo '<code>[privacy_policy id="' . $post_id . '"]</code><br>';
    echo '<small>Contact Form 7用: <code>[privacy_policy "' . $post_id . '"]</code></small>';
  }
}
add_action('manage_privacy_posts_custom_column', 'privacy_show_shortcode_column', 10, 2);

/**
 * Contact Form 7用のカスタムフォームタグを追加
 * 使用例: [privacy_policy "123"]
 */
function add_privacy_policy_cf7_tag()
{
  if (!function_exists('wpcf7_add_form_tag')) {
    return;
  }

  wpcf7_add_form_tag(
    array('privacy_policy'),
    'privacy_policy_cf7_tag_handler',
    array('display-block' => true)
  );
}
add_action('wpcf7_init', 'add_privacy_policy_cf7_tag');

/**
 * Contact Form 7のタグハンドラー
 */
function privacy_policy_cf7_tag_handler($tag)
{
  // タグのbasetype（privacy_policy）とoptions（数字のID）を取得
  $post_id = isset($tag->values[0]) ? absint($tag->values[0]) : 0;

  if (empty($post_id)) {
    return '<p>投稿IDが指定されていません。</p>';
  }

  $post = get_post($post_id);

  if (!$post || $post->post_type !== 'privacy' || $post->post_status !== 'publish') {
    return '<p>指定された個人情報保護方針が見つかりません。</p>';
  }

  $output = '<h2>' . esc_html($post->post_title) . '</h2>';
  $output .= apply_filters('the_content', $post->post_content);

  return $output;
}
