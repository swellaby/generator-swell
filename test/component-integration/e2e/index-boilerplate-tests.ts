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
 * Contains component integration tests from the index entry point to the functions in boilerplate.ts
 */
suite('Index/Boilerplate Project Component Integration Tests:', () => {
    let sandbox: Sinon.SinonSandbox;
    let gitInitCommandStub: Sinon.SinonStub;
    let npmInstallCommandStub: Sinon.SinonStub;
    let installDependenciesCommandStub: Sinon.SinonStub;

    setup(() => {
        sandbox = Sinon.createSandbox();
        gitInitCommandStub = testHelpers.createGitInitStub(sandbox);
        npmInstallCommandStub = testHelpers.createNpmInstallStub(sandbox);
        installDependenciesCommandStub = testHelpers.createDependenciesInstallStub(sandbox);
    });

    teardown(() => {
        sandbox.restore();
    });

    // eslint-disable-next-line max-statements
    suite('Boilerplate Option Tests:', () => {
        const baseAppName = 'baseOptionApp';
        const appType = ProjectTypes[ProjectTypes.boilerplate];
        const appDescription = 'this is a test description';
        const author = 'hemingway';

        suiteSetup(() => {
            const prompts = {
                appName: baseAppName,
                description: appDescription,
                type: appType,
                vscode: true,
                author: author
            };
            return helpers.run(testHelpers.generatorRoot).withPrompts(prompts).toPromise();
        });

        test('Should create all the correct boilerplate files when the Base option is selected', () => {
            yeomanAssert.file(testHelpers.boilerplateFiles);
        });

        test('Should inject the App Name into the README.md file when the Base option is selected', () => {
            yeomanAssert.fileContent(testHelpers.readmeFileName, '# ' + baseAppName);
        });

        test('Should inject the description into the README.md file when the Base option is selected', () => {
            yeomanAssert.fileContent(testHelpers.readmeFileName, appDescription);
        });

        test('Should inject the generator origin link into the README.md file when Base option is selected', () => {
            yeomanAssert.fileContent(testHelpers.readmeFileName, testHelpers.readmeGeneratorOriginHeader);
            yeomanAssert.fileContent(testHelpers.readmeFileName, testHelpers.readmeGeneratorOriginText);
            yeomanAssert.fileContent(testHelpers.readmeFileName, testHelpers.readmeGeneratorUrlVariableText);
        });

        test('Should inject author name correctly into package.json', () => {
            yeomanAssert.fileContent(testHelpers.packageJson, '"name": "' + author + '"');
        });

        test('Should init a new git repository when the destination directory does not have a .git directory', (done) => {
            const prompts = {
                appName: baseAppName,
                description: appDescription,
                type: ProjectTypes[ProjectTypes.boilerplate]
            };
            helpers.run(testHelpers.generatorRoot).withPrompts(prompts).toPromise().then(() => {
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
            const prompts = {
                appName: baseAppName,
                description: appDescription,
                type: ProjectTypes[ProjectTypes.boilerplate]
            };
            helpers.run(testHelpers.generatorRoot).inTmpDir((dir) => {
                fs.writeFileSync(path.join(dir, '.git'), null);
            }).withPrompts(prompts).toPromise().then(() => {
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
            const prompts = {
                appName: baseAppName,
                description: appDescription,
                type: ProjectTypes[ProjectTypes.boilerplate]
            };
            helpers.run(testHelpers.generatorRoot).inTmpDir((dir) => {
                fs.mkdirSync(path.join(path.resolve(dir), '.git'));
            }).withPrompts(prompts).toPromise().then(() => {
                yeomanAssert.deepEqual(gitInitCommandStub.called, false);
                done();
            });
        });

        test('Should create and scaffold into a new directory if the specified app name differs from the current directory with the Base option', (done) => {
            const prompts = {
                appName: baseAppName,
                description: appDescription,
                type: ProjectTypes[ProjectTypes.boilerplate]
            };
            helpers.run(testHelpers.generatorRoot).withPrompts(prompts).toPromise().then((dir) => {
                yeomanAssert.equal(path.basename(process.cwd()), baseAppName);
                yeomanAssert.equal(path.resolve(process.cwd()), path.join(dir, baseAppName));
                done();
            });
        });

        test('Should scaffold into the current directory when the specified app name matches the current directory name with the Base option', (done) => {
            sandbox.stub(YeomanGenerator.prototype, testHelpers.yoDestinationPathFunctionName).callsFake(() => {
                return path.join(process.cwd(), baseAppName);
            });
            const prompts = {
                appName: baseAppName,
                description: appDescription,
                type: ProjectTypes[ProjectTypes.boilerplate]
            };

            helpers.run(testHelpers.generatorRoot).withPrompts(prompts).toPromise().then((dir) => {
                yeomanAssert.equal(path.basename(process.cwd()), path.basename(dir));
                yeomanAssert.equal(path.resolve(process.cwd()), path.resolve(dir));
                yeomanAssert.noFile(path.join(process.cwd(), baseAppName));
                done();
            });
        });

        test('Should install dependencies if user confirms with the Base option selected', (done) => {
            const prompts = {
                appName: baseAppName,
                description: appDescription,
                type: ProjectTypes[ProjectTypes.boilerplate],
                installDependencies: true
            };
            helpers.run(testHelpers.generatorRoot).withPrompts(prompts).toPromise().then(() => {
                yeomanAssert.deepEqual(npmInstallCommandStub.called, true);
                yeomanAssert.deepEqual(installDependenciesCommandStub.called, false);
                done();
            });
        });

        test('Should not install dependencies if user declines with the Base option selected', (done) => {
            const prompts = {
                appName: baseAppName,
                description: appDescription,
                type: ProjectTypes[ProjectTypes.boilerplate],
                installDependencies: false
            };
            helpers.run(testHelpers.generatorRoot).withPrompts(prompts).toPromise().then(() => {
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
            const prompts = {
                appName: 'fo',
                description: appDescription,
                type: ProjectTypes[ProjectTypes.boilerplate],
                vscode: false
            };

            helpers.run(testHelpers.generatorRoot).withPrompts(prompts).toPromise().then(() => {
                yeomanAssert.noFile(testHelpers.vsCodeFiles);
                done();
            });
        });
    });
});