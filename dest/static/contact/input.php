<div class="p-form">
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
        <section>
          <h2>【個人情報の取扱いについて】</h2>
          <p>株式会社ROLEUP（以下、「当社」という。）にご提供いただいた個人情報は、以下の目的で利用いたします。</p>
          <p>なお、別途利用目的について同意いただいた場合には、その利用目的の範囲内で利用させていただきます。</p>
          <p>（利用目的の達成に必要な範囲内で、当社より委託先に提供することがあります）</p>

          <h3>利用目的</h3>
          <h4>1）クライアントに関する個人情報</h4>
          <ol>
            <li>クライアント等からの依頼・相談・問い合わせへの対応、クライアント等への連絡及び情報提供</li>
            <li>クライアント等に対する新規取扱い業務のご案内のため</li>
            <li>広報活動、組織の管理・構築に必要な執務及びこれらに付随する執務のため</li>
          </ol>

          <h4>2）当社に対するお問い合わせを頂いた方に関する個人情報</h4>
          <p>お問い合わせ対応、その管理、関連資料の送付等のため</p>

          <h4>3）当社従業者に関する個人情報</h4>
          <p>人事労務管理、業務管理、健康管理、セキュリティ管理、等のため</p>

          <h4>4）ご提供頂いた個人番号及び特定個人情報</h4>
          <p>法令等で定められたマイナンバー管理業務のため</p>

          <h4>5）採用応募に関する個人情報</h4>
          <p>採用業務のため</p>

          <h3>個人情報の安全管理のために講じた措置について</h3>
          <p>当社では、個人情報をより厳正に取り扱うため、JIS Q 15001に準拠した個人情報保護方針を基に、個人情報保護規程等を策定し、外的環境を把握した上で個人情報保護マネジメントシステムを運用しております。また、実際に個人情報を取り扱うにあたり、組織的、人的、物理的、技術的の4つの観点より安全管理措置を講じております。</p>

          <h4>（組織的安全管理措置）</h4>
          <ol>
            <li>個人データの取り扱いに関する個人情報保護管理者を設置するとともに、当社が取り扱う個人データの範囲を明確化し、法や規程に違反している事実又は兆候を把握した場合の個人情報保護管理者への報告連絡体制を整備しています。</li>
            <li>個人データの取扱状況について、定期的に内部監査を実施しています。</li>
          </ol>

          <h4>（人的安全管理措置）</h4>
          <ol>
            <li>当社では、個人データの取り扱いに関する留意事項（個人情報の取り扱いにおける事故報告にみる傾向と注意点の社内周知、事故発生時の対応方法など）について、定期的な研修を実施しています。</li>
            <li>当社では、個人データについての秘密保持に関する事項に対して、誓約書を受理しています。</li>
          </ol>

          <h4>（物理的安全管理措置）</h4>
          <ol>
            <li>当社への入室に関しては、顔認証システムの設置により、適切な措置を講じています。</li>
            <li>個人データを取り扱う機器、電子媒体及び書類等の盗難又は紛失等を防止するために、適切な措置を講じています。</li>
            <li>個人データが記録された電子媒体又は書類等を持ち運ぶ場合、容易に個人データが判明しないよう、安全な方策を講じています。</li>
            <li>個人データを削除し又は個人データが記録された機器、電子媒体等を廃棄する場合は、復元不可能な手段を講じています。</li>
          </ol>

          <h4>（技術的安全管理措置）</h4>
          <ol>
            <li>取り扱う個人情報データベース等の範囲を限定するために、適切なアクセス制御を講じています。</li>
            <li>情報システムへのアクセスは、正当なアクセス権を有する者であることを確実にするために、ユーザーID、パスワード等により認証しています。</li>
            <li>個人データを取り扱う情報システムを外部からの不正アクセス又は不正ソフトウェアから保護する仕組みを導入し、適切に運用しています。</li>
            <li>情報システムの使用に伴う個人データの漏えい等を防止するための措置を講じ、適切に運用しています。</li>
          </ol>

          <h3>お問い合わせ</h3>
          <p>当社の個人情報の取り扱い全般に関するお問い合わせは、以下までご連絡ください。</p>
          <p>〒100-6328 東京都千代田区丸の内２丁目４－１ 丸の内ビルディング２８階</p>
          <p>株式会社ROLEUP　個人情報に関するお問い合わせ窓口</p>
          <p>メールアドレス：ru_privacy@roleup.co.jp</p>
          <p class="u-ta-right">以上</p>
          <p class="u-ta-right">制定日：2026.01.23</p>
        </section>

        <section>
          <h2>【個人情報の開示等の請求等に関する手続き】</h2>
          <p>株式会社ROLEUP（以下、「当社」という。）の保有する以下の個人情報に関して本人又は代理人は「利用目的の通知、開示、内容の訂正、追加又は削除、利用の停止、消去、第三者への提供の停止及び第三者提供記録の開示」を求めることができます。</p>

          <h3>保有個人データの利用目的</h3>
          <h4>1）クライアントに関する個人情報</h4>
          <ol>
            <li>クライアント等からの依頼・相談・問い合わせへの対応、クライアント等への連絡及び情報提供</li>
            <li>クライアント等に対する新規取扱い業務のご案内のため</li>
            <li>広報活動、組織の管理・構築に必要な執務及びこれらに付随する執務のため</li>
          </ol>
          <h4>2）当社に対するお問い合わせを頂いた方に関する個人情報</h4>
          <p>お問い合わせ対応、その管理、関連資料の送付等のため</p>

          <h4>3）当社従業者に関する個人情報</h4>
          <p>人事労務管理、業務管理、健康管理、セキュリティ管理、等のため</p>

          <h4>4）ご提供頂いた個人番号及び特定個人情報</h4>
          <p>法令等で定められたマイナンバー管理業務のため</p>

          <h4>5）採用応募に関する個人情報</h4>
          <p>採用業務のため</p>

          <h4>6）防犯カメラ等に記録された映像（録画データ）</h4>
          <p>防犯のため</p>

          <h3>当社の名称及び住所、代表者の氏名</h3>
          <p>名称：株式会社ROLEUP　
          <p>住所：〒100-6328 東京都千代田区丸の内２丁目４－１ 丸の内ビルディング２８階</p>
          <p>代表者：渡邉 達也</p>

          <h3>当社の個人情報保護管理者の職名、所属及び連絡先</h3>
          <p>役職名：代表取締役社長</p>
          <p>連絡先：メールアドレス： ru_privacy@roleup.co.jp</p>

          <h3>保有個人データの取扱いに関する苦情の申し出先</h3>
          <p>保有個人データの取扱いに関する苦情は、個人情報に関するお問い合わせ窓口でお受けいたします。</p>

          <h3>開示等の請求等の手続きについて</h3>
          <p>開示等のご請求等については、8項に記載の「個人情報に関するお問い合わせ窓口」までご連絡をお願いします。請求等に必要な手順の説明と必要な申請書類などをお送りします。</p>

          <h3>開示等の請求等の手続きについて</h3>
          <p>開示等のご請求等については、8項に記載の「個人情報に関するお問い合わせ窓口」までご連絡をお願いします。請求等に必要な手順の説明と必要な申請書類などをお送りします。</p>

          <h3>個人情報に関するお問い合わせ窓口</h3>
          <p>当社の個人情報の取り扱い全般に関するお問い合わせは、以下までご連絡ください。</p>
          <p>株式会社ROLEUP　個人情報に関するお問い合わせ窓口</p>
          <p>メールアドレス：ru_privacy@roleup.co.jp</p>
          <p class="u-ta-right">以上</p>
          <p class="u-ta-right">制定日：2026.01.23</p>
        </section>
      </div>

      <div class="p-form__policy-checkbox">
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
</div>
