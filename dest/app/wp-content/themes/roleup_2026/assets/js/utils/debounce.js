/**
 * デバウンス関数
 * @param {Function} func - 実行する関数
 * @param {number} [wait=250] - 待機時間（ミリ秒）
 * @returns {Function}
 */
function debounce(func, wait = 250) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

export { debounce };
