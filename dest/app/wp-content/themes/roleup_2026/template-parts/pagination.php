<?php

/**
 * Pagination Component
 *
 * Generates pagination navigation for archive pages
 * Uses WordPress paginate_links() function
 */

// Security check
if (!defined('ABSPATH')) {
  exit;
}

// Get pagination arguments
global $wp_query;

// Only show pagination if there are multiple pages
if ($wp_query->max_num_pages <= 1) {
  return;
}

// Get current page
$paged = get_query_var('paged') ? absint(get_query_var('paged')) : 1;

// Build pagination base URL (supports both permalink and query string formats)
$pagenum_link = html_entity_decode(get_pagenum_link());
$url_parts = explode('?', $pagenum_link);
$base_url = trailingslashit($url_parts[0]) . '%_%';

// Parse query arguments
$query_args = [];
if (isset($url_parts[1])) {
  wp_parse_str($url_parts[1], $query_args);
}

// Set format based on permalink structure
$format = $GLOBALS['wp_rewrite']->using_index_permalinks() && strpos($base_url, 'index.php') === false
  ? 'index.php/'
  : '';
$format .= $GLOBALS['wp_rewrite']->using_permalinks()
  ? user_trailingslashit('page/%#%', 'paged')
  : '?paged=%#%';

// Pagination arguments
$pagination_args = [
  'base' => $base_url,
  'format' => $format,
  'current' => max(1, $paged),
  'total' => $wp_query->max_num_pages,
  'prev_text' => '<span>前へ</span>',
  'next_text' => '<span>次へ</span>',
  'type' => 'array',
  'end_size' => 2,
  'mid_size' => 2,
  'show_all' => false,
  'add_args' => array_map('urlencode', $query_args),
];

// Get pagination links
$pagination_links = paginate_links($pagination_args);

if (!empty($pagination_links)):
?>
  <!-- pagination -->
  <nav class="p-pagination" aria-label="投稿ナビゲーション">
    <ul class="p-pagination__numbers">
      <?php foreach ($pagination_links as $link): ?>
        <?php
        // Determine link type and classes
        $is_prev = (strpos($link, 'prev') !== false || strpos($link, '前へ') !== false);
        $is_next = (strpos($link, 'next') !== false || strpos($link, '次へ') !== false);
        $is_current = (strpos($link, 'current') !== false || strpos($link, 'aria-current') !== false);
        $is_dots = (strpos($link, 'dots') !== false);

        // Set wrapper class for prev/next arrows
        $wrapper_class = '';
        if ($is_prev) {
          $wrapper_class = 'numbers-arrow__prev';
        } elseif ($is_next) {
          $wrapper_class = 'numbers-arrow__next';
        }

        // Build link classes
        $link_classes = ['numbers'];
        if ($is_prev) {
          $link_classes[] = 'prev';
        } elseif ($is_next) {
          $link_classes[] = 'next';
        }
        if ($is_current) {
          $link_classes[] = 'current';
        }

        // Replace or add class attribute
        $class_attr = 'class="' . esc_attr(implode(' ', $link_classes)) . '"';
        $clean_link = $link;

        // Handle both <a> and <span> tags
        if (preg_match('/class="[^"]*"/', $link)) {
          // Replace existing class attribute
          $clean_link = preg_replace('/class="[^"]*"/', $class_attr, $link);
        } elseif (strpos($link, '<a ') !== false) {
          // Add class to <a> tag
          $clean_link = str_replace('<a ', '<a ' . $class_attr . ' ', $link);
        } elseif (strpos($link, '<span ') !== false) {
          // Add class to <span> tag (for current page or dots)
          $clean_link = str_replace('<span ', '<span ' . $class_attr . ' ', $link);
        }
        ?>
        <li<?php if ($wrapper_class): ?> class="<?php echo esc_attr($wrapper_class); ?>"<?php endif; ?>>
          <?php echo $clean_link; ?>
        </li>
      <?php endforeach; ?>
    </ul>
  </nav>
  <!-- // pagination -->
<?php endif; ?>
