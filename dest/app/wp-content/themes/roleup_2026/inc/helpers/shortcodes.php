<?php
if (! defined('ABSPATH')) exit;

  //テーマディレクトリー
  function theme_directory_shortcode() {
    return get_theme_file_uri();
  }
  add_shortcode('theme_dir', 'theme_directory_shortcode');

  //srcsetにショートコードを反映
  add_filter('wp_kses_allowed_html', 'my_wp_kses_allowed_html', 10, 2);
  function my_wp_kses_allowed_html($tags, $context) {
    $tags['source']['srcset'] = true;
    return $tags;
  }

	// ホームURLを出力するショートコード
  function my_custom_home_url_shortcode() {
    return esc_url(home_url());
  }
  add_shortcode('home_url', 'my_custom_home_url_shortcode');

  // パンくずリストを出力するショートコード
  function my_custom_breadcrumb_shortcode() {
    return get_template_part('template-parts/breadcrumb');
  }
  add_shortcode('breadcrumb', 'my_custom_breadcrumb_shortcode');

  // 採用情報の求人一覧を出力するショートコード
  function recruit_jobs_list_shortcode() {
    ob_start();
    ?>
    <div class="recruit-jobs__body">
      <div class="recruit-jobs__companies">
        <?php
        // 会社区分の表示情報と順番を定義（この配列の順番が表示順になります）
        $company_info = array(
          '株式会社ROLEUP' => array(
            'name_ja' => '株式会社<span class="u-txt-uppercase">Roleup</span>',
            'name_en' => 'M&amp;A Advisory',
            'desc' => '<span class="u-br">企業の成長を、資本と経営の両面から</span>一気通貫で支援するM&amp;Aプロフェッショナルファームです。'
          ),
          'ROLEUP税理士法人' => array(
            'name_ja' => '<span class="u-txt-uppercase">Roleup</span>税理士法人',
            'name_en' => 'Tax Advisory',
            'desc' => '<span class="u-br">M&amp;Aに伴う税務デューデリジェンス、ストラクチャリング、PMI後の税務顧問まで、</span>一貫した税務サービスを提供します。'
          ),
          'ROLEUP監査法人' => array(
            'name_ja' => '<span class="u-txt-uppercase">Roleup</span>監査法人',
            'name_en' => 'Audit &amp; Assurance',
            'desc' => '<span class="u-br">M&amp;A後における財務諸表監査・AUP業務をはじめ、会計・財務支援等、ステークホルダーに求められる品質を担保するための監査・保証業務やアドバイザリー業務を提供します。'
          )
        );

        // 会社区分タクソノミーのタームを取得（名前をキーにしたマップを作成）
        $company_terms = get_terms(array(
          'taxonomy' => 'recruit_company',
          'hide_empty' => false
        ));

        $terms_map = array();
        if (!is_wp_error($company_terms) && !empty($company_terms)) {
          foreach ($company_terms as $term) {
            $terms_map[$term->name] = $term;
          }
        }

        // $company_info配列の順番で表示
        foreach ($company_info as $company_name => $info) :
          // 該当するタームが存在するか確認
          if (!isset($terms_map[$company_name])) {
            continue;
          }

          $company_term = $terms_map[$company_name];

          // 会社区分でフィルタリングして投稿を取得
          $company_posts = new WP_Query(array(
            'post_type' => 'recruit',
            'posts_per_page' => -1,
            'orderby' => 'menu_order',
            'order' => 'ASC',
            'tax_query' => array(
              array(
                'taxonomy' => 'recruit_company',
                'field' => 'term_id',
                'terms' => $company_term->term_id
              )
            )
          ));

          if ($company_posts->have_posts()) :
        ?>
            <article class="recruit-jobs__company js-fade-in">
              <div class="recruit-jobs__company-info">
                <h3 class="recruit-jobs__company-name-ja"><?php echo $info['name_ja']; ?></h3>
                <?php if (!empty($info['name_en'])) : ?>
                  <p class="recruit-jobs__company-name-en"><?php echo $info['name_en']; ?></p>
                <?php endif; ?>
                <?php if (!empty($info['desc'])) : ?>
                  <p class="recruit-jobs__company-desc"><?php echo $info['desc']; ?></p>
                <?php endif; ?>
              </div>
              <?php
              // 採用区分別にグループ化
              $grouped_posts = array();
              while ($company_posts->have_posts()) : $company_posts->the_post();
                $categories = get_the_terms(get_the_ID(), 'recruit_category');
                if ($categories && !is_wp_error($categories)) {
                  foreach ($categories as $category) {
                    if (!isset($grouped_posts[$category->slug])) {
                      $grouped_posts[$category->slug] = array(
                        'name' => $category->name,
                        'posts' => array()
                      );
                    }
                    $grouped_posts[$category->slug]['posts'][] = get_the_ID();
                  }
                }
              endwhile;

              // 採用区分別に表示
              foreach ($grouped_posts as $cat_slug => $cat_data) :
              ?>
                <div class="recruit-jobs__list">
                  <p class="recruit-jobs__list-label"><?php echo esc_html($cat_data['name']); ?></p>
                  <ul class="recruit-jobs__items">
                    <?php foreach ($cat_data['posts'] as $post_id) :
                      $post_title = get_the_title($post_id);
                      $modal_id = 'modal-' . $post_id;
                    ?>
                      <li class="recruit-jobs__item">
                        <button type="button" class="recruit-jobs__item-trigger js-modal-trigger" data-modal="<?php echo esc_attr($modal_id); ?>"><?php echo esc_html($post_title); ?></button>
                      </li>
                    <?php endforeach; ?>
                  </ul>
                </div>
              <?php endforeach; ?>
            </article>
        <?php
            wp_reset_postdata();
          endif;
        endforeach;
        ?>
      </div>

      <div class="recruit-jobs__img js-fade-in">
        <img src="<?php echo get_theme_file_uri(); ?>/assets/img/page/recruit/img_01.webp" alt="Roleupグループの図解" width="404" height="372">
      </div>
    </div>
    <?php
    return ob_get_clean();
  }
  add_shortcode('recruit_jobs_list', 'recruit_jobs_list_shortcode');

  // 実績ページのリーグテーブルを出力するショートコード
  function performance_league_shortcode() {
    ob_start();

    // オプションページからランクを取得
    $announced_matter = get_field('announced-matter', 'option');
    $completed_case = get_field('completed-case', 'option');

    // 繰り返しフィールドから過去のランキング推移を取得
    $league_field = get_field('league-field', 'option');
    ?>
    <div class="performance-league__right">
      <h3 class="performance-league__review-label">LSEG 日本M&Aレビュー</h3>
      <ul class="performance-league__ranks">
        <?php if ($announced_matter) : ?>
          <li class="performance-league__rank">
            <h4 class="performance-league__rank-label">公表案件</h4>
            <p class="performance-league__rank-num"><span class="performance-league__rank-val"><?php echo esc_html($announced_matter); ?></span>位</p>
            <p class="performance-league__rank-en">Announced Deals</p>
          </li>
        <?php endif; ?>
        <?php if ($completed_case) : ?>
          <li class="performance-league__rank">
            <h4 class="performance-league__rank-label">完了案件</h4>
            <p class="performance-league__rank-num"><span class="performance-league__rank-val"><?php echo esc_html($completed_case); ?></span>位</p>
            <p class="performance-league__rank-en">Completed Deals</p>
          </li>
        <?php endif; ?>
      </ul>
      <p class="performance-league__rank-note">※ ランキングはLSEG（London Stock Exchange Group）が公表する日本M&Aレビューに基づく</p>

      <?php /*
      <?php if ($league_field && is_array($league_field) && !empty($league_field)) : ?>
        <div class="performance-league__history">
          <p class="performance-league__history-ttl">過去のランキング推移</p>
          <ul class="performance-league__history-list">
            <?php foreach ($league_field as $league_item) :
              // グループ内のデータを取得（ハイフンとアンダースコア両方チェック）
              $league_group = isset($league_item['league-group']) ? $league_item['league-group'] : (isset($league_item['league_group']) ? $league_item['league_group'] : null);

              if ($league_group) :
                $lseg_title = isset($league_group['lseg-title']) ? $league_group['lseg-title'] : (isset($league_group['lseg_title']) ? $league_group['lseg_title'] : '');
                $lseg_rank = isset($league_group['lseg-rank']) ? $league_group['lseg-rank'] : (isset($league_group['lseg_rank']) ? $league_group['lseg_rank'] : '');

                if (!empty($lseg_title) && !empty($lseg_rank)) :
            ?>
              <li class="performance-league__history-item">
                <p class="performance-league__history-quarter"><?php echo esc_html($lseg_title); ?></p>
                <p class="performance-league__history-rank"><span class="performance-league__history-val"><?php echo esc_html($lseg_rank); ?></span>位</p>
                <p class="performance-league__history-type">公表案件</p>
              </li>
            <?php
                endif;
              endif;
            endforeach; ?>
          </ul>
        </div>
      <?php endif; ?>
      <?php */ ?>
    </div>
    <?php
    return ob_get_clean();
  }
  add_shortcode('performance_league', 'performance_league_shortcode');

  // 採用情報のモーダルを出力するショートコード
  function recruit_modals_shortcode() {
    ob_start();

    // 全ての応募要項を取得してモーダルを生成
    $all_recruits = new WP_Query(array(
      'post_type' => 'recruit',
      'posts_per_page' => -1,
      'orderby' => 'menu_order',
      'order' => 'ASC'
    ));

    $modal_counter = 1;
    if ($all_recruits->have_posts()) :
      while ($all_recruits->have_posts()) : $all_recruits->the_post();
        $post_id = get_the_ID();
        $modal_id = 'modal-' . $post_id;
        $modal_title_id = 'modalTitle' . $modal_counter;
        $modal_desc_id = 'modalDesc' . $modal_counter;
        $modal_counter++;

        // タクソノミー取得
        $categories = get_the_terms($post_id, 'recruit_category');
        $category_name = '';
        if ($categories && !is_wp_error($categories)) {
          $category_name = $categories[0]->name;
        }

        $companies = get_the_terms($post_id, 'recruit_company');
        $company_name = '';
        if ($companies && !is_wp_error($companies)) {
          $company_name = $companies[0]->name;
        }

        // ACFフィールド取得（投稿IDを明示的に指定）
        $business_contents = get_field('business-contents-field', $post_id);
        $business_contents_items = array_values(array_filter(
          is_array($business_contents) ? $business_contents : [],
          function ($content) {
            return !empty($content['business-contents']);
          }
        ));
        $business_text = get_field('business-text', $post_id);
        $requirements_group = get_field('requirements-group', $post_id);
        $employment_group = get_field('employment-group', $post_id);

        // グループ内の繰り返しフィールドを取得
        // もし繰り返しフィールドがグループの中にある場合
        $requirements_field = null;
        if ($requirements_group && isset($requirements_group['requirements-field'])) {
          $requirements_field = $requirements_group['requirements-field'];
        } else {
          // グループの外に繰り返しフィールドがある場合
          $requirements_field = get_field('requirements-field', $post_id);
        }

        $employment_field = null;
        if ($employment_group && isset($employment_group['employment-field'])) {
          $employment_field = $employment_group['employment-field'];
        } else {
          // グループの外に繰り返しフィールドがある場合
          $employment_field = get_field('employment-field', $post_id);
        }
    ?>
    <dialog id="<?php echo esc_attr($modal_id); ?>" aria-labelledby="<?php echo esc_attr($modal_title_id); ?>" aria-describedby="<?php echo esc_attr($modal_desc_id); ?>" class="p-modal js-modal">
      <section class="recruit-modal">
        <div class="recruit-modal__head">
          <?php if ($category_name) : ?>
            <p class="recruit-modal__category"><?php echo esc_html($category_name); ?></p>
          <?php endif; ?>
          <h2 id="<?php echo esc_attr($modal_title_id); ?>" class="recruit-modal__ttl"><?php the_title(); ?></h2>
          <?php if ($company_name) : ?>
            <p class="recruit-modal__company"><?php echo esc_html($company_name); ?></p>
          <?php endif; ?>
        </div>
        <div id="<?php echo esc_attr($modal_desc_id); ?>" class="recruit-modal__body">
          <section class="recruit-modal__section">
            <h3 class="recruit-modal__section-ttl">業務内容</h3>
              <?php if ($business_contents_items) : ?>
              <ul class="recruit-modal__list">
                <?php foreach ($business_contents_items as $content) : ?>
                  <li class="recruit-modal__item"><?php echo wp_kses_post($content['business-contents']); ?></li>
                <?php endforeach; ?>
              </ul>
              <?php endif; ?>
              <?php if (!empty($business_text)) : ?>
                <p><?php echo nl2br(wp_kses_post($business_text)); ?></p>
              <?php endif; ?>
            </section>

          <?php if ($requirements_group || ($requirements_field && is_array($requirements_field))) : ?>
            <section class="recruit-modal__section">
              <h3 class="recruit-modal__section-ttl">応募資格</h3>
              <dl class="recruit-modal__dl">
                <?php if (!empty($requirements_group['prerequisite'])) : ?>
                  <div>
                    <dt>必要条件</dt>
                    <dd><?php echo nl2br(esc_html($requirements_group['prerequisite'])); ?></dd>
                  </div>
                <?php endif; ?>
                <?php if (!empty($requirements_group['welcome-requirements'])) : ?>
                  <div>
                    <dt>歓迎要件</dt>
                    <dd><?php echo nl2br(esc_html($requirements_group['welcome-requirements'])); ?></dd>
                  </div>
                <?php endif; ?>
                <?php
                if ($requirements_field && is_array($requirements_field)) :
                  foreach ($requirements_field as $req) :
                    // ハイフンとアンダースコア両方のパターンをチェック
                    $req_title = !empty($req['requirements-title']) ? $req['requirements-title'] : (!empty($req['requirements_title']) ? $req['requirements_title'] : '');
                    $req_text = !empty($req['requirements-text']) ? $req['requirements-text'] : (!empty($req['requirements_text']) ? $req['requirements_text'] : '');

                    if (!empty($req_title) || !empty($req_text)) :
                ?>
                  <div>
                    <?php if (!empty($req_title)) : ?>
                      <dt><?php echo esc_html($req_title); ?></dt>
                    <?php endif; ?>
                    <?php if (!empty($req_text)) : ?>
                      <dd><?php echo nl2br(esc_html($req_text)); ?></dd>
                    <?php endif; ?>
                  </div>
                <?php
                    endif;
                  endforeach;
                endif;
                ?>
              </dl>
            </section>
          <?php endif; ?>

          <?php if ($employment_group || ($employment_field && is_array($employment_field))) : ?>
            <section class="recruit-modal__section">
              <h3 class="recruit-modal__section-ttl">雇用条件</h3>
              <dl class="recruit-modal__dl">
                <?php if (!empty($employment_group['employment-type'])) : ?>
                  <div>
                    <dt>雇用形態</dt>
                    <dd><?php echo nl2br(esc_html($employment_group['employment-type'])); ?></dd>
                  </div>
                <?php endif; ?>
                <?php if (!empty($employment_group['estimated-annual-income'])) : ?>
                  <div>
                    <dt>想定年収</dt>
                    <dd><?php echo nl2br(esc_html($employment_group['estimated-annual-income'])); ?></dd>
                  </div>
                <?php endif; ?>
                <?php if (!empty($employment_group['work-place'])) : ?>
                  <div>
                    <dt>勤務地</dt>
                    <dd><?php echo nl2br(esc_html($employment_group['work-place'])); ?></dd>
                  </div>
                <?php endif; ?>
                <?php if (!empty($employment_group['working-hours'])) : ?>
                  <div>
                    <dt>勤務時間</dt>
                    <dd><?php echo nl2br(esc_html($employment_group['working-hours'])); ?></dd>
                  </div>
                <?php endif; ?>
                <?php if (!empty($employment_group['holidays-vacation'])) : ?>
                  <div>
                    <dt>休日・休暇</dt>
                    <dd><?php echo nl2br(esc_html($employment_group['holidays-vacation'])); ?></dd>
                  </div>
                <?php endif; ?>
                <?php if (!empty($employment_group['employee-benefits'])) : ?>
                  <div>
                    <dt>福利厚生</dt>
                    <dd><?php echo nl2br(esc_html($employment_group['employee-benefits'])); ?></dd>
                  </div>
                <?php endif; ?>
                <?php
                if ($employment_field && is_array($employment_field)) :
                  foreach ($employment_field as $emp) :
                    // ハイフンとアンダースコア両方のパターンをチェック
                    $emp_title = !empty($emp['employment-title']) ? $emp['employment-title'] : (!empty($emp['employment_title']) ? $emp['employment_title'] : '');
                    $emp_text = !empty($emp['employment-text']) ? $emp['employment-text'] : (!empty($emp['employment_text']) ? $emp['employment_text'] : '');

                    if (!empty($emp_title) || !empty($emp_text)) :
                ?>
                  <div>
                    <?php if (!empty($emp_title)) : ?>
                      <dt><?php echo esc_html($emp_title); ?></dt>
                    <?php endif; ?>
                    <?php if (!empty($emp_text)) : ?>
                      <dd><?php echo nl2br(esc_html($emp_text)); ?></dd>
                    <?php endif; ?>
                  </div>
                <?php
                    endif;
                  endforeach;
                endif;
                ?>
              </dl>
            </section>
          <?php endif; ?>

          <div class="recruit-modal__btn-wrap">
            <a href="<?php echo esc_url(home_url()); ?>/contact/" class="c-btn-gradient-gold c-btn-size-lg c-btn-arrow-right">
              <span class="c-btn__txt">この職種にエントリーする</span>
            </a>
          </div>
        </div>
        <button class="p-modal-close js-modal-close" aria-label="閉じる"></button>
      </section>
    </dialog>
    <?php
      endwhile;
      wp_reset_postdata();
    endif;

    return ob_get_clean();
  }
  add_shortcode('recruit_modals', 'recruit_modals_shortcode');
