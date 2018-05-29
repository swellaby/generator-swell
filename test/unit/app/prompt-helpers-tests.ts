'use strict';

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
            const result = promptHelpers.isBoilerplateOnlyProject({ type: ProjectTypes[ProjectTypes.boilerplate] });
            assert.deepEqual(result, true);
        });

        test('Should return false when the response type is a Chatbot project', () => {
            const result = promptHelpers.isBoilerplateOnlyProject({ type: ProjectTypes[ProjectTypes.chatbot] });
            assert.deepEqual(result, false);
        });

        test('Should return false when the response type is a CLI project', () => {
            const result = promptHelpers.isBoilerplateOnlyProject({ type: ProjectTypes[ProjectTypes.cli] });
            assert.deepEqual(result, false);
        });

        test('Should return false when the response type is an Express API project', () => {
            const result = promptHelpers.isBoilerplateOnlyProject({ type: ProjectTypes[ProjectTypes.expressApi] });
            assert.deepEqual(result, false);
        });

        test('Should return false when the response type is a VSTS Task project', () => {
            const result = promptHelpers.isBoilerplateOnlyProject({ type: ProjectTypes[ProjectTypes.vstsTask] });
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
            const result = promptHelpers.isChatbotProject({ type: ProjectTypes[ProjectTypes.boilerplate] });
            assert.deepEqual(result, false);
        });

        test('Should return true when the response type is a Chatbot project', () => {
            const result = promptHelpers.isChatbotProject({ type: ProjectTypes[ProjectTypes.chatbot] });
            assert.deepEqual(result, true);
        });

        test('Should return false when the response type is a CLI project', () => {
            const result = promptHelpers.isChatbotProject({ type: ProjectTypes[ProjectTypes.cli] });
            assert.deepEqual(result, false);
        });

        test('Should return false when the response type is an Express API project', () => {
            const result = promptHelpers.isChatbotProject({ type: ProjectTypes[ProjectTypes.expressApi] });
            assert.deepEqual(result, false);
        });

        test('Should return false when the response type is a VSTS Task project', () => {
            const result = promptHelpers.isChatbotProject({ type: ProjectTypes[ProjectTypes.vstsTask] });
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
            const result = promptHelpers.isCLIProject({ type: ProjectTypes[ProjectTypes.boilerplate] });
            assert.deepEqual(result, false);
        });

        test('Should return false when the response type is a Chatbot project', () => {
            const result = promptHelpers.isCLIProject({ type: ProjectTypes[ProjectTypes.chatbot] });
            assert.deepEqual(result, false);
        });

        test('Should return true when the response type is a CLI project', () => {
            const result = promptHelpers.isCLIProject({ type: ProjectTypes[ProjectTypes.cli] });
            assert.deepEqual(result, true);
        });

        test('Should return false when the response type is an Express API project', () => {
            const result = promptHelpers.isCLIProject({ type: ProjectTypes[ProjectTypes.expressApi] });
            assert.deepEqual(result, false);
        });

        test('Should return false when the response type is a VSTS Task project', () => {
            const result = promptHelpers.isCLIProject({ type: ProjectTypes[ProjectTypes.vstsTask] });
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
            const result = promptHelpers.isExpressApiProject({ type: ProjectTypes[ProjectTypes.boilerplate] });
            assert.deepEqual(result, false);
        });

        test('Should return false when the response type is a Chatbot project', () => {
            const result = promptHelpers.isExpressApiProject({ type: ProjectTypes[ProjectTypes.chatbot] });
            assert.deepEqual(result, false);
        });

        test('Should return false when the response type is a CLI project', () => {
            const result = promptHelpers.isExpressApiProject({ type: ProjectTypes[ProjectTypes.cli] });
            assert.deepEqual(result, false);
        });

        test('Should return true when the response type is an Express API project', () => {
            const result = promptHelpers.isExpressApiProject({ type: ProjectTypes[ProjectTypes.expressApi] });
            assert.deepEqual(result, true);
        });

        test('Should return false when the response type is a VSTS Task project', () => {
            const result = promptHelpers.isExpressApiProject({ type: ProjectTypes[ProjectTypes.vstsTask] });
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
            const result = promptHelpers.isVSTSTaskProject({ type: ProjectTypes[ProjectTypes.boilerplate] });
            assert.deepEqual(result, false);
        });

        test('Should return false when the response type is a Chatbot project', () => {
            const result = promptHelpers.isVSTSTaskProject({ type: ProjectTypes[ProjectTypes.chatbot] });
            assert.deepEqual(result, false);
        });

        test('Should return false when the response type is a CLI project', () => {
            const result = promptHelpers.isVSTSTaskProject({ type: ProjectTypes[ProjectTypes.cli] });
            assert.deepEqual(result, false);
        });

        test('Should return false when the response type is an Express API project', () => {
            const result = promptHelpers.isVSTSTaskProject({ type: ProjectTypes[ProjectTypes.expressApi] });
            assert.deepEqual(result, false);
        });

        test('Should return true when the response type is a VSTS Task project', () => {
            const result = promptHelpers.isVSTSTaskProject({ type: ProjectTypes[ProjectTypes.vstsTask] });
            assert.deepEqual(result, true);
        });
    });

    suite('getAuthorValue Tests: ', () => {
        const defaultDockerUser = 'myDockerHubId';

        test('Should return default docker user value when the response param is null', () => {
            assert.deepEqual(promptHelpers.getDockerUserValue(null), defaultDockerUser);
        });

        test('Should return default docker user value when the response param is undefined', () => {
            assert.deepEqual(promptHelpers.getDockerUserValue(undefined), defaultDockerUser);
        });

        test('Should return default docker user value when the response param is an empty object', () => {
            assert.deepEqual(promptHelpers.getDockerUserValue({}), defaultDockerUser);
        });

        test('Should return default docker user value when the response author is null', () => {
            assert.deepEqual(promptHelpers.getDockerUserValue({ author: null }), defaultDockerUser);
        });

        test('Should return default docker user value when the response author is undefined', () => {
            assert.deepEqual(promptHelpers.getDockerUserValue({ author: undefined }), defaultDockerUser);
        });

        test('Should return the author value when the response has a valid author value', () => {
            const author = 'me';
            assert.deepEqual(promptHelpers.getDockerUserValue({ author: author }), author);
        });
    });

    suite('isRequestedVstsTaskCountGreaterThan Tests:', () => {
        test('Should return false when response parameter is null', () => {
            const response = null;
            const result = promptHelpers.isRequestedVstsTaskCountGreaterThan(response, 0);
            assert.isFalse(result);
        });

        test('Should return false when the response parameter is undefined', () => {
            const response = undefined;
            const result = promptHelpers.isRequestedVstsTaskCountGreaterThan(response, 0);
            assert.isFalse(result);
        });

        test('Should return false when the response parameter is an empty object', () => {
            const response = {};
            const result = promptHelpers.isRequestedVstsTaskCountGreaterThan(response, 0);
            assert.isFalse(result);
        });

        test('Should return false when the response type is a Boilerplate project', () => {
            const response = { type: ProjectTypes[ProjectTypes.boilerplate] };
            const result = promptHelpers.isRequestedVstsTaskCountGreaterThan(response, 0);
            assert.isFalse(result);
        });

        test('Should return false when the response type is a Chatbot project', () => {
            const response = { type: ProjectTypes[ProjectTypes.chatbot] };
            const result = promptHelpers.isRequestedVstsTaskCountGreaterThan(response, 0);
            assert.isFalse(result);
        });

        test('Should return false when the response type is a CLI project', () => {
            const response = { type: ProjectTypes[ProjectTypes.cli] };
            const result = promptHelpers.isRequestedVstsTaskCountGreaterThan(response, 0);
            assert.isFalse(result);
        });

        test('Should return false when the response type is an Express API project', () => {
            const response = { type: ProjectTypes[ProjectTypes.expressApi] };
            const result = promptHelpers.isRequestedVstsTaskCountGreaterThan(response, 0);
            assert.isFalse(result);
        });

        test('Should return false when for VSTS Task project when the comparator is equal', () => {
            const response = { type: ProjectTypes[ProjectTypes.vstsTask], vstsTaskCount: 2 };
            const result = promptHelpers.isRequestedVstsTaskCountGreaterThan(response, 2);
            assert.isFalse(result);
        });

        test('Should return false when for VSTS Task project when the comparator is less than', () => {
            const response = { type: ProjectTypes[ProjectTypes.vstsTask], vstsTaskCount: 3 };
            const result = promptHelpers.isRequestedVstsTaskCountGreaterThan(response, 4);
            assert.isFalse(result);
        });

        test('Should return true when for VSTS Task project when the comparator is greater', () => {
            const response = { type: ProjectTypes[ProjectTypes.vstsTask], vstsTaskCount: 3 };
            const result = promptHelpers.isRequestedVstsTaskCountGreaterThan(response, 2);
            assert.isTrue(result);
        });
    });

    suite('isRequestedVstsTaskCountGreaterThanOne Tests:', () => {
        test('Should return false when response parameter is null', () => {
            const response = null;
            const result = promptHelpers.isRequestedVstsTaskCountGreaterThanOne(response);
            assert.isFalse(result);
        });

        test('Should return false when the response parameter is undefined', () => {
            const response = undefined;
            const result = promptHelpers.isRequestedVstsTaskCountGreaterThanOne(response);
            assert.isFalse(result);
        });

        test('Should return false when the response parameter is an empty object', () => {
            const response = {};
            const result = promptHelpers.isRequestedVstsTaskCountGreaterThanOne(response);
            assert.isFalse(result);
        });

        test('Should return false when the response type is a Boilerplate project', () => {
            const response = { type: ProjectTypes[ProjectTypes.boilerplate] };
            const result = promptHelpers.isRequestedVstsTaskCountGreaterThanOne(response);
            assert.isFalse(result);
        });

        test('Should return false when the response type is a Chatbot project', () => {
            const response = { type: ProjectTypes[ProjectTypes.chatbot] };
            const result = promptHelpers.isRequestedVstsTaskCountGreaterThanOne(response);
            assert.isFalse(result);
        });

        test('Should return false when the response type is a CLI project', () => {
            const response = { type: ProjectTypes[ProjectTypes.cli] };
            const result = promptHelpers.isRequestedVstsTaskCountGreaterThanOne(response);
            assert.isFalse(result);
        });

        test('Should return false when the response type is an Express API project', () => {
            const response = { type: ProjectTypes[ProjectTypes.expressApi] };
            const result = promptHelpers.isRequestedVstsTaskCountGreaterThanOne(response);
            assert.isFalse(result);
        });

        test('Should return false when for VSTS Task project when the comparator is equal', () => {
            const response = { type: ProjectTypes[ProjectTypes.vstsTask], vstsTaskCount: 1 };
            const result = promptHelpers.isRequestedVstsTaskCountGreaterThanOne(response);
            assert.isFalse(result);
        });

        test('Should return false when for VSTS Task project when the comparator is less than', () => {
            const response = { type: ProjectTypes[ProjectTypes.vstsTask], vstsTaskCount: 0 };
            const result = promptHelpers.isRequestedVstsTaskCountGreaterThanOne(response);
            assert.isFalse(result);
        });

        test('Should return true when for VSTS Task project when the comparator is greater', () => {
            const response = { type: ProjectTypes[ProjectTypes.vstsTask], vstsTaskCount: 3 };
            const result = promptHelpers.isRequestedVstsTaskCountGreaterThanOne(response);
            assert.isTrue(result);
        });
    });

    suite('isRequestedVstsTaskCountGreaterThanTwo Tests:', () => {
        test('Should return false when response parameter is null', () => {
            const response = null;
            const result = promptHelpers.isRequestedVstsTaskCountGreaterThanTwo(response);
            assert.isFalse(result);
        });

        test('Should return false when the response parameter is undefined', () => {
            const response = undefined;
            const result = promptHelpers.isRequestedVstsTaskCountGreaterThanTwo(response);
            assert.isFalse(result);
        });

        test('Should return false when the response parameter is an empty object', () => {
            const response = {};
            const result = promptHelpers.isRequestedVstsTaskCountGreaterThanTwo(response);
            assert.isFalse(result);
        });

        test('Should return false when the response type is a Boilerplate project', () => {
            const response = { type: ProjectTypes[ProjectTypes.boilerplate] };
            const result = promptHelpers.isRequestedVstsTaskCountGreaterThanTwo(response);
            assert.isFalse(result);
        });

        test('Should return false when the response type is a Chatbot project', () => {
            const response = { type: ProjectTypes[ProjectTypes.chatbot] };
            const result = promptHelpers.isRequestedVstsTaskCountGreaterThanTwo(response);
            assert.isFalse(result);
        });

        test('Should return false when the response type is a CLI project', () => {
            const response = { type: ProjectTypes[ProjectTypes.cli] };
            const result = promptHelpers.isRequestedVstsTaskCountGreaterThanTwo(response);
            assert.isFalse(result);
        });

        test('Should return false when the response type is an Express API project', () => {
            const response = { type: ProjectTypes[ProjectTypes.expressApi] };
            const result = promptHelpers.isRequestedVstsTaskCountGreaterThanTwo(response);
            assert.isFalse(result);
        });

        test('Should return false when for VSTS Task project when the comparator is equal', () => {
            const response = { type: ProjectTypes[ProjectTypes.vstsTask], vstsTaskCount: 2 };
            const result = promptHelpers.isRequestedVstsTaskCountGreaterThanTwo(response);
            assert.isFalse(result);
        });

        test('Should return false when for VSTS Task project when the comparator is less than', () => {
            const response = { type: ProjectTypes[ProjectTypes.vstsTask], vstsTaskCount: 1 };
            const result = promptHelpers.isRequestedVstsTaskCountGreaterThanTwo(response);
            assert.isFalse(result);
        });

        test('Should return true when for VSTS Task project when the comparator is greater', () => {
            const response = { type: ProjectTypes[ProjectTypes.vstsTask], vstsTaskCount: 3 };
            const result = promptHelpers.isRequestedVstsTaskCountGreaterThanTwo(response);
            assert.isTrue(result);
        });
    });

    suite('isRequestedVstsTaskCountGreaterThanThree Tests:', () => {
        test('Should return false when response parameter is null', () => {
            const response = null;
            const result = promptHelpers.isRequestedVstsTaskCountGreaterThanThree(response);
            assert.isFalse(result);
        });

        test('Should return false when the response parameter is undefined', () => {
            const response = undefined;
            const result = promptHelpers.isRequestedVstsTaskCountGreaterThanThree(response);
            assert.isFalse(result);
        });

        test('Should return false when the response parameter is an empty object', () => {
            const response = {};
            const result = promptHelpers.isRequestedVstsTaskCountGreaterThanThree(response);
            assert.isFalse(result);
        });

        test('Should return false when the response type is a Boilerplate project', () => {
            const response = { type: ProjectTypes[ProjectTypes.boilerplate] };
            const result = promptHelpers.isRequestedVstsTaskCountGreaterThanThree(response);
            assert.isFalse(result);
        });

        test('Should return false when the response type is a Chatbot project', () => {
            const response = { type: ProjectTypes[ProjectTypes.chatbot] };
            const result = promptHelpers.isRequestedVstsTaskCountGreaterThanThree(response);
            assert.isFalse(result);
        });

        test('Should return false when the response type is a CLI project', () => {
            const response = { type: ProjectTypes[ProjectTypes.cli] };
            const result = promptHelpers.isRequestedVstsTaskCountGreaterThanThree(response);
            assert.isFalse(result);
        });

        test('Should return false when the response type is an Express API project', () => {
            const response = { type: ProjectTypes[ProjectTypes.expressApi] };
            const result = promptHelpers.isRequestedVstsTaskCountGreaterThanThree(response);
            assert.isFalse(result);
        });

        test('Should return false when for VSTS Task project when the comparator is equal', () => {
            const response = { type: ProjectTypes[ProjectTypes.vstsTask], vstsTaskCount: 3 };
            const result = promptHelpers.isRequestedVstsTaskCountGreaterThanThree(response);
            assert.isFalse(result);
        });

        test('Should return false when for VSTS Task project when the comparator is less than', () => {
            const response = { type: ProjectTypes[ProjectTypes.vstsTask], vstsTaskCount: 2 };
            const result = promptHelpers.isRequestedVstsTaskCountGreaterThanThree(response);
            assert.isFalse(result);
        });

        test('Should return true when for VSTS Task project when the comparator is greater', () => {
            const response = { type: ProjectTypes[ProjectTypes.vstsTask], vstsTaskCount: 4 };
            const result = promptHelpers.isRequestedVstsTaskCountGreaterThanThree(response);
            assert.isTrue(result);
        });
    });

    suite('isRequestedVstsTaskCountGreaterThanFour Tests:', () => {
        test('Should return false when response parameter is null', () => {
            const response = null;
            const result = promptHelpers.isRequestedVstsTaskCountGreaterThanFour(response);
            assert.isFalse(result);
        });

        test('Should return false when the response parameter is undefined', () => {
            const response = undefined;
            const result = promptHelpers.isRequestedVstsTaskCountGreaterThanFour(response);
            assert.isFalse(result);
        });

        test('Should return false when the response parameter is an empty object', () => {
            const response = {};
            const result = promptHelpers.isRequestedVstsTaskCountGreaterThanFour(response);
            assert.isFalse(result);
        });

        test('Should return false when the response type is a Boilerplate project', () => {
            const response = { type: ProjectTypes[ProjectTypes.boilerplate] };
            const result = promptHelpers.isRequestedVstsTaskCountGreaterThanFour(response);
            assert.isFalse(result);
        });

        test('Should return false when the response type is a Chatbot project', () => {
            const response = { type: ProjectTypes[ProjectTypes.chatbot] };
            const result = promptHelpers.isRequestedVstsTaskCountGreaterThanThree(response);
            assert.isFalse(result);
        });

        test('Should return false when the response type is a CLI project', () => {
            const response = { type: ProjectTypes[ProjectTypes.cli] };
            const result = promptHelpers.isRequestedVstsTaskCountGreaterThanFour(response);
            assert.isFalse(result);
        });

        test('Should return false when the response type is an Express API project', () => {
            const response = { type: ProjectTypes[ProjectTypes.expressApi] };
            const result = promptHelpers.isRequestedVstsTaskCountGreaterThanFour(response);
            assert.isFalse(result);
        });

        test('Should return false when for VSTS Task project when the comparator is equal', () => {
            const response = { type: ProjectTypes[ProjectTypes.vstsTask], vstsTaskCount: 4 };
            const result = promptHelpers.isRequestedVstsTaskCountGreaterThanFour(response);
            assert.isFalse(result);
        });

        test('Should return false when for VSTS Task project when the comparator is less than', () => {
            const response = { type: ProjectTypes[ProjectTypes.vstsTask], vstsTaskCount: 3 };
            const result = promptHelpers.isRequestedVstsTaskCountGreaterThanFour(response);
            assert.isFalse(result);
        });

        test('Should return true when for VSTS Task project when the comparator is greater', () => {
            const response = { type: ProjectTypes[ProjectTypes.vstsTask], vstsTaskCount: 5 };
            const result = promptHelpers.isRequestedVstsTaskCountGreaterThanFour(response);
            assert.isTrue(result);
        });
    });
});