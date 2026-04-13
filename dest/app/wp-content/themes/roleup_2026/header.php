<?php
/**
 * ナビゲーションメニュー（header.php で一元管理）
 *
 * $nav_items: フル版・シンプル版の両方で使用
 * $nav_mode: 'full' = ドロップダウン付き, 'simple' = リンクのみ
 */
$nav_home = home_url();
$nav_archive = get_post_type_archive_link("news");
$nav_items = [
  [
    'label'    => 'About',
    'url'      => $nav_home . '/about/',
    'children' => [
      ['label' => 'About', 'url' => $nav_home . '/about/'],
      ['label' => '代表挨拶', 'url' => $nav_home . '/about/#president'],
      ['label' => '経営理念', 'url' => $nav_home . '/about/#philosophy'],
      ['label' => '会社概要', 'url' => $nav_home . '/about/#company'],
      // ['label' => 'メンバー紹介', 'url' => $nav_home . '/about/#member'],
    ],
  ],
  [
    'label'    => 'Service',
    'url'      => $nav_home . '/service/',
    'children' => [
      ['label' => 'Service', 'url' => $nav_home . '/service/'],
      ['label' => 'M&Aアドバイザリー', 'url' => $nav_home . '/service/#ma'],
      ['label' => 'デューデリジェンス', 'url' => $nav_home . '/service/#duedeligence'],
      ['label' => '企業価値評価', 'url' => $nav_home . '/service/#valuation'],
      ['label' => 'PMI支援', 'url' => $nav_home . '/service/#pmi'],
      ['label' => '税務サービス', 'url' => $nav_home . '/service/#tax'],
      ['label' => '監査・AUP', 'url' => $nav_home . '/service/#audit'],
    ],
  ],
  [
    'label'    => 'Group Companies',
    'url'      => $nav_home . '/group/',
    'children' => [
      ['label' => 'Group Companies', 'url' => $nav_home . '/group/'],
      ['label' => 'Roleup税理士法人', 'url' => $nav_home . '/group/tax/', 'label_html' => '<span class="u-txt-uppercase">Roleup</span>税理士法人'],
      ['label' => 'Roleup監査法人', 'url' => $nav_home . '/group/audit/', 'label_html' => '<span class="u-txt-uppercase">Roleup</span>監査法人'],
    ],
  ],
  ['label' => 'Performance', 'url' => $nav_home . '/performance/'],
  ['label' => 'News', 'url' => $nav_archive],
  // ['label' => 'Global Network', 'url' => $nav_home . '/global-network/'],
  // ['label' => 'Recruit', 'url' => $nav_home . '/recruit/'],
];
$nav_mode = 'full'; // 'full' = ドロップダウン付き, 'simple' = リンクのみ
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>

<head>
	<!-- Google Tag Manager -->
	<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
	new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
	j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
	'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
	})(window,document,'script','dataLayer','GTM-KFF9BFWJ');</script>
	<!-- End Google Tag Manager -->
  <meta charset="<?php bloginfo('charset'); ?>">
  <meta name="viewport" content="width=device-width">
  <meta name="format-detection" content="telephone=no">
	<meta name="google-site-verification" content="kJqdXc2Gy3lw6OnpX8UNE3WkuonNREVse9mwOzri5HE" />
  <?php wp_head(); ?>
</head>

<body class="<?php
  global $post;
  if (is_front_page()) {
    echo 'home';
  } elseif (is_category()) {
    echo get_query_var('category_name');
  } elseif (is_tag()) {
    echo get_query_var('tag');
  } elseif (is_page()) {
    echo $post->post_name;
  } else {
    $post_types = ['news'];
    $matched = false;
    foreach ($post_types as $post_type) {
      $is_tax_for_post_type = false;
      if (is_tax()) {
        $queried_term = get_queried_object();
        if ($queried_term instanceof WP_Term) {
          $is_tax_for_post_type = is_object_in_taxonomy($post_type, $queried_term->taxonomy);
        }
      }
      if (is_singular($post_type) || is_post_type_archive($post_type) || $is_tax_for_post_type) {
        echo $post_type;
        $matched = true;
        break;
      }
    }
    if (!$matched) {
      if (is_singular()) {
        echo get_post_type();
      } elseif (is_post_type_archive()) {
        echo get_post_type();
      } else {
        echo '';
      }
    }
  }
