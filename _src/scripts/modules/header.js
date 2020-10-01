document.addEventListener('DOMContentLoaded', () => {
  const verge = require('verge');
  const debounce = require('../utils/debounce');
  const body = document.getElementsByTagName('body')[0];
  const hamburgerOpen = document.querySelectorAll('[data-hamburger-open]');
  const hamburgerClose = document.querySelectorAll('[data-hamburger-close]');
  const scrollMenuItems = document.querySelectorAll('[data-menu-scroll]');
  const closeMenuItems = document.querySelectorAll('.js-close-menu');
  const header = document.querySelector('[data-header]');
  const navOpenClass = 'has-open-nav';

  function navOpen() {
    body.classList.add(navOpenClass);
  }

  function navClose() {
    body.classList.remove(navOpenClass);
  }

  function headerHeight() {
    const height = header.clientHeight;
    header.style.setProperty('--headerHeight', `${height}px`);
    return height;
  }

  function scrolledHeader() {
    let offset = 0;
    let lastPosition = 0;
    const elementHeight = header.clientHeight;

    function showHide() {
      const newPosition = verge.scrollY();
      const position = newPosition - lastPosition;

      // If we scrolled more than the element's height
      if (offset + position > elementHeight) {
        offset = elementHeight;
        if (!header.classList.contains('is-scrolled')) header.classList.add('is-scrolled');
      } else {
        offset += position;
        if (header.classList.contains('is-scrolled')) header.classList.remove('is-scrolled');
      }

      if (offset < 0) {
        offset = 0;
      }

      lastPosition = newPosition;
    }

    showHide();
  }

  hamburgerOpen.forEach(element => {
    element.addEventListener(
      'click',
      () => {
        navOpen();
      },
      false
    );
  });

  hamburgerClose.forEach(element => {
    element.addEventListener(
      'click',
      () => {
        navClose();
      },
      false
    );
  });

  scrollMenuItems.forEach(element => {
    element.addEventListener(
      'click',
      event => {
        event.preventDefault();
        const panelId = element.getAttribute('href');
        navClose();
        window.nbApp.utils.scrollToSelector(panelId, headerHeight());
      },
      false
    );
  });

  closeMenuItems.forEach(element => {
    element.addEventListener(
      'click',
      event => {
        event.preventDefault();
        navClose();
      },
      false
    );
  });

  if (header) {
    scrolledHeader();
    headerHeight();
    window.addEventListener('scroll', scrolledHeader);
    window.addEventListener('resize', debounce(headerHeight, 250));
  }
});
