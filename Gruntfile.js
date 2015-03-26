'use strict';

var path = require('path');

module.exports = function (grunt) {

	require('matchdep').filterDev(['grunt-*', '!grunt-cli']).forEach(grunt.loadNpmTasks);

	grunt.initConfig({
		browserify: {
			lib: {
				src: [],
				dest: 'src/js/lib.browserify-shim-test.js',
				options: {
					transform: ['browserify-shim'],
					require: [
						'jquery',
						'jquery-ui'
					],
					browserifyOptions: {
						debug: true
					}
				}
			},
			dev: {
				src: 'src/js/src/main.js',
				dest: 'src/js/dev.browserify-shim-test.js',
				options: {
					transform: ['browserify-shim'],
					external: [
						'jquery',
						'jquery-ui'
					],
					browserifyOptions: {
						debug: true
					}
				}
			}
		},

		connect: {
			options: {
				hostname: '0.0.0.0',
				port: 9000,
				keepalive: true,
				open: true,
				livereload: false
			},
			source: {
				options: {
					base: 'src'
				}
			}
		}
	});

	grunt.registerTask(
		'default',
		'Browserify.',
		[
			'browserify',
			'connect:source'
		]
	);
};
