'use strict';

import tl = require('vsts-task-lib/task');
import Helper = require('./helper');

// Examples of retrieving input parameters
const exampleMessageParameter = tl.getInput('exampleMessage');
let inputAParameter = parseFloat(tl.getInput('inputA', true));
let inputBParameter = parseFloat(tl.getInput('inputB', true));

// Examples of accessing system variables.
// More details about variables can be found at: https://www.visualstudio.com/en-us/docs/build/define/variables 
const buildId = tl.getVariable('Build.BuildId');
const collectionUri = tl.getVariable('System.TeamFoundationCollectionUri');
const teamProjectName = tl.getVariable('System.TeamProject');
const systemAccessToken = tl.getVariable('System.AccessToken');

if (isNaN(inputAParameter) || isNaN(inputBParameter)) {
    tl.debug('This message will show when debugging is enabled on the build/release.');
    tl.error('Invalid inputs!');
}

// Safely get decimal places now that we know the string inputs are valid numbers.
inputAParameter = +inputAParameter.toFixed(2);
inputBParameter = +inputBParameter.toFixed(2);

// You can use standard console mechanisms, or retrieve a tool runner like echo
// via the tl object: var echo = new tl.ToolRunner(tl.which('echo', true));
// console.log/error is usually simpler IMO.
console.log('You said: ' + exampleMessageParameter);

var helper = new Helper();
helper.add(inputAParameter, inputBParameter)
    .then((sum: number) => {        
        console.log('The sum is: ' + sum);
        tl.setResult(tl.TaskResult.Succeeded, 'Your task passed, hooray!');
        tl.exit(0);        
    })
    .fail((error: Error) => {
        tl.error('Something failed! Error message: ' + error.message);
        tl.setResult(tl.TaskResult.Succeeded, 'Addition failed, math is broken :(');
        tl.exit(1);
    });