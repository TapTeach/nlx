## SVG Sprite

Generates an SVG Sprite from svg files in `_src/iconography`! You can either include the created SVG directly on the page and reference the icon by id like this:

```html
<svg viewBox="0 0 1 1"><use xlink:href='#my-icon'></use></svg>
```

or reference the image remotely.

```html
<svg viewBox="0 0 1 1"><use xlink:href='public/path/to/sprite.svg#my-icon'></use></svg>
```

If you reference the sprite remotely, be sure to include something like [inline-svg-sprite](https://github.com/vigetlabs/inline-svg-sprite) or [svg4everybody](https://github.com/jonathantneal/svg4everybody) to ensure external loading works on Internet Explorer.

The build script includes a template helper which generates the required svg markup in `\_src/html/macros/helpers.html, so you can just do:

```twig
{{ icon('my-icon', 'blue', 'xs') }}
```

which generates:

```html
<svg viewBox="0 0 1 1" class="iconography" size="xs" color="blue">
  <use xlink:href='../../assets/icons/icons.svg#my-icon'></use>
</svg>
```

To adjust styles, please see `_src/stylesheets/utilities/_iconography.scss`
