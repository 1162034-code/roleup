<?php get_header(); ?>

  <!-- Opening -->
  <div class="p-opening js-opening" aria-hidden="false">
    <div class="p-opening__bg"></div>
    <div class="p-opening__overlay"></div>
    <div class="p-opening__inner">
      <div class="p-opening__logo">
        <img src="<?php echo get_template_directory_uri(); ?>/assets/img/common/logo.webp" width="180" height="41" alt="">
      </div>
      <p class="p-opening__ttl"><span class="p-opening__ttl-inner"><span class="u-br">Rooted&nbsp;in&nbsp;People,</span>Innovating&nbsp;Value.</span></p>
      <p class="p-opening__sttl">価値ある変革を、人と共に。</p>
    </div>
  </div>

  <!-- MV（メインビジュアル） -->
  <section class="home-mv">
    <div class="home-mv__content">
      <div class="js-text-anime-up">
        <h1 class="home-mv__ttl js-text-anime-up__main" data-char-split><span class="u-br">Rooted&nbsp;in&nbsp;People,</span>Innovating&nbsp;Value.</h1>
        <span class="home-mv__sttl js-text-anime-up__sub">
          <span class="js-text-anime-up__sub-txt">価値ある変革を、人と共に。</span>
        </span>
      </div>
    </div>
    <div class="home-mv__scroll-wrap">
      <p class="home-mv__scroll">Scroll Down</p>
    </div>
    <?php
    $latest_news = new WP_Query(array(
      'post_type'      => 'news',
      'posts_per_page' => 1,
      'orderby'        => 'date',
      'order'          => 'DESC',
      'post_status'    => 'publish',
    ));
    if ($latest_news->have_posts()) :
      $latest_news->the_post();
    ?>
    <div class="home-mv__news">
      <h2 class="home-mv__news-label">News</h2>
      <a href="<?php the_permalink(); ?>" class="home-mv__news-content">
        <time class="home-mv__news-date" datetime="<?php echo esc_attr(get_the_date('Y-m-d')); ?>"><?php echo esc_html(get_the_date('Y.m.d')); ?></time>
        <p class="home-mv__news-ttl"><span><?php the_title(); ?></span></p>
      </a>
    </div>
    <?php
      wp_reset_postdata();
    endif;
    ?>
    <p class="home-mv__copyright">Copyright &copy; <span class="u-txt-uppercase">Roleup All</span> Rights Reserved.</p>
  </section>

  <!-- About -->
  <section id="about" class="home-about">
    <div class="home-about__bg-txt">
      <div class="p-content-loop-txt">
        <div class="p-content-loop-txt__items">
          <span><span class="u-txt-uppercase">Role up</span></span>
          <span><span class="u-txt-uppercase">Role up</span></span>
          <span><span class="u-txt-uppercase">Role up</span></span>
          <span><span class="u-txt-uppercase">Role up</span></span>
          <span><span class="u-txt-uppercase">Role up</span></span>
          <span><span class="u-txt-uppercase">Role up</span></span>
          <span><span class="u-txt-uppercase">Role up</span></span>
          <span><span class="u-txt-uppercase">Role up</span></span>
          <span><span class="u-txt-uppercase">Role up</span></span>
        </div>
      </div>
    </div>
    <div class="home-about__inner c-container">
      <div class="home-about__heading">
        <h2 class="p-ttl-a js-text-anime-up">
          <span class="p-ttl-a__en js-text-anime-up__main" data-char-split>About</span>
          <span class="p-ttl-a__ja js-text-anime-up__sub">
            <span class="js-text-anime-up__sub-txt">私たちについて</span>
          </span>
        </h2>
      </div>
      <div class="home-about__body">
        <p class="home-about__txt">
          <span class="u-br-tab"><span class="u-txt-uppercase">Roleup</span>は、経営の意思決定に深く向き合い、</span><span class="u-br-tab">企業価値向上と次世代を築く企業成長に</span>伴走するアドバイザリーファームです。
        </p>
        <div class="home-about__btn-wrap">
          <a href="<?php echo home_url(); ?>/about/" class="c-btn-view-more">Vew More</a>
        </div>
      </div>
    </div>
  </section>

  <!-- Service -->
  <section id="service" class="home-service">
    <div class="home-service__inner c-container">
      <div class="home-service__header">
        <h2 class="p-ttl-a -dark js-text-anime-up">
          <span class="p-ttl-a__en js-text-anime-up__main" data-char-split>Service</span>
          <span class="p-ttl-a__ja js-text-anime-up__sub">
            <span class="js-text-anime-up__sub-txt">事業内容</span>
          </span>
        </h2>
        <p class="home-service__desc">
        挑戦する企業の成長を、資本と経営の両面から支援。<br>
        M&Aの実行だけでなく、構想段階から統合後の経営支援まで、意思決定の隣で伴走します。
        </p>
      </div>
      <ul class="home-service__grid">
        <!-- Card 1 -->
        <li class="home-service__card js-fade-in">
          <a href="<?php echo home_url(); ?>/service/#ma" class="home-service__card-link">
            <p class="home-service__card-category">M&A Advisory</p>
            <h3 class="home-service__card-ttl"><span class="u-br-sp">M&A</span>アドバイザリー</h3>
            <p class="home-service__card-desc">M&A戦略の策定およびディール実行支援。</p>
          </a>
        </li>
        <!-- Card 2 -->
        <li class="home-service__card js-fade-in">
          <a href="<?php echo home_url(); ?>/service/#duedeligence" class="home-service__card-link">
            <p class="home-service__card-category">Due Diligence</p>
            <h3 class="home-service__card-ttl">デューデリジェンス</h3>
            <p class="home-service__card-desc">重要論点の抽出と取引条件への反映。</p>
          </a>
        </li>
        <!-- Card 3 -->
        <li class="home-service__card js-fade-in">
          <a href="<?php echo home_url(); ?>/service/#valuation" class="home-service__card-link">
            <p class="home-service__card-category">Valuation</p>
            <h3 class="home-service__card-ttl">企業価値評価</h3>
            <p class="home-service__card-desc">企業価値評価の実施および評価レンジの提示。</p>
          </a>
        </li>
        <!-- Card 4 -->
        <li class="home-service__card js-fade-in">
          <a href="<?php echo home_url(); ?>/service/#pmi" class="home-service__card-link">
            <p class="home-service__card-category">PMI Support</p>
            <h3 class="home-service__card-ttl">PMI支援</h3>
            <p class="home-service__card-desc">PMI方針・統合計画の策定および統合実行支援。</p>
          </a>
        </li>
        <!-- Card 5 -->
        <li class="home-service__card js-fade-in">
          <a href="<?php echo home_url(); ?>/service/#tax" class="home-service__card-link">
            <p class="home-service__card-category">Tax Service</p>
            <h3 class="home-service__card-ttl">税務サービス</h3>
            <p class="home-service__card-desc">税務顧問・申告、税務ストラクチャリングサポートの実行。</p>
          </a>
        </li>
        <!-- Card 6 -->
        <li class="home-service__card js-fade-in">
          <a href="<?php echo home_url(); ?>/service/#audit" class="home-service__card-link">
            <p class="home-service__card-category">Audit Service</p>
            <h3 class="home-service__card-ttl">監査・AUP</h3>
            <p class="home-service__card-desc">法定監査およびAUP業務の実施。</p>
          </a>
        </li>
      </ul>
    </div>
  </section>

  <!-- Group Companies -->
  <section id="group" class="home-group">
    <div class="home-group__inner c-container">
      <div class="home-group__left">
        <h2 class="p-ttl-a js-text-anime-up">
          <span class="p-ttl-a__en js-text-anime-up__main" data-char-split>Group</span>
          <span class="p-ttl-a__ja js-text-anime-up__sub">
            <span class="js-text-anime-up__sub-txt">グループ会社</span>
          </span>
        </h2>
        <div class="home-group__txt">
          <p class="u-mt-1lh">専門性を横断し、本質に深く向き合う。</p>
          <p><span class="u-br-pc">グループの知見を結集し、価値創出と意思決定を</span>一体で支えます。</p>
        </div>
        <div class="home-group__btn-wrap">
          <a href="<?php echo home_url(); ?>/group/" class="c-btn-view-more">Vew More</a>
        </div>
      </div>
      <ul class="home-group__cards">
        <li class="home-group__card js-fade-in">
          <a href="<?php echo home_url(); ?>/group/tax/" class="home-group__card-content -card1">
            <h3 class="home-group__card-ttl"><span class="u-txt-uppercase">Roleup</span>税理士法人</h3>
            <p class="home-group__card-desc">事業承継・M&A・国際税務に強い税務パートナー。<br>法人・相続税務から、税務DD・海外取引のリスク分析・ストラクチャリング・PMI税務まで一気通貫で支援します。</p>
          </a>
        </li>
        <li class="home-group__card js-fade-in">
          <a href="<?php echo home_url(); ?>/group/audit/" class="home-group__card-content -card2">
            <h3 class="home-group__card-ttl"><span class="u-txt-uppercase">Roleup</span>監査法人</h3>
            <p class="home-group__card-desc">M&A業界において求められる会計監査を専門に担う監査法人。<br>銀行・PEファンド・プリンシパル投資家のニーズを踏まえ、監査対応を実施します。</p>
          </a>
        </li>
      </ul>
    </div>
  </section>

  <!-- Performance -->
  <section id="performance" class="home-performance">
    <div class="home-performance__overlay js-parallax-bg"></div>
    <div class="home-performance__inner c-container">
      <div class="home-performance__head">
        <h2 class="p-ttl-a -dark js-text-anime-up">
          <span class="p-ttl-a__en js-text-anime-up__main" data-char-split>Performance</span>
          <span class="p-ttl-a__ja js-text-anime-up__sub">
            <span class="js-text-anime-up__sub-txt">M&Aリーグテーブル実績</span>
          </span>
        </h2>
        <p class="home-performance__txt"><span class="u-br-pc">多様なニーズに対して一気通貫の支援を通じた、</span>信頼できる確かな実績。</p>
      </div>
      <div class="home-performance__body js-fade-in">
        <ul class="home-performance__stats">
          <li class="home-performance__stat">
            <h3 class="home-performance__stat-label">公表案件</h3>
            <p class="home-performance__stat-value">
              <span class="home-performance__stat-num">12</span>
              <span class="home-performance__stat-unit">位</span>
            </p>
            <p class="home-performance__stat-sublabel">Announced Deals</p>
          </li>
          <li class="home-performance__stat">
            <h3 class="home-performance__stat-label">完了案件</h3>
            <p class="home-performance__stat-value">
              <span class="home-performance__stat-num">13</span>
              <span class="home-performance__stat-unit">位</span>
            </p>
            <p class="home-performance__stat-sublabel">Completed Deals</p>
          </li>
        </ul>
        <p class="home-performance__note">※ ランキングはLSEG（London Stock Exchange Group）が公表する日本M&Aレビューに基づく</p>
      </div>
      <div class="home-performance__btn-wrap">
        <a href="<?php echo home_url(); ?>/contact/" class="c-btn-gradient-gold c-btn-size-default c-btn-arrow-right">
          <span class="c-btn__txt">お問い合わせはこちら</span>
        </a>
      </div>
    </div>
  </section>

  <!-- Global Network -->
  <section id="global" class="home-global">
    <div class="home-global__overlay js-parallax-bg"></div>
    <div class="home-global__inner c-container">
      <h2 class="p-ttl-a -dark js-text-anime-up">
        <span class="p-ttl-a__en js-text-anime-up__main" data-char-split><span class="u-br-sp">Global&nbsp;</span>Network</span>
        <span class="p-ttl-a__ja js-text-anime-up__sub">
          <span class="js-text-anime-up__sub-txt">グローバルネットワーク</span>
        </span>
      </h2>
      <div class="home-global__txt">
        <p>世界各国のネットワークと連携し、ローカルに深く入り込む。</p>
        <p>グローバル水準の知見で、企業の意思決定と価値創出を支えます。</p>

      </div>
      <div class="home-global__img">
        <img src="<?php echo get_template_directory_uri(); ?>/assets/img/common/logo_prime_global.webp" width="270" height="55" alt="Prime Global">
      </div>
    </div>
  </section>

  <!-- News -->
  <section id="news" class="home-news">
    <div class="home-news__inner c-container">
      <div class="home-news__header">
        <h2 class="p-ttl-a js-text-anime-up">
          <span class="p-ttl-a__en js-text-anime-up__main" data-char-split>News</span>
          <span class="p-ttl-a__ja js-text-anime-up__sub">
            <span class="js-text-anime-up__sub-txt">お知らせ</span>
          </span>
        </h2>
        <div class="home-news__btn-wrap">
          <a href="<?php echo esc_url(get_post_type_archive_link("news")); ?>" class="c-btn-view-more">Vew More</a>
        </div>
      </div>
      <?php
      $news_query = new WP_Query([
        'post_type'      => 'news',
        'posts_per_page' => 3,
        'orderby'        => 'date',
        'order'          => 'DESC',
        'post_status'    => 'publish',
      ]);
      ?>
      <ul class="home-news__list">
        <?php if ($news_query->have_posts()) : ?>
          <?php while ($news_query->have_posts()) : $news_query->the_post(); ?>
            <li class="home-news__item">
              <a href="<?php the_permalink(); ?>" class="home-news__link">
                <time class="home-news__date" datetime="<?php echo esc_attr(get_the_date('Y-m-d')); ?>"><?php echo esc_html(get_the_date('Y.m.d')); ?></time>
                <span class="home-news__ttl"><?php echo esc_html(get_the_title()); ?></span>
              </a>
            </li>
          <?php endwhile; ?>
          <?php wp_reset_postdata(); ?>
        <?php else : ?>
          <li class="home-news__item">お知らせはありません。</li>
        <?php endif; ?>
      </ul>
    </div>
  </section>
<?php get_footer();
