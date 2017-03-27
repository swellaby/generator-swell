'use strict';

import assert = require('yeoman-assert');
import fs = require('fs');
import helpers = require('yeoman-test');
import yeoman = require('yeoman-generator');
import path = require('path');
import sinon = require('sinon');

import inputConfig = require('./../../../generators/app/input-config');

const boilerplateFiles = [
    '.eslintignore',
    '.gitignore',
    '.eslintrc.js',
    'gulpfile.js',
    'package.json',
    'README.md',
    'tsconfig.json',
    'tslint.json',
    './build/gulp-config.js',
    './build/istanbul-config.js',
    './build/mocha-config.js',
    './build/tasks/build.js',
    './build/tasks/build.js',
    './build/tasks/clean.js',
    './build/tasks/lint.js',
    './build/tasks/test.js'
];

/**
 * Contains unit tests for the SwellabyGenerator defined in Index.ts
 */
suite('Core Generator Suite:', () => {
    let sandbox;
    const generatorRoot = path.join(__dirname, './../../../generators/app');
    const yoDestinationPathFunctionName = 'destinationPath';
    let gitInitCommandSpy;
    let npmInstallCommandSpy;
    let installDependenciesCommandSpy;

    setup(() => {
        sandbox = sinon.sandbox.create();
        gitInitCommandSpy = sandbox.spy(yeoman.prototype, 'spawnCommandSync').withArgs('git', ['init', '--quiet']);
        npmInstallCommandSpy = sandbox.spy(yeoman.prototype, 'npmInstall');
        installDependenciesCommandSpy = sandbox.spy(yeoman.prototype, 'installDependencies');
    });
    teardown(() => {
        sandbox.restore();
    });

    suite('Boilerplate Option Tests:', () => {
        const baseAppName = 'baseOptionApp';
        const appType = inputConfig.boilerplatePromptValue;
        const appDescription = 'this is a test description';

        suiteSetup(() => {
            return helpers.run(generatorRoot)
                .withPrompts({
                    appName: baseAppName,
                    description: appDescription,
                    type: appType
                })
                .toPromise();
        });

        test('Should create all the correct boilerplate files when the Base option is selected', () => {
            assert.file(boilerplateFiles);
        });

        test('Should inject the App Name into the README.md file when the Base option is selected', () => {
            assert.fileContent('README.md', '# ' + baseAppName);
        });

        test('Should init a new git repository when the destination directory does not have a .git directory', (done) => {
            helpers.run(generatorRoot)
                .withPrompts({
                    appName: baseAppName,
                    description: appDescription,
                    type: inputConfig.boilerplatePromptValue
                })
                .toPromise()
                .then(() => {
                    assert.deepEqual(gitInitCommandSpy.called, true);
                    done();
                });
        });

        test('Should init a new git repository when the destination directory has a file entitled \'.git\'', (done) => {
            // this stub is to ensure that the tmp directory (see below) creates the .git directory in
            // the same directory as the destinationRoot of the generator.
            sandbox.stub(yeoman.prototype, yoDestinationPathFunctionName, () => {
                return path.join(process.cwd(), baseAppName);
            });

            helpers.run(generatorRoot)
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
                    assert.deepEqual(gitInitCommandSpy.called, true);
                    done();
                });
        });

        test('Should not init a new git repository when the destination directory already has a git repo initialized', (done) => {
            // this stub is to ensure that the tmp directory (see below) creates the .git directory in
            // the same directory as the destinationRoot of the generator.
            sandbox.stub(yeoman.prototype, yoDestinationPathFunctionName, () => {
                return path.join(process.cwd(), baseAppName);
            });

            helpers.run(generatorRoot)
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
                    assert.deepEqual(gitInitCommandSpy.called, false);
                    done();
                });
        });

        test('Should create and scaffold into a new directory if the specified app name'
            + 'differs from the current directory with the Base option',
            (done) => {
                helpers.run(generatorRoot)
                    .withPrompts({
                        appName: baseAppName,
                        description: appDescription,
                        type: inputConfig.boilerplatePromptValue
                    })
                    .toPromise()
                    .then((dir) => {
                        assert.equal(path.basename(process.cwd()), baseAppName);
                        assert.equal(path.resolve(process.cwd()), path.join(dir, baseAppName));
                        done();
                    });
            });

        test('Should scaffold into the current directory when the specified app name matches'
            + 'the current directory name with the Base option',
            (done) => {
                sandbox.stub(yeoman.prototype, yoDestinationPathFunctionName, () => {
                    return path.join(process.cwd(), baseAppName);
                });

                helpers.run(generatorRoot)
                    .withPrompts({
                        appName: baseAppName,
                        description: appDescription,
                        type: inputConfig.boilerplatePromptValue
                    })
                    .toPromise()
                    .then((dir) => {
                        assert.equal(path.basename(process.cwd()), path.basename(dir));
                        assert.equal(path.resolve(process.cwd()), path.resolve(dir));
                        assert.noFile(path.join(process.cwd(), baseAppName));
                        done();
                    });
            });

        test('Should install dependencies if user confirms with the Base option selected', (done) => {
            helpers.run(generatorRoot)
                .withPrompts({
                    appName: baseAppName,
                    description: appDescription,
                    type: inputConfig.boilerplatePromptValue,
                    installDependencies: true
                })
                .toPromise()
                .then(() => {
                    assert.deepEqual(npmInstallCommandSpy.called, true);
                    assert.deepEqual(installDependenciesCommandSpy.called, false);
                    done();
                });
        });

        test('Should not install dependencies if user declines with the Base option selected', (done) => {
            helpers.run(generatorRoot)
                .withPrompts({
                    appName: baseAppName,
                    description: appDescription,
                    type: inputConfig.boilerplatePromptValue,
                    installDependencies: false
                })
                .toPromise()
                .then(() => {
                    assert.deepEqual(npmInstallCommandSpy.called, false);
                    assert.deepEqual(installDependenciesCommandSpy.called, false);
                    done();
                });
        });
    });

    suite('CLI Option Tests: ', () => {
        const cliAppName = 'cli app';
        const appType = inputConfig.cliPromptValue;
        const appDescription = 'this is a test description';

        suiteSetup(() => {
            return helpers.run(generatorRoot)
                .withPrompts({
                    appName: cliAppName,
                    description: appDescription,
                    type: appType
                })
                .toPromise();
        });

        test('Should create all the correct boilerplate files when the CLI option is selected', () => {
            assert.file(boilerplateFiles);
        });

        test('Should inject the App Name into the README.md file when the CLI option is selected', () => {
            assert.fileContent('README.md', '# ' + cliAppName);
        });

        test('Should create and scaffold into a new directory if the specified app name differs from'
            + 'the current directory with the CLI option', (done) => {
                helpers.run(generatorRoot)
                    .withPrompts({
                        appName: cliAppName,
                        description: appDescription,
                        type: inputConfig.cliPromptValue
                    })
                    .toPromise()
                    .then((dir) => {
                        assert.equal(path.basename(process.cwd()), cliAppName);
                        assert.equal(path.resolve(process.cwd()), path.join(dir, cliAppName));
                        done();
                    });
            });
        test('Should scaffold into the current directory when the specified app name matches the current'
            + 'directory name with the CLI option', (done) => {
                sandbox.stub(yeoman.prototype, yoDestinationPathFunctionName, () => {
                    return path.join(process.cwd(), cliAppName);
                });

                helpers.run(generatorRoot)
                    .withPrompts({
                        appName: cliAppName,
                        description: appDescription,
                        type: inputConfig.cliPromptValue
                    })
                    .toPromise()
                    .then((dir) => {
                        assert.equal(path.basename(process.cwd()), path.basename(dir));
                        assert.equal(path.resolve(process.cwd()), path.resolve(dir));
                        assert.noFile(path.join(process.cwd(), cliAppName));
                        done();
                    });
            });

        test('Should install dependencies if user confirms with the CLI option selected', (done) => {
            helpers.run(generatorRoot)
                .withPrompts({
                    appName: cliAppName,
                    description: appDescription,
                    type: inputConfig.cliPromptValue,
                    installDependencies: true
                })
                .toPromise()
                .then(() => {
                    assert.deepEqual(npmInstallCommandSpy.called, true);
                    assert.deepEqual(installDependenciesCommandSpy.called, false);
                    done();
                });
        });

        test('Should not install dependencies if user declines with the CLI option selected', (done) => {
            helpers.run(generatorRoot)
                .withPrompts({
                    appName: cliAppName,
                    description: appDescription,
                    type: inputConfig.cliPromptValue,
                    installDependencies: false
                })
                .toPromise()
                .then(() => {
                    assert.deepEqual(npmInstallCommandSpy.called, false);
                    assert.deepEqual(installDependenciesCommandSpy.called, false);
                    done();
                });
        });
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
            return helpers.run(generatorRoot)
                .withPrompts({
                    appName: expressAppName,
                    description: appDescription,
                    type: appType,
                    dockerUser: dockerUser
                })
                .toPromise();
        });

        test('Should create all the correct boilerplate files when the Express API option is selected', () => {
            assert.file(boilerplateFiles);
        });

        test('Should create all the correct express files when the Express API option is selected', () => {
            assert.file(expressFiles);
        });

        test('Should inject the App Name into the README.md file when the Express API option is selected', () => {
            assert.fileContent('README.md', '# ' + expressAppName);
        });

        test('Should inject image name correctly into the build.sh file when the Express API option is selected', () => {
            assert.fileContent('build.sh', dockerUser + '/' + expressAppName);
        });

        test('Should create and scaffold into a new directory if the specified app name differs from the'
            + 'current directory with the Express API option', (done) => {
                helpers.run(generatorRoot)
                    .withPrompts({
                        appName: expressAppName,
                        description: appDescription,
                        type: inputConfig.expressApiPromptValue
                    })
                    .toPromise()
                    .then((dir) => {
                        assert.equal(path.basename(process.cwd()), expressAppName);
                        assert.equal(path.resolve(process.cwd()), path.join(dir, expressAppName));
                        done();
                    });
            });

        test('Should scaffold into the current directory when the specified app name matches the current'
            + 'directory name with the Express API option', (done) => {
                sandbox.stub(yeoman.prototype, yoDestinationPathFunctionName, () => {
                    return path.join(process.cwd(), expressAppName);
                });

                helpers.run(generatorRoot)
                    .withPrompts({
                        appName: expressAppName,
                        description: appDescription,
                        type: inputConfig.expressApiPromptValue
                    })
                    .toPromise()
                    .then((dir) => {
                        assert.equal(path.basename(process.cwd()), path.basename(dir));
                        assert.equal(path.resolve(process.cwd()), path.resolve(dir));
                        assert.noFile(path.join(process.cwd(), expressAppName));
                        done();
                    });
            });

        test('Should install dependencies if user confirms with the Express API option selected', (done) => {
            helpers.run(generatorRoot)
                .withPrompts({
                    appName: expressAppName,
                    description: appDescription,
                    type: inputConfig.expressApiPromptValue,
                    installDependencies: true
                })
                .toPromise()
                .then(() => {
                    assert.deepEqual(npmInstallCommandSpy.called, true);
                    assert.deepEqual(installDependenciesCommandSpy.called, false);
                    done();
                });
        });

        test('Should not install dependencies if user declines with the Express API option selected', (done) => {
            helpers.run(generatorRoot)
                .withPrompts({
                    appName: expressAppName,
                    description: appDescription,
                    type: inputConfig.expressApiPromptValue,
                    installDependencies: false
                })
                .toPromise()
                .then(() => {
                    assert.deepEqual(npmInstallCommandSpy.called, false);
                    assert.deepEqual(installDependenciesCommandSpy.called, false);
                    done();
                });
        });
    });

    suite('VSTS Option Tests:', () => {
        const vstsCommonFiles = [
            'extension-icon.png',
            'OVERVIEW.md',
            'vss-extension.json'
        ];

        suite('VSTS Task Option Tests:', () => {
            const vstsAppName = 'vsts task';
            const appType = inputConfig.vstsTaskPromptValue;
            const appDescription = 'this is an awesome vsts task';

            suiteSetup(() => {
                return helpers.run(generatorRoot)
                    .withPrompts({
                        appName: vstsAppName,
                        description: appDescription,
                        type: appType
                    })
                    .toPromise();
            });

            test('Should create all the correct boilerplate files when the VSTS option is selected', () => {
                assert.file(boilerplateFiles);
            });

            test('Should contain all of the common VSTS files', () => {
                assert.file(vstsCommonFiles);
            });

            test('Should create all of the default VSTS Task template files', () => {
                assert.file([
                    'task.json',
                    './src/main.ts',
                    './src/helper.ts',
                    './test/unit/main-tests.ts',
                    './test/unit/helper-tests.ts',
                    './build/tasks/package.js'
                ]);
            });

            test('Should inject the App Name into the README.md file when the VSTS option is selected', () => {
                assert.fileContent('README.md', '# ' + vstsAppName);
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
                            assert.equal(path.basename(process.cwd()), vstsAppName);
                            assert.equal(path.resolve(process.cwd()), path.join(dir, vstsAppName));
                            done();
                        });
                });

            test('Should scaffold into the current directory when the specified app name matches the current'
                + 'directory name with the VSTS option', (done) => {
                    sandbox.stub(yeoman.prototype, yoDestinationPathFunctionName, () => {
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
                            assert.equal(path.basename(process.cwd()), path.basename(dir));
                            assert.equal(path.resolve(process.cwd()), path.resolve(dir));
                            assert.noFile(path.join(process.cwd(), vstsAppName));
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
                        assert.deepEqual(npmInstallCommandSpy.called, true);
                        assert.deepEqual(installDependenciesCommandSpy.called, false);
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
                        assert.deepEqual(npmInstallCommandSpy.called, false);
                        assert.deepEqual(installDependenciesCommandSpy.called, false);
                        done();
                    });
            });
        });
    });

    suite('Chatbot Option Tests:', () => {
        const chatbotAppName = 'chatbot app';
        const appType = inputConfig.chatbotPromptValue;
        const appDescription = 'brand new chatbot';
        const chatbotFiles = [
            './src/bot.ts',
            './src/config.ts',
            './src/console.ts',
            './src/server.ts',
            './src/dialogs/dialog-base.ts',
            './src/dialogs/sample.ts'
        ];

        suiteSetup(() => {
            return helpers.run(generatorRoot)
                .withPrompts({
                    appName: chatbotAppName,
                    description: appDescription,
                    type: appType
                })
                .toPromise();
        });

        test('Should create all the correct boilerplate files when the Chatbot option is selected', () => {
            assert.file(boilerplateFiles);
        });

        test('Should create all the correct express files when the Chatbot option is selected', () => {
            assert.file(chatbotFiles);
        });

        test('Should inject the App Name into the README.md file when the Express API option is selected', () => {
            assert.fileContent('README.md', '# ' + chatbotAppName);
        });

        test('Should create and scaffold into a new directory if the specified app name differs from'
            + 'the current directory with the Chatbot option', (done) => {
                helpers.run(generatorRoot)
                    .withPrompts({
                        appName: chatbotAppName,
                        description: appDescription,
                        type: inputConfig.chatbotPromptValue
                    })
                    .toPromise()
                    .then((dir) => {
                        assert.equal(path.basename(process.cwd()), chatbotAppName);
                        assert.equal(path.resolve(process.cwd()), path.join(dir, chatbotAppName));
                        done();
                    });
            });

        test('Should scaffold into the current directory when the specified app name matches the current directory'
            + 'name with the Chatbot option', (done) => {
                sandbox.stub(yeoman.prototype, yoDestinationPathFunctionName, () => {
                    return path.join(process.cwd(), chatbotAppName);
                });

                helpers.run(generatorRoot)
                    .withPrompts({
                        appName: chatbotAppName,
                        description: appDescription,
                        type: inputConfig.chatbotPromptValue
                    })
                    .toPromise()
                    .then((dir) => {
                        assert.equal(path.basename(process.cwd()), path.basename(dir));
                        assert.equal(path.resolve(process.cwd()), path.resolve(dir));
                        assert.noFile(path.join(process.cwd(), chatbotAppName));
                        done();
                    });
            });

        test('Should install dependencies if user confirms with the Chatbot option selected', (done) => {
            helpers.run(generatorRoot)
                .withPrompts({
                    appName: chatbotAppName,
                    description: appDescription,
                    type: inputConfig.chatbotPromptValue,
                    installDependencies: true
                })
                .toPromise()
                .then(() => {
                    assert.deepEqual(npmInstallCommandSpy.called, true);
                    assert.deepEqual(installDependenciesCommandSpy.called, false);
                    done();
                });
        });

        test('Should not install dependencies if user declines with the Chatbot option selected', (done) => {
            helpers.run(generatorRoot)
                .withPrompts({
                    appName: chatbotAppName,
                    description: appDescription,
                    type: inputConfig.chatbotPromptValue,
                    installDependencies: false
                })
                .toPromise()
                .then(() => {
                    assert.deepEqual(npmInstallCommandSpy.called, false);
                    assert.deepEqual(installDependenciesCommandSpy.called, false);
                    done();
                });
        });
    });

    suite('VsCode Option Tests:', () => {
        const codeAppName = 'code app';
        const appDescription = 'brand new app';
        const codeFiles = [
            '.vscode/tasks.json',
            '.vscode/extensions.json',
            '.vscode/launch.json'
        ];

        test('Should create all the correct files when the vscode option is selected', () => {
            helpers.run(generatorRoot)
                .withPrompts({
                    appName: codeAppName,
                    description: appDescription,
                    type: inputConfig.boilerplatePromptValue
                })
                .toPromise()
                .then(() => {
                    assert.file(boilerplateFiles);
                    assert.file(codeFiles);
                });
        });

        test('Should not add vscode files if the user declines the vscode option', (done) => {
            helpers.run(generatorRoot)
                .withPrompts({
                    appName: codeAppName,
                    description: appDescription,
                    type: inputConfig.boilerplatePromptValue,
                    vscode: false
                })
                .toPromise()
                .then(() => {
                    assert.noFile(codeFiles);
                    done();
                });
        });

        test('Should set debug program correctly for boilerplate app', (done) => {
            helpers.run(generatorRoot)
                .withPrompts({
                    appName: codeAppName,
                    description: appDescription,
                    type: inputConfig.boilerplatePromptValue
                })
                .toPromise()
                .then(() => {
                    assert.fileContent('.vscode/launch.json', '"program": "${file}"');
                    done();
                });
        });

        test('Should set debug program correctly for express app', (done) => {
            helpers.run(generatorRoot)
                .withPrompts({
                    appName: codeAppName,
                    description: appDescription,
                    type: inputConfig.expressApiPromptValue
                })
                .toPromise()
                .then(() => {
                    assert.fileContent('.vscode/launch.json', '"program": "${workspaceRoot}/src/app.ts"');
                    done();
                });
        });

        test('Should set debug program correctly for chatbot app', (done) => {
            helpers.run(generatorRoot)
                .withPrompts({
                    appName: codeAppName,
                    description: appDescription,
                    type: inputConfig.chatbotPromptValue
                })
                .toPromise()
                .then(() => {
                    assert.fileContent('.vscode/launch.json', '"program": "${workspaceRoot}/src/server.ts"');
                    done();
                });
        });
    });
});