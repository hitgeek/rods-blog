var gulp       = require('gulp');
var browserify = require('gulp-browserify');
var less       = require('gulp-less');
var path       = require('path');
var rename     = require('gulp-rename');

gulp.task('scripts', function() {
	return gulp.src('./lib/client/app.js')
		.pipe(browserify({
		  insertGlobals : true
		}))
    .pipe(rename('bundle.js'))
		.pipe(gulp.dest('./lib/public/'))
});

gulp.task('styles', function () {
  return gulp.src('./lib/client/app.less')
    .pipe(less({
      paths: [
				'./node_modules/bootstrap/less',
				'./node_modules/font-awesome/less'
			]
    }))
		.pipe(rename('bundle.css'))
    .pipe(gulp.dest('./lib/public/'));
});

gulp.task('fonts', function() {
	return gulp.src('./node_modules/font-awesome/fonts/**')
			.pipe(gulp.dest('./lib/public/fonts'))
});


gulp.task('default', ['scripts', 'styles', 'fonts'], function() {
	gulp.watch(['./lib/client/**.js', './lib/client/**/**.js'], ['scripts']);
  gulp.watch(['./lib/client/**.less', './lib/client/**/**.less'], ['styles']);
});