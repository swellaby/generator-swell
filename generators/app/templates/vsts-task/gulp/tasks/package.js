/*eslint quotes: ["error", "single"]*/
// Related to: https://github.com/Microsoft/TypeScript/issues/13270
'use strict';

const gulp = require('gulp');
const bump = require('gulp-bump');
const gulpConfig = require('./../gulp-config');
const copyNodeModules = require('copy-node-modules');

gulp.task('copy-dependencies', ['clean-vsts-task-publish'], function (done) {
    // eslint-disable-next-line no-unused-vars
    copyNodeModules('./', gulpConfig.vstsPublishTaskRoot, { devDependencies: false }, function(err, result) {
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
        .pipe(gulp.dest(gulpConfig.vstsPublishTaskSrc));
});

gulp.task('package-vsts-task-files', ['clean-vsts-task-publish', 'copy-dependencies'], function () {
    return gulp.src(gulpConfig.vstsTaskContent)
        .pipe(gulp.dest(gulpConfig.vstsPublishTaskRoot));
});

gulp.task('package-vsts-extension-images', ['clean-vsts-task-publish', 'copy-dependencies'], function () {
    return gulp.src(gulpConfig.vstsExtensionImages)
        .pipe(gulp.dest(gulpConfig.vstsPublishImageRoot));
});

gulp.task('bump-vsts-task-extension-version', function () {
    return gulp.src(gulpConfig.vstsExtensionManifest)
        .pipe(bump())
        .pipe(gulp.dest('./'));
});

gulp.task('package-vsts-task-extension-files', ['package-vsts-task-files', 'package-vsts-task-src', 'bump-vsts-task-extension-version', 'package-vsts-extension-images'], function () {
    return gulp.src(gulpConfig.vstsExtensionContent)
        .pipe(gulp.dest(gulpConfig.vstsPublishRoot));
});
