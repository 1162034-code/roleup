/**
 * 背景画像のパララックススクロール
 * スクロールに合わせて背景がゆっくり動く効果
 */
const PARALLAX_FACTOR = 0.15; // パララックス強度（0.1〜0.3が自然）

let ticking = false;

function updateParallax() {
  const elements = document.querySelectorAll('.js-parallax-bg');
  const viewportCenter = window.innerHeight / 2;

  elements.forEach((el) => {
    const section = el.closest('section');
    if (!section) return;

    const rect = section.getBoundingClientRect();
    const sectionCenter = rect.top + rect.height / 2;
    const offset = (sectionCenter - viewportCenter) * PARALLAX_FACTOR;

    el.style.transform = `translate3d(0, ${offset}px, 0)`;
  });

  ticking = false;
}

function onScroll() {
  if (!ticking) {
    requestAnimationFrame(updateParallax);
    ticking = true;
  }
}

const initParallax = () => {
  const elements = document.querySelectorAll('.js-parallax-bg');
  if (elements.length === 0) return;

  // 初期位置を設定
  updateParallax();

  window.addEventListener('scroll', onScroll, { passive: true });
};

export { initParallax };
