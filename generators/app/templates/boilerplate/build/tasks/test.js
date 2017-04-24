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

gulp.task('run-unit-tests', ['pre-unit-tests', 'eslint'], function(cb) {
    gulp.src(gulpConfig.javascriptUnitTests)
        .pipe(mocha({
            ui: mochaConfig.unitTestMochaInterface,
            timeout: mochaConfig.unitTestTimeout,
            reporter: mochaConfig.unitTestReporter,
            reporterOptions: mochaConfig.unitTestReporterOptions
        }))
        .on('error', function (err) {
            console.error(err);
            process.exit(1);
        })
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

gulp.task('show-unit-test-coverage-report', ['run-unit-tests'], function() {
    return gulp.src(istanbulConfig.unitTestCoverageReportHtmlFile)
        .pipe(browserOpen());
});

gulp.task('pre-component-integration-tests', ['transpile'], function() {
    return gulp.src(gulpConfig.appTranspiledJavaScript)
        .pipe(istanbul({
            includeUntested: istanbulConfig.includeUntested,
        }))
        .pipe(istanbul.hookRequire());
});

gulp.task('run-component-integration-tests', ['pre-component-integration-tests', 'eslint'], function(cb) {
    gulp.src(gulpConfig.javascriptComponentIntegrationTests)
        .pipe(mocha({
            ui: mochaConfig.componentIntegrationTestMochaInterface,
            timeout: mochaConfig.componentIntegrationTestTimeout,
            reporter: mochaConfig.componentIntegrationTestReporter,
            reporterOptions: mochaConfig.componentIntegrationTestReporterOptions
        }))
        .on('error', function (err) {
            console.error(err);
            process.exit(1);
        })
        .pipe(istanbul.writeReports({
            reporters: istanbulConfig.reporters,
            dir: istanbulConfig.componentIntegrationTestCoverageDirectory
        }))        
        .on('end', cb);
});

gulp.task('enforce-component-integration-testcode-coverage', ['run-component-integration-tests'], function() {
    return gulp.src(gulpConfig.appTranspiledJavaScript)
        .pipe(istanbul.enforceThresholds({
            thresholds: {
                global: {
                    statements: istanbulConfig.componentIntegrationTestGlobalThresholds.statementCoverageThreshold,
                    branches: istanbulConfig.componentIntegrationTestGlobalThresholds.branchCoverageThreshold,
                    lines: istanbulConfig.componentIntegrationTestGlobalThresholds.lineCoverageThreshold,
                    functions: istanbulConfig.componentIntegrationTestGlobalThresholds.functionCoverageThreshold
                },
                local: {
                    statements: istanbulConfig.componentIntegrationTestLocalThresholds.statementCoverageThreshold,
                    branches: istanbulConfig.componentIntegrationTestLocalThresholds.branchCoverageThreshold,
                    lines: istanbulConfig.componentIntegrationTestLocalThresholds.lineCoverageThreshold,
                    functions: istanbulConfig.componentIntegrationTestLocalThresholds.functionCoverageThreshold
                }
            }
        }
    ));
});

gulp.task('show-component-integration-test-coverage-report', ['run-component-integration-tests'], function() {
    return gulp.src(istanbulConfig.componentIntegrationTestCoverageReportHtmlFile)
        .pipe(browserOpen());
});