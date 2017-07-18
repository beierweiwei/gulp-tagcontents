var through2 = require('through2');
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;

//常量
const PLUGIN_NAME = 'gulp-tagcontents';
function gulpGetStyle(option){
		var tag = option && option.tag ? option.tag : 'style'; 
		return through2.obj(function(file, enc , cb){

			if(file.isNull()){
				cb(null, file);
			}
			if(file.isBuffer()){
				var contentStr = file.contents.toString();
				var pattern = '<\\s*' + tag + '[^>]*?>((.|\\n|\\r)*?)<\\s*\\/\\s*' + tag + '\\s*>';
				var match = new RegExp(pattern, 'ig');
				var styles = contentStr.match(match);
		
				if(!styles) {this.push(null); return cb()};

				styles = styles.map(function(item, i){
					
					return item.match(new RegExp(pattern, 'i'))[1];


				});
				styles.filter(function(item, i){
					return !!item;
				});
				file.contents = new Buffer(styles.join(';'));
				this.push(file);
				cb();	
			}
			if(file.isStream()){
				var error = 'Streaming not supported';
        return cb(new PluginError(PLUGIN_NAME, error));
			}

		});
}

module.exports = gulpGetStyle;