'use strict';

var gulp = require('gulp');
var eslint = require('gulp-eslint');
var tslint = require('gulp-tslint');
var gulpConfig = require('./../gulp-config');

gulp.task('eslint', ['transpile'], function () {
    return gulp.src(gulpConfig.allJavascript)
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('tslint', function () {
    return gulp.src(gulpConfig.appTypescript)
        .pipe(tslint({
            formatter: 'verbose',
            rulesDirectory: 'node_modules/tslint-microsoft-contrib',
        }))
        .pipe(tslint.report());
});