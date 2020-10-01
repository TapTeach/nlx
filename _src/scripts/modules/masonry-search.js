document.addEventListener('DOMContentLoaded', () => {
  const throttle = require('../utils/throttle');
  const debounce = require('../utils/debounce');
  const browserCanUseCssVariables = require('../utils/supports-css-variables');
  const masonryWall = document.querySelector('[data-masonry-search-wall]');
  const masonryLoader = document.querySelector('[data-masonry-loader]');
  const header = document.querySelector('[data-header]');

  if (masonryWall) {
    let qsRegex;
    const shuffleState = JSON.parse(masonryWall.getAttribute('data-masonry-search-shuffle'));
    const elemSearch = document.querySelector('[data-masonry-search]');
    const elemSearchInput = document.querySelector('[data-masonry-search-input]');
    const btnClearSearch = document.querySelectorAll('[data-masonry-clear-search]');
    const eleNoResults = document.querySelector('[data-masonry-noresults]');

    const isoTope = new Isotope(masonryWall, {
      itemSelector: '[data-masonry-search-item]',
      layoutMode: 'packery',
      packery: {
        gutter: 0
      },
      percentPosition: true,
      visibleStyle: { transform: 'translateY(0)', opacity: 1 },
      hiddenStyle: { transform: 'translateY(100px)', opacity: 0 }
    });

    const searchStickyOffset = () => {
      const offset = header.clientHeight;

      if (browserCanUseCssVariables()) {
        elemSearch.style.setProperty('--headerOffset', `${offset}px`);
      } else {
        elemSearch.style.top = `${offset}px`;
      }
    };

    const arangeComplete = () => {
      isoTope.once('arrangeComplete', filteredItems => {
        if (filteredItems.length < 1) {
          eleNoResults.setAttribute('aria-hidden', false);
        } else {
          eleNoResults.setAttribute('aria-hidden', true);
        }
      });
    };

    const masonrySearch = () => {
      qsRegex = new RegExp(elemSearchInput.value, 'gi');

      isoTope.arrange({
        filter() {
          return qsRegex
            ? $(this)
                .text()
                .match(qsRegex)
            : true;
        }
      });

      arangeComplete();
    };

    const masonrySearchClose = () => {
      elemSearchInput.value = '';
      elemSearchInput.classList.remove('hkjs--not-empty');
      isoTope.arrange({
        filter: '*'
      });
      arangeComplete();
    };

    if (shuffleState === true) {
      isoTope.shuffle();
    }

    elemSearchInput.addEventListener(
      'keyup',
      () => {
        throttle(masonrySearch(this), 250);
      },
      false
    );

    btnClearSearch.forEach(btn => {
      btn.addEventListener(
        'click',
        () => {
          masonrySearchClose();
        },
        false
      );
    });

    masonryLoader.classList.add('hide');
    masonryWall.classList.add('is-loaded');

    searchStickyOffset();
    window.addEventListener('resize', debounce(searchStickyOffset, 250));
  }
});
