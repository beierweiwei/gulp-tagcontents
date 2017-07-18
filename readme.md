## desc 
this gulp plug help you get contents in tags for html or ohter file

## Installation

Install package with NPM and add it to your development dependencies:

`npm install --save-dev gulp-tagcontents`

## useage
```js 
  var tagcontents = require('gulp-tagcontents');
  var gulp.task('default', function() {
      return gulp.src('./src/example.html')
        .pipe(tagcontents({tag: 'style'}))
        //... for some handle for this stylesheet
        .pipe(rename('example.css'))
        .pipe(gulp.dest('./dist'))
    })
```

## Example
your html file  example.html contents:
```<!DOCTYPE html>
<html>
<head>
  <title>gulp-tagcontents</title>
  <style type="text/css">
      body {height: 100%}
      h1 {font-size: 14px}
  </style>
</head>
<body>

</body>
</html>
```
 
```js 
  var gulp = require('gulp');
  var tagcontents = require('gulp-tagcontents');
  var rename = require("gulp-rename");
  var gulp.task('default', function() {
      return gulp.src('./src/example.html')
        .pipe(tagcontents({tag: 'style'}))
        //... for some handle for this stylesheet
        .pipe(rename('example.css'))
        .pipe(gulp.dest('./dist'))
    })

```

your style contents in example.html will single create a example.css file;

