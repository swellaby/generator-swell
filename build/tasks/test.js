'use strict';

var gulp = require('gulp');
var browserOpen = require('gulp-open');
var istanbul = require('gulp-istanbul');
var mocha = require('gulp-mocha');
var nsp = require('gulp-nsp');

var gulpConfig = require('./../gulp-config');
var istanbulConfig = require('./../istanbul-config');
var mochaConfig = require('./../mocha-config');

gulp.task('check-security', function(cb) {
    nsp({package: gulpConfig.packageJSON}, cb);
});

gulp.task('pre-unit-tests', ['transpile'], function() {
    return gulp.src(gulpConfig.appTranspiledJavaScript)
        .pipe(istanbul({
            includeUntested: istanbulConfig.includeUntested,
        }))
        .pipe(istanbul.hookRequire());
});

gulp.task('run-unit-tests', ['pre-unit-tests','eslint'], function(cb) {
    gulp.src(gulpConfig.javascriptUnitTests)
        .pipe(mocha({
            ui: mochaConfig.unitTestMochaInterface,
            timeout: mochaConfig.unitTestTimeout,
            reporter: mochaConfig.unitTestReporter,
            reporterOptions: mochaConfig.unitTestReporterOptions
        }))
        .pipe(istanbul.writeReports({
            reporters: istanbulConfig.reporters,
            dir: istanbulConfig.unitTestCoverageDirectory
        }))
        .on('end', cb);
});

gulp.task('enforce-code-coverage', ['run-unit-tests'], function() {
    return gulp.src(gulpConfig.appTranspiledJavaScript)
        .pipe(istanbul.enforceThresholds({
            thresholds: {
                global: {
                    statements: istanbulConfig.unitTestGlobalThresholds.statementCoverageThreshold,
                    branches: istanbulConfig.unitTestGlobalThresholds.branchCoverageThreshold,
                    lines: istanbulConfig.unitTestGlobalThresholds.lineCoverageThreshold,
                    functions: istanbulConfig.unitTestGlobalThresholds.functionCoverageThreshold
                },
                local: {
                    statements: istanbulConfig.unitTestLocalThresholds.statementCoverageThreshold,
                    branches: istanbulConfig.unitTestLocalThresholds.branchCoverageThreshold,
                    lines: istanbulConfig.unitTestLocalThresholds.lineCoverageThreshold,
                    functions: istanbulConfig.unitTestLocalThresholds.functionCoverageThreshold
                }
            }
        }
    ));
});

gulp.task('show-unittest-coverage-report', ['run-unit-tests'], function() {
    return gulp.src(istanbulConfig.unitTestCoverageReportHtmlFile)
        .pipe(browserOpen());
});
