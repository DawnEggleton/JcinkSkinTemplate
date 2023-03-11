# JcinkSkinTemplate
For local development of Jcink skin assets

**To Install**

Clone the repo to a folder of choice on your computer. Navigate into the repo using your command line interface (CLI).

**To Run**

`npm install` to allow for building of SCSS files; only run on first install.

`yarn build` will take your SCSS and JS files, auto-prefix, and run other optimizations, but will _not_ minify any of these files so that they remain readable and editable in future when the code is copy/pasted on-site.

`yarn watch` will do the above but will watch for changes and update files accordingly. CTRL+C will end the watch and return control to your CLI.

**Note**

If you want to upload to GIT and use GIT's pages to display the functional mock on a publically-accessible webpage, you will need to remove the following line from the `.gitignore` file so that your final CSS and JS files are transmitted to GIT and are therefore accessible:

`dist/*`