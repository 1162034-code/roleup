/**
 * リサイズ中は transition を無効化
 * body に is-resizing クラスを付与
 */
const initResizeTransition = () => {
  let resizeTimeout;
  window.addEventListener('resize', () => {
    document.body.classList.add('is-resizing');
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      document.body.classList.remove('is-resizing');
    }, 250);
  });
};

export { initResizeTransition };
