
# gulp-framecuts 

Gulp plugin which separate base64 frames

Take parameters: 

  - prefix - name space for files (default - "file_")
  - count - number of chunks
  - ext - extension fot file (default - "txt")
  - amount - show amount of frames (default - false)

# example

```sh
gulp.task('cut', ['clean'], function () {
    gulp.src('./src/*.tv')
      .pipe(framecuts({
       prefix: 'str_',
       ext: 'tv',
       count: chunks,
       amount: showFramesAmount
    }))
    .pipe(gulp.dest('./dist'));
 });
```
