## Images

The task itself will simply copy files from `_src/images` to `public/images` folder defined in `path-config.json`.

Under the images object in `gulpfile.js/task-config.js` you can define which file formats to watch for.

The image task previously ran through image-min, but due to the size of the package and the fact it doesn't need to be run every time - it was removed. The current recommendation is to install [imagemin-cli](https://github.com/imagemin/imagemin-cli) globally and running it on your source files periodically. If you prefer GUIs, you can try [ImageOptim](https://imageoptim.com/mac) instead.
