<?php
if (! defined('ABSPATH')) exit;

/**
 * 親ページを持つ子ページの場合、親ページのスラッグを取得する
 */
function is_parent_slug($slug = '') {
  global $post;

  // $postが存在し、post_parentプロパティを持つか確認
  if ($post && isset($post->post_parent) && $post->post_parent) {
    $post_data = get_post($post->post_parent);
    if ($post_data) {
      // 引数で渡されたスラッグと親ページのスラッグを比較
      return $post_data->post_name === $slug;
    }
  }
  return false;
}
