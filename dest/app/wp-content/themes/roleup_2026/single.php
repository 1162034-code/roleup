<?php get_header();?>
<div class="p-page-content">
  <div class="p-page-content__inner c-container">
    <div class="p-article">
      <h1 class="p-article__ttl"><?php the_title(); ?></h1>
      <div class="p-article__meta">
        <time class="p-article__time" datetime="<?php the_time('Y-m-d'); ?>"><?php the_time('Y.m.d'); ?></time>
        <?php
        $post_categories = get_the_category();
        if (! empty($post_categories)) :
          ?>
        <ul class="p-category-list">
          <?php foreach ($post_categories as $post_category) : ?>
          <li>
            <a class="p-category is-current" href="<?php echo esc_url(get_category_link($post_category->term_id)); ?>"><?php echo esc_html($post_category->name); ?></a>
          </li>
          <?php endforeach; ?>
        </ul>
          <?php
        endif;
        ?>
      </div>
      <div class="p-article__content">
        <div class="p-editor">
          <?php the_content(); ?>
        </div>
      </div>
    </div>
    <?php
    $prev_post = get_previous_post();
    $next_post = get_next_post();
    ?>
    <nav class="p-nav-article" aria-label="記事ナビゲーション">
      <?php if ($prev_post) : ?>
      <a class="p-nav-article__prev" href="<?php echo esc_url(get_permalink($prev_post->ID)); ?>" rel="prev">prev</a>
      <?php endif; ?>

      <a class="p-nav-article__all" href="<?php echo esc_url(get_post_type_archive_link('news')); ?>">Back to List</a>

      <?php if ($next_post) : ?>
      <a class="p-nav-article__next" href="<?php echo esc_url(get_permalink($next_post->ID)); ?>" rel="next">next</a>
      <?php endif; ?>
    </nav>
  </div>

</div>
<?php get_footer();
