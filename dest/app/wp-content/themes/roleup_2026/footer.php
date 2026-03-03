      <!-- Get in Touch -->
      <section class="p-contact">
        <a href="<?php echo esc_url(home_url()); ?>/contact/" class="p-contact__link">
          <div class="p-contact__inner c-container">
            <h2 class="p-contact__ttl">
              <span class="p-contact__ttl-txt">Get in <span>Touch</span></span>
              <span class="p-contact__ttl-txt-gradient" aria-hidden="true">Get in <span>Touch</span></span>
            </h2>
            <p class="p-contact__contact">
              <span class="p-contact__contact-txt">Contact</span>
            </p>
          </div>
        </a>
      </section>
    </main>

    <footer class="l-footer">
      <div class="l-footer__inner c-container">
        <button type="button" id="page-top" class="l-footer__page-top">
          <span class="u-screen-reader">ページトップへ移動</span>
        </button>
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
                <a href="<?php echo home_url(); ?>/about/#president">
                  <span>代表挨拶</span>
                </a>
              </li>
              <li class="l-footer__nav-item">
                <a href="<?php echo home_url(); ?>/about/#philosophy">
                  <span>経営理念</span>
                </a>
              </li>
              <li class="l-footer__nav-item">
                <a href="<?php echo home_url(); ?>/about/#company">
                  <span>会社概要</span>
                </a>
              </li>
              <li class="l-footer__nav-item">
                <a href="<?php echo home_url(); ?>/about/#member">
                  <span>メンバー紹介</span>
                </a>
              </li>
            </ul>
          </div>
          <div class="l-footer__nav-col">
            <p class="l-footer__nav-heading">Service</p>
            <ul class="l-footer__nav-list">
              <li class="l-footer__nav-item">
                <a href="<?php echo home_url(); ?>/service/#ma">
                  <span>M&Aアドバイザリー</span>
                </a>
              </li>
              <li class="l-footer__nav-item">
                <a href="<?php echo home_url(); ?>/service/#duedeligence">
                  <span>デューデリジェンス</span>
                </a>
              </li>
              <li class="l-footer__nav-item">
                <a href="<?php echo home_url(); ?>/service/#valuation">
                  <span>企業価値評価</span>
                </a>
              </li>
              <li class="l-footer__nav-item">
                <a href="<?php echo home_url(); ?>/service/#pmi">
                  <span>PMI支援</span>
                </a>
              </li>
              <li class="l-footer__nav-item">
                <a href="<?php echo home_url(); ?>/service/#tax">
                  <span>税務サービス</span>
                </a>
              </li>
              <li class="l-footer__nav-item">
                <a href="<?php echo home_url(); ?>/service/#audit">
                  <span>監査サービス</span>
                </a>
              </li>
            </ul>
          </div>
          <div class="l-footer__nav-col">
            <p class="l-footer__nav-heading">Group Companies</p>
            <ul class="l-footer__nav-list">
              <li class="l-footer__nav-item">
                <a href="<?php echo home_url(); ?>/group/#tax">
                  <span><span class="u-txt-uppercase">Roleup</span>税理士法人</span>
                </a>
              </li>
              <li class="l-footer__nav-item">
                <a href="<?php echo home_url(); ?>/group/#audit">
                  <span><span class="u-txt-uppercase">Roleup</span>監査法人</span>
                </a>
              </li>
            </ul>
          </div>
          <div class="l-footer__nav-col -last">
            <ul class="l-footer__nav-list -space-lg">
              <li class="l-footer__nav-item"><a href="<?php echo home_url(); ?>/performance/">
                <span>Performance</span>
              </a>
            </li>
              <li class="l-footer__nav-item">
                <a href="<?php echo home_url(); ?>/news/">
                  <span>News</span>
                </a>
              </li>
              <li class="l-footer__nav-item">
                <a href="<?php echo home_url(); ?>/global-network/">
                  <span>Global Network</span>
                </a>
              </li>
              <li class="l-footer__nav-item">
                <a href="<?php echo home_url(); ?>/recruit/">
                  <span>Recruit</span>
                </a>
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
