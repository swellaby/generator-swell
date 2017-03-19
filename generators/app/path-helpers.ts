'use strict';

import path = require('path');

/**
 * Provides various path references
 */
export const templateRoot = path.join(__dirname, 'templates');
export const boilerplateRoot = path.join(templateRoot, 'boilerplate');
export const vstsCommonRoot = path.join(templateRoot, 'vsts-common');
export const vstsTaskRoot = path.join(templateRoot, 'vsts-task');
export const chatbotRoot = path.join(templateRoot, 'chatbot');
export const expressRoot = path.join(templateRoot, 'express-api');
export const vscodeRoot = path.join(templateRoot, 'vscode');