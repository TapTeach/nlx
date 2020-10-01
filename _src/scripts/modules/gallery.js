document.addEventListener('DOMContentLoaded', () => {
  const lazySizes = require('lazysizes');
  const galleries = document.querySelectorAll('[data-gallery]');

  if (galleries) {
    galleries.forEach(gallery => {
      lightGallery(gallery, {
        enableDrag: false,
        download: true,
        videoMaxWidth: '1200px'
      });
    });
  }
});
