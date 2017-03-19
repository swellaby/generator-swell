'use strict';

import Chai = require('chai');
import path = require('path');
import pathHelpers = require('./../../../generators/app/path-helpers');

const assert = Chai.assert;

/**
 * Contains unit tests for path-helpers.ts
 */
suite('Path Helper Tests: ', () => {
    const srcDirname = path.resolve(__dirname, '../../../generators/app');
    const templateRoot = pathHelpers.templateRoot;

    test('Should contain the correct path for the template root directory', () => {
        assert.deepEqual(templateRoot, path.resolve(srcDirname, 'templates'));
    });

    test('Should contain the correct path for the boilerplate root directory', () => {
        const boilerplateRoot = pathHelpers.boilerplateRoot;
        assert.deepEqual(boilerplateRoot, path.resolve(templateRoot, 'boilerplate'));
    });

    test('Should contain the correct path for the VSTS common root directory', () => {
        const vstsCommonRoot = pathHelpers.vstsCommonRoot;
        assert.deepEqual(vstsCommonRoot, path.resolve(templateRoot, 'vsts-common'));
    });

    test('Should contain the correct path for the VSTS Task root directory', () => {
        const vstsTaskRoot = pathHelpers.vstsTaskRoot;
        assert.deepEqual(vstsTaskRoot, path.resolve(templateRoot, 'vsts-task'));
    });

    test('Should contain the correct path for the Chatbot root directory', () => {
        const chatbotRoot = pathHelpers.chatbotRoot;
        assert.deepEqual(chatbotRoot, path.resolve(templateRoot, 'chatbot'));
    });

    test('Should contain the correct path for the Express API root directory', () => {
        const expressApiRoot = pathHelpers.expressRoot;
        assert.deepEqual(expressApiRoot, path.resolve(templateRoot, 'express-api'));
    });

    test('Should contain the correct path for the VS Code root directory', () => {
        const vscodeRoot = pathHelpers.vscodeRoot;
        assert.deepEqual(vscodeRoot, path.resolve(templateRoot, 'vscode'));
    });
});