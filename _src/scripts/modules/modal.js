import { magnificPopup } from '../libs/magnific';

document.addEventListener('DOMContentLoaded', () => {
  const body = document.getElementsByTagName('body')[0];
  const locationModals = document.querySelectorAll('[data-location-modal]');

  $('.js-modal-video').magnificPopup({
    type: 'iframe',
    overflowY: 'scroll',
    preloader: true,
    midClick: true,
    closeOnContentClick: false,
    closeBtnInside: true,
    callbacks: {
      beforeOpen() {
        this.st.mainClass = this.st.el.attr('data-effect');
      }
    }
  });

  $('.js-modal-inline').magnificPopup({
    type: 'inline',
    removalDelay: 100,
    preloader: false,
    midClick: true,
    closeOnContentClick: false,
    closeBtnInside: true,
    closeMarkup: '<button title="%title%" type="button" class="mfp-close">&#215;</button>',
    callbacks: {
      beforeOpen() {
        this.st.mainClass = this.st.el.attr('data-effect');
      }
    }
  });

  if (locationModals) {
    locationModals.forEach(modal => {
      const showDetails = modal.querySelector('[data-location-show-detail]');
      const hideDetails = modal.querySelector('[data-location-hide-detail]');

      if (showDetails) {
        showDetails.addEventListener(
          'click',
          () => {
            modal.classList.add('is-expanded');
          },
          false
        );
      }

      if (hideDetails) {
        hideDetails.addEventListener(
          'click',
          () => {
            modal.classList.remove('is-expanded');
          },
          false
        );
      }
    });
  }
});
