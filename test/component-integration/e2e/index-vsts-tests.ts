'use strict';

import fs = require('fs');
import helpers = require('yeoman-test');
import path = require('path');
import Sinon = require('sinon');
import yeomanAssert = require('yeoman-assert');
import YeomanGenerator = require('yeoman-generator');

import ProjectTypes = require('./../../../generators/app/project-types');
import testHelpers = require('./../test-helpers');

/**
 * Contains component integration tests from the index entry point to the functions in vsts.ts
 */
suite('Index/VSTS Project Component Integration Tests:', () => {
    let sandbox: Sinon.SinonSandbox;
    let gitInitCommandStub: Sinon.SinonStub;
    let npmInstallCommandStub: Sinon.SinonStub;
    let installDependenciesCommandStub: Sinon.SinonStub;
    const vstsCommonFiles = [
        'extension-icon.png',
        'OVERVIEW.md',
        'vss-extension.json'
    ];

    setup(() => {
        sandbox = Sinon.sandbox.create()
        gitInitCommandStub = testHelpers.createGitInitStub(sandbox);
        npmInstallCommandStub = testHelpers.createNpmInstallStub(sandbox);
        installDependenciesCommandStub = testHelpers.createDependenciesInstallStub(sandbox);
    });

    teardown(() => {
        sandbox.restore();
    });

    suite('VSTS Task Project Tests:', () => {
        const vstsAppName = 'vsts task';
        const appType = ProjectTypes[ProjectTypes.vstsTask];
        const author = 'hemingway';
        const appDescription = 'this is an awesome vsts task';
        const invalidParamsErrorMessage = 'Oh no! Encountered an unexpected error while trying to create a new VSTS ' +
            'Task project :( The VSTS files were not added to the project.';

        suiteSetup(() => {
            return helpers.run(testHelpers.generatorRoot)
                .withPrompts({
                    appName: vstsAppName,
                    description: appDescription,
                    type: appType,
                    author: author
                })
                .toPromise();
        });

        test('Should create all the correct boilerplate files when the VSTS option is selected', () => {
            yeomanAssert.file(testHelpers.boilerplateFiles);
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
            yeomanAssert.fileContent(testHelpers.readmeFileName, '# ' + vstsAppName);
        });

        test('Should inject author name correctly into package.json', () => {
            yeomanAssert.fileContent(testHelpers.packageJson, '"name": "' + author + '"');
        });

        test('Should inject author name correctly into task.json', () => {
            yeomanAssert.fileContent('task.json', '"author": "' + author + '"');
        });

        test('Should create and scaffold into a new directory if the specified app name differs from the'
            + 'current directory with the VSTS option', (done) => {
                helpers.run(testHelpers.generatorRoot)
                    .withPrompts({
                        appName: vstsAppName,
                        description: 'my test',
                        type: ProjectTypes[ProjectTypes.vstsTask]
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
                sandbox.stub(YeomanGenerator.prototype, testHelpers.yoDestinationPathFunctionName).callsFake(() => {
                    return path.join(process.cwd(), vstsAppName);
                });

                helpers.run(testHelpers.generatorRoot)
                    .withPrompts({
                        appName: vstsAppName,
                        description: appDescription,
                        type: ProjectTypes[ProjectTypes.vstsTask]
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
            helpers.run(testHelpers.generatorRoot)
                .withPrompts({
                    appName: 'name',
                    description: appDescription,
                    type: ProjectTypes[ProjectTypes.vstsTask],
                    installDependencies: true
                })
                .toPromise()
                .then(() => {
                    yeomanAssert.deepEqual(npmInstallCommandStub.called, true);
                    yeomanAssert.deepEqual(installDependenciesCommandStub.called, false);
                    done();
                });
        });

        test('Should not install dependencies if user declines with the VSTS option selected', (done) => {
            helpers.run(testHelpers.generatorRoot)
                .withPrompts({
                    appName: vstsAppName,
                    description: appDescription,
                    type: ProjectTypes[ProjectTypes.vstsTask],
                    installDependencies: false
                })
                .toPromise()
                .then(() => {
                    yeomanAssert.deepEqual(npmInstallCommandStub.called, false);
                    yeomanAssert.deepEqual(installDependenciesCommandStub.called, false);
                    done();
                }
            );
        });

        test('Should create all the correct VS Code files when the vscode option is selected', () => {
            yeomanAssert.file(testHelpers.vsCodeFiles);
        });

        test('Should set VS Code debug program correctly for VSTS app', () => {
            yeomanAssert.fileContent('.vscode/launch.json', '"program": "${file}"');
        });

        test('Should not add VS Code files if the user declines the vscode option', (done) => {
            helpers.run(testHelpers.generatorRoot)
                .withPrompts({
                    appName: 'vsts',
                    description: appDescription,
                    type: ProjectTypes[ProjectTypes.vstsTask],
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