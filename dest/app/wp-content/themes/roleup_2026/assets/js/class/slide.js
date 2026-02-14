/**
 * @class ImageCarousel
 * @description 画像スライダー
 * @param {String} element - スライダー要素のセレクタ
 * @param {Object} userOptions - Splideのオプション
 *
 * @example
 * const carousel = new ImageCarousel('.js-slide');
 */

import Splide from '../vendor/splide.esm.js';
class ImageCarousel {
  constructor(element, userOptions = {}) {
    this.sliders = document.querySelectorAll(element);
    this.slides = [];
    this.init(userOptions);
  }

  init(userOptions) {
    this.sliders.forEach(slider => {
      const slideContents = slider.querySelectorAll('.splide__slide');
      const slideLength = slideContents.length;

      const defaultOptions = {
        type: slideLength >= 2 ? 'fade' : '',
        rewind: true,
        autoplay: true,
        interval: 5000,
        speed: 2000,
        perPage: 1,
        pauseOnHover: false,
        pauseOnFocus: false,
        drag: slideLength >= 2,
        snap: slideLength >= 2,
        arrows: slideLength >= 2,
        pagination: slideLength >= 2,
      };

      const options = { ...defaultOptions, ...userOptions };

      const slide = new Splide(slider, options);
      slide.mount();
      this.slides.push(slide);
    });
  }
}

/**
 * @class GallerySlider
 * @description サムネイル付きギャラリースライダー
 * @param {String} mainElement - メインスライダー要素のセレクタ
 * @param {String} thumbElement - サムネイルスライダー要素のセレクタ
 * @param {Object} userMainOptions - メインスライダーのSplideオプション
 * @param {Object} userThumbOptions - サムネイルスライダーのSplideオプション
 *
 * @example
 * const gallery = new GallerySlider('.js-gallery-slide', '.js-thumbnails');
 */
class GallerySlider extends ImageCarousel {
  constructor(mainElement, thumbElement, userMainOptions = {}, userThumbOptions = {}) {
    super(mainElement, userMainOptions);
    this.thumbSliderElement = document.querySelector(thumbElement);
    this.initThumbnail(userThumbOptions);
  }

  init(userMainOptions) {
    const defaultOptions = {
      type: 'fade',
      heightRatio: 0.5,
      pagination: false,
      arrows: false,
      cover: true,
    };

    const mainOptions = { ...defaultOptions, ...userMainOptions };

    this.slide = new Splide(this.sliders[0], mainOptions);
    this.slides.push(this.slide);
  }

  initThumbnail(userThumbOptions) {
    const thumbDefaultOptions = {
      rewind: true,
      fixedWidth: 104,
      fixedHeight: 58,
      isNavigation: true,
      gap: 10,
      // focus: 'center',
      pagination: false,
      cover: true,
      dragMinThreshold: {
        mouse: 4,
        touch: 10,
      },
      breakpoints: {
        640: {
          fixedWidth: 66,
          fixedHeight: 38,
        },
      },
    };

    const thumbOptions = { ...thumbDefaultOptions, ...userThumbOptions };

    this.thumbSplide = new Splide(this.thumbSliderElement, thumbOptions);
    this.slide.sync(this.thumbSplide);
    this.slide.mount();
    this.thumbSplide.mount();
  }
}

export { ImageCarousel, GallerySlider };
