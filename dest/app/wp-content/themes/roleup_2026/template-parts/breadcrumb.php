<?php

/**
 * Breadcrumb Navigation Component
 *
 * Generates structured breadcrumb navigation with Schema.org markup
 * Supports all WordPress page types and custom post types
 */

// Security check
if (!defined('ABSPATH')) {
  exit;
}

// Initialize variables
global $post;
$position = 1;
$breadcrumb_items = [];
$home_url = esc_url(home_url('/'));
$home_title = esc_html(get_bloginfo('name'));

// Helper function to safely get post type object
if (!function_exists('get_safe_post_type_object')) {
  function get_safe_post_type_object($post_type)
  {
    $obj = get_post_type_object($post_type);
    return $obj ?: (object)['label' => ucfirst($post_type), 'has_archive' => false];
  }
}

// Helper function to safely get taxonomy object
if (!function_exists('get_safe_taxonomy')) {
  function get_safe_taxonomy($taxonomy)
  {
    $obj = get_taxonomy($taxonomy);
    return $obj ?: (object)['object_type' => [], 'label' => ucfirst($taxonomy)];
  }
}

// Add home item
$breadcrumb_items[] = [
  'url' => $home_url,
  'title' => 'ホーム',
  'position' => $position++,
  'current' => false,
  'class' => 'c-txt-uppercase'
];

