document.addEventListener('DOMContentLoaded', () => {
  const debounce = require('../utils/debounce');
  const body = document.getElementsByTagName('body')[0];
  const accordions = document.querySelectorAll('[data-faq-dt]');
  const header = document.querySelector('[data-header]');

  if (accordions) {
    const headerHeight = () => {
      const height = header.clientHeight;
      return height;
    };

    accordions.forEach(dt => {
      dt.addEventListener(
        'click',
        () => {
          dt.classList.toggle('is-expanded');

          // moves window up to top of accordion
          //window.nbApp.utils.scrollToSelector(dt, headerHeight());

          // remove class off other accordions so only 1 can be open at a time
          accordions.forEach(accordion => {
            if (accordion !== dt && accordion.classList.contains('is-expanded')) {
              accordion.classList.remove('is-expanded');
            }
          });
        },
        false
      );
    });
  }
});
