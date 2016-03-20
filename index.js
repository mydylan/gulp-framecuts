'use strict';

var through = require('through2');
var gutil = require('gulp-util');
var path = require('path');

module.exports = function(options) {
  var doFrameCuts = function (file, enc, callback) {
    if (file.isNull()) {
      console.log("null");
      return callback(null, file);
    }
    if (file.isStream()) {
      console.log("stream");
      return callback(null, file);
    }
    if (file.isBuffer()) {
      if(options.count && parseInt(options.count) > 1) {
        var prefix = options.prefix || 'file_';
        var count = options.count;
        var ext = options.ext || 'txt';
        var showFrameAmount = options.amount || false;

        var str = String(file.contents);
        var framesArray = str.split("_");
        var totalFramesCount = framesArray.length;
        var tempFile = null;
        var sthis = this;

        if (showFrameAmount) {
          console.log(totalFramesCount);
        }

        var startIndex = 0;
        var endIndex = 0;
        var content = '';

        for(var index = 0; index < count; index += 1){
          tempFile = new gutil.File({
            base: path.join(__dirname, '.'),
            cwd: __dirname,
            path: path.join(__dirname, prefix + index + "." + ext)
          });

          startIndex = index * totalFramesCount/count;
          endIndex = ((index + 1) * totalFramesCount/count);

          content = framesArray.slice(startIndex, endIndex);
          content = content.join("_");
          if (index !== count - 1) {
            content += "_";
          }

          tempFile.contents = new Buffer(content);
          sthis.push(tempFile);
        }
        return callback();
      }
    }

    callback(null, file);
  };

  return through.obj(doFrameCuts);
};