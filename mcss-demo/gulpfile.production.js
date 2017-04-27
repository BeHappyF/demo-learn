const gulp = require('gulp');
const gulpIf = require('gulp-if');
const mcss = require('gulp_mcss');
const split = require('./gulp/gulp-split.js');

gulp.task('mcss', (done) => {
    return gulp.src(['./src/**/*.mcss', '!./src/**/_*.mcss'])
        .pipe(mcss({
            format: 3,
            importCSS: true,
            pathes: ['./src/javascript/lib', './res/lib', './node_modules'],
        }))
        .pipe(gulpIf('main.css', split()))
        .pipe(gulp.dest('./src/css'));
});

gulp.task('default', ['mcss']);
