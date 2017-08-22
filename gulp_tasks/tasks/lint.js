/*eslint quotes: ["error", "single"]*/
// Related to: https://github.com/Microsoft/TypeScript/issues/13270
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

/**
 * Helper function for setting up TypeScript linting.
 */
const createTypescriptProject = () => {
    const program = tslint.Linter.createProgram('./tsconfig.json');
    program.formatter = 'verbose';
    program.rulesDirectory = 'node_modules/tslint-microsoft-contrib';

    return program;
};

gulp.task('tslint', function () {
    const program = createTypescriptProject();
    
    return gulp.src(gulpConfig.allGeneratorTypescript)
        .pipe(gulpTslint({ program }))
        .pipe(gulpTslint.report());
});

gulp.task('tslint-templates', function () {
    const program = createTypescriptProject();
    
    return gulp.src(gulpConfig.templateTypescript)
        .pipe(gulpTslint({ program }))
        .pipe(gulpTslint.report());
});