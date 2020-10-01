/*
 * @title Config
 */

export const paths = {
  src: './_src',
  dest: './public'
};

export const config = {
  copy: {
    enable: true,
    src: `${paths.src}/copy/**/*`,
    dest: `${paths.dest}/`
  },

  styles: {
    enable: true,
    src: `${paths.src}/styles/**/*.scss`,
    watch: `${paths.src}/styles/**/*.scss`,
    dest: `${paths.dest}/assets/styles/`,
    sass: {
      indentedSyntax: false,
      includePaths: ['node_modules'],
      outputStyle: 'compressed'
    },
    cssnano: {
      autoprefixer: false,
      mergeRules: false,
      reduceIdents: false,
      zindex: false,
      colormin: false
    }
  },

  scripts: {
    enable: true,
    src: `${paths.src}/scripts`,
    watch: `${paths.src}/scripts/**/*.js`,
    dest: `${paths.dest}/assets/scripts`
  },

  images: {
    enable: true,
    src: `${paths.src}/images/**/*.{jpg,jpeg,png,svg,gif}`,
    dest: `${paths.dest}/assets/images`
  },

  icons: {
    enable: true,
    src: `${paths.src}/icons/**/*.svg`,
    dest: `${paths.dest}/assets/icons`,
    settings: {}
  },

  fonts: {
    enable: true,
    src: `${paths.src}/fonts/**/*`,
    dest: `${paths.dest}/assets/fonts`
  },

  html: {
    enable: true,
    src: `${paths.src}/html/**/*.{twig,html}`,
    watch: `${paths.src}/html/**/*.{twig,html,json}`,
    dest: `${paths.dest}`,
    excludeFolders: `!${paths.src}/**/_*/**/*`
  }
};

export const isProd = process.env.NODE_ENV === 'production';
