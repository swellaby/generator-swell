/*eslint quotes: ["error", "single"]*/
// Related to: https://github.com/Microsoft/TypeScript/issues/13270
'use strict';

const gulp = require('gulp');
const gulpConfig = require('./../gulp-config');
const copyNodeModules = require('copy-node-modules');

gulp.task('copy-dependencies', ['clean-vsts-task-publish'], function (done) {
    // eslint-disable-next-line no-unused-vars
    copyNodeModules('./', gulpConfig.vstsPublishRoot, { devDependencies: false }, function(err, result) {
        if (err) {
            console.error(err);
            process.exit(1);
            done();
        }
        done();
    });
});

gulp.task('package-vsts-task-src', ['transpile', 'clean-vsts-task-publish', 'copy-dependencies'], function () {
    return gulp.src(gulpConfig.appTranspiledJavaScript)
        .pipe(gulp.dest(gulpConfig.vstsPublishSrc));
});

gulp.task('package-vsts-task-files', ['clean-vsts-task-publish', 'copy-dependencies'], function () {
    return gulp.src(gulpConfig.vstsTaskContent)
        .pipe(gulp.dest(gulpConfig.vstsPublishRoot));
});