'use strict';

import sinon = require('sinon');
import chai = require('chai');

import inputConfig = require('./../../../generators/app/input-config');
const assert = chai.assert;

suite('Input Config Suite:', () => {
    let sandbox;
    const expectedNumPrompts = 6;
    const appNamePromptKey = 'appName';
    const appNameIndex = 0;
    const descriptionPromptKey = 'description';
    const descriptionIndex = 1;
    const appTypePromptKey = 'type';
    const appTypeIndex = 2;
    const vscodePromptKey = 'vscode';
    const vscodeIndex = 3;
    const dockerUserPromptKey = 'dockerUser';
    const dockerUserIndex = 4;
    const dependenciesPromptKey = 'installDependencies';
    const dependenciesIndex = 5;

    setup(() => {
        sandbox = sinon.sandbox.create();
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

        suite('Choices Tests:', () => {
            const choices = inputConfig.prompts[appTypeIndex].choices;
            const expectedNumberOfChoices = 5;
            const boilerplateIndex = 0;
            const boilerplateName = 'New App with just the boilerplate';
            const cliIndex = 1;
            const cliName = 'New CLI App';
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
                    assert.deepEqual(choice.value, 'boilerplate');
                });
            });

            suite('CLI Tests:', () => {
                const choice = choices[cliIndex];

                test('Should have the correct choice name', () => {
                    assert.deepEqual(choice.name, cliName);
                });

                test('Should have the correct choice value', () => {
                    assert.deepEqual(choice.value, 'cli');
                });
            });

            suite('Express API Tests:', () => {
                const choice = choices[expressApiIndex];

                test('Should have the correct choice name', () => {
                    assert.deepEqual(choice.name, expressApiName);
                });

                test('Should have the correct choice value', () => {
                    assert.deepEqual(choice.value, 'express-api');
                });
            });

            suite('VSTS Task Tests:', () => {
                const choice = choices[vstsIndex];

                test('Should have the correct choice name', () => {
                    assert.deepEqual(choice.name, vstsName);
                });

                test('Should have the correct choice value', () => {
                    assert.deepEqual(choice.value, 'vsts-task');
                });
            });

            suite('Chatbot Tests:', () => {
                const choice = choices[chatbotIndex];

                test('Should have the correct choice name', () => {
                    assert.deepEqual(choice.name, chatbotName);
                });

                test('Should have the correct choice value', () => {
                    assert.deepEqual(choice.value, 'chatbot');
                });
            });
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
    });

    suite('Docker User Prompt Tests', () => {
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
    });
});