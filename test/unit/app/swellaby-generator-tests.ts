'use strict';

import Chai = require('chai');
import fs = require('fs');
import mkdirp = require('mkdirp');
import path = require('path');
import Sinon = require('sinon');
import YeomanGenerator = require('yeoman-generator');
import yosay = require('yosay');

import boilerplate = require('./../../../generators/app/boilerplate');
import chatbot = require('./../../../generators/app/chatbot');
import cli = require('./../../../generators/app/cli');
import express = require('./../../../generators/app/express');
import inputConfig = require('./../../../generators/app/input-config');
import pathHelpers = require('./../../../generators/app/path-helpers');
import ProjectTypes = require('./../../../generators/app/project-types');
import SwellabyGenerator = require('./../../../generators/app/swellaby-generator');
import testHelpers = require('./../test-helpers');
import vscode = require('./../../../generators/app/vscode');
import vsts = require('./../../../generators/app/vsts');

const assert = Chai.assert;

/**
 * Contains unit tests for the SwellabyGenerator class defined
 * in swellaby-generator.ts
 */
suite('Swellaby Generator Tests:', () => {
    const sandbox: Sinon.SinonSandbox = Sinon.sandbox.create();
    let swellabyGenerator: SwellabyGenerator;
    let generatorStub: YeomanGenerator;
    let consoleErrorStub: Sinon.SinonStub;
    let generatorLogStub: Sinon.SinonStub;
    let generatorDestinationPathStub: Sinon.SinonStub;
    let generatorDestinationRootStub: Sinon.SinonStub;
    let generatorPromptStub: Sinon.SinonStub;
    let generatorSpawnCommandSyncStub: Sinon.SinonStub;
    let generatorNpmInstallStub: Sinon.SinonStub;
    let mkdirpSyncStub: Sinon.SinonStub;
    let pathBasenameStub: Sinon.SinonStub;
    let pathJoinStub: Sinon.SinonStub;
    let pathResolveStub: Sinon.SinonStub;
    let fsStatSyncStub: Sinon.SinonStub;
    let fsUnlinkSyncStub: Sinon.SinonStub;
    let fsIsFileStub: Sinon.SinonStub;
    let boilerplateScaffoldStub: Sinon.SinonStub;
    let vsCodeScaffoldStub: Sinon.SinonStub;
    let cliScaffoldCliProjectStub: Sinon.SinonStub;
    let expressScaffoldExpressApiProjectStub: Sinon.SinonStub;
    let vstsScaffoldVstsTaskProjectStub: Sinon.SinonStub;
    let chatbotScaffoldChatbotProjectStub: Sinon.SinonStub;
    let fsStatsStub: fs.Stats;
    const fatalErrorMessag = 'Encountered a fatal error.';
    const greetingMessage = 'Welcome to the Swellaby Generator!';
    const generationErrorMessage = 'Encountered an unexpected error while creating ' +
        'your new project. Please try again.';
    const appType = ProjectTypes[ProjectTypes.boilerplate];
    const appName = 'test';
    const extensionConfig = {
        appName: appName,
        description: 'a sweet new project',
        type: appType,
        vscode: false,
        installDependencies: false
    };
    const destinationPathBase = appName;
    const destinationRootBase = '';
    const newDirMessagePrefix = 'Your generator must be inside a directory with the same name ' +
        'as your project name \'';
    const newDirMessageSuffix = '\'\nI\'ll automatically create this directory for you.';
    const newDirMessage = newDirMessagePrefix + appName + newDirMessageSuffix;
    const initGitRepoMessage = 'I see that you don\'t have a git repo in the target directory. I\'ll initialize it for you now, and then ' +
        'you can add your remote later on via a \'git remote add origin <<insert your remote url here>>\'. For example: ' +
        '\'git remote add origin https://github.com/me/my-repo.git\'';
    const gitFileFoundMessage = 'Are you being mischievous? You have a file in the target directory named \'.git\' with' +
        'the same name as the directory git uses. I am deleting this because it will cause errors and you' +
        'absolutely do not need it. :)';
    const gitInitFailedMessage = 'Encountered an error while trying to initialize the git repository. ' +
        'You may not have git installed. Please consult the internet for information on how to install git';
    const resolvedGitPath = 'usr/foo/app-name/.git';
    const joinedGitPath = '/' + resolvedGitPath;
    const boilerplateMessage = 'Just the basic boilerplate';
    const unknownProjectTypeMessage = 'Encountered an unexpected configuration. You may need to try again.';
    const installingDependenciesMessage = 'Installing dependencies';
    const declinedInstallationMessage = 'You said you wanted to install dependencies yourself, so don\'t forget!';

    const setupGeneratorStubs = () => {
        generatorLogStub = sandbox.stub(generatorStub, 'log');
        generatorDestinationPathStub = sandbox.stub(generatorStub, 'destinationPath').callsFake(() => {
            return destinationPathBase;
        });
        generatorDestinationRootStub = sandbox.stub(generatorStub, 'destinationRoot').callsFake(() => {
            return destinationRootBase;
        });
        generatorPromptStub = sandbox.stub(generatorStub, 'prompt').callsFake(() => {
            return Promise.resolve(extensionConfig);
        });
        generatorSpawnCommandSyncStub = sandbox.stub(generatorStub, 'spawnCommandSync').callsFake(() => {
            return undefined;
        });
        generatorNpmInstallStub = sandbox.stub(generatorStub, 'npmInstall');
    };

    const setupFileSystemStubs = () => {
        mkdirpSyncStub = sandbox.stub(mkdirp, 'sync');
        pathBasenameStub = sandbox.stub(path, 'basename').callsFake(() => {
            return appName;
        });
        pathJoinStub = sandbox.stub(path, 'join').onFirstCall().callsFake(() => {
            return joinedGitPath;
        });
        pathResolveStub = sandbox.stub(path, 'resolve').onFirstCall().callsFake(() => {
            return resolvedGitPath;
        });
        fsIsFileStub = sandbox.stub(fsStatsStub, 'isFile').callsFake(() => { return false; });
        fsStatSyncStub = sandbox.stub(fs, 'statSync').callsFake(() => {
            return fsStatsStub;
        });
        fsUnlinkSyncStub = sandbox.stub(fs, 'unlinkSync');
    };

    const setupScaffolderHelperStubs = () => {
        boilerplateScaffoldStub = sandbox.stub(boilerplate, 'scaffoldBoilerplateContent').callsFake(() => { return; });
        vsCodeScaffoldStub = sandbox.stub(vscode, 'scaffoldVSCodeContent').callsFake(() => { return; });
        cliScaffoldCliProjectStub = sandbox.stub(cli, 'scaffoldCliProject');
        expressScaffoldExpressApiProjectStub = sandbox.stub(express, 'scaffoldExpressApiProject').callsFake(() => { return; });
        vstsScaffoldVstsTaskProjectStub = sandbox.stub(vsts, 'scaffoldVSTSTaskProject').callsFake(() => { return; });
        chatbotScaffoldChatbotProjectStub = sandbox.stub(chatbot, 'scaffoldChatbotProject').callsFake(() => { return; });
    };

    const updatePromptSettings = () => {
        generatorPromptStub.callsFake(() => {
            return Promise.resolve(extensionConfig);
        });
    };

    const changeProjectType = (projectType) => {
        extensionConfig.type = projectType;
        updatePromptSettings();
    };

    const changeVsCodeUsage = (useVsCode: boolean) => {
        extensionConfig.vscode = useVsCode;
        updatePromptSettings();
    };

    const changeDependencyInstallSetting = (installDependencies: boolean) => {
        extensionConfig.installDependencies = installDependencies;
        updatePromptSettings();
    };

    setup(() => {
        generatorStub = testHelpers.generatorStub;
        fsStatsStub = testHelpers.fsStatStub;
        swellabyGenerator = new SwellabyGenerator(generatorStub);
        consoleErrorStub = sandbox.stub(console, 'error');
        setupGeneratorStubs();
        setupFileSystemStubs();
        setupScaffolderHelperStubs();
    });

    teardown(() => {
        sandbox.restore();
        generatorStub = null;
    });

    test('Should display the fatal error message with a null generator', () => {
        swellabyGenerator = new SwellabyGenerator(null);
        swellabyGenerator.createProject();
        assert.isTrue(consoleErrorStub.calledWith(fatalErrorMessag));
    });

    test('Should display the fatal error message with an undefined generator', () => {
        swellabyGenerator = new SwellabyGenerator(undefined);
        swellabyGenerator.createProject();
        assert.isTrue(consoleErrorStub.calledWith(fatalErrorMessag));
    });

    test('Should greet the user with the correct message', () => {
        swellabyGenerator.createProject();
        assert.isTrue(generatorLogStub.calledWith(yosay(greetingMessage)));
    });

    test('Should display the correct error message when an exception occurs during scaffolding', (done: () => void) => {
        generatorPromptStub.callsFake(() => { return Promise.reject(new Error('oops')); });
        swellabyGenerator.createProject().then(() => {
            assert.isTrue(generatorLogStub.firstCall.calledWith(yosay(greetingMessage)));
            assert.isTrue(generatorLogStub.secondCall.calledWith(generationErrorMessage));
            done();
        });
    });

    test('Should not create a subdirectory if the cwd name matches the supplied app name', (done: () => void) => {
        const destPathReturnValue = 'foobaroo';
        generatorDestinationPathStub.onSecondCall().callsFake(() => {
            return destPathReturnValue;
        });
        swellabyGenerator.createProject().then(() => {
            assert.isFalse(generatorLogStub.secondCall.calledWith(newDirMessage));
            assert.isFalse(mkdirpSyncStub.called);
            assert.isFalse(generatorDestinationRootStub.calledWith(destPathReturnValue));
            done();
        });
    });

    test('Should create a subdirectory if the cwd name does not match the supplied app name', (done: () => void) => {
        const destPathReturnValue = 'foobaroo';
        pathBasenameStub.callsFake(() => {
            return 'not the same as the app name';
        });
        generatorDestinationPathStub.onSecondCall().callsFake(() => {
            return destPathReturnValue;
        });
        swellabyGenerator.createProject().then(() => {
            assert.isTrue(generatorDestinationPathStub.firstCall.calledWith());
            assert.isTrue(generatorLogStub.secondCall.calledWith(newDirMessage));
            assert.isTrue(mkdirpSyncStub.calledWith(appName, null));
            assert.isTrue(generatorDestinationRootStub.calledWith(destPathReturnValue));
            done();
        });
    });

    test('Should not attempt to initialize an existing git repository', (done: () => void) => {
        swellabyGenerator.createProject().then(() => {
            assert.isTrue(pathResolveStub.firstCall.calledWith(destinationRootBase));
            assert.isTrue(pathJoinStub.firstCall.calledWith(resolvedGitPath, '.git'));
            assert.isTrue(fsStatSyncStub.firstCall.calledWith(joinedGitPath));
            assert.isFalse(generatorLogStub.secondCall.calledWith(gitFileFoundMessage));
            assert.isFalse(generatorLogStub.thirdCall.calledWith(initGitRepoMessage));
            assert.isFalse(fsUnlinkSyncStub.called);
            assert.isFalse(generatorLogStub.secondCall.calledWith(initGitRepoMessage));
            assert.isFalse(generatorSpawnCommandSyncStub.calledWith('git', ['init', '--quiet']));
            done();
        });
    });

    test('Should initiallize a git repo and delete the .git file when a file named .git is found', (done: () => void) => {
        fsIsFileStub.callsFake(() => { return true; });
        swellabyGenerator.createProject().then(() => {
            assert.isTrue(pathResolveStub.firstCall.calledWith(destinationRootBase));
            assert.isTrue(pathJoinStub.firstCall.calledWith(resolvedGitPath, '.git'));
            assert.isTrue(fsStatSyncStub.firstCall.calledWith(joinedGitPath));
            assert.isTrue(generatorLogStub.secondCall.calledWith(gitFileFoundMessage));
            assert.isTrue(fsUnlinkSyncStub.called);
            assert.isTrue(generatorLogStub.thirdCall.calledWith(initGitRepoMessage));
            assert.isTrue(generatorSpawnCommandSyncStub.calledWith('git', ['init', '--quiet']));
            done();
        });
    });

    test('Should initialize a git repo when there is no .git directory present', (done: () => void) => {
        fsStatSyncStub.throws(new Error('EONET: not found'));
        swellabyGenerator.createProject().then(() => {
            assert.isTrue(pathResolveStub.firstCall.calledWith(destinationRootBase));
            assert.isTrue(pathJoinStub.firstCall.calledWith(resolvedGitPath, '.git'));
            assert.isTrue(fsStatSyncStub.firstCall.calledWith(joinedGitPath));
            assert.isFalse(generatorLogStub.secondCall.calledWith(gitFileFoundMessage));
            assert.isFalse(fsUnlinkSyncStub.called);
            assert.isTrue(generatorLogStub.secondCall.calledWith(initGitRepoMessage));
            assert.isTrue(generatorSpawnCommandSyncStub.calledWith('git', ['init', '--quiet']));
            done();
        });
    });

    test('Should display an error when the git repo initialization fails', (done: () => void) => {
        fsStatSyncStub.throws(new Error('EONET: not found'));
        generatorSpawnCommandSyncStub.throws(new Error('command not found'));
        swellabyGenerator.createProject().then(() => {
            assert.isTrue(pathResolveStub.firstCall.calledWith(destinationRootBase));
            assert.isTrue(pathJoinStub.firstCall.calledWith(resolvedGitPath, '.git'));
            assert.isTrue(fsStatSyncStub.firstCall.calledWith(joinedGitPath));
            assert.isFalse(generatorLogStub.secondCall.calledWith(gitFileFoundMessage));
            assert.isFalse(fsUnlinkSyncStub.called);
            assert.isTrue(generatorLogStub.secondCall.calledWith(initGitRepoMessage));
            assert.isTrue(generatorSpawnCommandSyncStub.calledWith('git', ['init', '--quiet']));
            assert.isTrue(generatorLogStub.thirdCall.calledWith(gitInitFailedMessage));
            done();
        });
    });

    test('Should scaffold the correct project when the user specifies boilerplate', (done: () => void) => {
        swellabyGenerator.createProject().then(() => {
            assert.isTrue(boilerplateScaffoldStub.calledWith(generatorStub, extensionConfig));
            assert.isTrue(generatorLogStub.secondCall.calledWith(yosay(boilerplateMessage)));
            assert.isFalse(cliScaffoldCliProjectStub.called);
            assert.isFalse(expressScaffoldExpressApiProjectStub.called);
            assert.isFalse(vstsScaffoldVstsTaskProjectStub.called);
            assert.isFalse(chatbotScaffoldChatbotProjectStub.called);
            assert.isFalse(generatorLogStub.thirdCall.calledWith(unknownProjectTypeMessage));
            done();
        });
    });

    test('Should scaffold the correct project when the user specifies cli project', (done: () => void) => {
        changeProjectType(ProjectTypes[ProjectTypes.cli]);
        swellabyGenerator.createProject().then(() => {
            assert.isTrue(boilerplateScaffoldStub.calledWith(generatorStub, extensionConfig));
            assert.isFalse(generatorLogStub.secondCall.calledWith(yosay(boilerplateMessage)));
            assert.isTrue(cliScaffoldCliProjectStub.calledWith(generatorStub, extensionConfig));
            assert.isFalse(expressScaffoldExpressApiProjectStub.called);
            assert.isFalse(vstsScaffoldVstsTaskProjectStub.called);
            assert.isFalse(chatbotScaffoldChatbotProjectStub.called);
            assert.isFalse(generatorLogStub.secondCall.calledWith(unknownProjectTypeMessage));
            done();
        });
    });

    test('Should scaffold the correct project when the user specifies express api project', (done: () => void) => {
        changeProjectType(ProjectTypes[ProjectTypes.expressApi]);
        swellabyGenerator.createProject().then(() => {
            assert.isTrue(boilerplateScaffoldStub.calledWith(generatorStub, extensionConfig));
            assert.isFalse(generatorLogStub.secondCall.calledWith(yosay(boilerplateMessage)));
            assert.isFalse(cliScaffoldCliProjectStub.called);
            assert.isTrue(expressScaffoldExpressApiProjectStub.calledWith(generatorStub, extensionConfig));
            assert.isFalse(vstsScaffoldVstsTaskProjectStub.called);
            assert.isFalse(chatbotScaffoldChatbotProjectStub.called);
            assert.isFalse(generatorLogStub.secondCall.calledWith(unknownProjectTypeMessage));
            done();
        });
    });

    test('Should scaffold the correct project when the user specifies vsts task project', (done: () => void) => {
        changeProjectType(ProjectTypes[ProjectTypes.vstsTask]);
        swellabyGenerator.createProject().then(() => {
            assert.isTrue(boilerplateScaffoldStub.calledWith(generatorStub, extensionConfig));
            assert.isFalse(generatorLogStub.secondCall.calledWith(yosay(boilerplateMessage)));
            assert.isFalse(cliScaffoldCliProjectStub.called);
            assert.isFalse(expressScaffoldExpressApiProjectStub.called);
            assert.isTrue(vstsScaffoldVstsTaskProjectStub.calledWith(generatorStub, extensionConfig));
            assert.isFalse(chatbotScaffoldChatbotProjectStub.called);
            assert.isFalse(generatorLogStub.secondCall.calledWith(unknownProjectTypeMessage));
            done();
        });
    });

    test('Should scaffold the correct project when the user specifies chatbot project', (done: () => void) => {
        changeProjectType(ProjectTypes[ProjectTypes.chatbot]);
        swellabyGenerator.createProject().then(() => {
            assert.isTrue(boilerplateScaffoldStub.calledWith(generatorStub, extensionConfig));
            assert.isFalse(generatorLogStub.secondCall.calledWith(yosay(boilerplateMessage)));
            assert.isFalse(cliScaffoldCliProjectStub.called);
            assert.isFalse(expressScaffoldExpressApiProjectStub.called);
            assert.isFalse(vstsScaffoldVstsTaskProjectStub.called);
            assert.isTrue(chatbotScaffoldChatbotProjectStub.calledWith(generatorStub, extensionConfig));
            assert.isFalse(generatorLogStub.secondCall.calledWith(unknownProjectTypeMessage));
            done();
        });
    });

    test('Should display the correct project when the project type cannot be determined', (done: () => void) => {
        changeProjectType('asdfasdfasdf');
        swellabyGenerator.createProject().then(() => {
            assert.isTrue(boilerplateScaffoldStub.calledWith(generatorStub, extensionConfig));
            assert.isFalse(generatorLogStub.secondCall.calledWith(yosay(boilerplateMessage)));
            assert.isFalse(cliScaffoldCliProjectStub.called);
            assert.isFalse(expressScaffoldExpressApiProjectStub.called);
            assert.isFalse(vstsScaffoldVstsTaskProjectStub.called);
            assert.isFalse(chatbotScaffoldChatbotProjectStub.called);
            assert.isTrue(generatorLogStub.secondCall.calledWith(unknownProjectTypeMessage));
            done();
        });
    });

    test('Should not scaffold vs code files when the user declines with boilerplate selection', (done: () => void) => {
        swellabyGenerator.createProject().then(() => {
            assert.isFalse(vsCodeScaffoldStub.called);
            done();
        });
    });

    test('Should not scaffold vs code files when the user declines with the cli selection', (done: () => void) => {
        changeProjectType(ProjectTypes[ProjectTypes.cli]);
        swellabyGenerator.createProject().then(() => {
            assert.isFalse(vsCodeScaffoldStub.called);
            done();
        });
    });

    test('Should not scaffold vs code files when the user declines with the express api selection', (done: () => void) => {
        changeProjectType(ProjectTypes[ProjectTypes.expressApi]);
        swellabyGenerator.createProject().then(() => {
            assert.isFalse(vsCodeScaffoldStub.called);
            done();
        });
    });

    test('Should not scaffold vs code files when the user declines with the vsts task selection', (done: () => void) => {
        changeProjectType(ProjectTypes[ProjectTypes.vstsTask]);
        swellabyGenerator.createProject().then(() => {
            assert.isFalse(vsCodeScaffoldStub.called);
            done();
        });
    });

    test('Should not scaffold vs code files when the user declines with the chatbot selection', (done: () => void) => {
        changeProjectType(ProjectTypes[ProjectTypes.chatbot]);
        swellabyGenerator.createProject().then(() => {
            assert.isFalse(vsCodeScaffoldStub.called);
            done();
        });
    });

    test('Should not scaffold vs code files when the user declines with an unknown project selection', (done: () => void) => {
        changeProjectType('986asdfasdf');
        swellabyGenerator.createProject().then(() => {
            assert.isFalse(vsCodeScaffoldStub.called);
            done();
        });
    });

    test('Should scaffold vs code files when the user accepts with boilerplate selection', (done: () => void) => {
        changeVsCodeUsage(true);
        swellabyGenerator.createProject().then(() => {
            assert.isTrue(vsCodeScaffoldStub.calledWith(generatorStub, extensionConfig));
            done();
        });
    });

    test('Should scaffold vs code files when the user accepts with the cli selection', (done: () => void) => {
        changeProjectType(ProjectTypes[ProjectTypes.cli]);
        changeVsCodeUsage(true);
        swellabyGenerator.createProject().then(() => {
            assert.isTrue(vsCodeScaffoldStub.calledWith(generatorStub, extensionConfig));
            done();
        });
    });

    test('Should scaffold vs code files when the user accepts with the express api selection', (done: () => void) => {
        changeProjectType(ProjectTypes[ProjectTypes.expressApi]);
        changeVsCodeUsage(true);
        swellabyGenerator.createProject().then(() => {
            assert.isTrue(vsCodeScaffoldStub.calledWith(generatorStub, extensionConfig));
            done();
        });
    });

    test('Should scaffold vs code files when the user accepts with the vsts task selection', (done: () => void) => {
        changeProjectType(ProjectTypes[ProjectTypes.vstsTask]);
        changeVsCodeUsage(true);
        swellabyGenerator.createProject().then(() => {
            assert.isTrue(vsCodeScaffoldStub.calledWith(generatorStub, extensionConfig));
            done();
        });
    });

    test('Should scaffold vs code files when the user accepts with the chatbot selection', (done: () => void) => {
        changeProjectType(ProjectTypes[ProjectTypes.chatbot]);
        changeVsCodeUsage(true);
        swellabyGenerator.createProject().then(() => {
            assert.isTrue(vsCodeScaffoldStub.calledWith(generatorStub, extensionConfig));
            done();
        });
    });

    test('Should scaffold vs code files when the user accepts with an unknown project selection', (done: () => void) => {
        changeProjectType('helloWorld');
        changeVsCodeUsage(true);
        swellabyGenerator.createProject().then(() => {
            assert.isTrue(vsCodeScaffoldStub.calledWith(generatorStub, extensionConfig));
            done();
        });
    });

    test('Should not install dependencies when the user declines', (done: () => void) => {
        swellabyGenerator.createProject().then(() => {
            assert.isFalse(generatorLogStub.thirdCall.calledWith(installingDependenciesMessage));
            assert.isFalse(generatorNpmInstallStub.called);
            assert.isTrue(generatorLogStub.thirdCall.calledWith(declinedInstallationMessage));
            done();
        });
    });

    test('Should install dependencies when the user accepts', (done: () => void) => {
        changeDependencyInstallSetting(true);
        swellabyGenerator.createProject().then(() => {
            assert.isTrue(generatorLogStub.thirdCall.calledWith(installingDependenciesMessage));
            assert.isTrue(generatorNpmInstallStub.called);
            assert.isFalse(generatorLogStub.thirdCall.calledWith(declinedInstallationMessage));
            done();
        });
    });
});