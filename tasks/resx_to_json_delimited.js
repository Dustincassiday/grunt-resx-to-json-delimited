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
    'Convert RESX files into structured JSON files using optional delimiter.',
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
      if (isResx(file)) { parser(file); }
    }

    function parser(file) {
      var buffer = grunt.file.read(file),
        parser = new xml2js.Parser();

      parser.parseString(buffer.toString('utf-8'), parse);

      function parse(err, result) {
        var data = converter(result),
          path = getDestFilePath(dest, file);

        grunt.log.oklns(file + ' -> ' + path);
        writer(data, path);
      }
    }

    function converter(resx) {
      var obj = {},
        data = resx.root.data;

      for (var i = 0; i < resx.root.data.length; i++) {
        arrayToObject(
          obj,
          data[i].$.name.split(opts.delimiter),
          data[i].value.toString());
      }
      return JSON.stringify(obj, null, opts.whitespace);
    }

    function arrayToObject(obj, keys, value) {
      var last = arguments.length === 3 ? keys.pop() : false;

      for (var i = 0; i < keys.length; i++) {
        obj = obj[keys[i]] = obj[keys[i]] || {};
      }

      if (last) {
        obj = obj[last] = value;
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

    function getDestFilePath(path, file) {
      return dest + '/' +
        getFilename(file)
          .replace('.resx', '.' + (opts.extension || 'json'));
    }

    function getFilename(path) {
      return path.replace(/^.*[\\\/]/, '');
    }

    function isResx(file) {
      return /\.resx$/.test(file);
    }
  };
};