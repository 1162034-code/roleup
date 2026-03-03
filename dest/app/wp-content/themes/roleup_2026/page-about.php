<?php get_header(); ?>

  <!-- Page MV -->
  <section class="p-page-header">
    <div class="p-page-header__inner c-container">
      <div class="p-ttl-a -lg js-text-anime-up">
        <h1 class="p-ttl-a__en js-text-anime-up__main" data-char-split>About</h1>
        <p class="p-ttl-a__ja js-text-anime-up__sub">
          <span class="js-text-anime-up__sub-txt">私たちについて</span>
        </p>
      </div>
      <hr class="p-page-header__line js-fade-in">
      <p class="p-page-header__caption js-fade-in">
        <span class="u-br-sp">価値の伴走者として、</span>企業の成長と承継を支える。<br>
        ROLEUPの理念とチームをご紹介します。
      </p>

      <div class="p-page-header__nav">
        <div class="p-nav-page js-fade-in">
          <ul class="p-nav-page__list">
            <li>
              <a class="p-nav-page__link" href="#president">代表挨拶</a>
            </li>
            <li>
              <a class="p-nav-page__link" href="#philosophy">経営理念</a>
            </li>
            <li>
              <a class="p-nav-page__link" href="#company">会社概要</a>
            </li>
            <li>
              <a class="p-nav-page__link" href="#member">メンバー紹介</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="p-page-header__breadcrumb js-fade-in">
        <?php get_template_part('template-parts/breadcrumb'); ?>
      </div>
    </div>
  </section>


  <!-- 代表挨拶 -->
  <section id="president" class="about-president">
    <div class="about-president__inner c-container">
      <h2 class="p-ttl-a js-text-anime-up">
        <span class="p-ttl-a__en js-text-anime-up__main" data-char-split>Message</span>
        <span class="p-ttl-a__ja js-text-anime-up__sub">
          <span class="js-text-anime-up__sub-txt">代表挨拶</span>
        </span>
      </h2>
      <div class="about-president__body">
        <div class="about-president__txt-wrap js-fade-in">
          <h3 class="about-president__lead">
            価値は、偶然では決まらない。<br>
            設計で、決まる。
          </h3>
          <div class="about-president__txt">
            <p>私たち<span class="u-txt-uppercase">Roleup</span>は、中小企業の事業承継とM&Aを支援するプロフェッショナルファームとして、2018年に創業いたしました。</p>
            <p>日本には、優れた技術や独自のサービスを持ちながら、後継者不在や経営課題に直面している企業が数多く存在します。そうした企業の価値を正しく評価し、次の成長へとつなげていくこと。それが私たちの使命です。</p>
            <p>M&Aは単なる「売買」ではありません。企業の歴史、従業員の想い、取引先との関係性——そのすべてを理解した上で、最適な形を設計していく作業です。だからこそ私たちは、表面的な仲介ではなく、深い分析と丁寧な対話を重ね、意思決定に耐えうる提案を行います。</p>
            <p>「価値の伴走者」として、検討から実行、そして統合後まで。一気通貫で企業の成長をサポートしてまいります。</p>
          </div>
          <div class="about-president__profile">
            <p class="about-president__position">代表取締役社長</p>
            <p class="about-president__name">渡邉 達也</p>
          </div>
        </div>
        <div class="about-president__media js-fade-in">
          <div class="about-president__img">
            <picture>
              <source media="(max-width: 768px)" srcset="<?php echo get_template_directory_uri(); ?>/assets/img/page/about/president_img_01_sp.webp" width="335" height="223">
              <img src="<?php echo get_template_directory_uri(); ?>/assets/img/page/about/president_img_01.webp" width="380" height="507" alt="写真：渡邉 達也">
            </picture>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- 経営理念 -->
  <section id="philosophy" class="about-philosophy">
    <div class="about-philosophy__overlay js-parallax-bg"></div>
    <div class="about-philosophy__inner c-container">
      <h2 class="p-ttl-a -dark js-text-anime-up">
        <span class="p-ttl-a__en js-text-anime-up__main" data-char-split>Philosophy</span>
        <span class="p-ttl-a__ja js-text-anime-up__sub">
          <span class="js-text-anime-up__sub-txt">経営理念</span>
        </span>
      </h2>
      <div class="about-philosophy__body">
        <p class="about-philosophy__catch js-fade-in"><span class="u-br">価値を設計し、</span>成長を伴走する。</p>
        <ul class="about-philosophy__items js-fade-in">
          <li class="about-philosophy__item">
            <p class="about-philosophy__item-num">VALUE 01</p>
            <h3 class="about-philosophy__item-ttl">本質を見抜く</h3>
            <p class="about-philosophy__item-txt">数字の裏にある「本当の強さ」を見極め、企業の真の価値を明らかにします。</p>
          </li>
          <li class="about-philosophy__item">
            <p class="about-philosophy__item-num">VALUE 02</p>
            <h3 class="about-philosophy__item-ttl">意思決定を支える</h3>
            <p class="about-philosophy__item-txt">論点を整理し、迷いを意思決定に変える。クライアントの判断を支えます。</p>
          </li>
          <li class="about-philosophy__item">
            <p class="about-philosophy__item-num">VALUE 03</p>
            <h3 class="about-philosophy__item-ttl">統合まで描き切る</h3>
            <p class="about-philosophy__item-txt">契約の瞬間だけでなく、統合後の成長まで見据えた支援を行います。</p>
          </li>
        </ul>
      </div>
    </div>
  </section>

  <!-- 会社概要 -->
  <section id="company" class="about-company">
    <div class="about-company__inner c-container">
      <h2 class="p-ttl-a js-text-anime-up">
        <span class="p-ttl-a__en js-text-anime-up__main" data-char-split>Company</span>
        <span class="p-ttl-a__ja js-text-anime-up__sub">
          <span class="js-text-anime-up__sub-txt">会社概要</span>
        </span>
      </h2>
      <div class="about-company__table">
        <table class="p-table-a js-fade-in">
          <tr>
            <th>会社名</th>
            <td>株式会社<span class="u-txt-uppercase">Roleup</span></td>
          </tr>
          <tr>
            <th>設立</th>
            <td>2018年4月</td>
          </tr>
          <tr>
            <th>代表者</th>
            <td>代表取締役社長　渡邉 達也</td>
          </tr>
          <tr>
            <th>所在地</th>
            <td>
              <address>
                〒100-6328<br>
                東京都千代田区丸の内2丁目4−1<br>
                丸の内ビルディング28階事業内容M&Aアドバイザリー
              </address>
              <div class="about-company__map">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6481.67197494238!2d139.7612277766698!3d35.68104027258747!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188bf992c34823%3A0x21ed577a75a4b0d1!2z5Li444Gu5YaF44OT44Or44OH44Kj44Oz44Kw!5e0!3m2!1sja!2sjp!4v1772374457360!5m2!1sja!2sjp" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
              </div>
            </td>
          </tr>
          <tr>
            <th>事業内容</th>
            <td>
              M&Aアドバイザリー事業<br>
              デューデリジェンス<br>
              企業価値評価<br>
              PMI支援<br>
              税務サービス<br>
              監査サービス
            </td>
          </tr>
          <tr>
            <th>グループ会社</th>
            <td>
              <span class="u-txt-uppercase">Roleup</span>税理士法人<br>
              <span class="u-txt-uppercase">Roleup</span>監査法人
            </td>
          </tr>
        </table>
      </div>
    </div>
  </section>

  <!-- メンバー紹介 -->
  <section id="member" class="about-member">
    <div class="about-member__inner c-container">
      <h2 class="p-ttl-a js-text-anime-up">
        <span class="p-ttl-a__en js-text-anime-up__main" data-char-split>Members</span>
        <span class="p-ttl-a__ja js-text-anime-up__sub">
          <span class="js-text-anime-up__sub-txt">メンバー紹介</span>
        </span>
      </h2>
      <p class="about-member__lead js-fade-in"><span class="u-br-pc">公認会計士、税理士、M&Aアドバイザーなど、</span>各分野のプロフェッショナルがチームを組み、クライアントの課題解決に取り組みます。</p>

      <!-- 経営陣 -->
      <div class="about-member__group js-fade-in">
        <h3 class="about-member__group-ttl">経営陣</h3>
        <ul class="about-member__grid">
          <li class="about-member__card">
            <button type="button" class="about-member__card-btn p-modal-trigger js-modal-trigger" data-modal="modal1">
              <span class="about-member__card-img">
                <img src="<?php echo get_template_directory_uri(); ?>/assets/img/page/about/member_01.webp" width="274" height="365" alt="">
              </span>
              <span class="about-member__card-info">
                <span class="about-member__card-position">代表取締役　社長</span>
                <span class="about-member__card-name">渡邉 達也</span>
                <span class="about-member__card-name-en">WATANABE TATSUYA</span>
              </span>
            </button>
          </li>
          <li class="about-member__card">
            <button type="button" class="about-member__card-btn p-modal-trigger js-modal-trigger" data-modal="modal2">
              <span class="about-member__card-img">
                <img src="<?php echo get_template_directory_uri(); ?>/assets/img/page/about/member_02.webp" width="274" height="365" alt="">
              </span>
              <span class="about-member__card-info">
                <span class="about-member__card-position">取締役</span>
                <span class="about-member__card-name">鈴木 花子</span>
                <span class="about-member__card-name-en">SUZUKI HANAKO</span>
              </span>
            </button>
          </li>
          <li class="about-member__card">
            <button type="button" class="about-member__card-btn p-modal-trigger js-modal-trigger" data-modal="modal3">
              <span class="about-member__card-img">
                <img src="<?php echo get_template_directory_uri(); ?>/assets/img/page/about/member_03.webp" width="274" height="365" alt="">
              </span>
              <span class="about-member__card-info">
                <span class="about-member__card-position">取締役</span>
                <span class="about-member__card-name">佐藤 次郎</span>
                <span class="about-member__card-name-en">SATO JIRO</span>
              </span>
            </button>
          </li>
        </ul>
      </div>

      <!-- プロフェッショナル -->
      <div class="about-member__group js-fade-in">
        <h3 class="about-member__group-ttl">プロフェッショナル</h3>
        <ul class="about-member__grid -four">
          <li class="about-member__card">
            <button type="button" class="about-member__card-btn p-modal-trigger js-modal-trigger" data-modal="modal4">
              <span class="about-member__card-img">
                <img src="<?php echo get_template_directory_uri(); ?>/assets/img/page/about/member_04.webp" width="274" height="365" alt="">
              </span>
              <span class="about-member__card-info">
                <span class="about-member__card-position">公認会計士</span>
                <span class="about-member__card-name">田中 一郎</span>
                <span class="about-member__card-name-en">TANAKA ICHIRO</span>
              </span>
            </button>
          </li>
          <li class="about-member__card">
            <button type="button" class="about-member__card-btn p-modal-trigger js-modal-trigger" data-modal="modal5">
              <span class="about-member__card-img">
                <img src="<?php echo get_template_directory_uri(); ?>/assets/img/page/about/member_05.webp" width="274" height="365" alt="">
              </span>
              <span class="about-member__card-info">
                <span class="about-member__card-position">税理士</span>
                <span class="about-member__card-name">佐藤 美咲</span>
                <span class="about-member__card-name-en">SATO MISAKI</span>
              </span>
            </button>
          </li>
          <li class="about-member__card">
            <button type="button" class="about-member__card-btn p-modal-trigger js-modal-trigger" data-modal="modal6">
              <span class="about-member__card-img">
                <img src="<?php echo get_template_directory_uri(); ?>/assets/img/page/about/member_06.webp" width="274" height="365" alt="">
              </span>
              <span class="about-member__card-info">
                <span class="about-member__card-position">M&Aアドバイザー</span>
                <span class="about-member__card-name">伊藤 健太</span>
                <span class="about-member__card-name-en">ITO KENTA</span>
              </span>
            </button>
          </li>
          <li class="about-member__card">
            <button type="button" class="about-member__card-btn p-modal-trigger js-modal-trigger" data-modal="modal7">
              <span class="about-member__card-img">
                <img src="<?php echo get_template_directory_uri(); ?>/assets/img/page/about/member_07.webp" width="274" height="365" alt="">
              </span>
              <span class="about-member__card-info">
                <span class="about-member__card-position">M&Aアドバイザー</span>
                <span class="about-member__card-name">渡辺 真理</span>
                <span class="about-member__card-name-en">WATANABE MARI</span>
              </span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  </section>

  <dialog id="modal1" aria-labelledby="modalTitle1" aria-describedby="modalDesc1" class="p-modal js-modal">
    <div class="about-member -modal">
      <div class="about-member__card-img">
        <img src="<?php echo get_template_directory_uri(); ?>/assets/img/page/about/modal_img_01.webp" width="283" height="188" alt="">
      </div>
      <div class="about-member__card-info">
        <h2 id="modalTitle1" class="about-member__card-position">代表取締役　社長</h2>
        <p class="about-member__card-name">渡邉 達也 <span class="about-member__card-name-en">WATANABE TATSUYA</span></p>
      </div>
      <p id="modalDesc1" class="about-member__card-txt">中堅・中小企業向け投資ファンドである日本プライベートエクイティを経て、2022年 ROLEUP Inc.創業。
      日本プライベートエクイティにおいては、ディレクター職として、スモールキャップチームの責任者、ファンドの投資委員を務める。ファンドレイズ～投資候補先企業のソーシング、投資検討（全DDプロセス統括）から投資後の企業価値向上に向けたPMI支援、売却(Exit)まで、バイアウト業務に一気通貫で従事。複数社の投資先社外取締役を歴任。上記以前は、有限責任監査法人トーマツ、PwCアドバイザリー合同会社にて公認会計士としての監査業務やファイナンシャルアドバイザリー及び経営コンサルティング業務に従事。</p>
    </div>
    <button class="p-modal-close js-modal-close" aria-label="閉じる"></button>
  </dialog>

  <dialog id="modal2" aria-labelledby="modalTitle2" aria-describedby="modalDesc2" class="p-modal js-modal">
    <div class="about-member -modal">
      <div class="about-member__card-img">
        <img src="<?php echo get_template_directory_uri(); ?>/assets/img/page/about/modal_img_01.webp" width="283" height="188" alt="">
      </div>
      <div class="about-member__card-info">
        <h2 id="modalTitle2" class="about-member__card-position">取締役</h2>
        <p class="about-member__card-name">鈴木 花子 <span class="about-member__card-name-en">SUZUKI HANAKO</span></p>
      </div>
      <p id="modalDesc2" class="about-member__card-txt">2022年以降、ファイナンシャルアドバイザリー業務に従事。主にIPO前のバリューディスカウントを含む企業価値評価、M&Aアドバイザリー業務に従事。</p>
    </div>
    <button class="p-modal-close js-modal-close" aria-label="閉じる"></button>
  </dialog>

  <dialog id="modal3" aria-labelledby="modalTitle3" aria-describedby="modalDesc3" class="p-modal js-modal">
    <div class="about-member -modal">
      <div class="about-member__card-img">
        <img src="<?php echo get_template_directory_uri(); ?>/assets/img/page/about/modal_img_01.webp" width="283" height="188" alt="">
      </div>
      <div class="about-member__card-info">
        <h2 id="modalTitle3" class="about-member__card-position">取締役</h2>
        <p class="about-member__card-name">佐藤 次郎 <span class="about-member__card-name-en">SATO JIRO</span></p>
      </div>
      <p id="modalDesc3" class="about-member__card-txt">2022年以降、ファイナンシャルアドバイザリー業務に従事。主にIPO前のバリューディスカウントを含む企業価値評価、M&Aアドバイザリー業務に従事。</p>
    </div>
    <button class="p-modal-close js-modal-close" aria-label="閉じる"></button>
  </dialog>

  <dialog id="modal4" aria-labelledby="modalTitle4" aria-describedby="modalDesc4" class="p-modal js-modal">
    <div class="about-member -modal">
      <div class="about-member__card-img">
        <img src="<?php echo get_template_directory_uri(); ?>/assets/img/page/about/modal_img_01.webp" width="283" height="188" alt="">
      </div>
      <div class="about-member__card-info">
        <h2 id="modalTitle4" class="about-member__card-position">公認会計士</h2>
        <p class="about-member__card-name">田中 一郎 <span class="about-member__card-name-en">TANAKA ICHIRO</span></p>
      </div>
      <p id="modalDesc3" class="about-member__card-txt">2022年以降、ファイナンシャルアドバイザリー業務に従事。主にIPO前のバリューディスカウントを含む企業価値評価、M&Aアドバイザリー業務に従事。</p>
    </div>
    <button class="p-modal-close js-modal-close" aria-label="閉じる"></button>
  </dialog>

  <dialog id="modal5" aria-labelledby="modalTitle5" aria-describedby="modalDesc5" class="p-modal js-modal">
    <div class="about-member -modal">
      <div class="about-member__card-img">
        <img src="<?php echo get_template_directory_uri(); ?>/assets/img/page/about/modal_img_01.webp" width="283" height="188" alt="">
      </div>
      <div class="about-member__card-info">
        <h2 id="modalTitle5" class="about-member__card-position">税理士</h2>
        <p class="about-member__card-name">佐藤 美咲 <span class="about-member__card-name-en">SATO MISAKI</span></p>
      </div>
      <p id="modalDesc5" class="about-member__card-txt">2022年以降、ファイナンシャルアドバイザリー業務に従事。主にIPO前のバリューディスカウントを含む企業価値評価、M&Aアドバイザリー業務に従事。</p>
    </div>
    <button class="p-modal-close js-modal-close" aria-label="閉じる"></button>
  </dialog>

  <dialog id="modal6" aria-labelledby="modalTitle6" aria-describedby="modalDesc6" class="p-modal js-modal">
    <div class="about-member -modal">
      <div class="about-member__card-img">
        <img src="<?php echo get_template_directory_uri(); ?>/assets/img/page/about/modal_img_01.webp" width="283" height="188" alt="">
      </div>
      <div class="about-member__card-info">
        <h2 id="modalTitle6" class="about-member__card-position">M&Aアドバイザー</h2>
        <p class="about-member__card-name">伊藤 健太 <span class="about-member__card-name-en">ITO KENTA</span></p>
      </div>
      <p id="modalDesc5" class="about-member__card-txt">2022年以降、ファイナンシャルアドバイザリー業務に従事。主にIPO前のバリューディスカウントを含む企業価値評価、M&Aアドバイザリー業務に従事。</p>
    </div>
    <button class="p-modal-close js-modal-close" aria-label="閉じる"></button>
  </dialog>

  <dialog id="modal7" aria-labelledby="modalTitle7" aria-describedby="modalDesc7" class="p-modal js-modal">
    <div class="about-member -modal">
      <div class="about-member__card-img">
        <img src="<?php echo get_template_directory_uri(); ?>/assets/img/page/about/modal_img_01.webp" width="283" height="188" alt="">
      </div>
      <div class="about-member__card-info">
        <h2 id="modalTitle7" class="about-member__card-position">M&Aアドバイザー</h2>
        <p class="about-member__card-name">渡辺 真理 <span class="about-member__card-name-en">WATANABE MARI</span></p>
      </div>
      <p id="modalDesc5" class="about-member__card-txt">2022年以降、ファイナンシャルアドバイザリー業務に従事。主にIPO前のバリューディスカウントを含む企業価値評価、M&Aアドバイザリー業務に従事。</p>
    </div>
    <button class="p-modal-close js-modal-close" aria-label="閉じる"></button>
  </dialog>

<?php get_footer();
