var gulp = require('gulp'),
    sass = require('gulp-sass'),
    shell = require('gulp-shell');

gulp.task('build-scss', function() {
    return gulp.src('static/styles/src/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('static/styles/build'));
});

gulp.task('build-js', shell.task(['webpack']));

gulp.task('build', ['build-js', 'build-scss'])

gulp.task('watch', function() {
    gulp.watch('static/client/src/**/*.js', ['build-js']);
    gulp.watch('static/styles/src/**/*.scss', ['build-scss'])
})