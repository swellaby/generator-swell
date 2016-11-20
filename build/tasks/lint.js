'use strict';

var gulp = require('gulp');
var eslint = require('gulp-eslint');
var jshint = require('gulp-jshint');
var gulpConfig = require('./../gulp-config');

gulp.task('jshint', function() {
    return gulp.src(gulpConfig.allJavascript)
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(jshint.reporter('fail'));
});

gulp.task('eslint', function() {
    return gulp.src(gulpConfig.allJavascript)
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});