    </main>

    <footer class="l-footer">
      <div class="l-footer__inner c-container">
        <div class="l-footer__head">
          <div class="l-footer__logo">
            <a href="/">
              <img src="<?php echo get_template_directory_uri(); ?>/assets/img/common/logo_02.webp" width="200" height="45" alt="Roleup">
            </a>
          </div>
          <address class="l-footer__address">
          株式会社<span class="u-txt-uppercase">Roleup</span><br>
          〒100-6328<br>
          東京都千代田区丸の内2丁目4−1<br>
          丸の内ビルディング28階
          </address>
        </div>
        <nav class="l-footer__nav" aria-label="フッターメニュー">
          <div class="l-footer__nav-col">
            <p class="l-footer__nav-heading">About</p>
            <ul class="l-footer__nav-list">
              <li class="l-footer__nav-item">
                <a href="<?php echo home_url(); ?>/about/#president">代表挨拶</a>
              </li>
              <li class="l-footer__nav-item">
                <a href="<?php echo home_url(); ?>/about/#philosophy">経営理念</a>
              </li>
              <li class="l-footer__nav-item">
                <a href="<?php echo home_url(); ?>/about/#company">会社概要</a>
              </li>
              <li class="l-footer__nav-item">
                <a href="<?php echo home_url(); ?>/about/#member">メンバー紹介</a>
              </li>
            </ul>
          </div>
          <div class="l-footer__nav-col">
            <p class="l-footer__nav-heading">Service</p>
            <ul class="l-footer__nav-list">
              <li class="l-footer__nav-item">
                <a href="<?php echo home_url(); ?>/service/#ma">M&Aアドバイザリー</a>
              </li>
              <li class="l-footer__nav-item">
                <a href="<?php echo home_url(); ?>/service/#duedeligence">デューデリジェンス</a>
              </li>
              <li class="l-footer__nav-item">
                <a href="<?php echo home_url(); ?>/service/#valuation">企業価値評価</a>
              </li>
              <li class="l-footer__nav-item">
                <a href="<?php echo home_url(); ?>/service/#pmi">PMI支援</a>
              </li>
              <li class="l-footer__nav-item">
                <a href="<?php echo home_url(); ?>/service/#tax">税務サービス</a>
              </li>
              <li class="l-footer__nav-item">
                <a href="<?php echo home_url(); ?>/service/#audit">監査サービス</a>
              </li>
            </ul>
          </div>
          <div class="l-footer__nav-col">
            <p class="l-footer__nav-heading">Group Companies</p>
            <ul class="l-footer__nav-list">
              <li class="l-footer__nav-item">
                <a href="<?php echo home_url(); ?>/group/#tax"><span class="u-txt-uppercase">Roleup</span>税理士法人</a>
              </li>
              <li class="l-footer__nav-item">
                <a href="<?php echo home_url(); ?>/group/#audit"><span class="u-txt-uppercase">Roleup</span>監査法人</a>
              </li>
            </ul>
          </div>
          <div class="l-footer__nav-col">
            <ul class="l-footer__nav-list -space-lg">
              <li class="l-footer__nav-item"><a href="<?php echo home_url(); ?>/performance/">Performance</a>
            </li>
              <li class="l-footer__nav-item">
                <a href="<?php echo home_url(); ?>/news/">News</a>
              </li>
              <li class="l-footer__nav-item">
                <a href="<?php echo home_url(); ?>/global-network/">Global Network</a>
              </li>
              <li class="l-footer__nav-item">
                <a href="<?php echo home_url(); ?>/recruit/">Recruit</a>
              </li>
            </ul>
          </div>
        </nav>
        <p class="l-footer__copyright">
          <small>Copyright &copy; <span class="u-txt-uppercase">Roleup</span> ALL Rights Reserved.</small>
        </p>
      </div>
    </footer>
  </div>

  <?php wp_footer(); ?>
</body>
</html>
