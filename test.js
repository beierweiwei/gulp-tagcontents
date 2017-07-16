var assert = require('assert');
var es = require('event-stream');
var File = require('vinyl');
var getStyle = require('./index.js');
var gutil = require('gulp-util');



describe('gulp-getStyle', function(){
	describe('in buffer mode', function(){
		it('shoud get style content', function(){
			var stream  = getStyle();
			var fakeFile = new File({
				contents: new Buffer('<style >body {width: 100%;height: 100px;}</style>')
			});
			var chageFile = new File({
				contents: new Buffer("body {width: 100%;height: 100px;}"),
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
	    var stream = getStyle(),
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