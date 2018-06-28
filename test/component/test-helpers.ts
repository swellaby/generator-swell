'use strict';

import path = require('path');
import Sinon = require('sinon');
import YeomanGenerator = require('yeoman-generator');

export const generatorRoot = path.join(__dirname, './../../generators/app');
export const readmeFileName = 'README.md';
export const readmeGeneratorOriginHeader = '### Generator';
export const readmeGeneratorOriginText = 'Initially created by this [swell generator][parent-generator-url]!';
export const readmeGeneratorUrlVariableText = '[parent-generator-url]: https://github.com/swellaby/generator-swell';
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
    './gulp/gulp-config.js',
    './gulp/istanbul-config.js',
    './gulp/mocha-config.js',
    './gulp/tasks/build.js',
    './gulp/tasks/build.js',
    './gulp/tasks/clean.js',
    './gulp/tasks/lint.js',
    './gulp/tasks/test.js'
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

export const getYeomanTmpCwd = () => process.cwd().replace('/private', '');