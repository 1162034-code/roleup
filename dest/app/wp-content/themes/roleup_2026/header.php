<!DOCTYPE html>
<html <?php language_attributes(); ?>>

<head>
  <meta charset="<?php bloginfo('charset'); ?>">
  <meta name="viewport" content="width=device-width">
  <meta name="format-detection" content="telephone=no">
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
        <div class="l-header__nav-wrap">
          <div class="l-header__nav">
            <div class="p-nav js-nav-wrap">
              <button class="p-nav__btn js-nav-btn" aria-expanded="false" aria-controls="menu" aria-label="メニューを開く">
                <span class="p-nav__lines" aria-hidden="true">
                  <span class="p-nav__line -line-01"></span>
                  <span class="p-nav__line -line-02"></span>
                  <span class="p-nav__line -line-03"></span>
                </span>
              </button>
              <nav id="menu" class="p-nav__menu js-nav" aria-label="メニュー">
                <ul class="p-nav__list">
                  <li class="p-nav__item">
                    <div class="p-nav__link-hover" tabindex="0">
                      <a href="<?php echo home_url(); ?>/about/" class="p-nav__link">About</a>
                      <button type="button" class="p-nav__toggle-btn js-dropdown-btn">
                        <span class="p-nav__toggle-icon"></span>
                        <span class="js-dropdown-screen-reader u-screen-reader">クリックまたはタップでAboutメニューを開く</span>
                      </button>
                      <div class="p-nav__dropdown">
                        <ul class="p-nav__dropdown-list">
                          <li>
                            <a href="<?php echo home_url(); ?>/about/#president" class="p-nav__dropdown-link">
                              <span>代表挨拶</span>
                            </a>
                          </li>
                          <li>
                            <a href="<?php echo home_url(); ?>/about/#philosophy" class="p-nav__dropdown-link">
                              <span>経営理念</span>
                            </a>
                          </li>
                          <li>
                            <a href="<?php echo home_url(); ?>/about/#company" class="p-nav__dropdown-link">
                              <span>会社概要</span>
                            </a>
                          </li>
                          <li>
                            <a href="<?php echo home_url(); ?>/about/#member" class="p-nav__dropdown-link">
                              <span>メンバー紹介</span>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </li>
                  <li class="p-nav__item">
                    <div class="p-nav__link-hover" tabindex="0">
                      <a href="<?php echo home_url(); ?>/service/" class="p-nav__link">Service</a>
                      <button type="button" class="p-nav__toggle-btn js-dropdown-btn">
                        <span class="p-nav__toggle-icon"></span>
                        <span class="js-dropdown-screen-reader u-screen-reader">クリックまたはタップでServiceメニューを開く</span>
                      </button>
                      <div class="p-nav__dropdown">
                        <ul class="p-nav__dropdown-list">
                          <li>
                            <a href="<?php echo home_url(); ?>/service/#ma" class="p-nav__dropdown-link">
                              <span>M&Aアドバイザリー</span>
                            </a>
                          </li>
                          <li>
                            <a href="<?php echo home_url(); ?>/service/#due" class="p-nav__dropdown-link">
                              <span>デューデリジェンス</span>
                            </a>
                          </li>
                          <li>
                            <a href="<?php echo home_url(); ?>/service/#valuation" class="p-nav__dropdown-link">
                              <span>企業価値評価</span>
                            </a>
                          </li>
                          <li>
                            <a href="<?php echo home_url(); ?>/service/#pmi" class="p-nav__dropdown-link">
                              <span>PMI支援</span>
                            </a>
                          </li>
                          <li>
                            <a href="<?php echo home_url(); ?>/service/#tax" class="p-nav__dropdown-link">
                              <span>税務サービス</span>
                            </a>
                          </li>
                          <li>
                            <a href="<?php echo home_url(); ?>/service/#audit" class="p-nav__dropdown-link">
                              <span>監査サービス</span>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </li>
                  <li class="p-nav__item">
                    <div class="p-nav__link-hover" tabindex="0">
                      <a href="<?php echo home_url(); ?>/group-companies/" class="p-nav__link">Group Companies</a>
                      <button type="button" class="p-nav__toggle-btn js-dropdown-btn">
                        <span class="p-nav__toggle-icon"></span>
                        <span class="js-dropdown-screen-reader u-screen-reader">クリックまたはタップでGroup Companiesメニューを開く</span>
                      </button>
                      <div class="p-nav__dropdown">
                        <ul class="p-nav__dropdown-list">
                          <li>
                            <a href="<?php echo home_url(); ?>/service/#ma" class="p-nav__dropdown-link">
                              <span><span class="u-txt-uppercase">Roleup</span>税理士法人</span>
                            </a>
                          </li>
                          <li>
                            <a href="<?php echo home_url(); ?>/service/#due" class="p-nav__dropdown-link">
                              <span><span class="u-txt-uppercase">Roleup</span>監査法人</span>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </li>
                  <li class="p-nav__item">
                    <a href="#performance" class="p-nav__link">Performance</a>
                  </li>
                  <li class="p-nav__item">
                    <a href="#news" class="p-nav__link">News</a>
                  </li>
                  <li class="p-nav__item">
                    <a href="#global" class="p-nav__link">Global Network</a>
                  </li>
                  <li class="p-nav__item">
                    <a href="#" class="p-nav__link">Recruit</a>
                  </li>
                </ul>
              </nav>
              <div id="js-nav-overlay" class="overlay" aria-hidden="true"></div>
            </div>
          </div>
          <div class="l-header__contact">
            <a href="#contact" class="l-header__contact-btn">Contact</a>
          </div>
        </div>
      </div>
    </header>

    <main class="l-main">
