<div class="p-form js-fade-in">
  <div class="p-form__inner">
    <h2 class="p-ttl-b">お問い合わせフォーム</h2>
    <div class="p-form__desc">
      <p>以下のフォームに必要事項をご入力のうえ、送信してください。</p>
      <p>担当者より2営業日以内にご連絡いたします。</p>
    </div>

    <div class="p-form__group">
      <div class="p-form__row">
        <fieldset>
          <legend class="p-form__label">
            <span class="p-form__required">必須</span>
            <span class="p-form__label-text">お問い合わせ項目</span>
          </legend>

          <div class="p-form__input">
            [radio inquiry use_label_element "お問い合わせ" "お見積もり" "その他"]
          </div>
        </fieldset>
      </div>

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
      <div class="p-form__policy-content" tabindex="0">
        <div class="p-editor">[privacy_policy "3160"]</div>
      </div>

      <div class="p-form__policy-checkbox">
        <label>
          <input type="checkbox" name="agree" id="agree">
          <span class="p-form__label-text">「個人情報の取扱いについて」に同意の上、送信します。</span>
        </label>
      </div>
    </div>

    <div class="p-form__btn u-ta-center">
      <p id="form-to-confirm-btn" class="c-btn-gradient-gold c-btn-size-default c-btn-arrow-right">[submit "送信する"]</p>
    </div>
  </div>
</div>
