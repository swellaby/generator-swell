'use strict';

const gulp = require('gulp');
const browserOpen = require('gulp-open');
const istanbul = require('gulp-istanbul');
const mocha = require('gulp-mocha');
const nsp = require('gulp-nsp');

const gulpConfig = require('./../gulp-config');
const istanbulConfig = require('./../istanbul-config');
const mochaConfig = require('./../mocha-config');

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
    // gulp.src('test/unit/app/vsts-tests.js')
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
        }));
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

gulp.task('enforce-component-integration-test-code-coverage', ['run-component-integration-tests'], function() {
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
        }));
});

gulp.task('show-component-integration-test-coverage-report', ['run-component-integration-tests'], function() {
    return gulp.src(istanbulConfig.componentIntegrationTestCoverageReportHtmlFile)
        .pipe(browserOpen());
});