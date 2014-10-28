'use strict';
/*global require*/

var gulp = require('gulp');

// load plugins
var $ = require('gulp-load-plugins')();

// min.css, hypercard.css, hyperbox.css
gulp.task('styles', function () {
  return gulp.src('styles/*.scss')
    .pipe($.rubySass({
      sourcemap: false,
      style: 'expanded',
      precision: 10
    }))
    .pipe(gulp.dest('.'));
});

// html template may contains reference to images
gulp.task('scripts', function () {
  var templateCache = require('gulp-angular-templatecache');
  return gulp.src(['templates/*.html'])
    .pipe(templateCache({root: '', module: 'ngRoundProgressBar.templates', standalone: true}))
    .pipe($.addSrc('scripts/main.js'))
    .pipe($.concat('main.js'))
    .pipe(gulp.dest('.'));
});

//run all tasks after build directory has been cleaned
gulp.task('default', function () {
  gulp.start('styles');
  gulp.start('scripts');
});

gulp.task('watch', function () {
  gulp.watch('styles/*.scss', ['styles']);
  gulp.watch(['templates/*.html', 'scripts/*.js'], ['scripts']);
});
