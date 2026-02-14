/**
 * アコーディオン
 * @class Accordion
 * @constructor
 * @param {Object} [options] - オプション
 * @param {boolean} [options.mobileOnly] - スマートフォンでのみアコーディオンを有効にするかどうか
 * @param {number} [options.breakpoint] - スマートフォンの画面サイズの境界値
 * @param {string} [options.mobileClass] - スマートフォンでのみ付与するクラス名
 * @param {string} [options.desktopClass] - PCでのみ付与するクラス名
 * @param {number} [options.animationDuration] - アニメーションのduration(ms)
 * @param {string} [options.animationEasing] - アニメーションのeasing
 */

class Accordion {
  constructor(options = {}) {
    this.options = {
      accordionSelector: options.accordionSelector || '.js-accordion',
      contentSelector: options.contentSelector || '.js-accordion-content',
      mobileOnly: options.mobileOnly || false,
      breakpoint: options.breakpoint || 768,
      mobileClass: options.mobileClass || 'is-sp',
      desktopClass: options.desktopClass || 'is-pc',
      animationDuration: options.animationDuration || 400,
      animationEasing: options.animationEasing || 'ease-in-out',
      ...options,
    };
    this.accordions = document.querySelectorAll(this.options.accordionSelector);
    this.isAnimating = false;
    this.isMobileView = false;
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.handleResize();
    window.addEventListener('resize', this.debounce(this.handleResize.bind(this), 250));
  }

  setupEventListeners() {
    this.accordions.forEach(item => {
      const summary = item.querySelector('summary');
      const content = item.querySelector(this.options.contentSelector);

      if (!summary || !content) return;

      summary.addEventListener('click', this.handleClick.bind(this, item, content));
      summary.addEventListener('keydown', this.handleKeydown.bind(this, summary));
    });
  }

  async handleClick(item, content, e) {
    e.preventDefault();

    if (this.isAnimating || (this.options.mobileOnly && !this.isMobile())) return;
    this.isAnimating = true;

    try {
      if (item.open) {
        await this.animateAccordion(content, false);
        item.removeAttribute('open');
      } else {
        item.setAttribute('open', '');
        await this.animateAccordion(content, true);
      }
    } catch (error) {
      console.error('Accordion animation error:', error);
    } finally {
      this.isAnimating = false;
    }
  }

  handleKeydown(summary, e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      summary.click();
    }
  }

  animateAccordion(content, isOpening) {
    return new Promise((resolve) => {
      const startHeight = isOpening ? 0 : content.scrollHeight;
      const endHeight = isOpening ? content.scrollHeight : 0;

      content.style.height = `${startHeight}px`;
      content.style.overflow = 'hidden';

      requestAnimationFrame(() => {
        const animation = content.animate([
          { height: `${startHeight}px` },
          { height: `${endHeight}px` },
        ], {
          duration: this.options.animationDuration,
          easing: this.options.animationEasing,
        });

        animation.onfinish = () => {
          content.style.height = isOpening ? 'auto' : '0';
          content.style.overflow = '';
          resolve();
        };
      });
    });
  }

  handleResize() {
    const wasMobile = this.isMobileView;
    this.isMobileView = this.isMobile();

    this.accordions.forEach(item => {
      const summary = item.querySelector('summary');
      const content = item.querySelector(this.options.contentSelector);
      if (this.options.mobileOnly) {
        if (this.isMobileView) {
          item.classList.remove(this.options.desktopClass);
          item.classList.add(this.options.mobileClass);
          summary.removeAttribute('tabindex');
          if (!wasMobile || !item.hasAttribute('open')) {
            this.closeAccordion(item, content);
          }
        } else {
          item.classList.remove(this.options.mobileClass);
          item.classList.add(this.options.desktopClass);
          summary.setAttribute('tabindex', '-1');
          this.openAccordion(item, content);
        }
      } else if (item.open && content.scrollHeight > 0 && content.offsetHeight === 0) {
        content.style.height = 'auto';
      }
    });
  }

  closeAccordion(item, content) {
    item.removeAttribute('open');
    content.style.height = '0';
    content.style.overflow = 'hidden';
  }

  openAccordion(item, content) {
    item.setAttribute('open', '');
    content.style.height = 'auto';
    content.style.overflow = '';
  }

  isMobile() {
    return window.innerWidth <= this.options.breakpoint;
  }

  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
}

export default Accordion;
