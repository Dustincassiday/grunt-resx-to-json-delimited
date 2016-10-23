# grunt-resx-to-json-delimited

> Convert RESX files into structured JSON files using a delimited key value.

## Getting Started
This plugin requires Grunt `>=0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out 
the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains 
how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as 
install and use Grunt plugins. Once you're familiar with that process, you may i
nstall this plugin with this command:

```shell
npm install grunt-resx-to-json-delimited --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile 
with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-resx-to-json-delimited');
```

## The "resx_to_json_delimited" task

Specify a `delimiter` value to generate a structured JSON object.

For example:

Given a `delimter` value of `_` and resx entry with the key:

```shell
'book_chapter_page'
```
Would produce the following object structure:

```javascript
{
  "book": {
	  "chapter": {
		  "page": "value"
	  }
  }
}
```

### Overview
In your project's Gruntfile, add a section named `resx_to_json_delimited` to the 
data object passed into `grunt.initConfig()`.

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

A delimiter value used to create the nested json object from the resx key.

#### options.extension
Type: `String`
Default value: `'json'`

A string value thet will be used as the file extension for all destination files.

### Usage Examples

#### Default Options
In this example, the default options are used to create a json file
from a resx file. With no options specified, the destination result will 
be flat json files without any nested properties.

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
#### With Delimiter
In this example, the specified `delimiter` option will be used to split 
the resx key into a nested json object. 

```js
grunt.initConfig({
  resx_to_json_delimited: {
    options: {
		delimiter: '_'
	},
    files: {
      'dest/default' : 'src/**'		
    },
  },
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. 
Add unit tests for any new or changed functionality. Lint and test your code 
using [Grunt](http://gruntjs.com/).

