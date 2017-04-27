import gulp from 'gulp';
import babel from 'gulp-babel';
import eslint from 'eslint';

gulp.task('babel-run', (done) => {
    gulp.src('./src/**/*.js')
        .pipe(babel({
            presets: [
                'es2015'
            ]
        }))
        .pipe(eslint.format())
        .pipe(gulp.dest('./dest'));
});

gulp.task('babel-watch', ['babel-run'] (done) => {
    gulp.watch(['./src/**/*.js'], ['babel-run']);
})

gulp.task('default', ['babel-watch']);
