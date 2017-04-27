var gulp = require('gulp');
var postcss = require('gulp-postcss');

var alias = require('postcss-alias');
var crip = require('postcss-crip');
var magician = require('postcss-font-magician');
var triangle = require('postcss-triangle');
var circle = require('postcss-circle');
var linkColors = require('postcss-all-link-colors');
var center = require('postcss-center');
var clearfix = require('postcss-clearfix');
var position = require('postcss-position');
var size = require('postcss-size');
var verthorz = require('postcss-verthorz');
var colorShort = require('postcss-color-short');

gulp.task('css', function () {
  var processors = [
        alias,
        crip,
        magician,
        triangle,
        circle,
        linkColors,
        center,
        clearfix,
        position,
        size,
        verthorz,
        colorShort
  ];
  return gulp.src('./src/**/*.css')
    .pipe(postcss(processors))
    .pipe(gulp.dest('./dest'));
});


gulp.task('watch', function () {
    gulp.watch('./src/**/*.css', ['css']);
})

gulp.task('default', ['watch', 'css']);
