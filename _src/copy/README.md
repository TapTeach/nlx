## Static

There are some files that belong in your root destination directory that you won't want to process or revision in production. Things like favicons, app icons, etc. should go in `_src/static`, and will get copied over to `public` as a last step (after revisioning in production). Nothing should ever go directly in public, since it gets completely trashed and re-built when running the `default` or `production` tasks.
