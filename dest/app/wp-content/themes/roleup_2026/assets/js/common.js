import { ImageCarousel, GallerySlider } from './class/slide.js';
import Navigation from './class/nav.js';
import ModalManager from './class/modal.js';
import Accordion from './class/accordion.js';
import TabModule from './class/tab.js';
import { pageTop } from './module/pageTop.js';
import { initOpening } from './module/opening.js';
import { initScrollbarWidth } from './module/scrollbarWidth.js';
import { initResizeTransition } from './module/resizeTransition.js';
import { addActive, toggleActive, removeActiveOnScrollUp } from './module/handleIntersection.js';
import { initParallax } from './module/parallax.js';
import { navDropdown } from './module/nav-dropdown.js';
import { initTextAnimeChar } from './module/text-anime-char.js';

(function () {
  // ------------------------------------------------------------------
  // ** ナビゲーション **
  // ------------------------------------------------------------------
  const nav = new Navigation();

  // ------------------------------------------------------------------
  // ** モーダル、ハンバーガーメニュー開いた時にスクロールバー分の余白を作る **
  // ------------------------------------------------------------------
  initScrollbarWidth();

  // ------------------------------------------------------------------
  // ** リサイズ中は transition を無効化 **
  // ------------------------------------------------------------------
  initResizeTransition();

  // ------------------------------------------------------------------
  // ** スライド **
  // ------------------------------------------------------------------
  // const carousel = new ImageCarousel('.js-slide');
  // const gallery = new GallerySlider('.js-gallery-slide', '.js-thumbnails');

  // ------------------------------------------------------------------
  // ** モーダル **
  // ------------------------------------------------------------------
  const modalManager = new ModalManager();

  // ------------------------------------------------------------------
  // ** タブ **
  // ------------------------------------------------------------------
  const tabs = document.querySelectorAll('.js-tab');
  tabs.forEach(tab => {
    new TabModule(tab);
  });

  // ------------------------------------------------------------------
  // ** アコーディオン **
  // ------------------------------------------------------------------
  // ---- デフォルトの設定でアコーディオンを初期化 ----
  const defaultAccordion = new Accordion();

  // ---- モバイルのみでアコーディオンを動作させたい場合 ----
  const mobileAccordion = new Accordion({
    accordionSelector: '.js-accordion-sp-toggle', // アコーディオンのセレクタ
    contentSelector: '.js-accordion-content', // アコーディオンのコンテンツセレクタ
    mobileOnly: true, // スマートフォンでのみアコーディオンを有効(default: false)
    breakpoint: 1024, // ブレークポイントを1024pxに設定(default: 768px)
    mobileClass: 'is-sp', // スマートフォンでのみ付与するクラス名をカスタマイズ(default: 'is-sp')
    desktopClass: 'is-pc', // PCでのみ付与するクラス名をカスタマイズ(default: 'is-pc')
    animationDuration: 400, // アニメーション時間をカスタマイズ（ミリ秒）(default: 400)
    animationEasing: 'ease-in-out', // イージング関数をカスタマイズ(default: 'ease-in-out')
  });

  // ------------------------------------------------------------------
  // ** テキストアニメーション（文字単位） **
  // DOM準備完了時に文字分割を実行
  // ------------------------------------------------------------------
  initTextAnimeChar();

  // ------------------------------------------------------------------
  // ** オープニング（フロントページのみ）・スクロールアニメーション **
  // ページ全体の読み込み完了後に実行
  // ------------------------------------------------------------------
  const runOpeningAndAnimations = () => {
    initOpening().then(() => {
      addActive('.js-text-anime-up', '-10%', null, 'is-active');
      addActive('.js-fade-in', '-25%', null, 'is-active');
    });
  };
  if (document.readyState === 'complete') {
    runOpeningAndAnimations();
  } else {
    window.addEventListener('load', runOpeningAndAnimations);
  }
  // ------------------------------------------------------------------
  // ** パララックス（フロントページのみ） **
  // ------------------------------------------------------------------
  initParallax();

  // ------------------------------------------------------------------
  // ** init **
  // ------------------------------------------------------------------
  pageTop();
  navDropdown();
})();
