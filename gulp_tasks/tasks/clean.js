/*eslint quotes: ["error", "single"]*/
// Related to: https://github.com/Microsoft/TypeScript/issues/13270
'use strict';

var gulp = require('gulp');
var del = require('del');
var gulpConfig = require('./../gulp-config');

gulp.task('clean', function () {
    return del(gulpConfig.allTranspiledJavascript);
});