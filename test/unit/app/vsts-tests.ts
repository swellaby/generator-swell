'use strict';

import yeomanAssert = require('yeoman-assert');
import Chai = require('chai');
import fs = require('fs');
import helpers = require('yeoman-test');
import path = require('path');
import Sinon = require('sinon');
import YeomanGenerator = require('yeoman-generator');
import yosay = require('yosay');

import testHelpers = require('./test-helpers');
import inputConfig = require('./../../../generators/app/input-config');
import vsts = require('./../../../generators/app/vsts');


const generatorStub: YeomanGenerator = testHelpers.generatorStub;
const assert = Chai.assert;

/**
 * Contains unit tests for the functions in vsts.ts
 */
suite('VSTS Project Tests:', () => {
    const sandbox: Sinon.SinonSandbox = Sinon.sandbox.create();
    const vstsCommonFiles = [
        'extension-icon.png',
        'OVERVIEW.md',
        'vss-extension.json'
    ];
    // let generatorLogStub: Sinon.SinonStub;
    // let yosayStub: Sinon.SinonStub;

    const descriptionMessage = 'A new task to make a great platform even better';

    setup(() => {
        // yosayStub = sandbox.stub(yosay).returns(() => {console.log('captured stub')});
        // yosayStub = sandbox.stub(yosay, 'call');
        // generatorLogStub = sandbox.stub(generatorStub, 'log');
    });
    teardown(() => {
        sandbox.restore();
    });

    suite('VSTS Task Option Tests:', () => {
        // test('foo', () => {
        //     // assert.isTrue(false);
        //     // yosayStub.returns('foo');
        //     // vsts.scaffoldVSTSTask(generatorStub, {});
        //     // assert.isTrue(yosayStub.called);
        //     // assert.isTrue(generatorLogStub.called);
        // });
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

        test('Should display an error message when the generator is null and the extension config is null', () => {
            vsts.scaffoldVSTSTask(null, null);
            assert.isTrue(consoleErrorSpy.calledWith(invalidParamsErrorMessage));
        });

        test('Should display an error message when the generator is null and the extension config is undefined', () => {
            vsts.scaffoldVSTSTask(null, undefined);
            assert.isTrue(consoleErrorSpy.calledWith(invalidParamsErrorMessage));
        });

        test('Should display an error message when the generator is null and the extension config is empty', () => {
            vsts.scaffoldVSTSTask(null, {});
            assert.isTrue(consoleErrorSpy.calledWith(invalidParamsErrorMessage));
        });

        test('Should display an error message when the generator is null and the extension config is valid', () => {
            vsts.scaffoldVSTSTask(null, null);
            assert.isTrue(consoleErrorSpy.calledWith(invalidParamsErrorMessage));
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