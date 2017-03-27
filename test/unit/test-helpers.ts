'use strict';

import path = require('path');
import yeoman = require('yeoman-generator');
import SwellabyGenerator = require('../../generators/app/index');

export const generatorRoot = path.join(__dirname, './../../../generators/app');

const storage: yeoman.Storage = null;
const fs: yeoman.MemFsEditor = {
    commit: null,
    copy: null,
    copyTpl: () => { return null; },
    delete: null,
    exists: null,
    extendJSON: () => { return null; },
    move: () => { return null; },
    read: null,
    readJSON: () => { return null; },
    write: null,
    writeJSON: () => { return null; }
};
export const generatorStub: yeoman = {
    env: 'foo',
    args: 'foo',
    resolved: 'foo',
    description: 'foo',
    appname: 'foo',
    config: storage,
    fs: fs,
    options: null,
    log: () => { return null; },
    argument: null,
    composeWith: null,
    destinationPath: () => { return __dirname; },
    destinationRoot: () => { return __dirname; },
    determineAppname: null,
    option: null,
    prompt: null,
    registerTransformStream: null,
    rootGeneratorName: null,
    rootGeneratorVersion: null,
    run: null,
    sourceRoot: () => { return __dirname; },
    templatePath: () => { return __dirname; },
    argumentsHelp: null,
    desc: null,
    help: null,
    user: null,
    optionsHelp: null,
    usage: null,
    addListener: null,
    bowerInstall: null,
    emit: null,
    eventNames: null,
    getMaxListeners: null,
    installDependencies: null,
    listenerCount: null,
    listeners: null,
    npmInstall: null,
    on: null,
    once: null,
    prependListener: null,
    prependOnceListener: null,
    removeAllListeners: null,
    removeListener: null,
    runInstall: null,
    setMaxListeners: null,
    spawnCommand: null,
    spawnCommandSync: null,
    yarnInstall: null
};

// export const swellabyGeneratorStub: SwellabyGenerator = {
//     extensionConfig: {},
//     initializing: () => { return null; },
//     prompting: () => { return null; },
//     writing: () => { return null; },
//     install: () => { return null; },
//      _validateDirectoryName: () => { return null; },
//     _buildExpressContext: () => { return null; },
//     _initGitRepo: () => { return null; },
//     _validateGitRepository: () => { return null; },
//     _writingBoilerplate: () => { return null; },
//     _writingChatbotTask: () => { return null; },
//     _writingCli: () => { return null; },
//     _writingExpress: () => { return null; },
//     _writingVsCode: () => { return null; }
// };