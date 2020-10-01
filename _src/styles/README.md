## Stylesheets

- The build script uses [node-sass](https://github.com/sass/node-sass)
- See stylesheets object in `gulpfile.js/task-config.js` for available options.
- You don't need to prefix any of the CSS. It gets run through autoprefixer() via post-css. For autoprefixer settings see `package.json`.
- For minification, the CSS gets run through cssnano() via post-css.
- You stylesheets are linted with a precommit hook. For stylelint rules please see `.stylelintrc` in project root.
