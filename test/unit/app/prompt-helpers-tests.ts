'use strict';

import Sinon = require('sinon');
import chai = require('chai');

import ProjectTypes = require('./../../../generators/app/project-types');
import promptHelpers = require('./../../../generators/app/prompt-helpers');

const assert = chai.assert;

/**
 * Contains unit tests for the prompt helper functions defined in prompt-helpers.ts
 */
suite('Prompt Helpers Suite:', () => {
    suite('isBoilerplateOnlyProject Tests: ', () => {
        test('Should return false when the response parameter is null', () => {
            assert.deepEqual(promptHelpers.isBoilerplateOnlyProject(null), false);
        });

        test('Should return false when the response parameter is undefined', () => {
            assert.deepEqual(promptHelpers.isBoilerplateOnlyProject(undefined), false);
        });

        test('Should return false when the response parameter is an empty object', () => {
            assert.deepEqual(promptHelpers.isBoilerplateOnlyProject({}), false);
        });

        test('Should return true when the response type is a Boilerplate project', () => {
            const result = promptHelpers.isBoilerplateOnlyProject({ type: ProjectTypes[ProjectTypes.boilerplate]});
            assert.deepEqual(result, true);
        });

        test('Should return false when the response type is a Chatbot project', () => {
            const result = promptHelpers.isBoilerplateOnlyProject({ type: ProjectTypes[ProjectTypes.chatbot]});
            assert.deepEqual(result, false);
        });

        test('Should return false when the response type is a CLI project', () => {
            const result = promptHelpers.isBoilerplateOnlyProject({ type: ProjectTypes[ProjectTypes.cli]});
            assert.deepEqual(result, false);
        });

        test('Should return false when the response type is an Express API project', () => {
            const result = promptHelpers.isBoilerplateOnlyProject({ type: ProjectTypes[ProjectTypes.expressApi]});
            assert.deepEqual(result, false);
        });

        test('Should return false when the response type is a VSTS Task project', () => {
            const result = promptHelpers.isBoilerplateOnlyProject({ type: ProjectTypes[ProjectTypes.vstsTask]});
            assert.deepEqual(result, false);
        });
    });

    suite('isChatbotProject Tests: ', () => {
        test('Should return false when the response parameter is null', () => {
            assert.deepEqual(promptHelpers.isChatbotProject(null), false);
        });

        test('Should return false when the response parameter is undefined', () => {
            assert.deepEqual(promptHelpers.isChatbotProject(undefined), false);
        });

        test('Should return false when the response parameter is an empty object', () => {
            assert.deepEqual(promptHelpers.isChatbotProject({}), false);
        });

        test('Should return false when the response type is a Boilerplate project', () => {
            const result = promptHelpers.isChatbotProject({ type: ProjectTypes[ProjectTypes.boilerplate]});
            assert.deepEqual(result, false);
        });

        test('Should return true when the response type is a Chatbot project', () => {
            const result = promptHelpers.isChatbotProject({ type: ProjectTypes[ProjectTypes.chatbot]});
            assert.deepEqual(result, true);
        });

        test('Should return false when the response type is a CLI project', () => {
            const result = promptHelpers.isChatbotProject({ type: ProjectTypes[ProjectTypes.cli]});
            assert.deepEqual(result, false);
        });

        test('Should return false when the response type is an Express API project', () => {
            const result = promptHelpers.isChatbotProject({ type: ProjectTypes[ProjectTypes.expressApi]});
            assert.deepEqual(result, false);
        });

        test('Should return false when the response type is a VSTS Task project', () => {
            const result = promptHelpers.isChatbotProject({ type: ProjectTypes[ProjectTypes.vstsTask]});
            assert.deepEqual(result, false);
        });
    });

    suite('isCLIProject Tests: ', () => {
        test('Should return false when the response parameter is null', () => {
            assert.deepEqual(promptHelpers.isCLIProject(null), false);
        });

        test('Should return false when the response parameter is undefined', () => {
            assert.deepEqual(promptHelpers.isCLIProject(undefined), false);
        });

        test('Should return false when the response parameter is an empty object', () => {
            assert.deepEqual(promptHelpers.isCLIProject({}), false);
        });

        test('Should return false when the response type is a Boilerplate project', () => {
            const result = promptHelpers.isCLIProject({ type: ProjectTypes[ProjectTypes.boilerplate]});
            assert.deepEqual(result, false);
        });

        test('Should return false when the response type is a Chatbot project', () => {
            const result = promptHelpers.isCLIProject({ type: ProjectTypes[ProjectTypes.chatbot]});
            assert.deepEqual(result, false);
        });

        test('Should return true when the response type is a CLI project', () => {
            const result = promptHelpers.isCLIProject({ type: ProjectTypes[ProjectTypes.cli]});
            assert.deepEqual(result, true);
        });

        test('Should return false when the response type is an Express API project', () => {
            const result = promptHelpers.isCLIProject({ type: ProjectTypes[ProjectTypes.expressApi]});
            assert.deepEqual(result, false);
        });

        test('Should return false when the response type is a VSTS Task project', () => {
            const result = promptHelpers.isCLIProject({ type: ProjectTypes[ProjectTypes.vstsTask]});
            assert.deepEqual(result, false);
        });
    });

    suite('isExpressAPIProject Tests: ', () => {
        test('Should return false when the response parameter is null', () => {
            assert.deepEqual(promptHelpers.isExpressApiProject(null), false);
        });

        test('Should return false when the response parameter is undefined', () => {
            assert.deepEqual(promptHelpers.isExpressApiProject(undefined), false);
        });

        test('Should return false when the response parameter is an empty object', () => {
            assert.deepEqual(promptHelpers.isExpressApiProject({}), false);
        });

        test('Should return false when the response type is a Boilerplate project', () => {
            const result = promptHelpers.isExpressApiProject({ type: ProjectTypes[ProjectTypes.boilerplate]});
            assert.deepEqual(result, false);
        });

        test('Should return false when the response type is a Chatbot project', () => {
            const result = promptHelpers.isExpressApiProject({ type: ProjectTypes[ProjectTypes.chatbot]});
            assert.deepEqual(result, false);
        });

        test('Should return false when the response type is a CLI project', () => {
            const result = promptHelpers.isExpressApiProject({ type: ProjectTypes[ProjectTypes.cli]});
            assert.deepEqual(result, false);
        });

        test('Should return true when the response type is an Express API project', () => {
            const result = promptHelpers.isExpressApiProject({ type: ProjectTypes[ProjectTypes.expressApi]});
            assert.deepEqual(result, true);
        });

        test('Should return false when the response type is a VSTS Task project', () => {
            const result = promptHelpers.isExpressApiProject({ type: ProjectTypes[ProjectTypes.vstsTask]});
            assert.deepEqual(result, false);
        });
    });

    suite('isVSTSTaskProject Tests: ', () => {
        test('Should return false when the response parameter is null', () => {
            assert.deepEqual(promptHelpers.isVSTSTaskProject(null), false);
        });

        test('Should return false when the response parameter is undefined', () => {
            assert.deepEqual(promptHelpers.isVSTSTaskProject(undefined), false);
        });

        test('Should return false when the response parameter is an empty object', () => {
            assert.deepEqual(promptHelpers.isVSTSTaskProject({}), false);
        });

        test('Should return false when the response type is a Boilerplate project', () => {
            const result = promptHelpers.isVSTSTaskProject({ type: ProjectTypes[ProjectTypes.boilerplate]});
            assert.deepEqual(result, false);
        });

        test('Should return false when the response type is a Chatbot project', () => {
            const result = promptHelpers.isVSTSTaskProject({ type: ProjectTypes[ProjectTypes.chatbot]});
            assert.deepEqual(result, false);
        });

        test('Should return false when the response type is a CLI project', () => {
            const result = promptHelpers.isVSTSTaskProject({ type: ProjectTypes[ProjectTypes.cli]});
            assert.deepEqual(result, false);
        });

        test('Should return false when the response type is an Express API project', () => {
            const result = promptHelpers.isVSTSTaskProject({ type: ProjectTypes[ProjectTypes.expressApi]});
            assert.deepEqual(result, false);
        });

        test('Should return true when the response type is a VSTS Task project', () => {
            const result = promptHelpers.isVSTSTaskProject({ type: ProjectTypes[ProjectTypes.vstsTask]});
            assert.deepEqual(result, true);
        });
    });
});