// Generate breadcrumb items based on page type
if (is_home()) {
  // Blog home
  $breadcrumb_items[] = [
    'url' => '',
    'title' => esc_html(get_the_title(get_option('page_for_posts')) ?: 'ブログ'),
    'position' => $position++,
    'current' => true
  ];
} elseif (is_post_type_archive()) {
  // Post type archive
  $post_type = get_query_var('post_type');
  $post_type_obj = get_safe_post_type_object($post_type);

  $breadcrumb_items[] = [
    'url' => '',
    'title' => esc_html($post_type_obj->label),
    'position' => $position++,
    'current' => true
  ];
} elseif (is_tax()) {
  // Custom taxonomy
  $taxonomy_slug = get_query_var('taxonomy');
  $taxonomy_obj = get_safe_taxonomy($taxonomy_slug);
  $term = get_queried_object();

  if (!empty($taxonomy_obj->object_type)) {
    $post_type_obj = get_safe_post_type_object($taxonomy_obj->object_type[0]);
    $archive_link = get_post_type_archive_link($taxonomy_obj->object_type[0]);

    if ($archive_link) {
      $breadcrumb_items[] = [
        'url' => esc_url($archive_link),
        'title' => esc_html($post_type_obj->label),
        'position' => $position++,
        'current' => false,
        'class' => 'p-breadcrumb__link p-breadcrumb__link--archive'
      ];
    }
  }

  $breadcrumb_items[] = [
    'url' => '',
    'title' => esc_html($term->name ?? 'カテゴリー'),
    'position' => $position++,
    'current' => true
  ];
} elseif (is_category()) {
  // Category
  $cat = get_queried_object();

  // Add parent categories
  if ($cat && $cat->parent != 0) {
    $ancestors = array_reverse(get_ancestors($cat->cat_ID, 'category'));
    foreach ($ancestors as $ancestor) {
      $ancestor_name = get_cat_name($ancestor);
      if ($ancestor_name) {
        $breadcrumb_items[] = [
          'url' => esc_url(get_category_link($ancestor)),
          'title' => esc_html($ancestor_name),
          'position' => $position++,
          'current' => false
        ];
      }
    }
  }

  $breadcrumb_items[] = [
    'url' => '',
    'title' => esc_html($cat->name ?? 'カテゴリー'),
    'position' => $position++,
    'current' => true
  ];
} elseif (is_tag()) {
  // Tag
  $tag = get_queried_object();
  $breadcrumb_items[] = [
    'url' => '',
    'title' => esc_html($tag->name ?? 'タグ'),
    'position' => $position++,
    'current' => true
  ];
} elseif (is_author()) {
  // Author
  $author_id = get_query_var('author');
  $author_name = get_the_author_meta('display_name', $author_id);

  $breadcrumb_items[] = [
    'url' => '',
    'title' => esc_html('投稿者: ' . ($author_name ?: '不明')),
    'position' => $position++,
    'current' => true
  ];
} elseif (is_date()) {
  // Date archive
  $year = get_query_var('year');
  $month = get_query_var('monthnum');
  $day = get_query_var('day');

  if (is_day()) {
    // Year
    $breadcrumb_items[] = [
      'url' => esc_url(get_year_link($year)),
      'title' => esc_html($year . '年'),
      'position' => $position++,
      'current' => false
    ];

    // Month
    $breadcrumb_items[] = [
      'url' => esc_url(get_month_link($year, $month)),
      'title' => esc_html($month . '月'),
      'position' => $position++,
      'current' => false
    ];

    // Day
    $breadcrumb_items[] = [
      'url' => '',
      'title' => esc_html($day . '日'),
      'position' => $position++,
      'current' => true
    ];
  } elseif (is_month()) {
    // Year
    $breadcrumb_items[] = [
      'url' => esc_url(get_year_link($year)),
      'title' => esc_html($year . '年'),
      'position' => $position++,
      'current' => false
    ];

    // Month
    $breadcrumb_items[] = [
      'url' => '',
      'title' => esc_html($month . '月'),
      'position' => $position++,
      'current' => true
    ];
  } elseif (is_year()) {
    // Year only
    $breadcrumb_items[] = [
      'url' => '',
      'title' => esc_html($year . '年'),
      'position' => $position++,
      'current' => true
    ];
  }
} elseif (is_search()) {
  // Search results
  $search_query = get_search_query();
  $title = $search_query ?
    sprintf('「%s」の検索結果', esc_html($search_query)) :
    '検索結果';

  $breadcrumb_items[] = [
    'url' => '',
    'title' => $title,
    'position' => $position++,
    'current' => true
  ];
} elseif (is_404()) {
  // 404 error
  $breadcrumb_items[] = [
    'url' => '',
    'title' => 'ページが見つかりません',
    'position' => $position++,
    'current' => true
  ];
} elseif (is_page()) {
  // Static page
  if ($post && $post->post_parent != 0) {
    $ancestors = array_reverse(get_post_ancestors($post->ID));
    foreach ($ancestors as $ancestor) {
      $ancestor_title = get_the_title($ancestor);
      if ($ancestor_title) {
        $breadcrumb_items[] = [
          'url' => esc_url(get_permalink($ancestor)),
          'title' => esc_html($ancestor_title),
          'position' => $position++,
          'current' => false
        ];
      }
    }
  }

  $breadcrumb_items[] = [
    'url' => '',
    'title' => esc_html(get_the_title() ?: 'ページ'),
    'position' => $position++,
    'current' => true
  ];
} elseif (is_attachment()) {
  // Attachment page
  if ($post && $post->post_parent != 0) {
    $parent_title = get_the_title($post->post_parent);
    if ($parent_title) {
      $breadcrumb_items[] = [
        'url' => esc_url(get_permalink($post->post_parent)),
        'title' => esc_html($parent_title),
        'position' => $position++,
        'current' => false
      ];
    }
  }

  $breadcrumb_items[] = [
    'url' => '',
    'title' => esc_html(get_the_title() ?: 'ファイル'),
    'position' => $position++,
    'current' => true
  ];
} elseif (is_single() && get_post_type() === 'post') {
  // Blog post
  $blog_page_id = get_option('page_for_posts');
  if ($blog_page_id) {
    $blog_title = get_the_title($blog_page_id);
    $blog_url = get_permalink($blog_page_id);
  } else {
    $blog_title = 'ブログ';
    $blog_url = get_post_type_archive_link('post');
  }

  if ($blog_url) {
    $breadcrumb_items[] = [
      'url' => esc_url($blog_url),
      'title' => esc_html($blog_title),
      'position' => $position++,
      'current' => false
    ];
  }

  // Add categories
  $categories = get_the_category();
  if (!empty($categories)) {
    $main_category = $categories[0];

    // Add parent categories
    if ($main_category->parent != 0) {
      $ancestors = array_reverse(get_ancestors($main_category->cat_ID, 'category'));
      foreach ($ancestors as $ancestor) {
        $ancestor_name = get_cat_name($ancestor);
        if ($ancestor_name) {
          $breadcrumb_items[] = [
            'url' => esc_url(get_category_link($ancestor)),
            'title' => esc_html($ancestor_name),
            'position' => $position++,
            'current' => false
          ];
        }
      }
    }

    $breadcrumb_items[] = [
      'url' => esc_url(get_category_link($main_category->term_id)),
      'title' => esc_html($main_category->name),
      'position' => $position++,
      'current' => false
    ];
  }

  $breadcrumb_items[] = [
    'url' => '',
    'title' => esc_html(get_the_title() ?: '記事'),
    'position' => $position++,
    'current' => true
  ];
} elseif (is_singular()) {
  // Custom post type single
  $post_type = get_post_type();
  $post_type_obj = get_safe_post_type_object($post_type);

  if ($post_type_obj->has_archive) {
    $archive_url = get_post_type_archive_link($post_type);
    if ($archive_url) {
      $breadcrumb_items[] = [
        'url' => esc_url($archive_url),
        'title' => esc_html($post_type_obj->label),
        'position' => $position++,
        'current' => false
      ];
    }
  }

  $breadcrumb_items[] = [
    'url' => '',
    'title' => esc_html(get_the_title() ?: $post_type_obj->label),
    'position' => $position++,
    'current' => true
  ];
}

// Output breadcrumb if we have items
if (!empty($breadcrumb_items)):
?>
  <nav class="p-breadcrumb c-container" aria-label="パンくず">
		<ol class="p-breadcrumb__list">
			<?php foreach ($breadcrumb_items as $item): ?>
				<?php
				$li_attr = $item['current'] ? ' aria-current="page"' : '';
				?>
				<li class="p-breadcrumb__item"<?php echo $li_attr; ?>>
					<?php if (!empty($item['url']) && !$item['current']): ?>
						<?php
						$link_class = isset($item['class']) ? $item['class'] : '';
						?>
						<a class="<?php echo esc_attr($link_class); ?>" href="<?php echo $item['url']; ?>"><?php echo $item['title']; ?></a>
					<?php else: ?>
						<?php echo $item['title']; ?>
					<?php endif; ?>
				</li>
			<?php endforeach; ?>
		</ol>
  </nav>
<?php endif; ?>
