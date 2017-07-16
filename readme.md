## Installation

Install package with NPM and add it to your development dependencies:

`npm install --save-dev gulp-getsyle`

## Example
your html file  example.html contents:
```<!DOCTYPE html>
<html>
<head>
  <title>gulp-getstyle</title>
  <style type="text/css">
      body {height: 100%}
      ...
  </style>
</head>
<body>

</body>
</html>
```
 
```js 
  var gulp = require('gulp');
  var getStyle = require('gulp-getstyle');
  var rename = require("gulp-rename");
  var gulp.task('default', function() {
      return gulp.src('./src/example.html')
        .pipe(getSyle())
        //... for some handle for this stylesheet
        .pipe(rename('example.css'))
        .pipe(gulp.dest('./dist'))
    })

```

your style contents in example.html will single create a example.css file;
