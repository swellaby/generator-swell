'use strict';

import Chai = require('chai');
import Sinon = require('sinon');
import taskLogger = require('./../../src/task-logger');

const assert = Chai.assert;

/**
 * Contains unit tests for the functions defined in {@link ./src/task-logger.ts}
 */
suite('TaskLogger Suite:', () => {
    const sandbox = Sinon.sandbox.create();
    let consoleLogSpy: Sinon.SinonSpy;

    setup(() => {
        consoleLogSpy = sandbox.spy(console, 'log');
    });

    teardown(() => {
        sandbox.restore();
    });

    test('Should log content to console', () => {
        const message = ' ';
        taskLogger.log(message);
        assert.isTrue(consoleLogSpy.calledWith(message));
    });
});