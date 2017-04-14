const gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var csslint = require('gulp-csslint');
const jshint = require('gulp-jshint');
var browserSync = require('browser-sync');

gulp.task('serve', ['run', 'watch'], function(){
  browserSync.init({
    proxy: 'http://localhost:9000',
    files:['client/**/*.*'],
    port: 9001
  });
})

gulp.task('watch',['csslint','jshint'],function(){
  gulp.watch(['src/*.css','src/*.js'], ['csslint','jshint']);
})

gulp.task('csslint', function() {
  gulp.src('src/*.css')
      .pipe(csslint())
      .pipe(csslint.formatter());
});

gulp.task('jshint', function() {
  return gulp.src('src/*.js')
      .pipe(jshint())
      .pipe(jshint.reporter('jshint-stylish'));
});
