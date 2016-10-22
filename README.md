# grunt-resx-to-json-delimited

> Convert RESX files to multi-dimensional JSON files using a delimiter.

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-resx-to-json-delimited --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-resx-to-json-delimited');
```

## The "resx_to_json_delimited" task

### Overview
In your project's Gruntfile, add a section named `resx_to_json_delimited` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  resx_to_json_delimited: {
	files: {
	  // Source and Destination files go here.
	},
    options: {
      // Task-specific options go here.
    },
  },
});
```

### Options

#### options.delimiter
Type: `String`
Default value: `null`

A delimiter value used to create the nested json object from the .resx key.

#### options.ext
Type: `String`
Default value: `'json'`

A string value thet will be used as the file extension for all destination files.

### Usage Examples

#### Default Options
In this example, the default options are used to do something with whatever. So if the `testing` file has the content `Testing` and the `123` file had the content `1 2 3`, the generated result would be `Testing, 1 2 3.`

```js
grunt.initConfig({
  resx_to_json_delimited: {
    options: {},
    files: {
      'dest/default' : 'src/**'		
    },
  },
});
```

#### Custom Options
In this example, custom options are used to do something else with whatever else. So if the `testing` file has the content `Testing` and the `123` file had the content `1 2 3`, the generated result in this case would be `Testing: 1 2 3 !!!`

```js
grunt.initConfig({
  resx_to_json_delimited: {
    options: {
      separator: ': ',
      punctuation: ' !!!',
    },
    files: {
      'dest/default_options': ['src/testing', 'src/123'],
    },
  },
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
