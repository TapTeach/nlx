document.addEventListener('DOMContentLoaded', () => {
  const masonryWall = document.querySelector('[data-masonry-wall]');
  const masonryLoader = document.querySelector('[data-masonry-loader]');
  const masonrySelect = document.querySelector('[data-masonry-select]');

  if (masonryWall) {
    const shuffleState = JSON.parse(masonryWall.getAttribute('data-masonry-shuffle'));

    const isoTope = new Isotope('.masonry', {
      itemSelector: '.masonry__item',
      layoutMode: 'packery',
      packery: {
        gutter: 0
      },
      percentPosition: true,
      visibleStyle: { transform: 'translateY(0)', opacity: 1 },
      hiddenStyle: { transform: 'translateY(100px)', opacity: 0 }
    });

    const filterMasonry = () => {
      const filterValue = masonrySelect.value;
      isoTope.arrange({ filter: filterValue });
    };

    if (shuffleState === true) {
      isoTope.shuffle();
    }

    masonryLoader.classList.add('hide');
    masonryWall.classList.add('is-loaded');

    // bind filter on select change
    masonrySelect.addEventListener('change', filterMasonry, false);
  }
});
