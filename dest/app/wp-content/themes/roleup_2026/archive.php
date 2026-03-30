<?php get_header();?>
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
    <div class="p-page-content__inner c-container-xs">
      <div class="p-news">
        <?php if (have_posts()) : ?>
        <ul class="p-news__list js-fade-in">
          <?php while (have_posts()) : the_post(); ?>
          <li class="p-news__item">
            <a href="<?php the_permalink(); ?>" class="p-news__link">
              <time class="p-news__date" datetime="<?php echo get_the_date('Y-m-d'); ?>"><?php echo get_the_date('Y.m.d'); ?></time>
              <p class="p-news__ttl"><span><?php the_title(); ?></span></p>
            </a>
          </li>
          <?php endwhile; ?>
        </ul>
        <?php else : ?>
        <p class="u-ta-center">新着情報がありません。</p>
        <?php endif; ?>
      </div>
    </div>
  </div>
<?php get_footer();
