// 'use strict';
// /* jshint maxstatements:false */
// // Disabled maxstatements jshint rule which errors due to 
// // the test functions being embedded within the suite functions.

// var sinon = require('sinon');
// var chai = require('chai');

// var inputConfig = require('./../../../generators/app/input-config');
// var assert = chai.assert;

// suite('Input Config Suite:', function () {
//     var sandbox;
//     var expectedNumPrompts = 5;
//     var appNamePromptKey = 'appName';
//     var appNameIndex = 0;
//     var descriptionPromptKey = 'description';
//     var descriptionIndex = 1;
//     var appTypePromptKey = 'type';
//     var appTypeIndex = 2;
//     var dockerUserPromptKey = 'dockerUser';
//     var dockerUserIndex = 3;
//     var dependenciesPromptKey = 'installDependencies';
//     var dependenciesIndex = 4;

//     setup(function () {
//         sandbox = sinon.sandbox.create();
//     });
//     teardown(function () {
//         sandbox.restore();
//     });

//     test('Should have the correct number of prompts', function () {
//         assert.deepEqual(inputConfig.prompts.length, expectedNumPrompts);
//     });

//     test('Should present prompts in the correct order', function () {
//         assert.deepEqual(inputConfig.prompts[appNameIndex].name, appNamePromptKey);
//         assert.deepEqual(inputConfig.prompts[descriptionIndex].name, descriptionPromptKey);
//         assert.deepEqual(inputConfig.prompts[appTypeIndex].name, appTypePromptKey);
//         assert.deepEqual(inputConfig.prompts[dockerUserIndex].name, dockerUserPromptKey);
//         assert.deepEqual(inputConfig.prompts[dependenciesIndex].name, dependenciesPromptKey);
//     });

//     suite('App Name Prompt Tests:', function () {
//         var prompt = inputConfig.prompts[appNameIndex];
//         var expectedMessage = 'The name of your app';
//         var expectedPromptType = 'input';

//         test('Should have the correct prompt name', function () {
//             assert.deepEqual(prompt.name, appNamePromptKey);
//         });

//         test('Should be a required prompt', function () {
//             assert.isTrue(prompt.required);
//         });

//         test('Should have the correct message that describes the prompt', function () {
//             assert.deepEqual(prompt.message, expectedMessage);
//         });

//         test('Should be the correct type of prompt', function () {
//             assert.deepEqual(prompt.type, expectedPromptType);
//         });
//     });

//     suite('Description Prompt Tests:', function () {
//         var prompt = inputConfig.prompts[descriptionIndex];
//         var expectedMessage = 'The description of your app';
//         var expectedPromptType = 'input';

//         test('Should have the correct prompt name', function () {
//             assert.deepEqual(prompt.name, descriptionPromptKey);
//         });

//         test('Should not be a required prompt', function () {
//             var required = prompt.required;

//             if (required !== undefined) {
//                 assert.isFalse(prompt.required);
//             }
//         });

//         test('Should have the correct message that describes the prompt', function () {
//             assert.deepEqual(prompt.message, expectedMessage);
//         });

//         test('Should be the correct type of prompt', function () {
//             assert.deepEqual(prompt.type, expectedPromptType);
//         });
//     });

//     suite('Type Prompt Tests:', function () {
//         var prompt = inputConfig.prompts[appTypeIndex];
//         var expectedMessage = 'What type of app is this?';
//         var expectedPromptType = 'list';

//         test('Should have the correct prompt name', function () {
//             assert.deepEqual(prompt.name, appTypePromptKey);
//         });

//         test('Should be a required prompt', function () {
//             assert.isTrue(prompt.required);
//         });

//         test('Should have the correct message that describes the prompt', function () {
//             assert.deepEqual(prompt.message, expectedMessage);
//         });

//         test('Should be the correct type of prompt', function () {
//             assert.deepEqual(prompt.type, expectedPromptType);
//         });

