/*
 * grunt-resx-to-json-delimited
 * https://github.com/DustinCassiday/grunt-resx-to-json-delimited
 *
 * Copyright (c) 2016 Dustin Cassiday
 * Licensed under the MIT license.
 * 
 */

'use strict';

module.exports = function (grunt) {

	var xml2js = require('xml2js');
		
	grunt.registerMultiTask(
        'resx_to_json_delimited',
        'Convert .resx files to multi-dimensional .json files using optional delimiter.', 
		multiTask);

	function multiTask() {
		var opts = this.options(),
			files = this.files,
			dest = null;

		files.forEach(filesOp);

		function filesOp(filePair) {
			dest = filePair.dest;
			filePair.src.forEach(fileOp);
		} 

		function fileOp(file) {
			if(isResx(file)) { parser(file); }
		}

		function parser(file) {
			var buffer = grunt.file.read(file),
			parser = new xml2js.Parser();

			parser.parseString(buffer.toString('utf-8'), callback);

			function callback(err, result) {
				var data = converter(result),
					path = getDestFilePath(dest, file);
				grunt.log.oklns(file + ' -> ' + path);
				writer(data, path);
			}		
		}

		function converter(resx) {
			var obj = {};

			for(var i = 0; i < resx.root.data.length; i++) {
				arrayToObject(
					obj, 
					resx.root.data[i].$.name.split(opts.delimiter), 
					resx.root.data[i].value.toString());
			}
			return JSON.stringify(obj, null, 4);;
		}

		function arrayToObject(obj, keys, value) {
			var last = arguments.length === 3 ? keys.pop() : false;

			for(var i = 0; i < keys.length; i++)
			{
				obj = obj[ keys[i] ] = obj[ keys[i] ] || {};
			}
			
			if( last )
			{
				obj = obj[ last ] = value;
			}
			return obj;
		}

		function writer(contents, path) {
			if (contents && path) {
				grunt.file.write(path, contents);
			} else {
				grunt.log.errorlns('Couldn not write file: ' + path);
			}
		}

		function splitKey(key) {
			return key.split(opts.delimiter);
		}

		function getDestFilePath(path, file) {
			return  dest + '/' + 
				getFilename(file)
					.replace('.resx', '.' + (opts.destExt || 'json'));
		}

		function getFilename(path) {
			return path.replace(/^.*[\\\/]/, '');
		}

		function isResx(file) {
			return /\.resx$/.test(file);
		}
	};
};