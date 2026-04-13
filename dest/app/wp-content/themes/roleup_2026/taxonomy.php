<?php
get_header();

$term = get_queried_object();
if (! ($term instanceof WP_Term)) {
  get_footer();
  return;
}

$taxonomy_slug = $term->taxonomy;
$taxonomy_obj = get_taxonomy($taxonomy_slug);
$is_news_category = is_tax('news_category');
$show_term_nav = $is_news_category;

if ($is_news_category) {
  $heading_en = 'News';
  $heading_ja = $term->name;
} else {
  $heading_en = $term->name;
  $heading_ja = isset($taxonomy_obj->labels->singular_name)
    ? $taxonomy_obj->labels->singular_name
    : $taxonomy_obj->label;
}

$object_types = is_array($taxonomy_obj->object_type) ? $taxonomy_obj->object_type : array();
$primary_pt = ! empty($object_types) ? reset($object_types) : 'post';
$pt_object = get_post_type_object($primary_pt);
$no_posts_message = ($pt_object && ! empty($pt_object->labels->not_found))
  ? $pt_object->labels->not_found
  : '投稿がありません。';

$nav_aria = isset($taxonomy_obj->labels->name) ? $taxonomy_obj->labels->name : 'カテゴリー';
?>
  <section class="p-page-header">
    <div class="p-page-header__inner c-container">
      <div class="p-ttl-a -lg js-text-anime-up">
        <h1 class="p-ttl-a__en js-text-anime-up__main" data-char-split><?php echo esc_html($heading_en); ?></h1>
        <p class="p-ttl-a__ja js-text-anime-up__sub">
          <span class="js-text-anime-up__sub-txt">お知らせ - <?php echo esc_html($heading_ja); ?></span>
        </p>
      </div>
      <hr class="p-page-header__line js-fade-in">
    </div>
  </section>

  <div class="p-page-content">
    <div class="p-page-content__inner c-container">
      <?php if ($show_term_nav) : ?>
      <nav aria-label="<?php echo esc_attr($nav_aria); ?>">
        <ul class="p-category-list">
          <li>
            <a class="p-category" href="<?php echo esc_url(get_post_type_archive_link('news')); ?>">すべて</a>
          </li>
          <?php
          $terms_for_nav = get_terms(array(
            'taxonomy' => $taxonomy_slug,
            'hide_empty' => false,
            'orderby' => 'name',
            'order' => 'ASC',
          ));
          if (! is_wp_error($terms_for_nav) && ! empty($terms_for_nav)) :
            foreach ($terms_for_nav as $nav_term) :
              $term_link = get_term_link($nav_term);
              if (is_wp_error($term_link)) {
                continue;
              }
              $is_current = (int) $nav_term->term_id === (int) $term->term_id;
              ?>
          <li>
            <a class="p-category<?php echo $is_current ? ' is-current' : ''; ?>" href="<?php echo esc_url($term_link); ?>"><?php echo esc_html($nav_term->name); ?></a>
          </li>
              <?php
            endforeach;
          endif;
          ?>
        </ul>
      </nav>
      <?php endif; ?>
      <div class="p-archive">
        <?php if (have_posts()) : ?>
        <ul class="p-archive__list">
          <?php while (have_posts()) : the_post(); ?>
          <li class="p-archive__item">
            <a href="<?php the_permalink(); ?>" class="p-archive__link">
              <time class="p-archive__date" datetime="<?php echo get_the_date('Y-m-d'); ?>"><?php echo get_the_date('Y.m.d'); ?></time>
              <div>
                <?php
                $post_terms = get_the_terms(get_the_ID(), $taxonomy_slug);
                if ($post_terms && ! is_wp_error($post_terms)) :
                  ?>
                <div class="p-archive__categories">
                  <?php foreach ($post_terms as $post_term) : ?>
                  <span class="p-archive__category"><?php echo esc_html($post_term->name); ?></span>
                  <?php endforeach; ?>
                </div>
                  <?php
                endif;
                ?>
                <p class="p-archive__ttl"><?php the_title(); ?></p>
              </div>
            </a>
          </li>
          <?php endwhile; ?>
        </ul>
        <?php get_template_part('template-parts/pagination'); ?>
        <?php else : ?>
        <p class="p-archive__no-posts"><?php echo esc_html($no_posts_message); ?></p>
        <?php endif; ?>
      </div>
    </div>
  </div>
<?php get_footer();
