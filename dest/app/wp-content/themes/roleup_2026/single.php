<?php get_header();?>
  <div class="p-page-header">
    <div class="p-page-header__inner c-container">
      <h1 class="p-page-header__ttl">お知らせ</h1>
      <p class="p-page-header__en">News</p>
    </div>
  </div>
  <div class="p-page-content">
    <div class="p-page-content__inner c-container-xs">
      <div class="p-article">
        <?php if (has_post_thumbnail()) : ?>
          <div class="p-article__thumb -cover">
            <img src="<?php echo get_the_post_thumbnail_url(); ?>" width="785" height="442" alt="<?php the_title(); ?>">
          </div>
        <?php endif; ?>
        <div class="p-article__content">
          <div class="p-editor">
            <?php the_content(); ?>
          </div>
        </div>
      </div>
    </div>
  </div>
<?php get_foote
