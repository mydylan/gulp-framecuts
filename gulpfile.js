var gulp  = require('gulp');
var argv = require('yargs').argv;
var fileSplit = require('gulp-file-split');
var clean = require('gulp-clean');
var showFramesAmount = argv.amount || false;
var chunks = argv.chunks || 1;

gulp.task('clean', function () {
  gulp.src('dist')
    .pipe(clean());
});

gulp.task('default', ['clean'], function () {
  gulp.src('./src/example/string.tv')
    .pipe(fileSplit({
      prefix: 'str_',
      ext: 'tv',
      chunks: 4,
      amount: true
    }))
    .pipe(gulp.dest('./dist'));
});