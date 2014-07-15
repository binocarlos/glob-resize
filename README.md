glob-resize
===========

resize images matching a file glob and write them to a target folder

you need [ImageMagick](http://www.imagemagick.org/) on your system

## install

```
$ npm install glob-resize
```

## usage

```js
var resize = require('glob-resize')

var sourceFolder = __dirname + '/images'
var targetFolder = __dirname + '/output'

resize(sourceFolder, ['**/*.png'], targetFolder, '100x100', function(err){
	// all the matching files are resized into targetFolder
})
```

## api

#### `resize(sourceFolder, globArray, targetFolder size, callback)`

Resize a folder of images - sourceFolder is where the images live, globArray is the list of matching image globs.

TargetFolder is where to resize them to and size is a string 'widthxheight'

## licence
MIT

