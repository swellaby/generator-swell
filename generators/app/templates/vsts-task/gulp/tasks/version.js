'use strict';

const gulp = require('gulp');
const bump = require('gulp-bump');
const vstsBump = require('gulp-vsts-bump');
const gulpConfig = require('./../gulp-config');

gulp.task('bump-extension-version', function () {
    return gulp.src(gulpConfig.vstsExtensionManifest)
        .pipe(bump())
        .pipe(gulp.dest('./'));
});

gulp.task('bump-task-version', function () {
    return gulp.src(gulpConfig.vstsTaskManifestFiles, { base: './' })
        .pipe(vstsBump())
        .pipe(gulp.dest('./'));
});

gulp.task('bump-package-version', function () {
    return gulp.src(gulpConfig.packageJSON)
        .pipe(bump())
        .pipe(gulp.dest('./'));
});

gulp.task('bump-all', [ 'bump-extension-version', 'bump-package-version', 'bump-task-version' ]);