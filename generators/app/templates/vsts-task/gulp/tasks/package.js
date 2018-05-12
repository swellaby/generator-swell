'use strict';

const gulp = require('gulp');
const copyNodeModules = require('copy-node-modules');
const fs = require('fs');
const path = require('path');
const gulpConfig = require('./../gulp-config');

/**
 * Helper function to get all task directories.
 */
const getTaskDirectories = () => {
    return fs.readdirSync(gulpConfig.root)
        .filter((item) => {
            return fs.statSync(path.join(gulpConfig.root, item)).isDirectory();
        });
};

gulp.task('copy-dependencies', ['clean-vsts-task-publish'], function (done) {
    // eslint-disable-next-line no-unused-vars
    copyNodeModules('./', gulpConfig.vstsPublishTasksRoot, { devDependencies: false }, function(err, result) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        done();
    });
});

gulp.task('add-dependencies-to-tasks', ['copy-dependencies'], function(done) {
    getTaskDirectories().map((taskDirectory) => {
        gulp.src(path.join(gulpConfig.vstsPublishTasksRoot, 'node_modules/**'))
            .pipe(gulp.dest(path.join(path.join(gulpConfig.vstsPublishTasksRoot, taskDirectory), 'node_modules')));
    });
    done();
});


gulp.task('package-vsts-tasks', ['transpile', 'clean-vsts-task-publish', 'copy-dependencies', 'add-dependencies-to-tasks'], function () {
    return gulp.src(gulpConfig.vstsTaskContent)
        .pipe(gulp.dest(gulpConfig.vstsPublishTasksRoot));
});

gulp.task('package-vsts-extension-images', ['clean-vsts-task-publish', 'copy-dependencies'], function () {
    return gulp.src(gulpConfig.vstsExtensionImages)
        .pipe(gulp.dest(gulpConfig.vstsPublishImageRoot));
});

gulp.task('bump-package-vsts-task-extension-files', ['package-vsts-tasks', 'bump-all', 'package-vsts-extension-images'], function () {
    return gulp.src(gulpConfig.vstsExtensionContent)
        .pipe(gulp.dest(gulpConfig.vstsPublishRoot));
});

gulp.task('package-vsts-task-extension-files', ['package-vsts-tasks', 'package-vsts-extension-images'], function () {
    return gulp.src(gulpConfig.vstsExtensionContent)
        .pipe(gulp.dest(gulpConfig.vstsPublishRoot));
});
