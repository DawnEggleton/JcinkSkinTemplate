(() => {

    'use strict';

    // Theme name.
    var themes = [
        'jcink',
    ];

    // Include gulp
    const gulp = require('gulp');

    // Include plugins
    const gulpSass = require('gulp-sass'),
          postcss = require('gulp-postcss'),
          autoprefixer = require('autoprefixer'),
<<<<<<< HEAD
=======
          pxtorem = require('postcss-pxtorem'),
>>>>>>> 270d5233b73e3b7faf6e34d097daa3a989e20dff
          concat = require('gulp-concat');

    // PostCSS settings
    var processors = [
        autoprefixer({
            grid: true
<<<<<<< HEAD
=======
        }),
        pxtorem({
            replace: true
>>>>>>> 270d5233b73e3b7faf6e34d097daa3a989e20dff
        })
    ];

    themes.forEach(function(theme) {

<<<<<<< HEAD
        var srcPath = 'source',
=======
        var srcPath = 'source/',
>>>>>>> 270d5233b73e3b7faf6e34d097daa3a989e20dff
          modulesPath = 'node_modules';

        var distPath = 'dist';

        function sass() {
            return gulp.src(srcPath + '/sass/**/*.scss')
              .pipe(gulpSass({
                  style: 'expanded',
                  includePaths: [
                      modulesPath,
                      srcPath + '/sass'
                  ]
              }))
              .pipe(gulp.dest(distPath + '/css'))
        }

        function css() {
            return gulp.src(distPath + '/css/*.css')
              .pipe(postcss(processors))
              .pipe(gulp.dest(distPath + '/css'))
        }

        exports.styles = gulp.series(sass, css);

        function scripts() {
            return gulp.src([
                srcPath + '/js/*.js'
            ])
              .pipe(gulp.dest(distPath + '/js'))
        }

        exports.scripts = gulp.series(scripts);

        function fonts() {
            return gulp.src([srcPath +
            '/fonts/**/*.woff', srcPath + '/fonts/**/*.woff2', srcPath +
            '/fonts/**/*.ttf', srcPath + '/fonts/**/*.otf']).pipe(gulp.dest(distPath + '/fonts'))
        }

        exports.fonts = fonts;

        function watch(done) {
            gulp.watch(srcPath +
              '/**/*.js', gulp.series(scripts));
            gulp.watch(srcPath +
              '/**/*.scss', gulp.series(sass, css));
            done();
        }

        gulp.task(theme, gulp.series(exports.scripts, exports.styles, exports.fonts, watch));

        gulp.task(theme+'_build', gulp.series(exports.scripts, exports.styles, exports.fonts));
    });

})();