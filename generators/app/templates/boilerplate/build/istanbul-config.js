'use strict';

var path = require('path');

var unitTestCoverageDirectory = path.resolve('./coverage/unit/');
var unitTestCoverageReportHtmlFile = path.resolve('./coverage/unit/index.html');

// These values determine the aggregate coverage thresholds that are applied across the entire project.
var unitTestGlobalStatementCoverageThreshold = 100;
var unitTestGlobalBranchCoverageThreshold = 100;
var unitTestGlobalLineCoverageThreshold = 100;
var unitTestGlobalFunctionCoverageThreshold = 100;

// These values determine the coverage thresholds that are applied to each file individually.
var unitTestLocalStatementCoverageThreshold = 100;
var unitTestLocalBranchCoverageThreshold = 100;
var unitTestLocalLineCoverageThreshold = 100;
var unitTestLocalFunctionCoverageThreshold = 100;

var includeUntested = true;
var reporters = ['html', 'lcov', 'cobertura', 'text', 'text-summary'];

module.exports = {
    unitTestGlobalThresholds: {
        statementCoverageThreshold: unitTestGlobalStatementCoverageThreshold,
        branchCoverageThreshold: unitTestGlobalBranchCoverageThreshold,
        lineCoverageThreshold: unitTestGlobalLineCoverageThreshold,
        functionCoverageThreshold: unitTestGlobalFunctionCoverageThreshold
    }, 
    unitTestLocalThresholds: {
        statementCoverageThreshold: unitTestLocalStatementCoverageThreshold,
        branchCoverageThreshold: unitTestLocalBranchCoverageThreshold,
        lineCoverageThreshold: unitTestLocalLineCoverageThreshold,
        functionCoverageThreshold: unitTestLocalFunctionCoverageThreshold
    },
    reporters: reporters,
    includeUntested: includeUntested,
    unitTestCoverageDirectory: unitTestCoverageDirectory,
    unitTestCoverageReportHtmlFile: unitTestCoverageReportHtmlFile
};