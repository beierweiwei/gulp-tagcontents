var assert = require('assert');
var es = require('event-stream');
var File = require('vinyl');
var tagcontents = require('./index.js');
var gutil = require('gulp-util');

describe('gulp-tagcontents', function(){
	describe('in buffer mode', function(){
		it('shoud get style content', function(){
			var stream  = tagcontents();
			var fakeFile = new File({
				contents: new Buffer('<style >body {width: 100%;height: 100px;}</style><style> .test {color: red}</style>')
			});
			var chageFile = new File({
				contents: new Buffer("body {width: 100%;height: 100px;}; .test {color: red}"),
			});
			stream.on('data', function(newFile){
				assert.equal(chageFile.contents.toString(), newFile.contents.toString());
			});

			stream.on('end', function(){
				done();
			});
			stream.write(fakeFile);
			stream.end();
		});
		it('shoud get script content', function(){
			var stream  = tagcontents({tag: 'script'});
			var fakeFile = new File({
				contents: new Buffer('<script > var a = 1; var b = 2; return a + b;</script>')
			});
			var chageFile = new File({
				contents: new Buffer(" var a = 1; var b = 2; return a + b;"),
			});
			stream.on('data', function(newFile){
				assert.equal(chageFile.contents.toString(), newFile.contents.toString());
			});

			stream.on('end', function(){
				done();
			});
			stream.write(fakeFile);
			stream.end();
		});
	});
	it('should let null files pass through', function(done) {
	    var stream = tagcontents(),
	        n = 0;
	    stream.pipe(es.through(function(file) {
	        assert.equal(file.path, 'null.md');
	        assert.equal(file.contents,  null);
	        n++;
	    }, function() {
	        assert.equal(n, 1);
	        done();
	    }));
	    stream.write(new gutil.File({
	        path: 'null.md',
	        contents: null
	    }));
	    stream.end();
	});
});