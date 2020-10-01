import { magnificPopup } from '../libs/magnific';

document.addEventListener('DOMContentLoaded', () => {
  let i = null;
  const verge = require('verge');
  const hkjs = require('hookahjs');
  const lazySizes = require('lazysizes');
  const inview = document.querySelectorAll('[inview]');
  const videobg = document.querySelectorAll('[data-video-bg]');
  const triggerPoint = Math.abs(verge.viewportH()) * -1 * 0.1;

  // Turn off lazy loading images script
  // window.lazySizesConfig = window.lazySizesConfig || {};
  // window.lazySizesConfig.init = false;
  // window.lazySizesConfig.customMedia = {
  //   '--default': '(min-width: 310px)',
  //   '--medium': '(min-width: 48em)',
  //   '--large': '(min-width: 80em)'
  // };

  lazySizes.init();
  hkjs.init();

  // animate elements into view
  function inviewAnimated() {
    for (i = 0; i < inview.length; i += 1) {
      if (verge.inViewport(inview[i], triggerPoint)) {
        inview[i].classList.add('on');
      }
    }
  }

  // play video when in view otherwise pause
  function videoInView() {
    if (videobg) {
      videobg.forEach(bg => {
        const video = bg.querySelector('[data-video-bgfile]');

        if (verge.inViewport(bg, triggerPoint)) {
          video.play();
        } else {
          video.pause();
        }
      });
    }
  }

  function init() {
    inviewAnimated();
    videoInView();
  }

  // Lazy loading script initializing when dom is loaded
  // document.onreadystatechange = () => {
  //   if (document.readyState === 'complete') {
  //     // Initialize image lazy-loading with a slight delay to prevent <picture> element from not loading
  //     setTimeout(() => {
  //       lazySizes.init();
  //     }, 500);
  //   }
  // };

  init();
  window.addEventListener('scroll', inviewAnimated);
  window.addEventListener('scroll', videoInView);
});
