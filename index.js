var through2 = require('through2');
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;

//常量
const PLUGIN_NAME = 'gulp-getstyle';
function gulpGetStyle(){
		return through2.obj(function(file, enc , cb){

			if(file.isNull()){
				cb(null, file);
			}
			if(file.isBuffer()){
				var contentStr = file.contents.toString();
				//匹配style
				var styles = contentStr.match(/<\s*style(.|\n|\r)*>(.|\n|\r)*<\s*\/\s*style\s*>/ig);

				if(!styles) {this.push(null); return cb()}
				styles = styles.map(function(item, i){
					return item.match(/<\s*style(.|\n|\r)*>((.|\n|\r)*)<\s*\/\s*style\s*>/i)[2];
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