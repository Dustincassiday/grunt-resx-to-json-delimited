'use strict';

var grunt = require('grunt'),
	sut = require('../tasks/resx_to_json_delimited');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.resx_to_json_delimited = {
	setUp: function (done) {
		// setup here if necessary
		done();
	},
	with_delimeter: function (test) {	
		test.expect(1);	
		   var actual = grunt.file.read('tmp/with_delimiter/produce.json');
		   var expected = grunt.file.read('test/expected/with_delimiter/produce.json');
		   test.equal(actual, expected, 'should parse resx file with specified delimiter.');
		test.done();
	},
	without_delimiter: function (test) {	
		test.expect(1);	
		   var actual = grunt.file.read('tmp/without_delimiter/produce.json');
		   var expected = grunt.file.read('test/expected/without_delimiter/produce.json');
		   test.equal(actual, expected, 'should parse resx file without a delimiter.');
		test.done();
	},
	with_dest_ext: function (test) {	
		test.expect(1);	
		   var actual = grunt.file.read('tmp/with_dest_ext/produce.js');
		   var expected = grunt.file.read('test/expected/with_dest_ext/produce.js');
		   test.equal(actual, expected, 'should output a file with the js extension');
		test.done();
	}
};
