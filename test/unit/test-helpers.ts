'use strict';

import fs = require('fs');
import path = require('path');
import yeoman = require('yeoman-generator');
import SwellabyGenerator = require('../../generators/app/index');

export const generatorRoot = path.join(__dirname, './../../../generators/app');

const storage: yeoman.Storage = null;
const fsStats: yeoman.MemFsEditor = {
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
    fs: fsStats,
    options: null,
    log: () => { return null; },
    argument: null,
    composeWith: null,
    destinationPath: () => { return __dirname; },
    destinationRoot: () => { return __dirname; },
    determineAppname: null,
    option: null,
    prompt: () => { return Promise.prototype; },
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
    npmInstall: () => { return null; },
    on: null,
    once: null,
    prependListener: null,
    prependOnceListener: null,
    removeAllListeners: null,
    removeListener: null,
    runInstall: null,
    setMaxListeners: null,
    spawnCommand: null,
    spawnCommandSync: () => { return null; },
    yarnInstall: null
};

export const fsStatStub: fs.Stats = {
    atime: null,
    atimeMs: null,
    birthtime: null,
    birthtimeMs: null,
    blksize: null,
    blocks: null,
    ctime: null,
    ctimeMs: null,
    dev: null,
    gid: null,
    ino: null,
    isBlockDevice: () => { return null; },
    isCharacterDevice: () => { return null; },
    isDirectory: () => { return null; },
    isFIFO: () => { return null; },
    isFile: () => { return null; },
    isSocket: () => { return null; },
    isSymbolicLink: () => { return null; },
    mode: null,
    mtime: null,
    mtimeMs: null,
    nlink: null,
    rdev: null,
    size: null,
    uid: null
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