'use strict';

const gulp = require('gulp');
const del = require('del');
const gulpConfig = require('./../gulp-config');

gulp.task('clean', function () {
    return del(gulpConfig.allTranspiledJavascript);
});

gulp.task('clean-vsts-task-publish', [ 'clean', 'transpile' ], function () {
    return del(gulpConfig.vstsPublishRoot + '/**/*');
});