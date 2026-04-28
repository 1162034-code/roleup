<?php get_header(); ?>

  <!-- MV -->
  <section class="p-page-header">
    <div class="p-page-header__inner c-container">
      <div class="p-ttl-a -lg js-text-anime-up">
        <h1 class="p-ttl-a__en js-text-anime-up__main" data-char-split>Recruit</h1>
        <p class="p-ttl-a__ja js-text-anime-up__sub">
          <span class="js-text-anime-up__sub-txt">採用情報</span>
        </p>
      </div>
      <hr class="p-page-header__line js-fade-in">
      <div class="p-page-header__caption js-fade-in">
        <p><span class="u-br">M&amp;Aの最前線で、共に成長する仲間を。</span><span class="u-br-pc">ROLEUPグループは、M&amp;Aアドバイザリーを軸に、</span>税務・監査まで一気通貫で支援するプロフェッショナルファームです。</p>
      </div>

      <div class="p-page-header__nav">
        <div class="p-nav-page js-fade-in">
          <ul class="p-nav-page__list">
            <li class="-full-sp">
              <a class="p-nav-page__link" href="#reason"><span class="u-txt-uppercase">Roleup</span>で働く理由</a>
            </li>
            <li>
              <a class="p-nav-page__link" href="#jobs">法人・職種紹介</a>
            </li>
            <li>
              <a class="p-nav-page__link" href="#entry">選考フロー</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>

  <!-- Reason: ROLEUPを選ぶ理由 -->
  <section id="reason" class="recruit-reason">
    <div class="recruit-reason__inner c-container">
      <div class="recruit-reason__head">
        <h2 class="p-ttl-a -dark js-text-anime-up">
          <span class="p-ttl-a__en js-text-anime-up__main" data-char-split><span class="u-br-sp">Why&nbsp;</span><span class="u-txt-uppercase">Roleup</span></span>
          <span class="p-ttl-a__ja js-text-anime-up__sub">
            <span class="js-text-anime-up__sub-txt"><span class="u-txt-uppercase">Roleup</span>で働く理由</span>
          </span>
        </h2>
        <div class="recruit-reason__txt-wrap">
          <p class="recruit-reason__desc js-fade-in"><span class="u-br">プロフェッショナルとしての成長環境と、独立系ファームならではの裁量。</span><span class="u-txt-uppercase">Roleup</span>だからこそ得られる経験があります。</p>
        </div>
      </div>
      <ul class="p-content-cards">
        <li class="p-content-card -bg-alpha js-fade-in">
          <div class="p-content-card__inner">
            <div class="p-content-card__head">
              <p class="p-content-card__num">Reason 01</p>
              <div class="p-content-card__icon">
                <img src="<?php echo get_template_directory_uri(); ?>/assets/img/common/icon/circle_fist.webp" alt="" width="44" height="44">
              </div>
            </div>
            <div class="p-content-card__body">
              <h3 class="p-content-card__ttl">独立系の強み</h3>
              <p class="p-content-card__desc">利益相反のない、クライアントファーストのアドバイザリーを実現。経営者の本当の課題に向き合えます。</p>
            </div>
          </div>
        </li>
        <li class="p-content-card -bg-alpha js-fade-in">
          <div class="p-content-card__inner">
            <div class="p-content-card__head">
              <p class="p-content-card__num">Reason 02</p>
              <div class="p-content-card__icon">
                <img src="<?php echo get_template_directory_uri(); ?>/assets/img/common/icon/circle_partnership.webp" alt="" width="44" height="44">
              </div>
            </div>
            <div class="p-content-card__body">
              <h3 class="p-content-card__ttl">一気通貫の支援体制</h3>
              <p class="p-content-card__desc">M&amp;A・税務・監査をグループ内で完結。案件の全工程に関わる機会があります。</p>
            </div>
          </div>
        </li>
        <li class="p-content-card -bg-alpha js-fade-in">
          <div class="p-content-card__inner">
            <div class="p-content-card__head">
              <p class="p-content-card__num">Reason 03</p>
              <div class="p-content-card__icon">
                <img src="<?php echo get_template_directory_uri(); ?>/assets/img/common/icon/circle_glow.webp" alt="" width="44" height="44">
              </div>
            </div>
            <div class="p-content-card__body">
              <h3 class="p-content-card__ttl">成長スピード</h3>
              <p class="p-content-card__desc">少数精鋭の組織で、早期から裁量のある仕事を任されます。大手では得られないスピード感。</p>
            </div>
          </div>
        </li>
        <li class="p-content-card -bg-alpha js-fade-in">
          <div class="p-content-card__inner">
            <div class="p-content-card__head">
              <p class="p-content-card__num">Reason 04</p>
              <div class="p-content-card__icon">
                <img src="<?php echo get_template_directory_uri(); ?>/assets/img/common/icon/circle_people.webp" alt="" width="44" height="44">
              </div>
            </div>
            <div class="p-content-card__body">
              <h3 class="p-content-card__ttl">成長スピード</h3>
              <p class="p-content-card__desc">代表との距離が近く、意思決定が速い。年次に関わらず、実力で評価される環境です。</p>
            </div>
          </div>
        </li>
        <li class="p-content-card -bg-alpha js-fade-in">
          <div class="p-content-card__inner">
            <div class="p-content-card__head">
              <p class="p-content-card__num">Reason 05</p>
              <div class="p-content-card__icon">
                <img src="<?php echo get_template_directory_uri(); ?>/assets/img/common/icon/circle_reward.webp" alt="" width="44" height="44">
              </div>
            </div>
            <div class="p-content-card__body">
              <h3 class="p-content-card__ttl">報酬水準</h3>
              <p class="p-content-card__desc">成果に連動したインセンティブ制度。業界水準を上回る報酬体系を整備しています。</p>
            </div>
          </div>
        </li>
        <li class="p-content-card -bg-alpha js-fade-in">
          <div class="p-content-card__inner">
            <div class="p-content-card__head">
              <p class="p-content-card__num">Reason 06</p>
              <div class="p-content-card__icon">
                <img src="<?php echo get_template_directory_uri(); ?>/assets/img/common/icon/circle_diamond.webp" alt="" width="44" height="44">
              </div>
            </div>
            <div class="p-content-card__body">
              <h3 class="p-content-card__ttl">専門性の深化</h3>
              <p class="p-content-card__desc">M&amp;Aの実務経験に加え、税務・法務の知見も獲得可能。マルチスキルのプロフェッショナルへ。</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </section>

  <!-- Jobs: 採用情報 -->
  <section id="jobs" class="recruit-jobs">
    <div class="recruit-jobs__inner c-container">
      <div class="recruit-jobs__header">
        <h2 class="p-ttl-a js-text-anime-up">
          <span class="p-ttl-a__en js-text-anime-up__main" data-char-split><span class="u-br-sp">Firms&nbsp;&&nbsp;</span>Positions</span>
          <span class="p-ttl-a__ja js-text-anime-up__sub">
            <span class="js-text-anime-up__sub-txt">法人・職種紹介</span>
          </span>
        </h2>
        <p class="recruit-jobs__lead js-fade-in"><span class="u-txt-uppercase">Roleup</span>グループの各法人から、あなたに合ったキャリアを見つけてください。</p>
      </div>
      <div class="recruit-jobs__body">
        <div class="recruit-jobs__companies">
          <!-- 株式会社ROLEUP -->
          <article class="recruit-jobs__company js-fade-in">
            <div class="recruit-jobs__company-info">
              <h3 class="recruit-jobs__company-name-ja">株式会社<span class="u-txt-uppercase">Roleup</span></h3>
              <p class="recruit-jobs__company-name-en">M&amp;A Advisory</p>
              <p class="recruit-jobs__company-desc"><span class="u-br">中小企業の事業承継・M&amp;Aを、</span>ソーシングからクロージングまで一気通貫で支援するM&amp;Aアドバイザリーファームです。</p>
            </div>
            <div class="recruit-jobs__list">
              <p class="recruit-jobs__list-label">キャリア採用</p>
              <ul class="recruit-jobs__items">
                <li class="recruit-jobs__item">
                  <button type="button" class="recruit-jobs__item-trigger js-modal-trigger" data-modal="modal-ma-experience">M&amp;Aアドバイザー（経験者）</button>
                </li>
                <li class="recruit-jobs__item">
                  <button type="button" class="recruit-jobs__item-trigger js-modal-trigger" data-modal="modal-ma-no-experience">M&amp;Aアドバイザー（未経験者歓迎）</button>
                </li>
                <li class="recruit-jobs__item">
                  <button type="button" class="recruit-jobs__item-trigger js-modal-trigger" data-modal="modal-pmi">PMIコンサルタント</button>
                </li>
                <li class="recruit-jobs__item">
                  <button type="button" class="recruit-jobs__item-trigger js-modal-trigger" data-modal="modal-sourcing">ソーシングスタッフ</button>
                </li>
                <li class="recruit-jobs__item">
                  <button type="button" class="recruit-jobs__item-trigger js-modal-trigger" data-modal="modal-corporate">コーポレートスタッフ</button>
                </li>
              </ul>
            </div>
          </article>

          <!-- ROLEUP税理士法人 -->
          <article class="recruit-jobs__company js-fade-in">
            <div class="recruit-jobs__company-info">
              <h3 class="recruit-jobs__company-name-ja"><span class="u-txt-uppercase">Roleup</span>税理士法人</h3>
              <p class="recruit-jobs__company-name-en">Tax Advisory</p>
              <p class="recruit-jobs__company-desc"><span class="u-br">M&amp;Aに伴う税務デューデリジェンス、ストラクチャリング、PMI後の税務顧問まで、</span>一貫した税務サービスを提供します。</p>
            </div>
            <div class="recruit-jobs__list">
              <p class="recruit-jobs__list-label">キャリア採用</p>
              <ul class="recruit-jobs__items">
                <li class="recruit-jobs__item">
                  <button type="button" class="recruit-jobs__item-trigger js-modal-trigger" data-modal="modal-tax-advisor">税務アドバイザー（税理士）</button>
                </li>
                <li class="recruit-jobs__item">
                  <button type="button" class="recruit-jobs__item-trigger js-modal-trigger" data-modal="modal-tax-staff">税務スタッフ</button>
                </li>
              </ul>
            </div>
          </article>

          <!-- ROLEUP監査法人 -->
          <article class="recruit-jobs__company js-fade-in">
            <div class="recruit-jobs__company-info">
              <h3 class="recruit-jobs__company-name-ja"><span class="u-txt-uppercase">Roleup</span>監査法人</h3>
              <p class="recruit-jobs__company-name-en">Audit &amp; Assurance</p>
              <p class="recruit-jobs__company-desc"><span class="u-br">M&amp;A関連の財務デューデリジェンス、バリュエーション、上場準備支援など、</span>監査・保証業務を担います。</p>
            </div>
            <div class="recruit-jobs__list">
              <p class="recruit-jobs__list-label">キャリア採用</p>
              <ul class="recruit-jobs__items">
                <li class="recruit-jobs__item">
                  <button type="button" class="recruit-jobs__item-trigger js-modal-trigger" data-modal="modal-audit-staff">監査スタッフ（公認会計士）</button>
                </li>
                <li class="recruit-jobs__item">
                  <button type="button" class="recruit-jobs__item-trigger js-modal-trigger" data-modal="modal-financial-dd">財務DD・バリュエーションスタッフ</button>
                </li>
              </ul>
            </div>
          </article>
        </div>

        <div class="recruit-jobs__img js-fade-in">
          <img src="<?php echo get_template_directory_uri(); ?>/assets/img/page/recruit/img_01.webp" alt="Roleupグループの図解" width="404" height="372">
        </div>
      </div>
    </div>
  </section>

  <!-- Flow: 選考フロー -->
  <section id="flow" class="recruit-flow">
    <div class="recruit-flow__inner c-container">
      <div class="recruit-flow__header">
        <h2 class="p-ttl-a js-text-anime-up">
          <span class="p-ttl-a__en js-text-anime-up__main" data-char-split><span class="u-br-sp">Selection&nbsp;</span>Process</span>
          <span class="p-ttl-a__ja js-text-anime-up__sub">
            <span class="js-text-anime-up__sub-txt">選考フロー</span>
          </span>
        </h2>
        <p class="recruit-flow__lead js-fade-in">全法人・全職種共通の選考プロセスです。</p>
      </div>
      <ol class="recruit-flow__steps js-fade-in">
        <li class="recruit-flow__step">
          <div class="recruit-flow__step-inner">
            <h3 class="recruit-flow__step-ttl">
              <span class="recruit-flow__step-ttl-inner">
                <span class="recruit-flow__step-num">01</span>
                <span class="recruit-flow__step-name">エントリー</span>
              </span>
            </h3>
            <p class="recruit-flow__step-desc">Webフォームより<br>ご応募ください</p>
          </div>
        </li>
        <li class="recruit-flow__step">
          <div class="recruit-flow__step-inner">
            <h3 class="recruit-flow__step-ttl">
              <span class="recruit-flow__step-ttl-inner">
                <span class="recruit-flow__step-num">02</span>
                <span class="recruit-flow__step-name">書類選考</span>
              </span>
            </h3>
            <p class="recruit-flow__step-desc">履歴書・職務経歴書を<br>もとに選考します</p>
          </div>
        </li>
        <li class="recruit-flow__step">
          <div class="recruit-flow__step-inner">
            <h3 class="recruit-flow__step-ttl">
              <span class="recruit-flow__step-ttl-inner">
                <span class="recruit-flow__step-num">03</span>
                <span class="recruit-flow__step-name">一次面接</span>
              </span>
            </h3>
            <p class="recruit-flow__step-desc">マネージャーによる<br>面接を実施します</p>
          </div>
        </li>
        <li class="recruit-flow__step">
          <div class="recruit-flow__step-inner">
            <h3 class="recruit-flow__step-ttl">
              <span class="recruit-flow__step-ttl-inner">
                <span class="recruit-flow__step-num">04</span>
                <span class="recruit-flow__step-name">最終面接</span>
              </span>
            </h3>
            <p class="recruit-flow__step-desc">代表による<br>面接を実施します</p>
          </div>
        </li>
        <li class="recruit-flow__step">
          <div class="recruit-flow__step-inner">
            <h3 class="recruit-flow__step-ttl">
              <span class="recruit-flow__step-ttl-inner">
                <span class="recruit-flow__step-num">05</span>
                <span class="recruit-flow__step-name">内定</span>
              </span>
            </h3>
            <p class="recruit-flow__step-desc">条件面談を経て<br>正式オファー</p>
          </div>
        </li>
      </ol>
    </div>
  </section>

  <!-- Entry: エントリー CTA -->
  <section id="entry" class="recruit-entry">
    <div class="recruit-entry__inner c-container">
      <h2 class="recruit-entry__ttl">Join our team !</h2>
      <div class="recruit-entry__btn-wrap">
        <a href="<?php echo home_url(); ?>/contact/" class="c-btn-gradient-gold c-btn-size-lg c-btn-arrow-right">
          <span class="c-btn__txt">エントリーのお申し込みはこちら</span>
        </a>
      </div>
    </div>
  </section>

  <dialog id="modal-ma-experience" aria-labelledby="modalTitle1" aria-describedby="modalDesc1" class="p-modal js-modal">
    <section class="recruit-modal">
      <div class="recruit-modal__head">
        <p class="recruit-modal__category">キャリア採用</p>
        <h2 id="modalTitle1" class="recruit-modal__ttl">M&Aアドバイザー（経験者）</h2>
        <p class="recruit-modal__company">株式会社<span class="u-txt-uppercase">Roleup</span></p>
      </div>
      <div class="recruit-modal__body">
        <section class="recruit-modal__section">
          <h3 class="recruit-modal__section-ttl">業務内容</h3>
          <ul class="recruit-modal__list">
            <li class="recruit-modal__item">M&amp;A案件のソーシングからクロージングまでの一気通貫支援</li>
            <li class="recruit-modal__item">企業価値評価（バリュエーション）、財務分析</li>
            <li class="recruit-modal__item">デューデリジェンスの実施・マネジメント</li>
            <li class="recruit-modal__item">交渉支援、契約書作成サポート</li>
            <li class="recruit-modal__item">クロージングまでのプロジェクトマネジメント</li>
          </ul>
        </section>
        <section class="recruit-modal__section">
          <h3 class="recruit-modal__section-ttl">応募資格</h3>
          <dl class="recruit-modal__dl">
            <div>
              <dt>必要条件</dt>
              <dd>M&Aアドバイザリー業務経験2年以上<br>投資銀行、FAS、M&Aブティックでの実務経験<br>財務分析、バリュエーションスキル</dd>
            </div>
            <div>
              <dt>歓迎要件</dt>
              <dd>公認会計士、税理士、証券アナリスト等の資格<br>クロスボーダー案件の経験<br>ビジネスレベルの英語力</dd>
            </div>
          </dl>
        </section>
        <section class="recruit-modal__section">
          <h3 class="recruit-modal__section-ttl">雇用条件</h3>
          <dl class="recruit-modal__dl">
            <div>
              <dt>雇用形態</dt>
              <dd>正社員（試用期間3ヶ月）</dd>
            </div>
            <div>
              <dt>想定年収</dt>
              <dd>800万円〜2,000万円（経験・能力による）<br>※案件成約インセンティブ別途支給</dd>
            </div>
            <div>
              <dt>勤務地</dt>
              <dd>東京都千代田区丸の内（丸の内ビルディング）<br>※リモートワーク週2日まで可</dd>
            </div>
            <div>
              <dt>勤務時間</dt>
              <dd>フレックスタイム制（コアタイム10:00〜15:00）<br>標準労働時間8時間</dd>
            </div>
            <div>
              <dt>休日・休暇</dt>
              <dd>完全週休2日制（土日祝）、年間休日125日以上<br>有給休暇、慶弔休暇、年末年始休暇</dd>
            </div>
            <div>
              <dt>福利厚生</dt>
              <dd>各種社会保険完備、交通費全額支給<br>資格取得支援、書籍購入補助、健康診断</dd>
            </div>
          </dl>
        </section>

        <div class="recruit-modal__btn-wrap">
          <a href="<?php echo home_url(); ?>/contact/" class="c-btn-gradient-gold c-btn-size-lg c-btn-arrow-right">
            <span class="c-btn__txt">この職種にエントリーする</span>
          </a>
        </div>
      </div>
      <button class="p-modal-close js-modal-close" aria-label="閉じる"></button>
    </section>
  </dialog>

  <dialog id="modal-ma-no-experience" aria-labelledby="modalTitle1" aria-describedby="modalDesc1" class="p-modal js-modal">
    <section class="recruit-modal">
      <div class="recruit-modal__head">
        <p class="recruit-modal__category">キャリア採用</p>
        <h2 id="modalTitle1" class="recruit-modal__ttl">M&amp;Aアドバイザー（未経験者歓迎）</h2>
        <p class="recruit-modal__company">株式会社<span class="u-txt-uppercase">Roleup</span></p>
      </div>
      <div class="recruit-modal__body">
        <section class="recruit-modal__section">
          <h3 class="recruit-modal__section-ttl">業務内容</h3>
          <ul class="recruit-modal__list">
            <li class="recruit-modal__item">M&amp;A案件のソーシングからクロージングまでの一気通貫支援</li>
            <li class="recruit-modal__item">企業価値評価（バリュエーション）、財務分析</li>
            <li class="recruit-modal__item">デューデリジェンスの実施・マネジメント</li>
            <li class="recruit-modal__item">交渉支援、契約書作成サポート</li>
            <li class="recruit-modal__item">クロージングまでのプロジェクトマネジメント</li>
          </ul>
        </section>
        <section class="recruit-modal__section">
          <h3 class="recruit-modal__section-ttl">応募資格</h3>
          <dl class="recruit-modal__dl">
            <div>
              <dt>必要条件</dt>
              <dd>M&Aアドバイザリー業務経験2年以上<br>投資銀行、FAS、M&Aブティックでの実務経験<br>財務分析、バリュエーションスキル</dd>
            </div>
            <div>
              <dt>歓迎要件</dt>
              <dd>公認会計士、税理士、証券アナリスト等の資格<br>クロスボーダー案件の経験<br>ビジネスレベルの英語力</dd>
            </div>
          </dl>
        </section>
        <section class="recruit-modal__section">
          <h3 class="recruit-modal__section-ttl">雇用条件</h3>
          <dl class="recruit-modal__dl">
            <div>
              <dt>雇用形態</dt>
              <dd>正社員（試用期間3ヶ月）</dd>
            </div>
            <div>
              <dt>想定年収</dt>
              <dd>800万円〜2,000万円（経験・能力による）<br>※案件成約インセンティブ別途支給</dd>
            </div>
            <div>
              <dt>勤務地</dt>
              <dd>東京都千代田区丸の内（丸の内ビルディング）<br>※リモートワーク週2日まで可</dd>
            </div>
            <div>
              <dt>勤務時間</dt>
              <dd>フレックスタイム制（コアタイム10:00〜15:00）<br>標準労働時間8時間</dd>
            </div>
            <div>
              <dt>休日・休暇</dt>
              <dd>完全週休2日制（土日祝）、年間休日125日以上<br>有給休暇、慶弔休暇、年末年始休暇</dd>
            </div>
            <div>
              <dt>福利厚生</dt>
              <dd>各種社会保険完備、交通費全額支給<br>資格取得支援、書籍購入補助、健康診断</dd>
            </div>
          </dl>
        </section>

        <div class="recruit-modal__btn-wrap">
          <a href="<?php echo home_url(); ?>/contact/" class="c-btn-gradient-gold c-btn-size-lg c-btn-arrow-right">
            <span class="c-btn__txt">この職種にエントリーする</span>
          </a>
        </div>
      </div>
      <button class="p-modal-close js-modal-close" aria-label="閉じる"></button>
    </section>
  </dialog>

  <dialog id="modal-pmi" aria-labelledby="modalTitle1" aria-describedby="modalDesc1" class="p-modal js-modal">
    <section class="recruit-modal">
      <div class="recruit-modal__head">
        <p class="recruit-modal__category">キャリア採用</p>
        <h2 id="modalTitle1" class="recruit-modal__ttl">PMIコンサルタント</h2>
        <p class="recruit-modal__company">株式会社<span class="u-txt-uppercase">Roleup</span></p>
      </div>
      <div class="recruit-modal__body">
        <section class="recruit-modal__section">
          <h3 class="recruit-modal__section-ttl">業務内容</h3>
          <ul class="recruit-modal__list">
            <li class="recruit-modal__item">M&amp;A案件のソーシングからクロージングまでの一気通貫支援</li>
            <li class="recruit-modal__item">企業価値評価（バリュエーション）、財務分析</li>
            <li class="recruit-modal__item">デューデリジェンスの実施・マネジメント</li>
            <li class="recruit-modal__item">交渉支援、契約書作成サポート</li>
            <li class="recruit-modal__item">クロージングまでのプロジェクトマネジメント</li>
          </ul>
        </section>
        <section class="recruit-modal__section">
          <h3 class="recruit-modal__section-ttl">応募資格</h3>
          <dl class="recruit-modal__dl">
            <div>
              <dt>必要条件</dt>
              <dd>M&Aアドバイザリー業務経験2年以上<br>投資銀行、FAS、M&Aブティックでの実務経験<br>財務分析、バリュエーションスキル</dd>
            </div>
            <div>
              <dt>歓迎要件</dt>
              <dd>公認会計士、税理士、証券アナリスト等の資格<br>クロスボーダー案件の経験<br>ビジネスレベルの英語力</dd>
            </div>
          </dl>
        </section>
        <section class="recruit-modal__section">
          <h3 class="recruit-modal__section-ttl">雇用条件</h3>
          <dl class="recruit-modal__dl">
            <div>
              <dt>雇用形態</dt>
              <dd>正社員（試用期間3ヶ月）</dd>
            </div>
            <div>
              <dt>想定年収</dt>
              <dd>800万円〜2,000万円（経験・能力による）<br>※案件成約インセンティブ別途支給</dd>
            </div>
            <div>
              <dt>勤務地</dt>
              <dd>東京都千代田区丸の内（丸の内ビルディング）<br>※リモートワーク週2日まで可</dd>
            </div>
            <div>
              <dt>勤務時間</dt>
              <dd>フレックスタイム制（コアタイム10:00〜15:00）<br>標準労働時間8時間</dd>
            </div>
            <div>
              <dt>休日・休暇</dt>
              <dd>完全週休2日制（土日祝）、年間休日125日以上<br>有給休暇、慶弔休暇、年末年始休暇</dd>
            </div>
            <div>
              <dt>福利厚生</dt>
              <dd>各種社会保険完備、交通費全額支給<br>資格取得支援、書籍購入補助、健康診断</dd>
            </div>
          </dl>
        </section>

        <div class="recruit-modal__btn-wrap">
          <a href="<?php echo home_url(); ?>/contact/" class="c-btn-gradient-gold c-btn-size-lg c-btn-arrow-right">
            <span class="c-btn__txt">この職種にエントリーする</span>
          </a>
        </div>
      </div>
      <button class="p-modal-close js-modal-close" aria-label="閉じる"></button>
    </section>
  </dialog>

  <dialog id="modal-sourcing" aria-labelledby="modalTitle1" aria-describedby="modalDesc1" class="p-modal js-modal">
    <section class="recruit-modal">
      <div class="recruit-modal__head">
        <p class="recruit-modal__category">キャリア採用</p>
        <h2 id="modalTitle1" class="recruit-modal__ttl">ソーシングスタッフ</h2>
        <p class="recruit-modal__company">株式会社<span class="u-txt-uppercase">Roleup</span></p>
      </div>
      <div class="recruit-modal__body">
        <section class="recruit-modal__section">
          <h3 class="recruit-modal__section-ttl">業務内容</h3>
          <ul class="recruit-modal__list">
            <li class="recruit-modal__item">M&amp;A案件のソーシングからクロージングまでの一気通貫支援</li>
            <li class="recruit-modal__item">企業価値評価（バリュエーション）、財務分析</li>
            <li class="recruit-modal__item">デューデリジェンスの実施・マネジメント</li>
            <li class="recruit-modal__item">交渉支援、契約書作成サポート</li>
            <li class="recruit-modal__item">クロージングまでのプロジェクトマネジメント</li>
          </ul>
        </section>
        <section class="recruit-modal__section">
          <h3 class="recruit-modal__section-ttl">応募資格</h3>
          <dl class="recruit-modal__dl">
            <div>
              <dt>必要条件</dt>
              <dd>M&Aアドバイザリー業務経験2年以上<br>投資銀行、FAS、M&Aブティックでの実務経験<br>財務分析、バリュエーションスキル</dd>
            </div>
            <div>
              <dt>歓迎要件</dt>
              <dd>公認会計士、税理士、証券アナリスト等の資格<br>クロスボーダー案件の経験<br>ビジネスレベルの英語力</dd>
            </div>
          </dl>
        </section>
        <section class="recruit-modal__section">
          <h3 class="recruit-modal__section-ttl">雇用条件</h3>
          <dl class="recruit-modal__dl">
            <div>
              <dt>雇用形態</dt>
              <dd>正社員（試用期間3ヶ月）</dd>
            </div>
            <div>
              <dt>想定年収</dt>
              <dd>800万円〜2,000万円（経験・能力による）<br>※案件成約インセンティブ別途支給</dd>
            </div>
            <div>
              <dt>勤務地</dt>
              <dd>東京都千代田区丸の内（丸の内ビルディング）<br>※リモートワーク週2日まで可</dd>
            </div>
            <div>
              <dt>勤務時間</dt>
              <dd>フレックスタイム制（コアタイム10:00〜15:00）<br>標準労働時間8時間</dd>
            </div>
            <div>
              <dt>休日・休暇</dt>
              <dd>完全週休2日制（土日祝）、年間休日125日以上<br>有給休暇、慶弔休暇、年末年始休暇</dd>
            </div>
            <div>
              <dt>福利厚生</dt>
              <dd>各種社会保険完備、交通費全額支給<br>資格取得支援、書籍購入補助、健康診断</dd>
            </div>
          </dl>
        </section>

        <div class="recruit-modal__btn-wrap">
          <a href="<?php echo home_url(); ?>/contact/" class="c-btn-gradient-gold c-btn-size-lg c-btn-arrow-right">
            <span class="c-btn__txt">この職種にエントリーする</span>
          </a>
        </div>
      </div>
      <button class="p-modal-close js-modal-close" aria-label="閉じる"></button>
    </section>
  </dialog>

  <dialog id="modal-corporate" aria-labelledby="modalTitle1" aria-describedby="modalDesc1" class="p-modal js-modal">
    <section class="recruit-modal">
      <div class="recruit-modal__head">
        <p class="recruit-modal__category">キャリア採用</p>
        <h2 id="modalTitle1" class="recruit-modal__ttl">コーポレートスタッフ</h2>
        <p class="recruit-modal__company">株式会社<span class="u-txt-uppercase">Roleup</span></p>
      </div>
      <div class="recruit-modal__body">
        <section class="recruit-modal__section">
          <h3 class="recruit-modal__section-ttl">業務内容</h3>
          <ul class="recruit-modal__list">
            <li class="recruit-modal__item">M&amp;A案件のソーシングからクロージングまでの一気通貫支援</li>
            <li class="recruit-modal__item">企業価値評価（バリュエーション）、財務分析</li>
            <li class="recruit-modal__item">デューデリジェンスの実施・マネジメント</li>
            <li class="recruit-modal__item">交渉支援、契約書作成サポート</li>
            <li class="recruit-modal__item">クロージングまでのプロジェクトマネジメント</li>
          </ul>
        </section>
        <section class="recruit-modal__section">
          <h3 class="recruit-modal__section-ttl">応募資格</h3>
          <dl class="recruit-modal__dl">
            <div>
              <dt>必要条件</dt>
              <dd>M&Aアドバイザリー業務経験2年以上<br>投資銀行、FAS、M&Aブティックでの実務経験<br>財務分析、バリュエーションスキル</dd>
            </div>
            <div>
              <dt>歓迎要件</dt>
              <dd>公認会計士、税理士、証券アナリスト等の資格<br>クロスボーダー案件の経験<br>ビジネスレベルの英語力</dd>
            </div>
          </dl>
        </section>
        <section class="recruit-modal__section">
          <h3 class="recruit-modal__section-ttl">雇用条件</h3>
          <dl class="recruit-modal__dl">
            <div>
              <dt>雇用形態</dt>
              <dd>正社員（試用期間3ヶ月）</dd>
            </div>
            <div>
              <dt>想定年収</dt>
              <dd>800万円〜2,000万円（経験・能力による）<br>※案件成約インセンティブ別途支給</dd>
            </div>
            <div>
              <dt>勤務地</dt>
              <dd>東京都千代田区丸の内（丸の内ビルディング）<br>※リモートワーク週2日まで可</dd>
            </div>
            <div>
              <dt>勤務時間</dt>
              <dd>フレックスタイム制（コアタイム10:00〜15:00）<br>標準労働時間8時間</dd>
            </div>
            <div>
              <dt>休日・休暇</dt>
              <dd>完全週休2日制（土日祝）、年間休日125日以上<br>有給休暇、慶弔休暇、年末年始休暇</dd>
            </div>
            <div>
              <dt>福利厚生</dt>
              <dd>各種社会保険完備、交通費全額支給<br>資格取得支援、書籍購入補助、健康診断</dd>
            </div>
          </dl>
        </section>

        <div class="recruit-modal__btn-wrap">
          <a href="<?php echo home_url(); ?>/contact/" class="c-btn-gradient-gold c-btn-size-lg c-btn-arrow-right">
            <span class="c-btn__txt">この職種にエントリーする</span>
          </a>
        </div>
      </div>
      <button class="p-modal-close js-modal-close" aria-label="閉じる"></button>
    </section>
  </dialog>

  <dialog id="modal-tax-advisor" aria-labelledby="modalTitle1" aria-describedby="modalDesc1" class="p-modal js-modal">
    <section class="recruit-modal">
      <div class="recruit-modal__head">
        <p class="recruit-modal__category">キャリア採用</p>
        <h2 id="modalTitle1" class="recruit-modal__ttl">税務アドバイザー（税理士）</h2>
        <p class="recruit-modal__company">株式会社<span class="u-txt-uppercase">Roleup</span></p>
      </div>
      <div class="recruit-modal__body">
        <section class="recruit-modal__section">
          <h3 class="recruit-modal__section-ttl">業務内容</h3>
          <ul class="recruit-modal__list">
            <li class="recruit-modal__item">M&amp;A案件のソーシングからクロージングまでの一気通貫支援</li>
            <li class="recruit-modal__item">企業価値評価（バリュエーション）、財務分析</li>
            <li class="recruit-modal__item">デューデリジェンスの実施・マネジメント</li>
            <li class="recruit-modal__item">交渉支援、契約書作成サポート</li>
            <li class="recruit-modal__item">クロージングまでのプロジェクトマネジメント</li>
          </ul>
        </section>
        <section class="recruit-modal__section">
          <h3 class="recruit-modal__section-ttl">応募資格</h3>
          <dl class="recruit-modal__dl">
            <div>
              <dt>必要条件</dt>
              <dd>M&Aアドバイザリー業務経験2年以上<br>投資銀行、FAS、M&Aブティックでの実務経験<br>財務分析、バリュエーションスキル</dd>
            </div>
            <div>
              <dt>歓迎要件</dt>
              <dd>公認会計士、税理士、証券アナリスト等の資格<br>クロスボーダー案件の経験<br>ビジネスレベルの英語力</dd>
            </div>
          </dl>
        </section>
        <section class="recruit-modal__section">
          <h3 class="recruit-modal__section-ttl">雇用条件</h3>
          <dl class="recruit-modal__dl">
            <div>
              <dt>雇用形態</dt>
              <dd>正社員（試用期間3ヶ月）</dd>
            </div>
            <div>
              <dt>想定年収</dt>
              <dd>800万円〜2,000万円（経験・能力による）<br>※案件成約インセンティブ別途支給</dd>
            </div>
            <div>
              <dt>勤務地</dt>
              <dd>東京都千代田区丸の内（丸の内ビルディング）<br>※リモートワーク週2日まで可</dd>
            </div>
            <div>
              <dt>勤務時間</dt>
              <dd>フレックスタイム制（コアタイム10:00〜15:00）<br>標準労働時間8時間</dd>
            </div>
            <div>
              <dt>休日・休暇</dt>
              <dd>完全週休2日制（土日祝）、年間休日125日以上<br>有給休暇、慶弔休暇、年末年始休暇</dd>
            </div>
            <div>
              <dt>福利厚生</dt>
              <dd>各種社会保険完備、交通費全額支給<br>資格取得支援、書籍購入補助、健康診断</dd>
            </div>
          </dl>
        </section>

        <div class="recruit-modal__btn-wrap">
          <a href="<?php echo home_url(); ?>/contact/" class="c-btn-gradient-gold c-btn-size-lg c-btn-arrow-right">
            <span class="c-btn__txt">この職種にエントリーする</span>
          </a>
        </div>
      </div>
      <button class="p-modal-close js-modal-close" aria-label="閉じる"></button>
    </section>
  </dialog>

  <dialog id="modal-tax-staff" aria-labelledby="modalTitle1" aria-describedby="modalDesc1" class="p-modal js-modal">
    <section class="recruit-modal">
      <div class="recruit-modal__head">
        <p class="recruit-modal__category">キャリア採用</p>
        <h2 id="modalTitle1" class="recruit-modal__ttl">税務スタッフ</h2>
        <p class="recruit-modal__company">株式会社<span class="u-txt-uppercase">Roleup</span></p>
      </div>
      <div class="recruit-modal__body">
        <section class="recruit-modal__section">
          <h3 class="recruit-modal__section-ttl">業務内容</h3>
          <ul class="recruit-modal__list">
            <li class="recruit-modal__item">M&amp;A案件のソーシングからクロージングまでの一気通貫支援</li>
            <li class="recruit-modal__item">企業価値評価（バリュエーション）、財務分析</li>
            <li class="recruit-modal__item">デューデリジェンスの実施・マネジメント</li>
            <li class="recruit-modal__item">交渉支援、契約書作成サポート</li>
            <li class="recruit-modal__item">クロージングまでのプロジェクトマネジメント</li>
          </ul>
        </section>
        <section class="recruit-modal__section">
          <h3 class="recruit-modal__section-ttl">応募資格</h3>
          <dl class="recruit-modal__dl">
            <div>
              <dt>必要条件</dt>
              <dd>M&Aアドバイザリー業務経験2年以上<br>投資銀行、FAS、M&Aブティックでの実務経験<br>財務分析、バリュエーションスキル</dd>
            </div>
            <div>
              <dt>歓迎要件</dt>
              <dd>公認会計士、税理士、証券アナリスト等の資格<br>クロスボーダー案件の経験<br>ビジネスレベルの英語力</dd>
            </div>
          </dl>
        </section>
        <section class="recruit-modal__section">
          <h3 class="recruit-modal__section-ttl">雇用条件</h3>
          <dl class="recruit-modal__dl">
            <div>
              <dt>雇用形態</dt>
              <dd>正社員（試用期間3ヶ月）</dd>
            </div>
            <div>
              <dt>想定年収</dt>
              <dd>800万円〜2,000万円（経験・能力による）<br>※案件成約インセンティブ別途支給</dd>
            </div>
            <div>
              <dt>勤務地</dt>
              <dd>東京都千代田区丸の内（丸の内ビルディング）<br>※リモートワーク週2日まで可</dd>
            </div>
            <div>
              <dt>勤務時間</dt>
              <dd>フレックスタイム制（コアタイム10:00〜15:00）<br>標準労働時間8時間</dd>
            </div>
            <div>
              <dt>休日・休暇</dt>
              <dd>完全週休2日制（土日祝）、年間休日125日以上<br>有給休暇、慶弔休暇、年末年始休暇</dd>
            </div>
            <div>
              <dt>福利厚生</dt>
              <dd>各種社会保険完備、交通費全額支給<br>資格取得支援、書籍購入補助、健康診断</dd>
            </div>
          </dl>
        </section>

        <div class="recruit-modal__btn-wrap">
          <a href="<?php echo home_url(); ?>/contact/" class="c-btn-gradient-gold c-btn-size-lg c-btn-arrow-right">
            <span class="c-btn__txt">この職種にエントリーする</span>
          </a>
        </div>
      </div>
      <button class="p-modal-close js-modal-close" aria-label="閉じる"></button>
    </section>
  </dialog>

  <dialog id="modal-audit-staff" aria-labelledby="modalTitle1" aria-describedby="modalDesc1" class="p-modal js-modal">
    <section class="recruit-modal">
      <div class="recruit-modal__head">
        <p class="recruit-modal__category">キャリア採用</p>
        <h2 id="modalTitle1" class="recruit-modal__ttl">監査スタッフ（公認会計士）</h2>
        <p class="recruit-modal__company">株式会社<span class="u-txt-uppercase">Roleup</span></p>
      </div>
      <div class="recruit-modal__body">
        <section class="recruit-modal__section">
          <h3 class="recruit-modal__section-ttl">業務内容</h3>
          <ul class="recruit-modal__list">
            <li class="recruit-modal__item">M&amp;A案件のソーシングからクロージングまでの一気通貫支援</li>
            <li class="recruit-modal__item">企業価値評価（バリュエーション）、財務分析</li>
            <li class="recruit-modal__item">デューデリジェンスの実施・マネジメント</li>
            <li class="recruit-modal__item">交渉支援、契約書作成サポート</li>
            <li class="recruit-modal__item">クロージングまでのプロジェクトマネジメント</li>
          </ul>
        </section>
        <section class="recruit-modal__section">
          <h3 class="recruit-modal__section-ttl">応募資格</h3>
          <dl class="recruit-modal__dl">
            <div>
              <dt>必要条件</dt>
              <dd>M&Aアドバイザリー業務経験2年以上<br>投資銀行、FAS、M&Aブティックでの実務経験<br>財務分析、バリュエーションスキル</dd>
            </div>
            <div>
              <dt>歓迎要件</dt>
              <dd>公認会計士、税理士、証券アナリスト等の資格<br>クロスボーダー案件の経験<br>ビジネスレベルの英語力</dd>
            </div>
          </dl>
        </section>
        <section class="recruit-modal__section">
          <h3 class="recruit-modal__section-ttl">雇用条件</h3>
          <dl class="recruit-modal__dl">
            <div>
              <dt>雇用形態</dt>
              <dd>正社員（試用期間3ヶ月）</dd>
            </div>
            <div>
              <dt>想定年収</dt>
              <dd>800万円〜2,000万円（経験・能力による）<br>※案件成約インセンティブ別途支給</dd>
            </div>
            <div>
              <dt>勤務地</dt>
              <dd>東京都千代田区丸の内（丸の内ビルディング）<br>※リモートワーク週2日まで可</dd>
            </div>
            <div>
              <dt>勤務時間</dt>
              <dd>フレックスタイム制（コアタイム10:00〜15:00）<br>標準労働時間8時間</dd>
            </div>
            <div>
              <dt>休日・休暇</dt>
              <dd>完全週休2日制（土日祝）、年間休日125日以上<br>有給休暇、慶弔休暇、年末年始休暇</dd>
            </div>
            <div>
              <dt>福利厚生</dt>
              <dd>各種社会保険完備、交通費全額支給<br>資格取得支援、書籍購入補助、健康診断</dd>
            </div>
          </dl>
        </section>

        <div class="recruit-modal__btn-wrap">
          <a href="<?php echo home_url(); ?>/contact/" class="c-btn-gradient-gold c-btn-size-lg c-btn-arrow-right">
            <span class="c-btn__txt">この職種にエントリーする</span>
          </a>
        </div>
      </div>
      <button class="p-modal-close js-modal-close" aria-label="閉じる"></button>
    </section>
  </dialog>

  <dialog id="modal-financial-dd" aria-labelledby="modalTitle1" aria-describedby="modalDesc1" class="p-modal js-modal">
    <section class="recruit-modal">
      <div class="recruit-modal__head">
        <p class="recruit-modal__category">キャリア採用</p>
        <h2 id="modalTitle1" class="recruit-modal__ttl">財務DD・バリュエーションスタッフ</h2>
        <p class="recruit-modal__company">株式会社<span class="u-txt-uppercase">Roleup</span></p>
      </div>
      <div class="recruit-modal__body">
        <section class="recruit-modal__section">
          <h3 class="recruit-modal__section-ttl">業務内容</h3>
          <ul class="recruit-modal__list">
            <li class="recruit-modal__item">M&amp;A案件のソーシングからクロージングまでの一気通貫支援</li>
            <li class="recruit-modal__item">企業価値評価（バリュエーション）、財務分析</li>
            <li class="recruit-modal__item">デューデリジェンスの実施・マネジメント</li>
            <li class="recruit-modal__item">交渉支援、契約書作成サポート</li>
            <li class="recruit-modal__item">クロージングまでのプロジェクトマネジメント</li>
          </ul>
        </section>
        <section class="recruit-modal__section">
          <h3 class="recruit-modal__section-ttl">応募資格</h3>
          <dl class="recruit-modal__dl">
            <div>
              <dt>必要条件</dt>
              <dd>M&Aアドバイザリー業務経験2年以上<br>投資銀行、FAS、M&Aブティックでの実務経験<br>財務分析、バリュエーションスキル</dd>
            </div>
            <div>
              <dt>歓迎要件</dt>
              <dd>公認会計士、税理士、証券アナリスト等の資格<br>クロスボーダー案件の経験<br>ビジネスレベルの英語力</dd>
            </div>
          </dl>
        </section>
        <section class="recruit-modal__section">
          <h3 class="recruit-modal__section-ttl">雇用条件</h3>
          <dl class="recruit-modal__dl">
            <div>
              <dt>雇用形態</dt>
              <dd>正社員（試用期間3ヶ月）</dd>
            </div>
            <div>
              <dt>想定年収</dt>
              <dd>800万円〜2,000万円（経験・能力による）<br>※案件成約インセンティブ別途支給</dd>
            </div>
            <div>
              <dt>勤務地</dt>
              <dd>東京都千代田区丸の内（丸の内ビルディング）<br>※リモートワーク週2日まで可</dd>
            </div>
            <div>
              <dt>勤務時間</dt>
              <dd>フレックスタイム制（コアタイム10:00〜15:00）<br>標準労働時間8時間</dd>
            </div>
            <div>
              <dt>休日・休暇</dt>
              <dd>完全週休2日制（土日祝）、年間休日125日以上<br>有給休暇、慶弔休暇、年末年始休暇</dd>
            </div>
            <div>
              <dt>福利厚生</dt>
              <dd>各種社会保険完備、交通費全額支給<br>資格取得支援、書籍購入補助、健康診断</dd>
            </div>
          </dl>
        </section>

        <div class="recruit-modal__btn-wrap">
          <a href="<?php echo home_url(); ?>/contact/" class="c-btn-gradient-gold c-btn-size-lg c-btn-arrow-right">
            <span class="c-btn__txt">この職種にエントリーする</span>
          </a>
        </div>
      </div>
      <button class="p-modal-close js-modal-close" aria-label="閉じる"></button>
    </section>
  </dialog>

<?php get_footer(); ?>
