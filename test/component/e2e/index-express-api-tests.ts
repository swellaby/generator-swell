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
 * Contains component integration tests from the index entry point to the functions in express.ts
 */
suite('Index/Express Project Component Integration Tests:', () => {
    let gitInitCommandStub: Sinon.SinonStub;
    let npmInstallCommandStub: Sinon.SinonStub;
    let installDependenciesCommandStub: Sinon.SinonStub;

    setup(() => {
        gitInitCommandStub = testHelpers.createGitInitStub(Sinon);
        npmInstallCommandStub = testHelpers.createNpmInstallStub(Sinon);
        installDependenciesCommandStub = testHelpers.createDependenciesInstallStub(Sinon);
    });

    teardown(() => {
        Sinon.restore();
    });

    suite('Express API Option Tests:', () => {
        const expressAppName = 'api app';
        const appType = ProjectTypes[ProjectTypes.expressApi];
        const appDescription = 'brand new express API';
        const dockerUser = 'testUser';
        const author = 'hemingway';
        const expressFiles = [
            '.dockerignore',
            'build.sh',
            'Dockerfile',
            './gulp/tasks/package.js',
            './src/app.ts'
        ];

        suiteSetup(() => {
            const prompts = {
                appName: expressAppName,
                description: appDescription,
                type: appType,
                dockerUser: dockerUser,
                author: author
            };
            return helpers.run(testHelpers.generatorRoot).withPrompts(prompts).toPromise();
        });

        test('Should create all the correct boilerplate files when the Express API option is selected', () => {
            yeomanAssert.file(testHelpers.boilerplateFiles);
        });

        test('Should create all the correct express files when the Express API option is selected', () => {
            yeomanAssert.file(expressFiles);
        });

        test('Should inject the description into the README.md file when the Base option is selected', () => {
            yeomanAssert.fileContent(testHelpers.readmeFileName, appDescription);
        });

        test('Should inject the App Name into the README.md file when the Express API option is selected', () => {
            yeomanAssert.fileContent(testHelpers.readmeFileName, '# ' + expressAppName);
        });

        test('Should inject author name correctly into package.json', () => {
            yeomanAssert.fileContent(testHelpers.packageJson, '"name": "' + author + '"');
        });

        test('Should inject image name correctly into the build.sh file when the Express API option is selected', () => {
            yeomanAssert.fileContent('build.sh', dockerUser + '/' + expressAppName);
        });

        test('Should create and scaffold into a new directory if the specified app name differs from the current directory with the Express API option', (done) => {
            const prompts = {
                appName: expressAppName,
                description: appDescription,
                type: ProjectTypes[ProjectTypes.expressApi]
            };
            helpers.run(testHelpers.generatorRoot).withPrompts(prompts).toPromise().then((dir) => {
                const cwd = testHelpers.getYeomanTmpCwd();
                yeomanAssert.equal(path.basename(cwd), expressAppName);
                yeomanAssert.equal(path.resolve(cwd), path.join(dir, expressAppName));
                done();
            });
        });

        test('Should scaffold into the current directory when the specified app name matches the current directory name with the Express API option', (done) => {
            Sinon.stub(YeomanGenerator.prototype, testHelpers.yoDestinationPathFunctionName).callsFake(() => {
                return path.join(process.cwd(), expressAppName);
            });
            const prompts = {
                appName: expressAppName,
                description: appDescription,
                type: ProjectTypes[ProjectTypes.expressApi]
            };
            helpers.run(testHelpers.generatorRoot).withPrompts(prompts).toPromise().then((dir) => {
                const cwd = testHelpers.getYeomanTmpCwd();
                yeomanAssert.equal(path.basename(cwd), path.basename(dir));
                yeomanAssert.equal(path.resolve(cwd), path.resolve(dir));
                yeomanAssert.noFile(path.join(process.cwd(), expressAppName));
                done();
            });
        });

        test('Should install dependencies if user confirms with the Express API option selected', (done) => {
            const prompts = {
                appName: expressAppName,
                description: appDescription,
                type: ProjectTypes[ProjectTypes.expressApi],
                installDependencies: true
            };
            helpers.run(testHelpers.generatorRoot).withPrompts(prompts).toPromise().then(() => {
                yeomanAssert.deepEqual(npmInstallCommandStub.called, true);
                yeomanAssert.deepEqual(installDependenciesCommandStub.called, false);
                done();
            });
        });

        test('Should not install dependencies if user declines with the Express API option selected', (done) => {
            const prompts = {
                appName: expressAppName,
                description: appDescription,
                type: ProjectTypes[ProjectTypes.expressApi],
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

        test('Should set VS Code debug program correctly for Express API app', () => {
            yeomanAssert.fileContent('.vscode/launch.json', '"program": "${workspaceRoot}/src/app.ts"');
        });

        test('Should not add VS Code files if the user declines the vscode option', (done) => {
            const prompts = {
                appName: 'exp-api',
                description: appDescription,
                type: ProjectTypes[ProjectTypes.expressApi],
                vscode: false
            };
            helpers.run(testHelpers.generatorRoot).withPrompts(prompts).toPromise().then(() => {
                yeomanAssert.noFile(testHelpers.vsCodeFiles);
                done();
            });
        });

        test('Should init a new git repository when the destination directory does not have a .git directory', (done) => {
            const prompts = {
                appName: expressAppName,
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
            Sinon.stub(YeomanGenerator.prototype, testHelpers.yoDestinationPathFunctionName).callsFake(() => {
                return path.join(process.cwd(), expressAppName);
            });
            const prompts = {
                appName: expressAppName,
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
            Sinon.stub(YeomanGenerator.prototype, testHelpers.yoDestinationPathFunctionName).callsFake(() => {
                return path.join(process.cwd(), expressAppName);
            });
            const prompts = {
                appName: expressAppName,
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
    });
});