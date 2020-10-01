import { tns } from 'tiny-slider/src/tiny-slider';

document.addEventListener('DOMContentLoaded', () => {
  const extend = require('../utils/extend');
  const carousels = document.querySelectorAll('[data-carousel]');

  if (carousels) {
    carousels.forEach(carousel => {
      let mergedSettings = {};
      const slides = carousel.querySelector('[data-carousel-slides]');
      const eleCarouselCounter = carousel.querySelector('[data-carousel-counter]');
      const eleSlideIndex = carousel.querySelector('[data-carousel-index]');
      const eleSlideTotal = carousel.querySelector('[data-carousel-total]');
      const settingsOnCarousel = JSON.parse(carousel.getAttribute('data-carousel-options'));
      const carouselControls = carousel.querySelector('[data-carousel-controls]');

      const settingsDefault = {
        container: slides,
        // controlsText: ['<span>Previous Slide</span>', '<span>Next Slide</span>'],
        controlsContainer: carouselControls,
        nav: false,
        speed: 500
      };

      function updateSlideIndex(info) {
        const indexCurrent = info.index + 1;
        eleSlideIndex.innerHTML = indexCurrent;
      }

      // combine settings
      mergedSettings = extend(settingsDefault, settingsOnCarousel);

      // initialize tiny-slider
      carousel = tns(mergedSettings);

      // show total slides
      if (eleSlideTotal && carousel) {
        const slidesTotal = carousel.getInfo().slideCount;
        eleSlideTotal.innerHTML = slidesTotal;
      }

      // update slide index
      if (eleCarouselCounter && eleSlideIndex && carousel) {
        const carouselInfo = carousel.getInfo();

        if (carouselInfo.slideBy > 1) {
          eleCarouselCounter.setAttribute('aria-hidden', true);
        } else {
          carousel.events.on('indexChanged', updateSlideIndex);
        }
      }
    });
  }
});
