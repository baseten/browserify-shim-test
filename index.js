#!/usr/bin/env node

var fs = require('fs');
var browserify = require('browserify');
var b;

b = browserify({
	debug: true
});

var sharedExposed = [
	{
		file: "./src/js/vendor/jquery/dist/jquery.js",
		expose: "jquery"
	},
	{
		file: "./src/js/vendor/jquery-ui/jquery-ui.js",
		expose: "jquery-ui"
	}
];

var sharedAliases = [
	'jquery',
	'jquery-ui'
];

b.transform('browserify-shim')
	.require(sharedExposed)
	.bundle()
	.pipe(fs.createWriteStream('./src/js/lib.browserify-shim-test.js'));

b = browserify({
	entries: [
		'./src/js/src/main.js'
	],
	debug: true
});

b.transform('browserify-shim')
	.external(sharedAliases)
	.bundle()
	.pipe(fs.createWriteStream('./src/js/dev.browserify-shim-test.js'));