//         suite('Choices Tests:', function () {
//             var choices = inputConfig.prompts[appTypeIndex].choices;
//             var expectedNumberOfChoices = 4;
//             var boilerplateIndex = 0;
//             var boilerplateName = 'New App with just the boilerplate';
//             var cliIndex = 1;
//             var cliName = 'New CLI App';
//             var expressApiIndex = 2;
//             var expressApiName = 'New API App with Express and Docker';
//             var vstsIndex = 3;
//             var vstsName = 'New VSTS Task';

//             test('Should have the correct number of choices', function () {
//                 assert.deepEqual(prompt.choices.length, expectedNumberOfChoices);
//             });

//             test('Should present choices in the correct order', function () {
//                 assert.deepEqual(choices[boilerplateIndex].name, boilerplateName);
//                 assert.deepEqual(choices[cliIndex].name, cliName);
//                 assert.deepEqual(choices[expressApiIndex].name, expressApiName);
//                 assert.deepEqual(choices[vstsIndex].name, vstsName);
//             });

//             suite('Boilerplate Tests:', function () {
//                 var choice = choices[boilerplateIndex];

//                 test('Should have the correct choice name', function () {
//                     assert.deepEqual(choice.name, boilerplateName);
//                 });

//                 test('Should have the correct choice value', function () {
//                     assert.deepEqual(choice.value, 'boilerplate');
//                 });
//             });

//             suite('CLI Tests:', function () {
//                 var choice = choices[cliIndex];

//                 test('Should have the correct choice name', function () {
//                     assert.deepEqual(choice.name, cliName);
//                 });

//                 test('Should have the correct choice value', function () {
//                     assert.deepEqual(choice.value, 'cli');
//                 });
//             });

//             suite('Express API Tests:', function () {
//                 var choice = choices[expressApiIndex];

//                 test('Should have the correct choice name', function () {
//                     assert.deepEqual(choice.name, expressApiName);
//                 });

//                 test('Should have the correct choice value', function () {
//                     assert.deepEqual(choice.value, 'express-api');
//                 });
//             });

//             suite('VSTS Task Tests:', function () {
//                 var choice = choices[vstsIndex];

//                 test('Should have the correct choice name', function () {
//                     assert.deepEqual(choice.name, vstsName);
//                 });

//                 test('Should have the correct choice value', function () {
//                     assert.deepEqual(choice.value, 'vsts-task');
//                 });
//             });
//         });
//     });

//     suite('Docker User Prompt Tests', function () {
//         var prompt = inputConfig.prompts[dockerUserIndex];
//         var expectedMessage = 'What is your Docker Hub User Id?';
//         var expectedPromptType = 'input';

//         test('Should have the correct prompt name', function () {
//             assert.deepEqual(prompt.name, dockerUserPromptKey);
//         });

//         test('Should not be a required prompt', function () {
//             var required = prompt.required;

//             if (required !== undefined) {
//                 assert.isFalse(prompt.required);
//             }
//         });

//         test('Should have the correct message that describes the prompt', function () {
//             assert.deepEqual(prompt.message, expectedMessage);
//         });

//         test('Should be the correct type of prompt', function () {
//             assert.deepEqual(prompt.type, expectedPromptType);
//         });
//     });

//     suite('Install Dependencies Prompt Tests:', function () {
//         var prompt = inputConfig.prompts[dependenciesIndex];
//         var expectedMessage = 'Do you want me to install dependencies for you?';
//         var expectedPromptType = 'confirm';

//         test('Should have the correct prompt name', function () {
//             assert.deepEqual(prompt.name, dependenciesPromptKey);
//         });

//         test('Should not be a required prompt', function () {
//             var required = prompt.required;

//             if (required !== undefined) {
//                 assert.isFalse(prompt.required);
//             }
//         });

//         test('Should have the correct message that describes the prompt', function () {
//             assert.deepEqual(prompt.message, expectedMessage);
//         });

//         test('Should be the correct type of prompt', function () {
//             assert.deepEqual(prompt.type, expectedPromptType);
//         });
//     });
// });