/**
 * モーダルウィンドウの制御を行うクラス
 */
class ModalManager {
  constructor() {
    this.triggers = document.querySelectorAll('.js-modal-trigger');
    this.closeButtons = document.querySelectorAll('.js-modal-close');
    this.modals = document.querySelectorAll('.js-modal');
    this.body = document.body;
    this.lastFocusedElement = null;
    this.activeModal = null;

    // 定数定義
    this.CLASSES = {
      MODAL_OPEN: 'is-open',
      BODY_LOCKED: 'is-modal-body-locked',
    };

    this.ANIMATION_DURATION = 300;

    this.init();
  }

  init() {
    this.bindEvents();
  }

  bindEvents() {
    this.triggers.forEach(trigger => {
      trigger.addEventListener('click', () => this.openModal(trigger.dataset.modal));
    });

    this.closeButtons.forEach(button => {
      button.addEventListener('click', () => this.closeModal(button.closest('dialog')));
    });

    this.modals.forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          this.closeModal(modal);
        }
      });

      modal.addEventListener('keydown', (e) => this.handleKeyDown(e));
    });
  }

  openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;

    this.lastFocusedElement = document.activeElement;
    this.activeModal = modal;
    const savedWindowScrollY = window.scrollY;

    try {
      modal.showModal();
      this.resetModalScroll(modal);
      this.restoreWindowScroll(savedWindowScrollY);
      // requestAnimationFrameを使用してトランジションのタイミングを制御
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          modal.classList.add(this.CLASSES.MODAL_OPEN);
          this.body.classList.add(this.CLASSES.BODY_LOCKED);
          this.resetModalScroll(modal);
          this.restoreWindowScroll(savedWindowScrollY);
          this.setInitialFocus(modal, savedWindowScrollY);
          requestAnimationFrame(() => {
            this.resetModalScroll(modal);
            this.restoreWindowScroll(savedWindowScrollY);
          });
        });
      });
      setTimeout(() => {
        this.resetModalScroll(modal);
        this.restoreWindowScroll(savedWindowScrollY);
      }, this.ANIMATION_DURATION + 50);
    } catch (error) {
      console.error('モーダルを開く際にエラーが発生しました:', error);
    }
  }

  closeModal(modal) {
    if (!modal) return;

    modal.classList.remove(this.CLASSES.MODAL_OPEN);
    this.body.classList.remove(this.CLASSES.BODY_LOCKED);

    setTimeout(() => {
      try {
        modal.close();
        this.restoreFocus();
        this.activeModal = null;
      } catch (error) {
        console.error('モーダルを閉じる際にエラーが発生しました:', error);
      }
    }, this.ANIMATION_DURATION);
  }

  /**
   * showModal / focus / SimpleBar 内などでスクロールが文末まで動くのを防ぐ
   */
  resetModalScroll(modal) {
    if (!modal) return;
    const resetEl = (el) => {
      el.scrollTop = 0;
      el.scrollLeft = 0;
    };
    resetEl(modal);
    modal.querySelectorAll('.simplebar-content-wrapper').forEach(resetEl);
    modal.querySelectorAll('*').forEach(resetEl);
  }

  /** html { scroll-behavior: smooth } 下でもページ位置がずれないよう同期スクロールで戻す */
  restoreWindowScroll(y) {
    const el = document.documentElement;
    const prev = el.style.scrollBehavior;
    el.style.scrollBehavior = 'auto';
    window.scrollTo(0, y);
    el.style.scrollBehavior = prev;
  }

  setInitialFocus(modal, savedWindowScrollY) {
    setTimeout(() => {
      // DOM 順の先頭フォーカスが本文末尾の a のとき、フォーカス追従で内側スクロールが文末になる。
      // position:fixed の閉じるボタンへフォーカスすると追従スクロールが起きにくい。
      const closeBtn = modal.querySelector('.js-modal-close');
      const fallback = this.getFocusableElements(modal)[0];
      const target = closeBtn || fallback;
      if (target) {
        target.focus({ preventScroll: true });
      }
      this.resetModalScroll(modal);
      this.restoreWindowScroll(savedWindowScrollY);
    }, 100);
  }

  restoreFocus() {
    if (this.lastFocusedElement) {
      this.lastFocusedElement.focus();
      this.lastFocusedElement = null;
    }
  }

  handleKeyDown(e) {
    if (e.key === 'Escape') {
      this.closeModal(this.activeModal);
    } else if (e.key === 'Tab') {
      this.handleTabKey(e);
    }
  }

  handleTabKey(e) {
    if (!this.activeModal) return;

    const focusableElements = this.getFocusableElements(this.activeModal);
    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (e.shiftKey && document.activeElement === firstElement) {
      e.preventDefault();
      lastElement.focus();
    } else if (!e.shiftKey && document.activeElement === lastElement) {
      e.preventDefault();
      firstElement.focus();
    }
  }

  getFocusableElements(modal) {
    return Array.from(modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    ));
  }
}

export default ModalManager;
