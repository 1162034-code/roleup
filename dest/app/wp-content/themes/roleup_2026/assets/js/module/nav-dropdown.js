function navDropdown() {
  const toggleBtns = document.querySelectorAll('.js-dropdown-btn');

  function getDropdownHeight(dropdown) {
    // 一時的に高さを自動に設定して測定
    const originalHeight = dropdown.style.height;
    const originalOverflow = dropdown.style.overflow;
    const originalTransition = dropdown.style.transition;

    // トランジションを一時的に無効化して測定
    dropdown.style.transition = 'none';
    dropdown.style.height = 'auto';
    dropdown.style.overflow = 'visible';

    // ブラウザに再描画を強制
    dropdown.offsetHeight;

    // 実際の高さを取得
    const rect = dropdown.getBoundingClientRect();
    const scrollHeight = dropdown.scrollHeight;
    const offsetHeight = dropdown.offsetHeight;

    // より大きな値を採用し、より大きな安全マージンを追加
    const height = Math.max(Math.ceil(rect.height), scrollHeight, offsetHeight);

    // 元のスタイルを復元
    dropdown.style.height = originalHeight;
    dropdown.style.overflow = originalOverflow;
    dropdown.style.transition = originalTransition;

    return height;
  }

  toggleBtns.forEach(toggleBtn => {
    const dropdownList = toggleBtn.nextElementSibling;

    toggleBtn.addEventListener('click', function () {
      const isExpanded = this.classList.contains('is-open');

      this.classList.toggle('is-open');

      if (!isExpanded) {
        const height = getDropdownHeight(dropdownList);
        // トランジションを有効にするため、まず0に設定してから目標値に設定
        dropdownList.style.height = '0px';
        requestAnimationFrame(() => {
          dropdownList.style.height = height + 'px';
        });
      } else {
        dropdownList.style.height = '0px';

        // トランジション終了後にインラインスタイルを削除
        const handleTransitionEnd = () => {
          dropdownList.style.removeProperty('height');
          dropdownList.removeEventListener('transitionend', handleTransitionEnd);
        };
        dropdownList.addEventListener('transitionend', handleTransitionEnd);
      }
    });
  });

  let resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      toggleBtns.forEach(toggleBtn => {
        if (toggleBtn.classList.contains('is-open')) {
          const dropdownList = toggleBtn.nextElementSibling;
          const height = getDropdownHeight(dropdownList);
          // リサイズ時は直接設定（トランジションなし）
          dropdownList.style.height = height + 'px';
        }
      });
    }, 100);
  });
}

export { navDropdown };
