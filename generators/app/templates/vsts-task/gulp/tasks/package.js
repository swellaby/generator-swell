/*eslint quotes: ["error", "single"]*/
// Related to: https://github.com/Microsoft/TypeScript/issues/13270
'use strict';

const gulp = require('gulp');
const gulpConfig = require('./../gulp-config');

gulp.task('copy-dependencies', ['transpile', 'clean-vsts-task-publish'], function() {
    return gulp.src('./node_modules/**/*')
        .pipe(gulp.dest(gulpConfig.vstsPublishRoot + '/node_modules/'));
});

gulp.task('package-vsts-task-src', ['transpile', 'clean-vsts-task-publish', 'copy-dependencies'], function () {
    return gulp.src(gulpConfig.appTranspiledJavaScript)
        .pipe(gulp.dest(gulpConfig.vstsPublishRoot));
});

gulp.task('package-vsts-task-files', ['clean-vsts-task-publish', 'copy-dependencies'], function () {
    return gulp.src(gulpConfig.vstsTaskContent)
        .pipe(gulp.dest(gulpConfig.vstsPublishRoot));
});