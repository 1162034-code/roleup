<?php
if (! defined('ABSPATH')) exit;

function news_custom_post_type()
{
  $labels = array(
    'name'         => 'NEWS',
    'singular_name'       => 'NEWS',
    'add_new_item'        => '新しいNEWSを追加',
    'add_new'             => '新規追加',
    'edit_item'           => 'NEWSを編集',
    'new_item'            => '新しいNEWS',
    'view_item'           => 'NEWSを表示',
    'not_found'           => 'NEWSはありません',
    'not_found_in_trash'  => 'ゴミ箱にNEWSはありません',
    'search_items' => 'NEWSを検索'
  );
  $args = array(
    'labels'        => $labels,
    'public'        => true,
    'show_ui'       => true,
    'query_var'     => true,
    'hierarchical'  => false,
    'menu_position' => 5,
    'has_archive'   => true,
    'show_in_rest' => true,
    'supports' => array(
      'title',
      'editor',
      'page-attributes',
      'author',
      'thumbnail'
    ),
    'menu_icon' => 'dashicons-welcome-write-blog'
  );
  register_post_type('news', $args);

  register_taxonomy(
    'news_category',
    'news',
    array(
      'hierarchical' => true,
      'label' => 'カテゴリー',
      'show_ui' => true,
      'query_var' => true,
      'show_in_rest' => true,
      'rewrite' => array(
        'slug' => 'news-category',
        'with_front' => false
      ),
      'singular_label' => 'NEWS',
      'meta_box_cb' => 'post_categories_meta_box',
    )
  );
}
add_action('init', 'news_custom_post_type');


/**
 * 【管理画面】カスタム投稿タイプにカテゴリーフィルターを追加
 */
function add_term_filter($post_type)
{
  if ($post_type == 'news') :
    $taxonomy = 'news_category';
    wp_dropdown_categories(array(
      'show_option_all' => 'カテゴリー指定なし',
      'orderby' => 'name',
      'selected' => get_query_var($taxonomy),
      'hide_empty' => 0,
      'name' => $taxonomy,
      'taxonomy' => $taxonomy,
      'value_field' => 'slug',
    ));
  endif;
}
add_action('restrict_manage_posts', 'add_term_filter', 10, 1);

/**
 * カスタム投稿名が"news"の投稿のパーマリンクを「/news/投稿ID/」の形に書き換え
 */
function custom_post_link($link, $post)
{
  if ($post->post_type === 'news') {
    return home_url('/news/' . $post->ID);
  } else {
    return $link;
  }
}
add_filter('post_type_link', 'custom_post_link', 1, 2);

/**
 * 【書き換えたパーマリンクに対応したリライトルールを追加
 */
function custom_post_link_rewrite($rules)
{
  $rewrite_rules = array(
    'news/([0-9]+)/?$' => 'index.php?post_type=news&p=$matches[1]',
  );
  return $rewrite_rules + $rules;
}
add_filter('rewrite_rules_array', 'custom_post_link_rewrite');

/**
 * 採用区分のタクソノミーを追加（初回のみ）
 */
// function add_news_categories() {
//   $terms = array(
//     array('name' => 'お知らせ', 'slug' => 'news-info'),
//     array('name' => 'イベント情報', 'slug' => 'event-info'),
//     array('name' => 'その他', 'slug' => 'other-info'),
//   );
//   foreach ($terms as $term) {
//     if (!term_exists($term['slug'], 'news-category')) {
//       wp_insert_term($term['name'], 'news-category', array('slug' => $term['slug']));
//     }
//   }
// }
// add_action('init', 'add_news_categories');
