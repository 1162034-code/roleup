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
      ['label' => 'メンバー紹介', 'url' => $nav_home . '/about/#member'],
    ],
  ],
  [
    'label'    => 'Service',
    'url'      => $nav_home . '/service/',
    'children' => [
      ['label' => 'Service', 'url' => $nav_home . '/service/'],
      ['label' => 'M&Aアドバイザリー', 'url' => $nav_home . '/service/#ma'],
      ['label' => 'デューデリジェンス', 'url' => $nav_home . '/service/#due'],
      ['label' => '企業価値評価', 'url' => $nav_home . '/service/#valuation'],
      ['label' => 'PMI支援', 'url' => $nav_home . '/service/#pmi'],
      ['label' => '税務サービス', 'url' => $nav_home . '/service/#tax'],
      ['label' => '監査サービス', 'url' => $nav_home . '/service/#audit'],
    ],
  ],
  [
    'label'    => 'Group Companies',
    'url'      => $nav_home . '/group/',
    'children' => [
      ['label' => 'Group Companies', 'url' => $nav_home . '/group/'],
      ['label' => 'Roleup税理士法人', 'url' => $nav_home . '/group/#tax', 'label_html' => '<span class="u-txt-uppercase">Roleup</span>税理士法人'],
      ['label' => 'Roleup監査法人', 'url' => $nav_home . '/group/#audit', 'label_html' => '<span class="u-txt-uppercase">Roleup</span>監査法人'],
    ],
  ],
  ['label' => 'Performance', 'url' => $nav_home . '/performance/'],
  ['label' => 'News', 'url' => $nav_archive],
  ['label' => 'Global Network', 'url' => $nav_home . '/global-network/'],
  ['label' => 'Recruit', 'url' => $nav_home . '/recruit/'],
];
$nav_mode = 'full'; // 'full' = ドロップダウン付き, 'simple' = リンクのみ
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?><?php echo is_front_page() ? ' class="has-opening is-loading"' : ''; ?>>

<head>
  <meta charset="<?php bloginfo('charset'); ?>">
  <meta name="viewport" content="width=device-width">
  <meta name="format-detection" content="telephone=no">
  <?php if (is_front_page()) : ?>
  <style>
    /* オープニング用クリティカルCSS: フォント・画像読み込み完了まで非表示 */
    html.has-opening.is-loading {
      opacity: 0;
    }
    html.has-opening {
      transition: opacity 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
    }
  </style>
  <?php endif; ?>
  <?php wp_head(); ?>
</head>

<body>
  <div class="l-wrapper">
    <header class="l-header">
      <div class="l-header__inner">
        <?php $tag = is_front_page() ? 'h1' : 'p'; ?>
        <<?php echo $tag; ?> class="l-header__logo">
          <a href="<?php echo home_url(); ?>">
            <img src="<?php echo get_template_directory_uri(); ?>/assets/img/common/logo.webp" width="180" height="41" alt="ROLEUP">
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
      <div class="p-fixed-bg"></div>

      <?php if(!is_front_page()): ?>
      <div class="l-main__inner">
        <?php get_template_part('template-parts/breadcrumb'); ?>
      <?php endif; ?>
