var tape = require('tape')
var resize = require('./')
var path = require('path')
var fs = require('fs')
var wrench = require('wrench')
var sizeOf = require('image-size')

var src = path.normalize(__dirname + '/test/img')
var target = path.normalize(__dirname + '/test/output')

wrench.rmdirSyncRecursive(target, true)

tape('resize the images', function(t){
	
	var paths = {}
	var r = resize(src, '**/*.jpg', target, '100x100', function(err){
		if(err){
			t.fail(err, 'resize')
			t.end()
			return
		}


		var balloons = path.join(target, 'subfolder/balloons.jpg')
		var car = path.join(target, 'car.jpg')
		var dimensions = sizeOf(balloons)

		t.ok(fs.existsSync(balloons), 'balloons exists')
		t.ok(fs.existsSync(car), 'car exists')
		t.equal(dimensions.width, 100, '100 width')
		t.equal(dimensions.height, 100, '100 height')

		t.equal(paths['car.jpg'], '100x100', 'car path')
		t.equal(paths['subfolder/balloons.jpg'], '100x100', 'balloons path')
		
		t.end()

	})

	r.on('image', function(path, size){
		paths[path] = size
	})
})
