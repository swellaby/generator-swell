'use strict';

import fs = require('fs');
import helpers = require('yeoman-test');
import path = require('path');
import Sinon = require('sinon');
import yeomanAssert = require('yeoman-assert');
import YeomanGenerator = require('yeoman-generator');

import inputConfig = require('./../../../generators/app/input-config');
import testHelpers = require('./../test-helpers');

/**
 * Contains component integration tests from the index entry point to the functions in cli.ts
 */
suite('Index/CLI Project Component Integration Tests:', () => {
    let sandbox: Sinon.SinonSandbox;
    let gitInitCommandStub: Sinon.SinonStub;
    let npmInstallCommandStub: Sinon.SinonStub;
    let installDependenciesCommandStub: Sinon.SinonStub;

    setup(() => {
        sandbox = Sinon.sandbox.create()
        gitInitCommandStub = testHelpers.createGitInitStub(sandbox);
        npmInstallCommandStub = testHelpers.createNpmInstallStub(sandbox);
        installDependenciesCommandStub = testHelpers.createDependenciesInstallStub(sandbox);
    });

    teardown(() => {
        sandbox.restore();
    });

    suite('CLI Option Tests: ', () => {
        const cliAppName = 'cli app';
        const appType = inputConfig.cliPromptValue;
        const appDescription = 'this is a test description';

        suiteSetup(() => {
            return helpers.run(testHelpers.generatorRoot)
                .withPrompts({
                    appName: cliAppName,
                    description: appDescription,
                    type: appType
                })
                .toPromise();
        });

        test('Should create all the correct boilerplate files when the CLI option is selected', () => {
            yeomanAssert.file(testHelpers.boilerplateFiles);
        });

        test('Should inject the App Name into the README.md file when the CLI option is selected', () => {
            yeomanAssert.fileContent(testHelpers.readmeFileName, '# ' + cliAppName);
        });

        test('Should create and scaffold into a new directory if the specified app name differs from'
            + 'the current directory with the CLI option', (done) => {
                helpers.run(testHelpers.generatorRoot)
                    .withPrompts({
                        appName: cliAppName,
                        description: appDescription,
                        type: inputConfig.cliPromptValue
                    })
                    .toPromise()
                    .then((dir) => {
                        yeomanAssert.equal(path.basename(process.cwd()), cliAppName);
                        yeomanAssert.equal(path.resolve(process.cwd()), path.join(dir, cliAppName));
                        done();
                    });
        });

        test('Should scaffold into the current directory when the specified app name matches the current'
            + 'directory name with the CLI option', (done) => {
                sandbox.stub(YeomanGenerator.prototype, testHelpers.yoDestinationPathFunctionName).callsFake(() => {
                    return path.join(process.cwd(), cliAppName);
                });

                helpers.run(testHelpers.generatorRoot)
                    .withPrompts({
                        appName: cliAppName,
                        description: appDescription,
                        type: inputConfig.cliPromptValue
                    })
                    .toPromise()
                    .then((dir) => {
                        yeomanAssert.equal(path.basename(process.cwd()), path.basename(dir));
                        yeomanAssert.equal(path.resolve(process.cwd()), path.resolve(dir));
                        yeomanAssert.noFile(path.join(process.cwd(), cliAppName));
                        done();
                    });
        });

        test('Should install dependencies if user confirms with the CLI option selected', (done) => {
            helpers.run(testHelpers.generatorRoot)
                .withPrompts({
                    appName: cliAppName,
                    description: appDescription,
                    type: inputConfig.cliPromptValue,
                    installDependencies: true
                })
                .toPromise()
                .then(() => {
                    yeomanAssert.deepEqual(npmInstallCommandStub.called, true);
                    yeomanAssert.deepEqual(installDependenciesCommandStub.called, false);
                    done();
                });
        });

        test('Should not install dependencies if user declines with the CLI option selected', (done) => {
            helpers.run(testHelpers.generatorRoot)
                .withPrompts({
                    appName: cliAppName,
                    description: appDescription,
                    type: inputConfig.cliPromptValue,
                    installDependencies: false
                })
                .toPromise()
                .then(() => {
                    yeomanAssert.deepEqual(npmInstallCommandStub.called, false);
                    yeomanAssert.deepEqual(installDependenciesCommandStub.called, false);
                    done();
                });
        });

        test('Should create all the correct VS Code files when the vscode option is selected', () => {
            yeomanAssert.file(testHelpers.vsCodeFiles);
        });

        test('Should set VS Code debug program correctly for CLI app', () => {
            yeomanAssert.fileContent('.vscode/launch.json', '"program": "${file}"');
        });

        test('Should not add VS Code files if the user declines the vscode option', (done) => {
            helpers.run(testHelpers.generatorRoot)
                .withPrompts({
                    appName: 'fdfdsfo',
                    description: appDescription,
                    type: inputConfig.cliPromptValue,
                    vscode: false
                })
                .toPromise()
                .then(() => {
                    yeomanAssert.noFile(testHelpers.vsCodeFiles);
                    done();
                });
        });
    });
});