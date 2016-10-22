/*
 * grunt-resx-to-json-delimited
 * https://github.com/DustinCassiday/grunt-resx-to-json-delimited
 *
 * Copyright (c) 2016 Dustin Cassiday
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },
    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },
    // Configuration to be run (and then tested).
    resx_to_json_delimited: {
		with_delimiter: {
			files: {
				'tmp/with_delimiter':'test/fixtures/**'			
			},		
			options: {
				delimiter: '_'
			}
		},
		without_delimiter: {
			files: {
				'tmp/without_delimiter':'test/fixtures/**',
			}
		},
  		with_dest_ext: {
			files: {
				'tmp/with_dest_ext':'test/fixtures/**',
			},		
			options: {
				destExt: 'js'
			}
		}
    },
    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }
  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');
  
  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'resx_to_json_delimited', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['resx_to_json_delimited']);
};
