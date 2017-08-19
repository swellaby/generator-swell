'use strict';

module.exports = {
    unitTestTimeout: 2000,
    unitTestReporter: 'mocha-multi',
    unitTestReporterOptions: {
        'xunit': {
            stdout: './testresults/unit-test-results.xml',
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
            stdout: './testresults/component-integration-test-results.xml',
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