'use strict';

import yeomanAssert = require('yeoman-assert');
import Chai = require('chai');
import fs = require('fs');
import helpers = require('yeoman-test');
import path = require('path');
import Sinon = require('sinon');
import YeomanGenerator = require('yeoman-generator');
import yosay = require('yosay');

import inputConfig = require('./../../../generators/app/input-config');
import vsts = require('./../../../generators/app/vsts');

/**
 * Contains component integration tests from the index entry point to the functions in vsts.ts
 */
suite('Index/VSTS Project Component Integration Tests:', () => {
    let sandbox: Sinon.SinonSandbox;
    const vstsCommonFiles = [
        'extension-icon.png',
        'OVERVIEW.md',
        'vss-extension.json'
    ];

    const descriptionMessage = 'A new task to make a great platform even better';

    setup(() => {
        sandbox = Sinon.sandbox.create();
    });

    teardown(() => {
        sandbox.restore();
    });

    suite('VSTS Task Option Tests:', () => {
        const generatorRoot = path.join(__dirname, './../../../generators/app');
        const vstsAppName = 'vsts task';
        const appType = inputConfig.vstsTaskPromptValue;
        const appDescription = 'this is an awesome vsts task';
        const yoDestinationPathFunctionName = 'destinationPath';
        const invalidParamsErrorMessage = 'Oh no! Encountered an unexpected error while trying to create a new VSTS ' +
            'Task project :( The VSTS files were not added to the project.'
        let gitInitCommandSpy: Sinon.SinonSpy;
        let npmInstallCommandSpy: Sinon.SinonSpy;
        let installDependenciesCommandSpy: Sinon.SinonSpy;
        let consoleErrorSpy: Sinon.SinonSpy;

        setup(() => {
            gitInitCommandSpy = sandbox.spy(YeomanGenerator.prototype, 'spawnCommandSync').withArgs('git', ['init', '--quiet']);
            npmInstallCommandSpy = sandbox.spy(YeomanGenerator.prototype, 'npmInstall');
            installDependenciesCommandSpy = sandbox.spy(YeomanGenerator.prototype, 'installDependencies');
            consoleErrorSpy = sandbox.spy(console, 'error');
        });

        suiteSetup(() => {
            return helpers.run(generatorRoot)
                .withPrompts({
                    appName: vstsAppName,
                    description: appDescription,
                    type: appType
                })
                .toPromise();
        });

        test('Should contain all of the common VSTS files', () => {
            yeomanAssert.file(vstsCommonFiles);
        });

        test('Should create all of the default VSTS Task template files', () => {
            yeomanAssert.file([
                'task.json',
                './src/main.ts',
                './src/helper.ts',
                './test/unit/main-tests.ts',
                './test/unit/helper-tests.ts',
                './build/tasks/package.js'
            ]);
        });

        test('Should inject the App Name into the README.md file when the VSTS option is selected', () => {
            yeomanAssert.fileContent('README.md', '# ' + vstsAppName);
        });

        test('Should create and scaffold into a new directory if the specified app name differs from the'
            + 'current directory with the VSTS option', (done) => {
                helpers.run(generatorRoot)
                    .withPrompts({
                        appName: vstsAppName,
                        description: 'my test',
                        type: inputConfig.vstsTaskPromptValue
                    })
                    .toPromise()
                    .then((dir) => {
                        yeomanAssert.equal(path.basename(process.cwd()), vstsAppName);
                        yeomanAssert.equal(path.resolve(process.cwd()), path.join(dir, vstsAppName));
                        done();
                    });
            });

        test('Should scaffold into the current directory when the specified app name matches the current'
            + 'directory name with the VSTS option', (done) => {
                sandbox.stub(YeomanGenerator.prototype, yoDestinationPathFunctionName, () => {
                    return path.join(process.cwd(), vstsAppName);
                });

                helpers.run(generatorRoot)
                    .withPrompts({
                        appName: vstsAppName,
                        description: appDescription,
                        type: inputConfig.vstsTaskPromptValue
                    })
                    .toPromise()
                    .then((dir) => {
                        yeomanAssert.equal(path.basename(process.cwd()), path.basename(dir));
                        yeomanAssert.equal(path.resolve(process.cwd()), path.resolve(dir));
                        yeomanAssert.noFile(path.join(process.cwd(), vstsAppName));
                        done();
                    });
            });

        test('Should install dependencies if user confirms with the VSTS option selected', (done) => {
            helpers.run(generatorRoot)
                .withPrompts({
                    appName: 'name',
                    description: appDescription,
                    type: inputConfig.vstsTaskPromptValue,
                    installDependencies: true
                })
                .toPromise()
                .then(() => {
                    yeomanAssert.deepEqual(npmInstallCommandSpy.called, true);
                    yeomanAssert.deepEqual(installDependenciesCommandSpy.called, false);
                    done();
                });
        });

        test('Should not install dependencies if user declines with the VSTS option selected', (done) => {
            helpers.run(generatorRoot)
                .withPrompts({
                    appName: vstsAppName,
                    description: appDescription,
                    type: inputConfig.vstsTaskPromptValue,
                    installDependencies: false
                })
                .toPromise()
                .then(() => {
                    yeomanAssert.deepEqual(npmInstallCommandSpy.called, false);
                    yeomanAssert.deepEqual(installDependenciesCommandSpy.called, false);
                    done();
                });
        });
    });
});