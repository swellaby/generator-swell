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
    const program = tslint.Linter.createProgram(gulpConfig.typescriptCompilerOptions);

    return gulp.src(gulpConfig.allTypescript)
        .pipe(gulpTslint({
            formatter: 'stylish',
            program: program
        }))
        .pipe(gulpTslint.report({
            summarizeFailureOutput: false
        }));
});