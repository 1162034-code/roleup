/**
 * タブ機能
 *
 * - タブコンテナ(【例】.p-tab)内でのみ動作します。
 * - タブ(【例】.p-tab__btn)にrole="tab"とaria-selected="true"を設定してください。
 * - タブの内容(【例】.p-tab__panel)にはrole="tabpanel"とaria-labelledby="tab-id"を設定してください。
 * - aria-labelledby="tab-id"には、タブ(【例】.p-tab__btn)のidを指定してください。
 * - data-tab="true"をbutton（【例】.p-tab__btn）に設定することで、タブの切り替えを有効にします。
 *
 * @param {HTMLElement} tabContainer
 * @constructor
 */
class TabModule {
  constructor(tabContainer) {
    this.tabContainer = tabContainer;
    this.tabs = this.tabContainer.querySelectorAll('[role="tab"]');
    this.tabList = this.tabContainer.querySelector('[role="tablist"]');
    this.tabPanels = this.tabContainer.querySelectorAll('[role="tabpanel"]');
    this.tabFocus = 0;

    this.init();
  }

  init() {
    this.tabs.forEach(tab => {
      tab.addEventListener('click', this.changeTabs.bind(this));
    });

    this.tabList.addEventListener('keydown', this.handleKeydown.bind(this));

    // 最初のパネルをアクティブに
    const firstPanel = this.tabPanels[0];
    if (firstPanel) {
      firstPanel.classList.add('is-visible');
    }
  }

  changeTabs(e) {
    const target = e.currentTarget;
    const parent = target.parentNode;

    // タブから現在すべての選択状態を取り除きます
    parent
      .querySelectorAll('[aria-selected="true"]')
      .forEach(t => {
        t.setAttribute('aria-selected', false);
        t.setAttribute('tabindex', -1);
      });

    // このタブを選択されたタブとして設定します
    target.setAttribute('aria-selected', true);
    target.setAttribute('tabindex', 0);

    // すべてのタブパネルを非表示にします
    this.tabPanels.forEach(panel => {
      panel.classList.remove('is-visible');
    });

    // 選択されたパネルを表示します
    const selectedPanel = this.tabContainer
      .querySelector(`#${target.getAttribute('aria-controls')}`);

    // transitionのためにタイミングをずらす
    requestAnimationFrame(() => {
      selectedPanel.classList.add('is-visible');
    });
  }

  handleKeydown(e) {
    // 左右の矢印キーの場合
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      e.preventDefault();
      const currentTab = this.tabList.querySelector('[aria-selected="true"]');
      const currentIndex = Array.from(this.tabs).indexOf(currentTab);
      let newIndex;

      if (e.key === 'ArrowLeft') {
        newIndex = currentIndex - 1;
        if (newIndex < 0) {
          newIndex = this.tabs.length - 1;
        }
      } else if (e.key === 'ArrowRight') {
        newIndex = currentIndex + 1;
        if (newIndex >= this.tabs.length) {
          newIndex = 0;
        }
      }

      this.tabs[newIndex].click();
      this.tabs[newIndex].focus();
    }
  }
}

export default TabModule;
