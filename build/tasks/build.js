'use strict';

var gulp = require('gulp');
var sourceMaps = require('gulp-sourcemaps');
var tsc = require('gulp-typescript');
var gulpConfig = require('./../gulp-config');

gulp.task('transpile', ['clean'], function() {
    var tsResult = gulp.src(gulpConfig.allTypescript, { base: '.' })
        .pipe(sourceMaps.init())
        .pipe(tsc(gulpConfig.typescriptCompilerOptions))
        .on('error', function(err) {
            throw new Error('TypeScript transpilation error: ' + err);
        });

    return tsResult.js
        .pipe(sourceMaps.write('.', { includeContent: false, sourceRoot: './' }))
        .pipe(gulp.dest(''));
});