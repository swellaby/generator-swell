'use strict';

var path = require('path');

var unitTestCoverageDirectory = path.resolve('./coverage/unit/');
var unitTestCoverageReportHtmlFile = path.resolve('./coverage/unit/index.html');

var componentIntegrationTestCoverageDirectory = path.resolve('./coverage/component-integration/');
var componentIntegrationTestReportHtmlFile = path.resolve('./coverage/component-integration/index.html');

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

var componentIntegrationTestGlobalStatementCoverageThreshold = 85;
var componentIntegrationTestGlobalBranchCoverageThreshold = 80;
var componentIntegrationTestGlobalLineCoverageThreshold = 85;
var componentIntegrationTestGlobalFunctionCoverageThreshold = 100;

var componentIntegrationTestLocalStatementCoverageThreshold = 80;
var componentIntegrationTestLocalBranchCoverageThreshold = 80;
var componentIntegrationTestLocalLineCoverageThreshold = 80;
var componentIntegrationTestLocalFunctionCoverageThreshold = 100;

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
    componentIntegrationTestGlobalThresholds: {
        statementCoverageThreshold: componentIntegrationTestGlobalStatementCoverageThreshold,
        branchCoverageThreshold: componentIntegrationTestGlobalBranchCoverageThreshold,
        lineCoverageThreshold: componentIntegrationTestGlobalLineCoverageThreshold,
        functionCoverageThreshold: componentIntegrationTestGlobalFunctionCoverageThreshold
    },
    componentIntegrationTestLocalThresholds: {
        statementCoverageThreshold: componentIntegrationTestLocalStatementCoverageThreshold,
        branchCoverageThreshold: componentIntegrationTestLocalBranchCoverageThreshold,
        lineCoverageThreshold: componentIntegrationTestLocalLineCoverageThreshold,
        functionCoverageThreshold: componentIntegrationTestLocalFunctionCoverageThreshold
    },
    reporters: reporters,
    includeUntested: includeUntested,
    unitTestCoverageDirectory: unitTestCoverageDirectory,
    unitTestCoverageReportHtmlFile: unitTestCoverageReportHtmlFile,
    componentIntegrationTestCoverageDirectory: componentIntegrationTestCoverageDirectory,
    componentIntegrationTestCoverageReportHtmlFile: componentIntegrationTestReportHtmlFile
};