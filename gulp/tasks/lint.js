'use strict';

const gulp = require('gulp');
const eslint = require('gulp-eslint');
const gulpTslint = require('gulp-tslint');
const gulpConfig = require('./../gulp-config');
const tslint = require('tslint');
const path = require('path');
const eslintrcPath = path.resolve('.eslintrc.js');

gulp.task('eslint', ['transpile'], function () {
    return gulp.src(gulpConfig.allGeneratorJavascript)
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('eslint-templates', ['transpile'], function () {
    return gulp.src(gulpConfig.templateJavascript)
        .pipe(eslint({useEslintrc: false, configFile: eslintrcPath}))
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

const createTypescriptProject = () => {
    return tslint.Linter.createProgram(gulpConfig.typescriptCompilerOptions);
};

gulp.task('tslint', function () {
    const program = createTypescriptProject();

    return gulp.src(gulpConfig.allGeneratorTypescript)
        .pipe(gulpTslint({
            formatter: 'stylish',
            program: program
        }))
        .pipe(gulpTslint.report({
            summarizeFailureOutput: false
        }));
});

gulp.task('tslint-templates', function () {
    const program = createTypescriptProject();

    return gulp.src(gulpConfig.templateTypescript)
        .pipe(gulpTslint({
            formatter: 'stylish',
            program: program
        }))
        .pipe(gulpTslint.report({
            summarizeFailureOutput: false
        }));
});