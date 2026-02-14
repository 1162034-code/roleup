/**
 * オープニングアニメーション
 * フロントページ読み込み時に表示し、完了後にフェードアウト
 */
const DURATION_MS = 3500; // 表示時間（ミリ秒）
const FADE_OUT_DURATION_MS = 800; // フェードアウト時間（CSSと合わせる）

const initOpening = () => {
  const opening = document.querySelector('.js-opening');
  if (!opening) return;

  // オープニング表示中はスクロールを無効化
  document.body.style.overflow = 'hidden';

  const hideOpening = () => {
    opening.classList.add('is-hidden');
    opening.setAttribute('aria-hidden', 'true');

    // フェードアウト完了後にスクロールを有効化
    setTimeout(() => {
      document.body.style.overflow = '';
    }, FADE_OUT_DURATION_MS);
  };

  // 指定時間後にフェードアウト
  const timer = setTimeout(hideOpening, DURATION_MS);

  // ユーザーがクリック/タッチした場合は即座にスキップ
  const skipOpening = () => {
    clearTimeout(timer);
    hideOpening();
  };

  opening.style.pointerEvents = 'auto'; // クリック可能にする
  opening.addEventListener('click', skipOpening, { once: true });
};

// DOM準備完了後に実行
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initOpening);
} else {
  initOpening();
}

export { initOpening };
