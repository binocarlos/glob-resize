var globby = require('globby')
var resize = require('imagemagickresizer')()
var mkdirp = require('mkdirp')
var async = require('async')
var path = require('path')

module.exports = function(src, glob, target, size, done){
	if(typeof(size)=='string'){
		var sizes = size.split('x')
		size = {
			width:parseInt(sizes[0]),
			height:parseInt(sizes[1])
		}
	}
	globby(glob, {
		cwd:src
	}, function(err, files){
		async.forEach(files, function(file, nextFile){
			var fileSrc = path.join(src, file)
			var fileDest = path.join(target, file)
			var folder = path.dirname(fileDest)
			mkdirp(folder, function(){
				resize.image(fileSrc, fileDest, size, nextFile)	
			})
		}, done)
	})
}
			