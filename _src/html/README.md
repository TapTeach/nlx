## HTML / Markup

See [nunjucks API](https://mozilla.github.io/nunjucks/api.html) for documentation.

Note: If you are on a platform that's already handing compiling html (Wordpress, Craft, Rails, etc.), set `html: false` or delete the configuration object completely from `task-config.js`. If that's the case, don't forget to use the Browsersync files option in the browserSync config object to start watching your templates folder.

You can work with straight HTML, but it will also compile Nunjucks, a Jinja/Django-like templating language similar to Twig.

#### Data

- [gulp-data](https://github.com/colynb/gulp-data) used to provide data to templates.
- See `/html/data/` for available accessible files.
- To add new JSON files, follow process similar to lines 23-25 in `gulpfile.js/tasks/html.js`.
- To access data inside of your templates use double brackets with name of JSON file. For example `{{ global.title }}`. Essentially we are pulling the title value from `html/data/global.json`
- See `gulpfile.js/lib/task-defaults.js` for available options.

#### Templating

- A proposed structure is added for you to work with.
- Anything added to the `html` folder will be copied over to the defined `dest` folder.
