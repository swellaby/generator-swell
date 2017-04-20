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
 * Contains component integration tests from the index entry point to the functions in express.ts
 */
suite('Index/Express Project Component Integration Tests:', () => {
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

    suite('Express API Option Tests:', () => {
        const expressAppName = 'api app';
        const appType = inputConfig.expressApiPromptValue;
        const appDescription = 'brand new express API';
        const dockerUser = 'testUser';
        const expressFiles = [
            '.dockerignore',
            'build.sh',
            'Dockerfile',
            './build/tasks/package.js',
            './src/app.ts'
        ];

        suiteSetup(() => {
            return helpers.run(testHelpers.generatorRoot)
                .withPrompts({
                    appName: expressAppName,
                    description: appDescription,
                    type: appType,
                    dockerUser: dockerUser
                })
                .toPromise();
        });

        test('Should create all the correct boilerplate files when the Express API option is selected', () => {
            yeomanAssert.file(testHelpers.boilerplateFiles);
        });

        test('Should create all the correct express files when the Express API option is selected', () => {
            yeomanAssert.file(expressFiles);
        });

        test('Should inject the App Name into the README.md file when the Express API option is selected', () => {
            yeomanAssert.fileContent(testHelpers.readmeFileName, '# ' + expressAppName);
        });

        test('Should inject image name correctly into the build.sh file when the Express API option is selected', () => {
            yeomanAssert.fileContent('build.sh', dockerUser + '/' + expressAppName);
        });

        test('Should create and scaffold into a new directory if the specified app name differs from the'
            + 'current directory with the Express API option', (done) => {
                helpers.run(testHelpers.generatorRoot)
                    .withPrompts({
                        appName: expressAppName,
                        description: appDescription,
                        type: inputConfig.expressApiPromptValue
                    })
                    .toPromise()
                    .then((dir) => {
                        yeomanAssert.equal(path.basename(process.cwd()), expressAppName);
                        yeomanAssert.equal(path.resolve(process.cwd()), path.join(dir, expressAppName));
                        done();
                    });
        });

        test('Should scaffold into the current directory when the specified app name matches the current'
            + 'directory name with the Express API option', (done) => {
                sandbox.stub(YeomanGenerator.prototype, testHelpers.yoDestinationPathFunctionName).callsFake(() => {
                    return path.join(process.cwd(), expressAppName);
                });

                helpers.run(testHelpers.generatorRoot)
                    .withPrompts({
                        appName: expressAppName,
                        description: appDescription,
                        type: inputConfig.expressApiPromptValue
                    })
                    .toPromise()
                    .then((dir) => {
                        yeomanAssert.equal(path.basename(process.cwd()), path.basename(dir));
                        yeomanAssert.equal(path.resolve(process.cwd()), path.resolve(dir));
                        yeomanAssert.noFile(path.join(process.cwd(), expressAppName));
                        done();
                    });
        });

        test('Should install dependencies if user confirms with the Express API option selected', (done) => {
            helpers.run(testHelpers.generatorRoot)
                .withPrompts({
                    appName: expressAppName,
                    description: appDescription,
                    type: inputConfig.expressApiPromptValue,
                    installDependencies: true
                })
                .toPromise()
                .then(() => {
                    yeomanAssert.deepEqual(npmInstallCommandStub.called, true);
                    yeomanAssert.deepEqual(installDependenciesCommandStub.called, false);
                    done();
                });
        });

        test('Should not install dependencies if user declines with the Express API option selected', (done) => {
            helpers.run(testHelpers.generatorRoot)
                .withPrompts({
                    appName: expressAppName,
                    description: appDescription,
                    type: inputConfig.expressApiPromptValue,
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

        test('Should set VS Code debug program correctly for Express API app', () => {
            yeomanAssert.fileContent('.vscode/launch.json', '"program": "${workspaceRoot}/src/app.ts"');
        });

        test('Should not add VS Code files if the user declines the vscode option', (done) => {
            helpers.run(testHelpers.generatorRoot)
                .withPrompts({
                    appName: 'exp-api',
                    description: appDescription,
                    type: inputConfig.expressApiPromptValue,
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