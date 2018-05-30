'use strict';

import tl = require('vsts-task-lib/task');
import log = require('loglevel');
log.enableAll();

/**
 * Entry point for VSTS task execution
 */
export const run = async () => {
    try {
        const message = tl.getInput('exampleMessage', true);
        log.info('Your message was: ' + message);
        tl.debug('This only displays when debugging is enabled on the build/release definintion');
        tl.setResult(tl.TaskResult.Succeeded, 'Passed!');
    } catch (err) {
        tl.debug('Error message details: ' + err ? err.msg : 'unknown');
        tl.setResult(tl.TaskResult.Failed, 'Task failed. See output for error info.');
    }
};