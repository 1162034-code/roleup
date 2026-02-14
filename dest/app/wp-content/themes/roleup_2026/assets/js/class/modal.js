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

    try {
      modal.showModal();
      // requestAnimationFrameを使用してトランジションのタイミングを制御
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          modal.classList.add(this.CLASSES.MODAL_OPEN);
          this.body.classList.add(this.CLASSES.BODY_LOCKED);
          this.setInitialFocus(modal);
        });
      });
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

  setInitialFocus(modal) {
    const focusableElements = this.getFocusableElements(modal);
    if (focusableElements.length > 0) {
      setTimeout(() => {
        focusableElements[0].focus();
      }, 100);
    }
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
