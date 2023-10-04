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
          concat = require('gulp-concat'),
          fileinclude = require('gulp-file-include');

    // PostCSS settings
    var processors = [
        autoprefixer({
            grid: true
        })
    ];

    themes.forEach(function(theme) {

        var srcPath = 'source',
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

        function files() {
            return gulp.src(['./private/**/*.html'])
            .pipe(fileinclude({
                prefix: '@@',
                basepath: '@file'
            }))
            .pipe(gulp.dest('./public'));
        }

        exports.files = files;

        function watch(done) {
            gulp.watch(srcPath + '/**/*.js', gulp.series(scripts));
            gulp.watch(srcPath + '/**/*.scss', gulp.series(sass, css));
            gulp.watch('./private/**/*.html', gulp.series(files));
            gulp.watch('./source/**/*.html', gulp.series(files));
            done();
        }

        gulp.task('fileinclude', async function() {
            gulp.src(['./private/**/*.html'])
                .pipe(fileinclude({
                    prefix: '@@',
                    basepath: '@file'
                }))
                .pipe(gulp.dest('./public'));
        });

        gulp.task(theme, gulp.series(exports.scripts, exports.styles, exports.fonts, exports.files, watch));

        gulp.task(theme+'_build', gulp.series(exports.scripts, exports.styles, exports.fonts, exports.files));
    });

})();