<?php
get_header();

$is_news_archive = is_post_type_archive('news');
$is_news_tax = is_tax('news_category');
$show_news_category_nav = $is_news_archive || $is_news_tax;
?>
  <section class="p-page-header">
    <div class="p-page-header__inner c-container">
      <div class="p-ttl-a -lg js-text-anime-up">
        <h1 class="p-ttl-a__en js-text-anime-up__main" data-char-split>News</h1>
        <p class="p-ttl-a__ja js-text-anime-up__sub">
          <span class="js-text-anime-up__sub-txt">お知らせ</span>
        </p>
      </div>
      <hr class="p-page-header__line js-fade-in">
    </div>
  </section>
  <div class="p-page-content">
    <div class="p-page-content__inner c-container">
      <?php if ($show_news_category_nav) : ?>
      <nav aria-label="お知らせカテゴリー">
        <ul class="p-category-list">
          <li>
            <a class="p-category<?php echo $is_news_archive && ! $is_news_tax ? ' is-current' : ''; ?>" href="<?php echo esc_url(get_post_type_archive_link('news')); ?>">すべて</a>
          </li>
          <?php
          $news_categories = get_terms(array(
            'taxonomy' => 'news_category',
            'hide_empty' => false,
            'orderby' => 'name',
            'order' => 'ASC',
          ));
          if (! is_wp_error($news_categories) && ! empty($news_categories)) :
            foreach ($news_categories as $news_cat) :
              $term_link = get_term_link($news_cat);
              if (is_wp_error($term_link)) {
                continue;
              }
              $is_current = $is_news_tax && get_queried_object_id() === (int) $news_cat->term_id;
              ?>
          <li>
            <a class="p-category<?php echo $is_current ? ' is-current' : ''; ?>" href="<?php echo esc_url($term_link); ?>"><?php echo esc_html($news_cat->name); ?></a>
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
                $news_terms = get_the_terms(get_the_ID(), 'news_category');
                if ($news_terms && ! is_wp_error($news_terms)) :
                  ?>
                <div class="p-archive__categories">
                  <?php foreach ($news_terms as $news_term) : ?>
                  <span class="p-archive__category"><?php echo esc_html($news_term->name); ?></span>
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
        <p class="p-archive__no-posts">お知らせがありません。</p>
        <?php endif; ?>
      </div>
    </div>
  </div>
<?php get_footer();
