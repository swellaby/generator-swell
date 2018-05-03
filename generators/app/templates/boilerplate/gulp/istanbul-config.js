'use strict';

const path = require('path');
const coverageRootDirectoryPath = path.resolve('./.coverage');

const unitTestCoverageDirectory = coverageRootDirectoryPath + '/unit/';
const unitTestCoverageReportHtmlFile = unitTestCoverageDirectory + 'index.html';

const componentIntegrationTestCoverageDirectory = coverageRootDirectoryPath + '/component-integration/';
const componentIntegrationTestReportHtmlFile = componentIntegrationTestCoverageDirectory + 'index.html';

// These values determine the aggregate coverage thresholds that are applied across the entire project.
const unitTestGlobalStatementCoverageThreshold = 100;
const unitTestGlobalBranchCoverageThreshold = 100;
const unitTestGlobalLineCoverageThreshold = 100;
const unitTestGlobalFunctionCoverageThreshold = 100;

// These values determine the coverage thresholds that are applied to each file individually.
const unitTestLocalStatementCoverageThreshold = 100;
const unitTestLocalBranchCoverageThreshold = 100;
const unitTestLocalLineCoverageThreshold = 100;
const unitTestLocalFunctionCoverageThreshold = 100;

const componentIntegrationTestGlobalStatementCoverageThreshold = 85;
const componentIntegrationTestGlobalBranchCoverageThreshold = 80;
const componentIntegrationTestGlobalLineCoverageThreshold = 85;
const componentIntegrationTestGlobalFunctionCoverageThreshold = 85;

const componentIntegrationTestLocalStatementCoverageThreshold = 25;
const componentIntegrationTestLocalBranchCoverageThreshold = 25;
const componentIntegrationTestLocalLineCoverageThreshold = 50;
const componentIntegrationTestLocalFunctionCoverageThreshold = 50;

const includeUntested = true;
const reporters = ['html', 'lcov', 'cobertura', 'text', 'text-summary'];

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