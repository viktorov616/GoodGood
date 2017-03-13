'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const debug = require('gulp-debug');
const sourcemaps = require('gulp-sourcemaps');
const del = require('del');
const newer = require('gulp-newer');
const autoprefixer = require('gulp-autoprefixer');
const cssmin = require('gulp-cssmin');
const rename = require('gulp-rename');
const cmq = require('gulp-combine-mq');
const uglify = require('gulp-uglify');
const pump = require('pump');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');

function handleError(err) {
  console.log(err.toString());
  this.emit('end');
}

gulp.task('styles', function() {
  return gulp.src('source/sass/style.scss')
    .pipe(sourcemaps.init())
    .pipe(debug({title: 'src'}))
    .pipe(sass({errLogToConsole: true}))
    .on('error', handleError)
    .pipe(debug({title: 'sass'}))
    .pipe(autoprefixer({
      browsers: ['last 3 versions'],
      cascade: false
    }))
    .pipe(cmq({
      log: true
    }))
    .pipe(cssmin())
    .pipe(debug({title: 'cssmin'}))
    .pipe(sourcemaps.write())
    .pipe(rename({suffix: '.min'}))
    .pipe(debug({title: 'rename'}))
    .pipe(gulp.dest('public/css'));
});

gulp.task('clean', function() {
  return del('public');
});

gulp.task('assets', function(f) {
  return gulp.src('source/img/**', {since: gulp.lastRun('assets')})
    .pipe(newer('public/img'))
    .pipe(debug({title: 'assets'}))
    .pipe(gulp.dest('public/img'))
});

gulp.task('html', function(f) {
  return gulp.src('source/**/*.html')
    .pipe(debug({title: 'html'}))
    .pipe(gulp.dest('public'))
})

gulp.task('compress', function (cb) {
  pump([
    gulp.src('source/**/*.js'),
    concat('main.js'),
    debug({title: 'concat'}),
    uglify(),
    debug({title: 'uglifyjs'}),
    rename({suffix: '.min'}),
    debug({title: 'rename'}),
    gulp.dest('public/js')
  ], cb);
});

gulp.task('build', gulp.series(
  'clean',
  gulp.parallel('styles', 'html', 'assets', 'compress')));

gulp.task('watch', function() {
  gulp.watch('source/sass/**/*.*', gulp.series('styles'));
  gulp.watch('source/**/*.html', gulp.series('html'));
  gulp.watch('source/img/**/*.*', gulp.series('assets'));
  gulp.watch('source/js/**/*.*', gulp.series('compress'));
});

gulp.task('serve', function() {
  browserSync.init({
    server: 'public'
  });

  browserSync.watch('public/**/*.*').on('change', browserSync.reload);
});

gulp.task('default', gulp.series('build', gulp.parallel('watch', 'serve')));
