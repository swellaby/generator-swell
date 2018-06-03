'use strict';

import sinon = require('sinon');
import chai = require('chai');

import inputConfig = require('./../../../generators/app/input-config');
import ProjectTypes = require('./../../../generators/app/project-types');
import PromptHelpers = require('./../../../generators/app/prompt-helpers');

const assert = chai.assert;

/**
 * Contains unit tests for the input configuration for the user prompts.
 */
suite('Input Config Suite:', () => {
    let sandbox;
    const expectedNumPrompts = 14;
    const appNamePromptKey = 'appName';
    const appNameIndex = 0;
    const descriptionPromptKey = 'description';
    const descriptionIndex = 1;
    const authorPromptKey = 'author';
    const authorPromptIndex = 2;
    const appTypePromptKey = 'type';
    const appTypeIndex = 3;
    const dockerUserPromptKey = 'dockerUser';
    const dockerUserIndex = 4;
    const vstsTaskCountPromptKey = 'vstsTaskCount';
    const vstsTaskCountIndex = 5;
    const vstsTask1NameKey = 'task1Name';
    const vstsTask1NameIndex = 6;
    const vstsTask2NameKey = 'task2Name';
    const vstsTask2NameIndex = 7;
    const vstsTask3NameKey = 'task3Name';
    const vstsTask3NameIndex = 8;
    const vstsTask4NameKey = 'task4Name';
    const vstsTask4NameIndex = 9;
    const vstsTask5NameKey = 'task5Name';
    const vstsTask5NameIndex = 10;
    const vstsSampleTaskKey = 'includeSampleVstsTask';
    const vstsSampleTaskIndex = 11;
    const vscodePromptKey = 'vscode';
    const vscodeIndex = 12;
    const dependenciesPromptKey = 'installDependencies';
    const dependenciesIndex = 13;

    setup(() => {
        sandbox = sinon.createSandbox();
    });
    teardown(() => {
        sandbox.restore();
    });

    test('Should have the correct number of prompts', () => {
        assert.deepEqual(inputConfig.prompts.length, expectedNumPrompts);
    });

    test('Should present prompts in the correct order', () => {
        assert.deepEqual(inputConfig.prompts[appNameIndex].name, appNamePromptKey);
        assert.deepEqual(inputConfig.prompts[descriptionIndex].name, descriptionPromptKey);
        assert.deepEqual(inputConfig.prompts[appTypeIndex].name, appTypePromptKey);
        assert.deepEqual(inputConfig.prompts[dockerUserIndex].name, dockerUserPromptKey);
        assert.deepEqual(inputConfig.prompts[vstsTaskCountIndex].name, vstsTaskCountPromptKey);
        assert.deepEqual(inputConfig.prompts[vstsTask1NameIndex].name, vstsTask1NameKey);
        assert.deepEqual(inputConfig.prompts[vstsTask2NameIndex].name, vstsTask2NameKey);
        assert.deepEqual(inputConfig.prompts[vstsTask3NameIndex].name, vstsTask3NameKey);
        assert.deepEqual(inputConfig.prompts[vstsTask4NameIndex].name, vstsTask4NameKey);
        assert.deepEqual(inputConfig.prompts[vstsTask5NameIndex].name, vstsTask5NameKey);
        assert.deepEqual(inputConfig.prompts[vstsSampleTaskIndex].name, vstsSampleTaskKey);
        assert.deepEqual(inputConfig.prompts[vscodeIndex].name, vscodePromptKey);
        assert.deepEqual(inputConfig.prompts[dependenciesIndex].name, dependenciesPromptKey);
    });

    suite('App Name Prompt Tests:', () => {
        const prompt = inputConfig.prompts[appNameIndex];
        const expectedMessage = 'The name of your app';
        const expectedPromptType = 'input';

        test('Should have the correct prompt name', () => {
            assert.deepEqual(prompt.name, appNamePromptKey);
        });

        test('Should have the correct message that describes the prompt', () => {
            assert.deepEqual(prompt.message, expectedMessage);
        });

        test('Should be the correct type of prompt', () => {
            assert.deepEqual(prompt.type, expectedPromptType);
        });
    });

    suite('Description Prompt Tests:', () => {
        const prompt = inputConfig.prompts[descriptionIndex];
        const expectedMessage = 'The description of your app';
        const expectedPromptType = 'input';

        test('Should have the correct prompt name', () => {
            assert.deepEqual(prompt.name, descriptionPromptKey);
        });

        test('Should have the correct message that describes the prompt', () => {
            assert.deepEqual(prompt.message, expectedMessage);
        });

        test('Should be the correct type of prompt', () => {
            assert.deepEqual(prompt.type, expectedPromptType);
        });
    });

    suite('Author Prompt Tests:', () => {
        const prompt = inputConfig.prompts[authorPromptIndex];
        const expectedMessage = 'The author of this app';
        const expectedPromptType = 'input';

        test('Should have the correct prompt name', () => {
            assert.deepEqual(prompt.name, authorPromptKey);
        });

        test('Should have the correct message that describes the prompt', () => {
            assert.deepEqual(prompt.message, expectedMessage);
        });

        test('Should be the correct type of prompt', () => {
            assert.deepEqual(prompt.type, expectedPromptType);
        });

        test('Should have the correct default value', () => {
            assert.deepEqual(prompt.default, 'me');
        });
    });

    suite('Type Prompt Tests:', () => {
        const prompt = inputConfig.prompts[appTypeIndex];
        const expectedMessage = 'What type of app is this?';
        const expectedPromptType = 'list';

        test('Should have the correct prompt name', () => {
            assert.deepEqual(prompt.name, appTypePromptKey);
        });

        test('Should have the correct message that describes the prompt', () => {
            assert.deepEqual(prompt.message, expectedMessage);
        });

        test('Should be the correct type of prompt', () => {
            assert.deepEqual(prompt.type, expectedPromptType);
        });

        test('Should have the correct default value', () => {
            assert.deepEqual(prompt.default, ProjectTypes[ProjectTypes.boilerplate]);
        });

        suite('Choices Tests:', () => {
            const choices = inputConfig.prompts[appTypeIndex].choices;
            const expectedNumberOfChoices = 5;
            const boilerplateIndex = 0;
            const boilerplateName = 'New App with just the boilerplate';
            const cliIndex = 1;
            const cliName = 'New CLI App (Not Yet Supported)';
            const expressApiIndex = 2;
            const expressApiName = 'New API App with Express and Docker';
            const vstsIndex = 3;
            const vstsName = 'New VSTS Task';
            const chatbotIndex = 4;
            const chatbotName = 'New Chatbot';

            test('Should have the correct number of choices', () => {
                assert.deepEqual(prompt.choices.length, expectedNumberOfChoices);
            });

            test('Should present choices in the correct order', () => {
                assert.deepEqual(choices[boilerplateIndex].name, boilerplateName);
                assert.deepEqual(choices[cliIndex].name, cliName);
                assert.deepEqual(choices[expressApiIndex].name, expressApiName);
                assert.deepEqual(choices[vstsIndex].name, vstsName);
                assert.deepEqual(choices[chatbotIndex].name, chatbotName);
            });

            suite('Boilerplate Tests:', () => {
                const choice = choices[boilerplateIndex];

                test('Should have the correct choice name', () => {
                    assert.deepEqual(choice.name, boilerplateName);
                });

                test('Should have the correct choice value', () => {
                    assert.deepEqual(choice.value, ProjectTypes[ProjectTypes.boilerplate]);
                });
            });

            suite('CLI Tests:', () => {
                const choice = choices[cliIndex];

                test('Should have the correct choice name', () => {
                    assert.deepEqual(choice.name, cliName);
                });

                test('Should have the correct choice value', () => {
                    assert.deepEqual(choice.value, ProjectTypes[ProjectTypes.cli]);
                });
            });

            suite('Express API Tests:', () => {
                const choice = choices[expressApiIndex];

                test('Should have the correct choice name', () => {
                    assert.deepEqual(choice.name, expressApiName);
                });

                test('Should have the correct choice value', () => {
                    assert.deepEqual(choice.value, ProjectTypes[ProjectTypes.expressApi]);
                });
            });

            suite('VSTS Task Tests:', () => {
                const choice = choices[vstsIndex];

                test('Should have the correct choice name', () => {
                    assert.deepEqual(choice.name, vstsName);
                });

                test('Should have the correct choice value', () => {
                    assert.deepEqual(choice.value, ProjectTypes[ProjectTypes.vstsTask]);
                });
            });

            suite('Chatbot Tests:', () => {
                const choice = choices[chatbotIndex];

                test('Should have the correct choice name', () => {
                    assert.deepEqual(choice.name, chatbotName);
                });

                test('Should have the correct choice value', () => {
                    assert.deepEqual(choice.value, ProjectTypes[ProjectTypes.chatbot]);
                });
            });
        });
    });

    suite('Docker User Prompt Tests:', () => {
        const prompt = inputConfig.prompts[dockerUserIndex];
        const expectedMessage = 'What is your Docker Hub User Id?';
        const expectedPromptType = 'input';

        test('Should have the correct prompt name', () => {
            assert.deepEqual(prompt.name, dockerUserPromptKey);
        });

        test('Should have the correct message that describes the prompt', () => {
            assert.deepEqual(prompt.message, expectedMessage);
        });

        test('Should be the correct type of prompt', () => {
            assert.deepEqual(prompt.type, expectedPromptType);
        });

        test('Should have the correct when condition', () => {
            assert.deepEqual(prompt.when, PromptHelpers.isExpressApiProject);
        });

        test('Should have the correct default value', () => {
            assert.deepEqual(prompt.default, PromptHelpers.getDockerUserValue);
        });
    });

    suite('VSTS Task Count Prompt Tests:', () => {
        const prompt = inputConfig.prompts[vstsTaskCountIndex];
        const expectedMessage = 'How many VSTS Tasks do you want?';
        const expectedPromptType = 'list';

        test('Should have the correct prompt name', () => {
            assert.deepEqual(prompt.name, vstsTaskCountPromptKey);
        });

        test('Should have the correct message that describes the prompt', () => {
            assert.deepEqual(prompt.message, expectedMessage);
        });

        test('Should be the correct type of prompt', () => {
            assert.deepEqual(prompt.type, expectedPromptType);
        });

        test('Should have the correct when condition', () => {
            assert.deepEqual(prompt.when, PromptHelpers.isVSTSTaskProject);
        });

        test('Should have the correct default value', () => {
            assert.deepEqual(prompt.default, 1);
        });

        test('Should have the correct choice options', () => {
            const choices = prompt.choices;
            assert.deepEqual(choices.length, 5);
            assert.deepEqual(choices[0].name, '1');
            assert.deepEqual(choices[0].value, 1);
            assert.deepEqual(choices[1].name, '2');
            assert.deepEqual(choices[1].value, 2);
            assert.deepEqual(choices[2].name, '3');
            assert.deepEqual(choices[2].value, 3);
            assert.deepEqual(choices[3].name, '4');
            assert.deepEqual(choices[3].value, 4);
            assert.deepEqual(choices[4].name, '5');
            assert.deepEqual(choices[4].value, 5);
        });
    });

    suite('VSTS Task 1 Name Prompt Tests:', () => {
        const prompt = inputConfig.prompts[vstsTask1NameIndex];
        const expectedMessage = 'What would you like to name the first VSTS task?';
        const expectedPromptType = 'input';

        test('Should have the correct prompt name', () => {
            assert.deepEqual(prompt.name, vstsTask1NameKey);
        });

        test('Should have the correct message that describes the prompt', () => {
            assert.deepEqual(prompt.message, expectedMessage);
        });

        test('Should be the correct type of prompt', () => {
            assert.deepEqual(prompt.type, expectedPromptType);
        });

        test('Should have the correct when condition', () => {
            assert.deepEqual(prompt.when, PromptHelpers.isVSTSTaskProject);
        });

        test('Should have the correct default value', () => {
            assert.deepEqual(prompt.default, 'taskOne');
        });
    });

    suite('VSTS Task 2 Name Prompt Tests:', () => {
        const prompt = inputConfig.prompts[vstsTask2NameIndex];
        const expectedMessage = 'What would you like to name the second VSTS task?';
        const expectedPromptType = 'input';

        test('Should have the correct prompt name', () => {
            assert.deepEqual(prompt.name, vstsTask2NameKey);
        });

        test('Should have the correct message that describes the prompt', () => {
            assert.deepEqual(prompt.message, expectedMessage);
        });

        test('Should be the correct type of prompt', () => {
            assert.deepEqual(prompt.type, expectedPromptType);
        });

        test('Should have the correct when condition', () => {
            assert.deepEqual(prompt.when, PromptHelpers.isRequestedVstsTaskCountGreaterThanOne);
        });

        test('Should have the correct default value', () => {
            assert.deepEqual(prompt.default, 'taskTwo');
        });
    });

    suite('VSTS Task 3 Name Prompt Tests:', () => {
        const prompt = inputConfig.prompts[vstsTask3NameIndex];
        const expectedMessage = 'What would you like to name the third VSTS task?';
        const expectedPromptType = 'input';

        test('Should have the correct prompt name', () => {
            assert.deepEqual(prompt.name, vstsTask3NameKey);
        });

        test('Should have the correct message that describes the prompt', () => {
            assert.deepEqual(prompt.message, expectedMessage);
        });

        test('Should be the correct type of prompt', () => {
            assert.deepEqual(prompt.type, expectedPromptType);
        });

        test('Should have the correct when condition', () => {
            assert.deepEqual(prompt.when, PromptHelpers.isRequestedVstsTaskCountGreaterThanTwo);
        });

        test('Should have the correct default value', () => {
            assert.deepEqual(prompt.default, 'taskThree');
        });
    });

    suite('VSTS Task 4 Name Prompt Tests:', () => {
        const prompt = inputConfig.prompts[vstsTask4NameIndex];
        const expectedMessage = 'What would you like to name the fourth VSTS task?';
        const expectedPromptType = 'input';

        test('Should have the correct prompt name', () => {
            assert.deepEqual(prompt.name, vstsTask4NameKey);
        });

        test('Should have the correct message that describes the prompt', () => {
            assert.deepEqual(prompt.message, expectedMessage);
        });

        test('Should be the correct type of prompt', () => {
            assert.deepEqual(prompt.type, expectedPromptType);
        });

        test('Should have the correct when condition', () => {
            assert.deepEqual(prompt.when, PromptHelpers.isRequestedVstsTaskCountGreaterThanThree);
        });

        test('Should have the correct default value', () => {
            assert.deepEqual(prompt.default, 'taskFour');
        });
    });

    suite('VSTS Task 5 Name Prompt Tests:', () => {
        const prompt = inputConfig.prompts[vstsTask5NameIndex];
        const expectedMessage = 'What would you like to name the fifth VSTS task?';
        const expectedPromptType = 'input';

        test('Should have the correct prompt name', () => {
            assert.deepEqual(prompt.name, vstsTask5NameKey);
        });

        test('Should have the correct message that describes the prompt', () => {
            assert.deepEqual(prompt.message, expectedMessage);
        });

        test('Should be the correct type of prompt', () => {
            assert.deepEqual(prompt.type, expectedPromptType);
        });

        test('Should have the correct when condition', () => {
            assert.deepEqual(prompt.when, PromptHelpers.isRequestedVstsTaskCountGreaterThanFour);
        });

        test('Should have the correct default value', () => {
            assert.deepEqual(prompt.default, 'taskFive');
        });
    });

    suite('VSTS Sample Task Prompt Tests:', () => {
        const prompt = inputConfig.prompts[vstsSampleTaskIndex];
        const expectedMessage = 'Do you want me to include a sample VSTS task?';
        const expectedPromptType = 'confirm';

        test('Should have the correct prompt name', () => {
            assert.deepEqual(prompt.name, vstsSampleTaskKey);
        });

        test('Should have the correct message that describes the prompt', () => {
            assert.deepEqual(prompt.message, expectedMessage);
        });

        test('Should be the correct type of prompt', () => {
            assert.deepEqual(prompt.type, expectedPromptType);
        });

        test('Should have the correct when condition', () => {
            assert.deepEqual(prompt.when, PromptHelpers.isVSTSTaskProject);
        });

        test('Should have the correct default value', () => {
            assert.deepEqual(prompt.default, true);
        });
    });

    suite('Add VSCode Files Prompt Tests:', () => {
        const prompt = inputConfig.prompts[vscodeIndex];
        const expectedMessage = 'Do you use Visual Studio Code?';
        const expectedPromptType = 'confirm';

        test('Should have the correct prompt name', () => {
            assert.deepEqual(prompt.name, vscodePromptKey);
        });

        test('Should have the correct message that describes the prompt', () => {
            assert.deepEqual(prompt.message, expectedMessage);
        });

        test('Should be the correct type of prompt', () => {
            assert.deepEqual(prompt.type, expectedPromptType);
        });

        test('Should have the correct default value', () => {
            assert.deepEqual(prompt.default, true);
        });
    });

    suite('Install Dependencies Prompt Tests:', () => {
        const prompt = inputConfig.prompts[dependenciesIndex];
        const expectedMessage = 'Do you want me to install dependencies for you?';
        const expectedPromptType = 'confirm';

        test('Should have the correct prompt name', () => {
            assert.deepEqual(prompt.name, dependenciesPromptKey);
        });

        test('Should have the correct message that describes the prompt', () => {
            assert.deepEqual(prompt.message, expectedMessage);
        });

        test('Should be the correct type of prompt', () => {
            assert.deepEqual(prompt.type, expectedPromptType);
        });

        test('Should have the correct default value', () => {
            assert.deepEqual(prompt.default, true);
        });
    });
});