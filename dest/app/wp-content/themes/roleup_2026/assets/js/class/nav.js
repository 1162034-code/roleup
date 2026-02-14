/**
 * ナビゲーション
 *
 * breakPointsで設定したサイズ以下のみ、ハンバーガーをクリックするとナビゲーションが開きます。
 * ナビゲーションが開いている間、body要素に.is-activeクラスを付与することでスクロールを止める処理をします。
 * ナビゲーションが開いている間、Escキーを押すとナビゲーションを閉じます。
 * ナビゲーションが開いている間、overlay要素をクリックするとナビゲーションを閉じます。
 * ナビゲーションが開いている間、Tabキーでナビゲーションのリンクをフォーカスする処理をします。
 * ナビゲーションが閉じている間、Tabキーでナビゲーションのリンクをフォーカスしないようにする処理をします。
 */

import { BREAKPOINTS } from '../module/break-points.js';

class Navigation {
  constructor() {
    this.menuButton = document.querySelector('.js-nav-btn');
    this.menuWrap = document.querySelector('.js-nav-wrap');
    this.menu = document.querySelector('.js-nav');
    this.overlay = document.getElementById('js-nav-overlay');
    this.menuLinks = this.menu.querySelectorAll('a');
    this.body = document.body;
    this.classActive = 'is-active';
    this.classBodyLocked = 'is-nav-body-locked';
    this.breakPoints = BREAKPOINTS.TAB;

    this.init();
  }

  init() {
    this.menuButton.addEventListener('click', () => this.toggleMenu());
    this.overlay.addEventListener('click', () => this.closeMenu());
    document.addEventListener('keydown', (e) => this.handleEscapeKey(e));
    this.menu.addEventListener('keydown', (e) => this.handleMenuKeyboardNavigation(e));
    this.menuButton.addEventListener('keydown', (e) => this.handleMenuButtonKeyboardNavigation(e));
    this.menuLinks.forEach(link => {
      link.addEventListener('click', () => this.handleMenuLinkClick());
    });
    window.addEventListener('resize', () => this.handleResize());
  }

  toggleMenu() {
    const isExpanded = this.menuButton.getAttribute('aria-expanded') === 'true';
    this.menuButton.setAttribute('aria-expanded', !isExpanded);
    this.menuWrap.classList.toggle(this.classActive);
    this.overlay.classList.toggle(this.classActive);
    this.overlay.setAttribute('aria-hidden', isExpanded);
    this.body.classList.toggle(this.classBodyLocked);

    if (!isExpanded) {
      this.menuButton.setAttribute('aria-label', 'メニューを閉じる');
      this.menuLinks[0].focus();
    } else {
      this.menuButton.setAttribute('aria-label', 'メニューを開く');
      this.menuButton.focus();
    }
  }

  closeMenu() {
    this.menuButton.setAttribute('aria-expanded', 'false');
    this.menuWrap.classList.remove(this.classActive);
    this.overlay.classList.remove(this.classActive);
    this.overlay.setAttribute('aria-hidden', 'true');
    this.menuButton.setAttribute('aria-label', 'メニューを開く');
    this.menuButton.focus();
    this.body.classList.remove(this.classBodyLocked);
  }

  handleEscapeKey(e) {
    if (e.key === 'Escape' && this.menuWrap.classList.contains(this.classActive)) {
      this.closeMenu();
    }
  }

  handleMenuKeyboardNavigation(e) {
    if (window.innerWidth > this.breakPoints) return;
    if (!this.menuWrap.classList.contains(this.classActive)) return;

    const firstLink = this.menuLinks[0];
    const lastLink = this.menuLinks[this.menuLinks.length - 1];

    if (e.key === 'Tab') {
      if (e.shiftKey && document.activeElement === firstLink) {
        e.preventDefault();
        this.menuButton.focus();
      } else if (!e.shiftKey && document.activeElement === lastLink) {
        e.preventDefault();
        this.menuButton.focus();
      }
    }
  }

  handleMenuButtonKeyboardNavigation(e) {
    if (window.innerWidth > this.breakPoints) return;
    if (!this.menu.classList.contains(this.classActive)) return;

    if (e.key === 'Tab') {
      e.preventDefault();
      if (e.shiftKey) {
        this.menuLinks[this.menuLinks.length - 1].focus();
      } else {
        this.menuLinks[0].focus();
      }
    }
  }

  handleMenuLinkClick() {
    if (window.innerWidth <= this.breakPoints) {
      this.closeMenu();
    }
  }

  handleResize() {
    if (window.innerWidth > this.breakPoints) {
      this.menuWrap.classList.remove(this.classActive);
      this.menuButton.setAttribute('aria-expanded', 'false');
      this.menuButton.setAttribute('aria-label', 'メニューを開く');
      this.overlay.classList.remove(this.classActive);
      this.overlay.setAttribute('aria-hidden', 'true');
      this.body.classList.remove(this.classBodyLocked);
    }
  }
}

export default Navigation;
