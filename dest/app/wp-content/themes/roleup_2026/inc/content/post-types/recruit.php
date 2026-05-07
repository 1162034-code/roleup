<?php
if (! defined('ABSPATH')) exit;

function recruit_custom_post_type()
{
  $labels = array(
    'name'         => '応募要項',
    'singular_name'       => '応募要項',
    'add_new_item'        => '新しい応募要項を追加',
    'add_new'             => '新規追加',
    'edit_item'           => '応募要項を編集',
    'new_item'            => '新しい応募要項',
    'view_item'           => '応募要項を表示',
    'not_found'           => '応募要項はありません',
    'not_found_in_trash'  => 'ゴミ箱に応募要項はありません',
    'search_items' => '応募要項を検索'
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
      'page-attributes',
      'author'
    ),
    'menu_icon' => 'dashicons-businessperson'
  );
  register_post_type('recruit', $args);

  register_taxonomy(
    'recruit_category',
    'recruit',
    array(
      'hierarchical' => true,
      'label' => '採用区分',
      'show_ui' => true,
      'query_var' => true,
      'show_in_rest' => true,
      'rewrite' => false,
      'singular_label' => '採用区分',
      'meta_box_cb' => 'post_categories_meta_box',
    )
  );
  register_taxonomy(
    'recruit_company',
    'recruit',
    array(
      'hierarchical' => true,
      'label' => '法人区分',
      'show_ui' => true,
      'query_var' => true,
      'show_in_rest' => true,
      'rewrite' => false,
      'singular_label' => '法人区分',
      'meta_box_cb' => 'post_categories_meta_box',
    )
  );
}
add_action('init', 'recruit_custom_post_type');

/**
 * 【管理画面】カスタム投稿タイプにカテゴリーフィルターを追加
 */
function add_recruit_term_filter($post_type)
{
  if ($post_type == 'recruit') :
    $taxonomy = 'recruit_category';
    wp_dropdown_categories(array(
      'show_option_all' => '採用区分指定なし',
      'orderby' => 'name',
      'selected' => get_query_var($taxonomy),
      'hide_empty' => 0,
      'name' => $taxonomy,
      'taxonomy' => $taxonomy,
      'value_field' => 'slug',
    ));
    $taxonomy = 'recruit_company';
    wp_dropdown_categories(array(
      'show_option_all' => '法人区分指定なし',
      'orderby' => 'name',
      'selected' => get_query_var($taxonomy),
      'hide_empty' => 0,
      'name' => $taxonomy,
      'taxonomy' => $taxonomy,
      'value_field' => 'slug',
    ));
  endif;
}
add_action('restrict_manage_posts', 'add_recruit_term_filter', 10, 1);

/**
 * 【管理画面】カスタム投稿タイプの一覧にタクソノミーカラムを追加
 */
function add_recruit_custom_columns($columns)
{
  $new_columns = array();
  foreach ($columns as $key => $value) {
    $new_columns[$key] = $value;
    if ($key === 'title') {
      $new_columns['recruit_category'] = '採用区分';
      $new_columns['recruit_company'] = '法人区分';
    }
  }
  return $new_columns;
}
add_filter('manage_recruit_posts_columns', 'add_recruit_custom_columns');

/**
 * 【管理画面】カスタムカラムの内容を表示
 */
function add_recruit_custom_column_content($column_name, $post_id)
{
  if ($column_name === 'recruit_category') {
    $terms = get_the_terms($post_id, 'recruit_category');
    if ($terms && !is_wp_error($terms)) {
      $term_names = array_map(function ($term) {
        return esc_html($term->name);
      }, $terms);
      echo implode(', ', $term_names);
    } else {
      echo '—';
    }
  }
  if ($column_name === 'recruit_company') {
    $terms = get_the_terms($post_id, 'recruit_company');
    if ($terms && !is_wp_error($terms)) {
      $term_names = array_map(function ($term) {
        return esc_html($term->name);
      }, $terms);
      echo implode(', ', $term_names);
    } else {
      echo '—';
    }
  }
}
add_action('manage_recruit_posts_custom_column', 'add_recruit_custom_column_content', 10, 2);

/**
 * 応募要項の投稿にnoindexを追加
 */
function add_noindex_to_recruit()
{
  if (is_singular('recruit')) {
    echo '<meta name="robots" content="noindex, nofollow">' . "\n";
  }
}
add_action('wp_head', 'add_noindex_to_recruit', 1);
