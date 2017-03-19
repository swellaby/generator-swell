'use strict';

import path = require('path');
import yeoman = require('yeoman-generator');

export const generatorRoot = path.join(__dirname, './../../../generators/app');

const storage: yeoman.Storage = null;
const fs: yeoman.MemFsEditor = {
    commit: null,
    copy: null,
    copyTpl: null,
    delete: null,
    exists: null,
    extendJSON: null,
    move: null,
    read: null,
    readJSON: null,
    write: null,
    writeJSON: null
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
    destinationPath: null,
    destinationRoot: null,
    determineAppname: null,
    option: null,
    prompt: null,
    registerTransformStream: null,
    rootGeneratorName: null,
    rootGeneratorVersion: null,
    run: null,
    sourceRoot: null,
    templatePath: null,
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

