import { debounce } from '../utils/debounce.js';

/**
 * モーダル、ハンバーガーメニュー開いた時にスクロールバー分の余白を作る
 * --scrollbar-width を CSS 変数として設定
 */
function observeScrollbarWidth() {
  const outer = document.createElement('div');
  const inner = document.createElement('div');

  outer.style.visibility = 'hidden';
  outer.style.overflow = 'scroll';

  document.body.appendChild(outer);
  outer.appendChild(inner);
  const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;
  outer.parentNode.removeChild(outer);
  document.documentElement.style.setProperty('--scrollbar-width', `${scrollbarWidth}px`);
}

const initScrollbarWidth = () => {
  window.addEventListener('load', observeScrollbarWidth);
  window.addEventListener('resize', debounce(observeScrollbarWidth));
};

export { initScrollbarWidth };