?>">
	<!-- Google Tag Manager (noscript) -->
	<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KFF9BFWJ"
	height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
	<!-- End Google Tag Manager (noscript) -->
  <div class="l-wrapper">
    <header class="l-header">
      <div class="l-header__inner">
        <?php $tag = is_front_page() ? 'h1' : 'p'; ?>
        <<?php echo $tag; ?> class="l-header__logo">
          <a href="<?php echo home_url(); ?>">
            <img src="<?php echo get_template_directory_uri(); ?>/assets/img/common/logo.webp" width="180" height="41" alt="Roleup">
          </a>
        </<?php echo $tag; ?>>
        <?php
        $nav_mode = 'simple';
        ?>
        <div class="l-header__nav-simple">
          <ul class="p-nav__list">
            <?php foreach ($nav_items as $item) : ?>
              <li class="p-nav__item">
                <span class="p-nav__link"><?php echo esc_html($item['label']); ?></span>
              </li>
            <?php endforeach; ?>
          </ul>
        </div>

        <?php
        $nav_mode = 'full';
        ?>
        <div class="l-header__nav">
          <div class="p-nav js-nav-wrap">
            <button class="p-nav__btn js-nav-btn" aria-expanded="false" aria-controls="menu" aria-label="メニューを開く">
              <span class="p-nav__lines" aria-hidden="true">
                <span class="p-nav__line -line-01"></span>
                <span class="p-nav__line -line-02"></span>
              </span>
            </button>
            <nav id="menu" class="p-nav__menu js-nav" aria-label="メニュー">
              <p class="p-nav__logo">
                <img src="<?php echo get_template_directory_uri(); ?>/assets/img/common/logo_02.webp" width="180" height="41" alt="Roleup">
              </p>
              <ul class="p-nav__list">
                <?php foreach ($nav_items as $item) : ?>
                  <?php $show_dropdown = !empty($item['children']) && $nav_mode === 'full'; ?>
                  <li class="p-nav__item">
                    <?php if ($show_dropdown) : ?>
                      <div class="p-nav__link-hover" tabindex="0">
                        <a href="<?php echo esc_url($item['url']); ?>" class="p-nav__link"><?php echo esc_html($item['label']); ?></a>
                        <button type="button" class="p-nav__toggle-btn js-dropdown-btn">
                          <?php echo esc_html($item['label']); ?>
                        </button>
                        <div class="p-nav__dropdown">
                          <ul class="p-nav__dropdown-list">
                            <?php foreach ($item['children'] as $child) : ?>
                              <li>
                                <a href="<?php echo esc_url($child['url']); ?>" class="p-nav__dropdown-link">
                                  <span><?php echo isset($child['label_html']) ? $child['label_html'] : esc_html($child['label']); ?></span>
                                </a>
                              </li>
                            <?php endforeach; ?>
                          </ul>
                        </div>
                      </div>
                    <?php else : ?>
                      <a href="<?php echo esc_url($item['url']); ?>" class="p-nav__link"><?php echo esc_html($item['label']); ?></a>
                    <?php endif; ?>
                  </li>
                <?php endforeach; ?>
              </ul>
              <div class="p-nav__contact">
                <a href="<?php echo home_url(); ?>/contact/" class="p-nav__contact-btn">Contact</a>
              </div>
            </nav>
            <div id="js-nav-overlay" class="p-nav__overlay" aria-hidden="true"></div>
          </div>
        </div>
      </div>
    </header>

    <main class="l-main">
      <div class="p-fixed-bg">
        <video src="<?php echo get_template_directory_uri(); ?>/assets/video/fixed_bg.mp4" autoplay loop muted playsinline></video>
      </div>

      <?php if(!is_front_page()): ?>
      <div class="l-main__inner">
        <?php get_template_part('template-parts/breadcrumb'); ?>
      <?php endif; ?>
