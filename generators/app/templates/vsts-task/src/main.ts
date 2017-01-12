'use strict';

import tl = require('vsts-task-lib/task');
import Helper = require('./helper');
const helper = new Helper();

// Examples of retrieving input parameters
const exampleMessageParameter = tl.getInput('exampleMessage');
let inputAParameter = parseFloat(tl.getInput('inputA', true));
let inputBParameter = parseFloat(tl.getInput('inputB', true));

// Examples of accessing system variables.
// More details about variables can be found at: https://www.visualstudio.com/en-us/docs/build/define/variables 
const buildId = tl.getVariable('Build.BuildId');
const collectionUri = tl.getVariable('System.TeamFoundationCollectionUri');
const systemAccessToken = tl.getVariable('System.AccessToken');

export async function executeTask() {
    if (isNaN(inputAParameter) || isNaN(inputBParameter)) {
        tl.debug('This message will show when debugging is enabled on the build/release.');
        tl.error('Invalid inputs!');
        tl.setResult(tl.TaskResult.Failed, 'Invalid parameters');
    }

    // Safely get decimal places now that we know the string inputs are valid numbers.
    inputAParameter = +inputAParameter.toFixed(2);
    inputBParameter = +inputBParameter.toFixed(2);

    // You can use standard console mechanisms, or retrieve a tool runner like echo
    // via the tl object: var echo = new tl.ToolRunner(tl.which('echo', true));
    // console.log/error is usually simpler IMO.
    console.log('You said: ' + exampleMessageParameter);

    helper.add(inputAParameter, inputBParameter)
        .then((sum: number) => {
            console.log('The sum is: ' + sum);
            tl.setResult(tl.TaskResult.Succeeded, 'Your task passed, hooray!');     
        })
        .catch((error: Error) => {
            tl.error('Something failed! Error message: ' + error.message);
        });

    getTeamProjectCount();

}

executeTask();

async function getTeamProjectCount() {
    try {
        var count = await helper.getNumTeamProjects(collectionUri, systemAccessToken);
        console.log(count);
        tl.setResult(tl.TaskResult.Succeeded, 'Got count. Your task passed, hooray!');  
    } catch (err) {
        tl.error('Something failed! Error message: ' + err.message);
        tl.setResult(tl.TaskResult.Failed, 'Addition failed, math is broken :(');
    }     
}