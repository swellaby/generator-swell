'use strict';

var gulp = require('gulp');
var eslint = require('gulp-eslint');
var jshint = require('gulp-jshint');
var tslint = require('gulp-tslint');
var gulpConfig = require('./../gulp-config');

gulp.task('jshint', function () {
    return gulp.src(gulpConfig.allJavascript)
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(jshint.reporter('fail'));
});

gulp.task('eslint', function () {
    return gulp.src(gulpConfig.allJavascript)
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('tslint', function () {
    return gulp.src(gulpConfig.appTypescript)
        .pipe(tslint({
            formatter: 'verbose'
        }))
        .pipe(tslint.report());
});