'use strict';

const gulp = require('gulp');
const eslint = require('gulp-eslint');
const gulpTslint = require('gulp-tslint');
const gulpConfig = require('./../gulp-config');
const tslint = require('tslint');

gulp.task('eslint', ['transpile'], function () {
    return gulp.src(gulpConfig.allJavascript)
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('tslint', function () {
    const program = tslint.Linter.createProgram('./tsconfig.json');
    program.formatter = 'verbose';
    program.rulesDirectory = 'node_modules/tslint-microsoft-contrib';

    return gulp.src(gulpConfig.allGeneratorTypescript)
        .pipe(gulpTslint({ program }))
        .pipe(gulpTslint.report());
});