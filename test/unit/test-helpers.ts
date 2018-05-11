'use strict';

import fs = require('fs');
import path = require('path');
import yeoman = require('yeoman-generator');

export const generatorRoot = path.join(__dirname, './../../../generators/app');

const fsStats: yeoman.MemFsEditor = {
    commit: null,
    copy: null,
    copyTpl: () => null,
    delete: null,
    exists: null,
    extendJSON: () => null,
    move: () => null,
    read: null,
    readJSON: () => null,
    write: null,
    writeJSON: () => null
};
export const generatorStub: yeoman = <yeoman> {
        // args: 'foo',
    // resolved: 'foo',
    // description: 'foo',
    // appname: 'foo',
    // config: storage,
    fs: fsStats,
    // options: null,
    log: () => null,
    // argument: null,
    // composeWith: null,
    destinationPath: () => __dirname,
    destinationRoot: () => __dirname,
    // determineAppname: null,
    // option: null,
    // eslint-disable-next-line
    prompt: (questions) => Promise.prototype,
    // registerTransformStream: null,
    // rootGeneratorName: null,
    // rootGeneratorVersion: null,
    // run: null,
    sourceRoot: () => __dirname,
    // templatePath: () => { return __dirname; },
    // argumentsHelp: null,
    // desc: null,
    // help: null,
    // user: null,
    // optionsHelp: null,
    // usage: null,
    // addListener: null,
    // bowerInstall: null,
    // emit: null,
    // eventNames: null,
    // getMaxListeners: null,
    // installDependencies: null,
    // listenerCount: null,
    // listeners: null,
    npmInstall: () => null,
    // on: null,
    // once: null,
    // prependListener: null,
    // prependOnceListener: null,
    // removeAllListeners: null,
    // removeListener: null,
    // runInstall: null,
    // setMaxListeners: null,
    // spawnCommand: null,
    // eslint-disable-next-line
    spawnCommandSync: (command, args, opt) => null
    // yarnInstall: null
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
    isBlockDevice: () => null,
    isCharacterDevice: () => null,
    isDirectory: () => null,
    isFIFO: () => null,
    isFile: () => null,
    isSocket: () => null,
    isSymbolicLink: () => null,
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