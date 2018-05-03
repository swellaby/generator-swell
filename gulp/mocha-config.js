'use strict';

const path = require('path');
const testResultsRootDirectoryPath = path.resolve('./.testresults');
const unitTestResultsFile = testResultsRootDirectoryPath + '/unit-test-results.xml';
const componentIntegrationTestResultsFile = testResultsRootDirectoryPath + '/component-integration-test-results.xml';

module.exports = {
    unitTestTimeout: 2000,
    unitTestReporter: 'mocha-multi',
    unitTestReporterOptions: {
        'xunit': {
            stdout: unitTestResultsFile,
            options: {
                verbose: true,
            }
        },
        spec: {
            stdout: '-'
        }
    },
    unitTestMochaInterface: 'tdd',
    componentIntegrationTestTimeout: 7500,
    componentIntegrationTestReporter: 'mocha-multi',
    componentIntegrationTestReporterOptions: {
        'xunit': {
            stdout: componentIntegrationTestResultsFile,
            options: {
                verbose: true,
            }
        },
        spec: {
            stdout: '-'
        }
    },
    componentIntegrationTestMochaInterface: 'tdd',
};