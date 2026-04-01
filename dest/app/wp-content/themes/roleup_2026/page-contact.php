<?php get_header(); ?>
  <section class="p-page-header">
    <div class="p-page-header__inner c-container">
      <div class="p-ttl-a -lg js-text-anime-up">
        <h1 class="p-ttl-a__en js-text-anime-up__main" data-char-split>Contact</h1>
        <p class="p-ttl-a__ja js-text-anime-up__sub">
          <span class="js-text-anime-up__sub-txt">お問い合わせ</span>
        </p>
      </div>
      <hr class="p-page-header__line js-fade-in">
      <div class="p-page-header__caption js-fade-in">
        <p>M&Aに関するご相談・お問い合わせは、下記フォームよりお気軽にご連絡ください。</p>
        <p>お電話からのお問い合わせについては以下の番号よりお待ちしております。</p>
      </div>
      <div class="p-page-header__info js-fade-in">
        <p class="p-page-header__tel"><span class="p-page-header__tel-label u-txt-uppercase">tel</span>03<span class="hyphen">-</span>0000<span class="hyphen">-</span>0000</p>
        <p class="p-page-header__time">受付時間：平日 9:00〜18:00</p>
      </div>
    </div>
  </section>

  <div class="p-page-content">
    <div class="p-page-content__inner c-container">
      <?php echo do_shortcode('[contact-form-7 id="65d5b12" title="お問い合わせ"]'); ?>

      <section class="p-access js-fade-in">
        <div class="p-access__inner">
          <div class="p-access__info">
            <div class="p-ttl-a js-text-anime-up">
              <h1 class="p-ttl-a__en js-text-anime-up__main" data-char-split>Location</h1>
              <p class="p-ttl-a__ja js-text-anime-up__sub">
                <span class="js-text-anime-up__sub-txt">所在地</span>
              </p>
            </div>
            <address class="p-access__txt">
              <p>株式会社ROLEUP<br>
              〒100-6328<br>
              東京都千代田区丸の内２丁目４－１<br>
              丸の内ビルディング２８階</p>
              <p class="u-mt-1lh">アクセス：東京駅 丸の内南口より徒歩3分</p>
            </address>
          </div>
          <div class="p-access__map">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.836044334221!2d139.76119567652404!3d35.681038872587386!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188b002a99fd09%3A0x8782b2de704ee765!2z5qCq5byP5Lya56S-Uk9MRVVQ!5e0!3m2!1sja!2sjp!4v1775013396921!5m2!1sja!2sjp" width="527" height="350" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
          </div>
        </div>
      </section>
    </div>
  </div>

<!-- <div class="p-form">
  <div class="p-form__inner">
    <h2 class="p-ttl-b">お問い合わせフォーム</h2>
    <div class="p-form__desc">
      <p>以下のフォームに必要事項をご入力のうえ、送信してください。</p>
      <p>担当者より2営業日以内にご連絡いたします。</p>
    </div>

    <div class="p-form__group">
      <div class="p-form__row">
        <label for="name" class="p-form__label">
          <span class="p-form__required">必須</span>
          <span class="p-form__label-text">お名前</span>
        </label>
        <div class="p-form__input">
          [text* your-name id:name]
        </div>
      </div>

      <div class="p-form__row">
        <label for="kana" class="p-form__label">
          <span class="p-form__required">必須</span>
          <span class="p-form__label-text">フリガナ</span>
        </label>
        <div class="p-form__input">
          [text* your-kana id:kana]
        </div>
      </div>

      <div class="p-form__row">
        <label for="company" class="p-form__label">
          <span class="p-form__any">任意</span>
          <span class="p-form__label-text">会社名</span>
        </label>
        <div class="p-form__input">
          [text your-company id:company]
        </div>
      </div>

      <div class="p-form__row">
        <label for="department" class="p-form__label">
          <span class="p-form__any">任意</span>
          <span class="p-form__label-text">部署名</span>
        </label>
        <div class="p-form__input">
          [text your-department id:department]
        </div>
      </div>

      <div class="p-form__row">
        <label for="position" class="p-form__label">
          <span class="p-form__any">任意</span>
          <span class="p-form__label-text">役職名</span>
        </label>
        <div class="p-form__input">
          [text your-position id:position]
        </div>
      </div>

      <div class="p-form__row">
        <label for="zip-code-1" class="p-form__label">
          <span class="p-form__any">任意</span>
          <span class="p-form__label-text">郵便番号</span>
        </label>
        <div class="p-form__input zip-code">
          <span class="p-form__zip-code-label">〒</span>
          [text your-zip-code-1 id:zip-code-1]
          <span class="p-form__zip-code-hyphen"> ー </span>
          [text your-zip-code-2 id:zip-code-2]
        </div>
      </div>

      <div class="p-form__row">
        <label for="address" class="p-form__label">
          <span class="p-form__any">任意</span>
          <span class="p-form__label-text">住所</span>
        </label>
        <div class="p-form__input">
          [text your-address id:address]
        </div>
      </div>

      <div class="p-form__row">
        <label for="tel" class="p-form__label">
          <span class="p-form__any">任意</span>
          <span class="p-form__label-text">電話番号</span>
        </label>
        <div class="p-form__input">
          [text your-tel id:tel]
        </div>
      </div>

      <div class="p-form__row">
        <label for="email" class="p-form__label">
          <span class="p-form__required">必須</span>
          <span class="p-form__label-text">メールアドレス</span>
        </label>
        <div class="p-form__input">
          [email* your-email id:email]
        </div>
      </div>

      <div class="p-form__row">
        <label for="email-confirm" class="p-form__label">
          <span class="p-form__required">必須</span>
          <span class="p-form__label-text">メールアドレス（確認）</span>
        </label>
        <div class="p-form__input">
          [email* your-email-confirm id:email-confirm]
        </div>
      </div>

      <div class="p-form__row">
        <label for="message" class="p-form__label">
          <span class="p-form__required">必須</span>
          <span class="p-form__label-text">お問い合わせ内容</span>
        </label>
        <div class="p-form__input">
          [textarea* your-message id:message]
        </div>
      </div>
    </div>

    <div class="p-form__privacy-policy">
      <div class="p-form__checkbox">
        <label>
          <input type="checkbox" name="agree" id="agree">
          <span class="p-form__label-text"><a href="./privacy-policy/">プライバシーポリシー</a>に同意の上、送信します。</span>
        </label>
      </div>
    </div>

    <div class="p-form__btn u-ta-center">
      <p id="form-to-confirm-btn" class="c-btn-gradient-gold c-btn-size-default c-btn-arrow-right">[submit "送信する"]</p>
    </div>
  </div>
</div> -->

<?php get_footer(); ?>
