'use strict';

import tl = require('vsts-task-lib/task');
import trm = require('vsts-task-lib/toolrunner');
import Helper = require('./helper');

let helper: Helper;
let echo: trm.ToolRunner;
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
    // Note you can use 'console.log(...)' instead of echo, but we find tasks easier to unit tests with echo.
    echo = tl.tool(tl.which('echo'));
    echo.arg('-e'); // this is necessary if you want to print newline characters.
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
        errorMessage += ' Error: ' + err.message;
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
        echo.arg('Your message was: ' + exampleMessage + '\\n');
        const doubleFavNumber = favoriteNumber * 2;
        echo.arg('The product of your favorite number times 2 is: ' + doubleFavNumber + '\\n');
        echo.execSync();
        const numTeamProjects = await helper.getNumTeamProjects(collectionUri, systemAccessToken);
        const successMessage = 'Your account has: ' + numTeamProjects + ' team projects. Your task passed, hooray!';

        tl.setResult(tl.TaskResult.Succeeded, successMessage);
    } catch (err) {
        failTask(err);
    }
};