# JcinkSkinTemplate
For local development of Jcink skin assets

**To Install**

Clone the repo to a folder of choice on your computer. Navigate into the repo using your command line interface (CLI).

**To Run**

`npm install` and then `yarn install` to allow for building of scss files; only run on first install.

`yarn build` will take your scss and js files, auto-prefix, and run other optimizations, but will _not_ minify any of these files so that they remain readable and editable in future when the code is copy/pasted on-site.

`yarn watch` will do the above but will watch for changes and update files accordingly. ctrl + c will end the watch and return control to your CLI.
