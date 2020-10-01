document.addEventListener('DOMContentLoaded', () => {
  const videos = document.querySelectorAll('[data-video]');

  if (videos.length >= 1) {
    Plyr.setup(videos);
  }
});
