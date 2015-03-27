#!/usr/bin/env node

var fs = require('fs');
var browserify = require('browserify');
var b;

b = browserify({
	debug: true
});

b.transform('browserify-shim')
	.require([
		'jquery',
		'jquery-ui'
	])
	.bundle()
	.pipe(fs.createWriteStream('./src/js/lib.browserify-shim-test.js'));

b = browserify({
	entries: [
		'./src/js/src/main.js'
	],
	debug: true
});

b.transform('browserify-shim')
	.external([
		'jquery',
		'jquery-ui'
	])
	.bundle()
	.pipe(fs.createWriteStream('./src/js/dev.browserify-shim-test.js'));
