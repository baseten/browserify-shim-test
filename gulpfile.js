var gulp = require('gulp');
var connect = require('gulp-connect');
var open = require('gulp-open');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');

gulp.task('connect', function () {
	return connect.server({
		host: '0.0.0.0',
		root: 'src',
		port: 9000
	});
});

gulp.task('open', ['connect'], function () {
	var options = {
		url: 'http://0.0.0.0:9000'
	};

	return gulp.src('src/index.html')
		.pipe(open('', options));
});

gulp.task('js:lib', function () {
	var b = browserify({
		debug: true
	});

	var bundle = function() {
		return b
			.transform('browserify-shim')
			.require([
				'jquery',
				'jquery-ui'
			])
			.bundle()
			.pipe(source('lib.browserify-shim-test.js'))
			.pipe(buffer())
			.pipe(gulp.dest('./src/js/'));
	};

	return bundle();
});

gulp.task('js:dev', function () {
	var b = browserify({
		entries: [
			'./src/js/src/main.js'
		],
		debug: true
	});

	var bundle = function () {
		return b
			.transform('browserify-shim')
			.external([
				'jquery',
				'jquery-ui'
			])
			.bundle()
			.pipe(source('dev.browserify-shim-test.js'))
			.pipe(buffer())
			.pipe(gulp.dest('./src/js/'));
	};

	return bundle();
});

gulp.task('default', ['js:lib', 'js:dev'], function () {
	gulp.start('open');
});
