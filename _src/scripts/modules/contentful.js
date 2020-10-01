document.addEventListener('DOMContentLoaded', () => {
  const contentful = require('contentful');
  const lazySizes = require('lazysizes');
  const SPACE_ID = 'kdudvxp32u1w';
  const ACCESS_TOKEN = '2d283163c2b6a729a1294d941d2b84872199dd05c1e71a04d68fcbdf557676e8';
  const contentfulPicture = document.querySelectorAll('[data-contenful-picture]');
  const galleries = document.querySelectorAll('[data-contentful-gallery]');
  const client = contentful.createClient({
    space: SPACE_ID,
    accessToken: ACCESS_TOKEN
  });

  // Template: Gallery => render single thumbnail
  function renderSingleThumbnail(item) {
    return `<a href="${item.fields.file.url}?fit=fill&w=1400" class="gallery__permalink">
      <figure class="gallery__figure">
        <div><img data-src="${item.fields.file.url}?fit=fill&h=200&w=200" class="gallery__img lazyload thumb"></div>
      </figure>
    </a>`;
  }

  // Template: Gallery => render list of thumbnails
  function renderThumbnails(list) {
    const galleryList = [];

    list.forEach(item => {
      galleryList.push(renderSingleThumbnail(item));
    });

    return galleryList.join('\n');
  }

  // Contentful Picture
  if (contentfulPicture) {
    contentfulPicture.forEach(image => {
      const source = image.querySelector('[data-contentful-img]');

      if (source) {
        const sourceImgId = source.getAttribute('data-img-id');
        const sourceImgHeight = source.getAttribute('data-img-height');
        const sourceImgWidth = source.getAttribute('data-img-width');

        // Gets the id from the image element then returns the url
        client
          .getAsset(sourceImgId)
          .then(asset => {
            const assetFile = asset.fields.file;
            const assetImgUrl = assetFile.url;
            const setImgHeight = sourceImgHeight || assetFile.details.image.height;
            const setImgWidth = sourceImgWidth || assetFile.details.image.width;
            const sourceFile = `https:${assetImgUrl}?fit=fill&h=${setImgHeight}&w=${setImgWidth}`;
            source.setAttribute('data-src', sourceFile);
            lazySizes.loader.unveil(source);
          })
          .catch(() => {
            image.classList.add('hide');
          });
      }
    });
  }

  // Contentful Galleries
  if (galleries) {
    galleries.forEach(gallery => {
      const galleryId = gallery.getAttribute('data-contentful-gallery-id');

      client
        .getEntry(galleryId)
        .then(entry => {
          const photos = entry.fields.photos;

          gallery.innerHTML = renderThumbnails(photos);

          lightGallery(gallery, {
            enableDrag: false,
            download: true,
            videoMaxWidth: '1200px'
          });
        })
        .catch();
    });
  }
});
