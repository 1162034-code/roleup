/**
 * オープニングアニメーション
 * フロントページ読み込み時に表示し、完了後にフェードアウト
 */
const DURATION_MS = 1500; // 表示時間（ミリ秒）
const FADE_OUT_DURATION_MS = 100; // フェードアウト時間（CSSと合わせる）

const initOpening = () => {
  const opening = document.querySelector('.js-opening');
  if (!opening) return Promise.resolve();

  return new Promise((resolve) => {
    const hideOpening = () => {
      opening.classList.add('is-hidden');
      opening.setAttribute('aria-hidden', 'true');

      // フェードアウト完了後に resolve
      setTimeout(() => {
        resolve();
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
  });
};

export { initOpening };
