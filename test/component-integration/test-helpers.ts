'use strict';

import path = require('path');
import Sinon = require('sinon');
import YeomanGenerator = require('yeoman-generator');

export const generatorRoot = path.join(__dirname, './../../generators/app');
export const readmeFileName = 'README.md';
export const packageJson = 'package.json';
export const yoDestinationPathFunctionName = 'destinationPath';

export const boilerplateFiles = [
    '.eslintignore',
    '.gitignore',
    '.eslintrc.js',
    'gulpfile.js',
    'package.json',
    'README.md',
    'tsconfig.json',
    'tslint.json',
    './build/gulp-config.js',
    './build/istanbul-config.js',
    './build/mocha-config.js',
    './build/tasks/build.js',
    './build/tasks/build.js',
    './build/tasks/clean.js',
    './build/tasks/lint.js',
    './build/tasks/test.js'
];

export const vsCodeFiles = [
    '.vscode/tasks.json',
    '.vscode/extensions.json',
    '.vscode/launch.json'
];

/**
 * Creates the Sinon stub of the spawnSync method to init a git repo on Yeoman Generator instances.
 *
 * @param sandbox
 */
export const createGitInitStub = (sandbox: Sinon.SinonSandbox): Sinon.SinonStub => {
    return sandbox.stub(YeomanGenerator.prototype, 'spawnCommandSync').withArgs('git', ['init', '--quiet']);
};

/**
 * Creates the Sinon stub of the npmInstall method on Yeoman Generator instances.
 *
 * @param sandbox
 */
export const createNpmInstallStub = (sandbox: Sinon.SinonSandbox): Sinon.SinonStub => {
    return sandbox.stub(YeomanGenerator.prototype, 'npmInstall');
};

/**
 * Creates the Sinon stub of the installDependencies method on Yeoman Generator instances.
 *
 * @param sandbox
 */
export const createDependenciesInstallStub = (sandbox: Sinon.SinonSandbox): Sinon.SinonStub => {
    return sandbox.stub(YeomanGenerator.prototype, 'installDependencies');
};

export const createConsoleErrorStub = (sandbox: Sinon.SinonSandbox): Sinon.SinonStub => {
    return sandbox.stub(console, 'error');
};