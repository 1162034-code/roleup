/**
 * Intersection Observer APIを使用したスクロールアニメーションのユーティリティ関数群
 *
 * 基本的な使用方法：
 * - addActive: 要素が表示領域に入ったときにクラスを追加
 * - toggleActive: 要素が表示領域に出入りするたびにクラスをトグル
 * - removeActiveOnScrollUp: スクロールアップ時にクラスを削除
 *
 * data属性によるカスタマイズ:
 * - data-root-margin: 判定するビューポートのマージン（例: "100px 0px"）
 * - data-threshold: 交差の閾値（例: "[0, 0.5, 1]"）
 * - data-class-name: 付与するクラス名
 * - data-is-intersecting: 交差判定の反転（"false"で反転）
 * - data-target-class: クラスを付与する対象要素のセレクタ
 */

/**
 * 要素のdata属性からオプションを解析する
 * @param {Element} element - 対象のDOM要素
 * @returns {Object} 解析されたオプション
 */
function parseDataAttributes(element) {
  const dataset = element.dataset;
  const options = {};

  if (dataset.rootMargin) options.rootMargin = dataset.rootMargin;
  if (dataset.threshold) options.threshold = JSON.parse(dataset.threshold);
  if (dataset.className) options.className = dataset.className;
  if ('isIntersecting' in dataset) options.isIntersecting = dataset.isIntersecting !== 'false';
  if (dataset.targetClass) options.targetClass = dataset.targetClass;

  return options;
}

/**
 * 初期表示時のアクティブ状態をチェックして設定
 * @param {Element} target - 対象要素
 * @param {string} className - 付与するクラス名
 * @param {string} rootMargin - ビューポートのマージン
 * @param {boolean} isIntersecting - 交差判定の方向
 */
function checkAndSetActive(target, className, rootMargin, isIntersecting) {
  const [rootMarginTop] = rootMargin.split(' ').map(v => parseInt(v));
  const { top, bottom } = target.getBoundingClientRect();

  if (isIntersecting ? bottom < window.innerHeight + rootMarginTop : top > 0) {
    target.classList.add(className);
  }
}

/**
 * Intersection Observerを作成して監視を開始
 * @param {Element[]} elements - 監視する要素の配列
 * @param {string|null} targetClass - クラスを付与する対象要素のセレクタ
 * @param {Object} options - 設定オプション
 * @param {Function} callback - 交差時のコールバック関数
 */
function createObserver(elements, targetClass, options, callback) {
  const { rootMargin, threshold, className, isIntersecting = true } = options;

  const observeAction = (entries) => {
    entries.forEach(entry => {
      const activeBlock = targetClass
        ? document.querySelector(targetClass)
        : entry.target;

      if (activeBlock) {
        callback(activeBlock, isIntersecting ? entry.isIntersecting : !entry.isIntersecting);
      }
    });
  };

  const observer = new IntersectionObserver(observeAction, { rootMargin, threshold });

  elements.forEach(target => {
    checkAndSetActive(target, className, rootMargin, isIntersecting);
    observer.observe(target);
  });
}

/**
 * 要素が表示領域に入ったときにクラスを追加
 * @param {string} elem - 対象要素のセレクタ
 * @param {string} rootMargin - ビューポートのマージン（例: "100px 0px"）
 * @param {string|null} targetClass - クラスを付与する対象要素のセレクタ
 * @param {string} className - 付与するクラス名
 * @param {boolean} isIntersecting - 交差判定の方向
 * @param {Object} options - 追加のオプション
 *
 * @example
 * // 基本的な使用方法
 * addActive('.js-fade-up', '100px', null, 'is-active');
 *
 * // data属性でカスタマイズする場合のHTML
 * // <div class="js-fade-up" data-root-margin="200px" data-class-name="visible">
 */
function addActive(elem, rootMargin, targetClass = null, className, isIntersecting = true, options = {}) {
  const elements = document.querySelectorAll(elem);

  elements.forEach(element => {
    const dataOptions = parseDataAttributes(element);
    const mergedOptions = {
      rootMargin,
      threshold: [0],
      className,
      isIntersecting,
      ...options,
      ...dataOptions,
    };

    createObserver([element], mergedOptions.targetClass || targetClass, mergedOptions, (activeBlock, shouldAdd) => {
      if (shouldAdd) {
        activeBlock.classList.add(mergedOptions.className);
      }
    });
  });
}

/**
 * 要素が表示領域に出入りするたびにクラスをトグル
 * @param {string} elem - 対象要素のセレクタ
 * @param {string} rootMargin - ビューポートのマージン
 * @param {string|null} targetClass - クラスを付与する対象要素のセレクタ
 * @param {string} className - トグルするクラス名
 * @param {boolean} isIntersecting - 交差判定の方向
 * @param {Object} options - 追加のオプション
 *
 * @example
 * // ヘッダーの表示/非表示
 * toggleActive('.js-header-trigger', '0px', '.js-header', 'is-visible');
 */
function toggleActive(elem, rootMargin, targetClass = null, className, isIntersecting = true, options = {}) {
  const elements = document.querySelectorAll(elem);

  elements.forEach(element => {
    const dataOptions = parseDataAttributes(element);
    const mergedOptions = {
      rootMargin,
      threshold: [0],
      className,
      isIntersecting,
      ...options,
      ...dataOptions,
    };

    createObserver([element], mergedOptions.targetClass || targetClass, mergedOptions, (activeBlock, shouldAdd) => {
      activeBlock.classList.toggle(mergedOptions.className, shouldAdd);
    });
  });
}

/**
 * スクロールアップ時にクラスを削除
 * @param {string} elem - 対象要素のセレクタ
 * @param {string} rootMargin - ビューポートのマージン
 * @param {string|null} targetClass - クラスを付与する対象要素のセレクタ
 * @param {string} className - 操作するクラス名
 * @param {boolean} isIntersecting - 交差判定の方向
 * @param {Object} options - 追加のオプション
 *
 * @example
 * // スクロールに連動するアニメーション
 * removeActiveOnScrollUp('.js-scroll-section', '50px', null, 'is-active');
 */
function removeActiveOnScrollUp(elem, rootMargin, targetClass = null, className, isIntersecting = true, options = {}) {
  const elements = document.querySelectorAll(elem);

  elements.forEach(element => {
    const dataOptions = parseDataAttributes(element);
    const mergedOptions = {
      rootMargin,
      threshold: [0],
      className,
      isIntersecting,
      ...options,
      ...dataOptions,
    };

    createObserver([element], mergedOptions.targetClass || targetClass, mergedOptions, (activeBlock, shouldAdd) => {
      if (shouldAdd) {
        activeBlock.classList.add(mergedOptions.className);
      } else if (activeBlock.getBoundingClientRect().top > 0) {
        activeBlock.classList.remove(mergedOptions.className);
      }
    });
  });
}

export { addActive, toggleActive, removeActiveOnScrollUp };
