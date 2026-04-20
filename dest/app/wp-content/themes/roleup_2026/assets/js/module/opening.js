/**
 * オープニングアニメーション
 * フォント・画像読み込み完了後にフェードインし、表示時間後にフェードアウト
 * 同一タブのセッション中は1回のみ表示（sessionStorage）。キーは header.php 内の先行スクリプトと同一に保つこと。
 */
const STORAGE_KEY = 'roleup_front_opening_seen';
const DURATION_MS = 1100; // 表示時間（ミリ秒）
const FADE_OUT_DURATION_MS = 100; // フェードアウト時間（CSSと合わせる）

const readOpeningSeen = () => {
  try {
    return window.sessionStorage.getItem(STORAGE_KEY) === '1';
  } catch {
    return false;
  }
};

const markOpeningSeen = () => {
  try {
    window.sessionStorage.setItem(STORAGE_KEY, '1');
  } catch {
    // プライベートモード等では無視
  }
};

/**
 * フォントと画像の読み込み完了を待つ
 */
const waitForResources = () => {
  const fontsReady = document.fonts?.ready
    ? document.fonts.ready
    : Promise.resolve();
  const loadComplete =
    document.readyState === 'complete'
      ? Promise.resolve()
      : new Promise((resolve) => window.addEventListener('load', resolve));

  return Promise.all([fontsReady, loadComplete]);
};

const initOpening = () => {
  const opening = document.querySelector('.js-opening');
  if (!opening) return Promise.resolve();

  if (readOpeningSeen()) {
    const html = document.documentElement;
    if (html.classList.contains('is-loading')) {
      html.classList.remove('is-loading');
    }
    html.classList.remove('is-opening-skip');
    opening.classList.add('is-hidden');
    opening.setAttribute('aria-hidden', 'true');
    opening.style.pointerEvents = 'none';
    return Promise.resolve();
  }

  return waitForResources().then(() => {
    return new Promise((resolve) => {
      // フォント・画像読み込み完了後、フェードイン開始
      const html = document.documentElement;
      if (html.classList.contains('is-loading')) {
        html.classList.remove('is-loading');
      }
      html.classList.remove('is-opening-skip');

      const hideOpening = () => {
        markOpeningSeen();
        opening.classList.add('is-hidden');
        opening.setAttribute('aria-hidden', 'true');

        setTimeout(() => resolve(), FADE_OUT_DURATION_MS);
      };

      const timer = setTimeout(hideOpening, DURATION_MS);

      const skipOpening = () => {
        clearTimeout(timer);
        hideOpening();
      };

      opening.style.pointerEvents = 'auto';
      opening.addEventListener('click', skipOpening, { once: true });
    });
  });
};

export { initOpening };
