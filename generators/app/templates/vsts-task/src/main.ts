// This is a temporary fix due to the way the TypeScript compiler currently functions
// it converts single quotes to double quotes on import/require statements.
/* tslint:disable:no-single-line-block-comment ESLint needs single line block comments */
/* eslint-disable quotes */
'use strict';

import tl = require('vsts-task-lib/task');
import Helper = require('./helper');
/* eslint-enable quotes */
/* tslint:enable:no-single-line-block-comment */

const helper = new Helper();

/**
 *
 */
const validateInputs = (inputA, inputB): boolean => {
    if (isNaN(inputA) || isNaN(inputB)) {
        tl.debug('This message will show when debugging is enabled on the build/release.');
        tl.error('Invalid inputs!');
        tl.setResult(tl.TaskResult.Failed, 'Invalid parameters');

        return false;
    }

    return true;
}

/**
 *
 */
const addInputs = async (inputA, inputB) => {
    const areValid = validateInputs(inputA, inputB);

    if (areValid) {
        // Safely get decimal places now that we know the string inputs are valid numbers.
        inputA = +inputA.toFixed(2);
        inputB = +inputB.toFixed(2);

        // You can use standard console mechanisms, or retrieve a tool runner like echo
        // via the tl object: var echo = new tl.ToolRunner(tl.which('echo', true));
        // console.log/error is usually simpler in our opinion.
        // console.log('You said: ' + exampleMessageParameter);
        helper.add(inputA, inputB).then((sum: number) => {
            console.log('The sum is: ' + sum);
            tl.setResult(tl.TaskResult.Succeeded, 'Your task passed, hooray!');
        }).catch((error: Error) => {
            tl.error('Something failed! Error message: ' + error.message);
        });
    }
}

/**
 *
 */
export const executeTask = async () => {
    // Examples of retrieving input parameters
    const exampleMessageParameter = tl.getInput('exampleMessage');
    const inputAParameter = parseFloat(tl.getInput('inputA', true));
    const inputBParameter = parseFloat(tl.getInput('inputB', true));

    console.log('You said: ' + exampleMessageParameter);

    await addInputs(inputAParameter, inputBParameter);
}

export const getTeamProjectCount = async () => {
    // Examples of accessing system variables.
    // More details about variables can be found at: https://www.visualstudio.com/en-us/docs/build/define/variables
    const collectionUri = tl.getVariable('System.TeamFoundationCollectionUri');
    const systemAccessToken = tl.getVariable('System.AccessToken');

    try {
        const count = await helper.getNumTeamProjects(collectionUri, systemAccessToken);
        tl.setResult(tl.TaskResult.Succeeded, 'Got count: ' + count + '. Your task passed, hooray!');
    } catch (err) {
        tl.error('Something failed! Error message: ' + err.message);
        tl.setResult(tl.TaskResult.Failed, 'Addition failed, math is broken :(');
    }
}

// These two methods invocated for illustrative purposes. These could just as easily have been
// broken down into two separate tasks (and probably should be).
executeTask();
getTeamProjectCount();
