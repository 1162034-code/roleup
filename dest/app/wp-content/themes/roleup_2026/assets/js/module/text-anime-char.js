/**
 * js-text-anime-up__main 内のテキストを1文字ずつspanでラップし、
 * スタガーアニメーション用の --char-index を付与する
 *
 * data-char-split 属性を持つ要素にのみ適用
 */
export function initTextAnimeChar() {
  const elements = document.querySelectorAll('[data-char-split]');

  elements.forEach((element) => {
    splitTextToChars(element);
    element.closest('.js-text-anime-up')?.classList.add('is-ready');
  });
}

/**
 * 要素内のテキストを1文字ずつspanでラップする
 * 既存の子要素（u-br-sp等）の構造は維持する
 * @param {Element} element - 対象要素
 */
function splitTextToChars(element) {
  let charIndex = 0;

  const walk = (node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent;
      if (!text.trim()) return;

      const fragment = document.createDocumentFragment();
      for (const char of text) {
        const span = document.createElement('span');
        span.className = 'js-text-anime-up__char';
        span.textContent = char;
        span.style.setProperty('--char-index', String(charIndex));
        fragment.appendChild(span);
        charIndex += 1;
      }
      node.parentNode.replaceChild(fragment, node);
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      Array.from(node.childNodes).forEach(walk);
    }
  };

  Array.from(element.childNodes).forEach(walk);
}
