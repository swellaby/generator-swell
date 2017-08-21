/*eslint quotes: ["error", "single"]*/
// Related to: https://github.com/Microsoft/TypeScript/issues/13270
'use strict';

const gulp = require('gulp');
const del = require('del');
const gulpConfig = require('./../gulp-config');

gulp.task('clean', function () {
    return del(gulpConfig.allTranspiledJavascript);
});