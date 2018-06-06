'use strict';

import tl = require('vsts-task-lib/task');
import log = require('loglevel');
log.enableAll();

import Helper = require('./helper');

let helper: Helper;
let favoriteNumber: number;
let exampleMessage: string;
let collectionUri: string;
let systemAccessToken: string;

/**
 * Initializes the task for execution.
 * @private
 */
const initialize = () => {
    exampleMessage = tl.getInput('exampleMessage', true);
    favoriteNumber = parseFloat(tl.getInput('favoriteNumber', true));
    helper = new Helper();
    // Examples of accessing system variables.
    // More details about variables can be found at: https://www.visualstudio.com/en-us/docs/build/define/variables
    collectionUri = tl.getVariable('System.TeamFoundationCollectionUri');
    systemAccessToken = tl.getVariable('System.AccessToken');
};

/**
 * Helper function for failing the task.
 * @param err
 * @private
 */
const failTask = (err) => {
    let errorMessage = 'Fatal error occurred.';
    if (err && err.message) {
        errorMessage += ' Details: ' + err.message;
    }

    tl.error(errorMessage);
    tl.setResult(tl.TaskResult.Failed, 'Task failed. See output for error info.');
};

/**
 * Entry point for VSTS task execution
 */
export const run = async () => {
    try {
        initialize();
        log.info('Your message was: ' + exampleMessage);
        const doubleFavNumber = favoriteNumber * 2;
        log.info('The product of your favorite number times 2 is: ' + doubleFavNumber);
        const numTeamProjects = await helper.getNumTeamProjects(collectionUri, systemAccessToken);
        const successMessage = 'Your account has: ' + numTeamProjects + ' team projects. Your task passed, hooray!';
        log.info(successMessage);
        tl.debug('This only displays when debugging is enabled on the build/release definintion');
        tl.setResult(tl.TaskResult.Succeeded, successMessage);
    } catch (err) {
        failTask(err);
    }
};