var globby = require('globby')
var resize = require('imagemagickresizer')()
var mkdirp = require('mkdirp')
var async = require('async')
var path = require('path')
var EventEmitter = require('events').EventEmitter
var util = require('util')

function Resizer(src, target, size){
	EventEmitter.call(this)
	if(typeof(size)=='string'){
		var sizes = size.split('x')
		size = {
			width:parseInt(sizes[0]),
			height:parseInt(sizes[1])
		}
	}
	this._src = src
	this._target = target
	this._size = size
}

util.inherits(Resizer, EventEmitter)

Resizer.prototype.resize = function(file, done){
	var self = this;
	var fileSrc = path.join(this._src, file)
	var fileDest = path.join(this._target, file)
	var folder = path.dirname(fileDest)
	mkdirp(folder, function(){
		self.emit('image', file, self._size.width + 'x' + self._size.height)
		resize.image(fileSrc, fileDest, self._size, done)	
	})
}

module.exports = function(src, glob, target, size, done){
	var resizer = new Resizer(src, target, size)
	globby(glob, {
		cwd:src
	}, function(err, files){
		async.forEach(files, function(file, nextFile){
			resizer.resize(file, nextFile)
		}, done)
	})
	return resizer
}
			