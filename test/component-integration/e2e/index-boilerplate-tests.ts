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
 * Contains component integration tests from the index entry point to the functions in boilerplate.ts
 */
suite('Index/Boilerplate Project Component Integration Tests:', () => {
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

    suite('Boilerplate Option Tests:', () => {
        const baseAppName = 'baseOptionApp';
        const appType = inputConfig.boilerplatePromptValue;
        const appDescription = 'this is a test description';

        suiteSetup(() => {
            return helpers.run(testHelpers.generatorRoot)
                .withPrompts({
                    appName: baseAppName,
                    description: appDescription,
                    type: appType,
                    vscode: true
                })
                .toPromise();
        });

        test('Should create all the correct boilerplate files when the Base option is selected', () => {
            yeomanAssert.file(testHelpers.boilerplateFiles);
        });

        test('Should inject the App Name into the README.md file when the Base option is selected', () => {
            yeomanAssert.fileContent(testHelpers.readmeFileName, '# ' + baseAppName);
        });

        test('Should init a new git repository when the destination directory does not have a .git directory', (done) => {
            helpers.run(testHelpers.generatorRoot)
                .withPrompts({
                    appName: baseAppName,
                    description: appDescription,
                    type: inputConfig.boilerplatePromptValue
                })
                .toPromise()
                .then(() => {
                    yeomanAssert.deepEqual(gitInitCommandStub.called, true);
                    done();
                });
        });

        test('Should init a new git repository when the destination directory has a file entitled \'.git\'', (done) => {
            // this stub is to ensure that the tmp directory (see below) creates the .git directory in
            // the same directory as the destinationRoot of the generator.
            sandbox.stub(YeomanGenerator.prototype, testHelpers.yoDestinationPathFunctionName).callsFake(() => {
                return path.join(process.cwd(), baseAppName);
            });

            helpers.run(testHelpers.generatorRoot)
                .inTmpDir((dir) => {
                    fs.writeFileSync(path.join(dir, '.git'), null);
                })
                .withPrompts({
                    appName: baseAppName,
                    description: appDescription,
                    type: inputConfig.boilerplatePromptValue
                })
                .toPromise()
                .then(() => {
                    yeomanAssert.deepEqual(gitInitCommandStub.called, true);
                    done();
                });
        });

        test('Should not init a new git repository when the destination directory already has a git repo initialized', (done) => {
            // this stub is to ensure that the tmp directory (see below) creates the .git directory in
            // the same directory as the destinationRoot of the generator.
            sandbox.stub(YeomanGenerator.prototype, testHelpers.yoDestinationPathFunctionName).callsFake(() => {
                return path.join(process.cwd(), baseAppName);
            });

            helpers.run(testHelpers.generatorRoot)
                .inTmpDir((dir) => {
                    fs.mkdirSync(path.join(path.resolve(dir), '.git'));
                })
                .withPrompts({
                    appName: baseAppName,
                    description: appDescription,
                    type: inputConfig.boilerplatePromptValue
                })
                .toPromise()
                .then(() => {
                    yeomanAssert.deepEqual(gitInitCommandStub.called, false);
                    done();
                });
        });

        test('Should create and scaffold into a new directory if the specified app name'
            + 'differs from the current directory with the Base option',
            (done) => {
                helpers.run(testHelpers.generatorRoot)
                    .withPrompts({
                        appName: baseAppName,
                        description: appDescription,
                        type: inputConfig.boilerplatePromptValue
                    })
                    .toPromise()
                    .then((dir) => {
                        yeomanAssert.equal(path.basename(process.cwd()), baseAppName);
                        yeomanAssert.equal(path.resolve(process.cwd()), path.join(dir, baseAppName));
                        done();
                    });
        });

        test('Should scaffold into the current directory when the specified app name matches'
            + 'the current directory name with the Base option',
            (done) => {
                sandbox.stub(YeomanGenerator.prototype, testHelpers.yoDestinationPathFunctionName).callsFake(() => {
                    return path.join(process.cwd(), baseAppName);
                });

                helpers.run(testHelpers.generatorRoot)
                    .withPrompts({
                        appName: baseAppName,
                        description: appDescription,
                        type: inputConfig.boilerplatePromptValue
                    })
                    .toPromise()
                    .then((dir) => {
                        yeomanAssert.equal(path.basename(process.cwd()), path.basename(dir));
                        yeomanAssert.equal(path.resolve(process.cwd()), path.resolve(dir));
                        yeomanAssert.noFile(path.join(process.cwd(), baseAppName));
                        done();
                    });
        });

        test('Should install dependencies if user confirms with the Base option selected', (done) => {
            helpers.run(testHelpers.generatorRoot)
                .withPrompts({
                    appName: baseAppName,
                    description: appDescription,
                    type: inputConfig.boilerplatePromptValue,
                    installDependencies: true
                })
                .toPromise()
                .then(() => {
                    yeomanAssert.deepEqual(npmInstallCommandStub.called, true);
                    yeomanAssert.deepEqual(installDependenciesCommandStub.called, false);
                    done();
                });
        });

        test('Should not install dependencies if user declines with the Base option selected', (done) => {
            helpers.run(testHelpers.generatorRoot)
                .withPrompts({
                    appName: baseAppName,
                    description: appDescription,
                    type: inputConfig.boilerplatePromptValue,
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

        test('Should set VS Code debug program correctly for boilerplate app', () => {
            yeomanAssert.fileContent('.vscode/launch.json', '"program": "${file}"');
        });

        test('Should not add VS Code files if the user declines the vscode option', (done) => {
            helpers.run(testHelpers.generatorRoot)
                .withPrompts({
                    appName: 'fo',
                    description: appDescription,
                    type: inputConfig.boilerplatePromptValue,
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