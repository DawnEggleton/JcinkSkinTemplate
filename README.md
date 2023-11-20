# JcinkSkinTemplate
For local development of Jcink skin assets

**To Install**

Clone the repo to a folder of choice on your computer. Navigate into the repo using your command line interface (CLI).

**To Run**

`npm install` to allow for building of SCSS files; only run on first install. If you are using Windows and not Mac, a specific version of NPM (or lower) is needed to run Gulp (which this project now uses). Make sure to install NVM Windows (https://github.com/coreybutler/nvm-windows), instead of standard NPM, so that you'll be able to change your NPM version to one that works (historically, 14.0.0 has been functional).

`yarn build` will take your SCSS and JS files, auto-prefix, and run other optimizations, but will _not_ minify any of these files so that they remain readable and editable in future when the code is copy/pasted on-site.

`yarn watch` will do the above but will watch for changes and update files accordingly. CTRL+C will end the watch and return control to your CLI.

**Note**

If you want to upload to GIT and use GIT's pages to display the functional mock on a publically-accessible webpage, you will need to remove the following two lines from the `.gitignore` file so that your final CSS and JS files are transmitted to GIT and are therefore accessible:

`dist/*`
`public/*`

**Available Mixins**

This repo uses SCSS that gets compiled and therefore has been set up with some mixins (functions) that can be used in the .scss files. There are three available: `mq-up`, `mq-down`, and `fluid-type`.

`mq-up` is for *min-width media queries*. To use it, you can use `@include mq-up(sizehere) { styles here }`. `mq-down` is for *max-width media queries*. To use it, you can use `@include mq-down(sizehere) { styles here }`. The size options are set at the top of the `mixins.scss` file and range from `xxs` for extra-extra-small to `xxl` for extra-extra-large. You only need to use the sizes, not the full variable name. For example, you do not need to use `$size-xxs`, just `xxs` is fine! It should be used within the respective element and then the styles placed within it.

`fluid-type` is for setting minimum font size, maximum font size, and make it adjust to the screen width within those sizes fluidly. It takes four variables: minimum font size, maximum font size, minimum screen size, and maximum screen size. At the minimum screen size, the font will be at the minimum font size. At the maximum screen size, the font will be at the maximum font size. Anywhere between, it will adjust in proportion to the screen (e.g., if it is directly between the two screen sizes, it will be directly between the two font sizes as well). It can be used with `@include fluid-type(minimumfontsize, maximumfontsize, minimumscreensize, maximumscreensize);` within the respective element. It does not need to have braces like the media query mixins. **This is in pixels. Do not include units.**