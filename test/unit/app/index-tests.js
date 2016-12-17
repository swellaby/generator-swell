'use strict';
/* jshint maxstatements:false */
// Disabled maxstatements jshint rule which errors due to 
// the test functions being embedded within the suite functions.

var assert = require('yeoman-assert');
var fs = require('fs');
var helpers = require('yeoman-test');
var yeoman = require('yeoman-generator');
var path = require('path');
var sinon = require('sinon');

var inputConfig = require('./../../../generators/app/input-config');

var boilerplateFiles = [
    '.eslintignore',
    '.gitignore',
    '.jshintignore',
    '.jshintrc',
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

suite('Core Generator Suite:', function() {
    var sandbox;
    var generatorRoot = path.join(__dirname, './../../../generators/app');
    var yoDestinationPathFunctionName = 'destinationPath';
    var gitInitCommandSpy;
    var npmInstallCommandSpy;
    var installDependenciesCommandSpy;
    
    setup(function() {
        sandbox = sinon.sandbox.create();
        gitInitCommandSpy = sandbox.spy(yeoman.Base.prototype, 'spawnCommandSync').withArgs('git', ['init', '--quiet']);
        npmInstallCommandSpy = sandbox.spy(yeoman.Base.prototype, 'npmInstall');
        installDependenciesCommandSpy = sandbox.spy(yeoman.Base.prototype, 'installDependencies');
    });
    teardown(function() {
        sandbox.restore();        
    });

    suite('Boilerplate Option Tests:', function() {
        var baseAppName = 'baseOptionApp';
        var appType = inputConfig.boilerplatePromptValue;
        var appDescription = 'this is a test description';        

        suiteSetup(function() {
            return helpers.run(generatorRoot)
                .withPrompts({
                    appName: baseAppName,
                    description: appDescription,
                    type: appType,
                })
                .toPromise();
        });

        test('Should create all the correct boilerplate files when the Base option is selected', function() {
            assert.file(boilerplateFiles);
        });

        test('Should inject the App Name into the README.md file when the Base option is selected', function() {
            assert.fileContent('README.md', '# ' + baseAppName);
        });

        test('Should init a new git repository when the destination directory does not have a .git directory', function(done) {
            helpers.run(generatorRoot)
                .withPrompts({
                    appName: baseAppName,
                    description: 'my test',
                    type: inputConfig.boilerplatePromptValue,
                })
                .toPromise()
                .then(function() {
                    assert.deepEqual(gitInitCommandSpy.called, true);
                    done();
                }); 
        });

        test('Should init a new git repository when the destination directory has a file entitled \'.git\'', function(done) {
            // this stub is to ensure that the tmp directory (see below) creates the .git directory in 
            // the same directory as the destinationRoot of the generator. 
            sandbox.stub(yeoman.Base.prototype, yoDestinationPathFunctionName, function() {
                return path.join(process.cwd(), baseAppName);
            });

            helpers.run(generatorRoot)
                .inTmpDir(function(dir) {
                    fs.writeFileSync(path.join(dir, '.git'));
                })
                .withPrompts({
                    appName: baseAppName,
                    description: 'my test',
                    type: inputConfig.boilerplatePromptValue,
                })
                .toPromise()
                .then(function() {
                    assert.deepEqual(gitInitCommandSpy.called, true);
                    done();
                }); 
        });

        test('Should not init a new git repository when the destination directory already has a git repo initialized', function(done) {
            // this stub is to ensure that the tmp directory (see below) creates the .git directory in 
            // the same directory as the destinationRoot of the generator. 
            sandbox.stub(yeoman.Base.prototype, yoDestinationPathFunctionName, function() {
                return path.join(process.cwd(), baseAppName);
            });

            helpers.run(generatorRoot)
                .inTmpDir(function(dir) {
                    fs.mkdirSync(path.join(path.resolve(dir), '.git'));                   
                })
                .withPrompts({
                    appName: baseAppName,
                    description: 'my test',
                    type: inputConfig.boilerplatePromptValue,
                })
                .toPromise()
                .then(function() {
                    assert.deepEqual(gitInitCommandSpy.called, false);
                    done();
                }); 
        });

        test('Should create and scaffold into a new directory if the specified app name differs from the current directory with the Base option', function(done) {
            helpers.run(generatorRoot)
                .withPrompts({
                    appName: baseAppName,
                    description: 'my test',
                    type: inputConfig.boilerplatePromptValue,
                })
                .toPromise()
                .then(function(dir) {
                    assert.equal(path.basename(process.cwd()), baseAppName);
                    assert.equal(path.resolve(process.cwd()), path.join(dir, baseAppName));
                    done();
                });
        });

        test('Should scaffold into the current directory when the specified app name matches the current directory name with the Base option', function(done) {
            sandbox.stub(yeoman.Base.prototype, yoDestinationPathFunctionName, function() {
                return path.join(process.cwd(), baseAppName);
            });

            helpers.run(generatorRoot)
                .withPrompts({
                    appName: baseAppName,
                    description: 'my test',
                    type: inputConfig.boilerplatePromptValue,
                })
                .toPromise()
                .then(function(dir) {
                    assert.equal(path.basename(process.cwd()), path.basename(dir));
                    assert.equal(path.resolve(process.cwd()), path.resolve(dir));
                    assert.noFile(path.join(process.cwd(), baseAppName));
                    done();
                });
        });

        test('Should install dependencies if user confirms with the Base option selected', function(done) {
            helpers.run(generatorRoot)
                .withPrompts({
                    appName: 'name',
                    description: 'my test',
                    type: inputConfig.boilerplatePromptValue,
                    installDependencies: true
                })
                .toPromise()
                .then(function() {
                    assert.deepEqual(npmInstallCommandSpy.called, true);
                    assert.deepEqual(installDependenciesCommandSpy.called, false);
                    done();
                });
        });

        test('Should not install dependencies if user declines with the Base option selected', function(done) {
            helpers.run(generatorRoot)
                .withPrompts({
                    appName: 'name',
                    description: 'my test',
                    type: inputConfig.boilerplatePromptValue,
                    installDependencies: false
                })
                .toPromise()
                .then(function() {
                    assert.deepEqual(npmInstallCommandSpy.called, false);
                    assert.deepEqual(installDependenciesCommandSpy.called, false);
                    done();
                });
        });
    });

    suite('CLI Option Tests: ', function() {
        var cliAppName = 'cli app';
        var appType = inputConfig.cliPromptValue;
        var appDescription = 'this is a test description';

        suiteSetup(function() {
            return helpers.run(generatorRoot)
                .withPrompts({
                    appName: cliAppName,
                    description: appDescription,
                    type: appType,
                })
                .toPromise();
        });

        test('Should create all the correct boilerplate files when the CLI option is selected', function() {
            assert.file(boilerplateFiles);
        });

        test('Should inject the App Name into the README.md file when the CLI option is selected', function() {
            assert.fileContent('README.md', '# ' + cliAppName);
        });

        test('Should create and scaffold into a new directory if the specified app name differs from the current directory with the CLI option', function(done) {
            helpers.run(generatorRoot)
                .withPrompts({
                    appName: cliAppName,
                    description: 'my test',
                    type: inputConfig.cliPromptValue,
                })
                .toPromise()
                .then(function(dir) {
                    assert.equal(path.basename(process.cwd()), cliAppName);
                    assert.equal(path.resolve(process.cwd()), path.join(dir, cliAppName));
                    done();
                });
        });

        test('Should scaffold into the current directory when the specified app name matches the current directory name with the CLI option', function(done) {
            sandbox.stub(yeoman.Base.prototype, yoDestinationPathFunctionName, function() {
                return path.join(process.cwd(), cliAppName);
            });

            helpers.run(generatorRoot)
                .withPrompts({
                    appName: cliAppName,
                    description: 'my test',
                    type: inputConfig.cliPromptValue,
                })
                .toPromise()
                .then(function(dir) {
                    assert.equal(path.basename(process.cwd()), path.basename(dir));
                    assert.equal(path.resolve(process.cwd()), path.resolve(dir));
                    assert.noFile(path.join(process.cwd(), cliAppName));
                    done();
                });
        });

        test('Should install dependencies if user confirms with the CLI option selected', function(done) {
            helpers.run(generatorRoot)
                .withPrompts({
                    appName: 'name',
                    description: 'my test',
                    type: inputConfig.cliPromptValue,
                    installDependencies: true
                })
                .toPromise()
                .then(function() {
                    assert.deepEqual(npmInstallCommandSpy.called, true);
                    assert.deepEqual(installDependenciesCommandSpy.called, false);
                    done();
                });
        });

        test('Should not install dependencies if user declines with the CLI option selected', function(done) {
            helpers.run(generatorRoot)
                .withPrompts({
                    appName: 'name',
                    description: 'my test',
                    type: inputConfig.cliPromptValue,
                    installDependencies: false
                })
                .toPromise()
                .then(function() {
                    assert.deepEqual(npmInstallCommandSpy.called, false);
                    assert.deepEqual(installDependenciesCommandSpy.called, false);
                    done();
                });
        });
    });

    suite('Express API Option Tests:', function() {
        var expressAppName = 'api app';
        var appType = inputConfig.expressApiPromptValue;
        var appDescription = 'this is a test description';
        var dockerUser = 'testUser';
        var expressFiles = [
            '.dockerignore',
            'build.sh',
            'Dockerfile',
            './build/tasks/package.js',
            './src/app.ts'
        ];

        suiteSetup(function() {
            return helpers.run(generatorRoot)
                .withPrompts({
                    appName: expressAppName,
                    description: appDescription,
                    type: appType,
                    dockerUser: dockerUser
                })
                .toPromise();
        });

        test('Should create all the correct boilerplate files when the Express API option is selected', function() {
            assert.file(boilerplateFiles);
        });

        test('Should create all the correct express files when the Express API option is selected', function() {
            assert.file(expressFiles);
        });

        test('Should inject the App Name into the README.md file when the Express API option is selected', function() {
            assert.fileContent('README.md', '# ' + expressAppName);
        });

        test('Should inject image name correctly into the build.sh file when the Express API option is selected', function() {
            assert.fileContent('build.sh', dockerUser + '/' + expressAppName);
        });

        test('Should create and scaffold into a new directory if the specified app name differs from the current directory with the Express API option', function(done) {
            helpers.run(generatorRoot)
                .withPrompts({
                    appName: expressAppName,
                    description: 'my test',
                    type: inputConfig.expressApiPromptValue,
                })
                .toPromise()
                .then(function(dir) {
                    assert.equal(path.basename(process.cwd()), expressAppName);
                    assert.equal(path.resolve(process.cwd()), path.join(dir, expressAppName));
                    done();
                });
        });

        test('Should scaffold into the current directory when the specified app name matches the current directory name with the Express API option', function(done) {
            sandbox.stub(yeoman.Base.prototype, yoDestinationPathFunctionName, function() {
                return path.join(process.cwd(), expressAppName);
            });

            helpers.run(generatorRoot)
                .withPrompts({
                    appName: expressAppName,
                    description: 'my test',
                    type: inputConfig.expressApiPromptValue,
                })
                .toPromise()
                .then(function(dir) {
                    assert.equal(path.basename(process.cwd()), path.basename(dir));
                    assert.equal(path.resolve(process.cwd()), path.resolve(dir));
                    assert.noFile(path.join(process.cwd(), expressAppName));
                    done();
                });
        });

        test('Should install dependencies if user confirms with the Express API option selected', function(done) {
            helpers.run(generatorRoot)
                .withPrompts({
                    appName: 'name',
                    description: 'my test',
                    type: inputConfig.expressApiPromptValue,
                    installDependencies: true
                })
                .toPromise()
                .then(function() {
                    assert.deepEqual(npmInstallCommandSpy.called, true);
                    assert.deepEqual(installDependenciesCommandSpy.called, false);
                    done();
                });
        });

        test('Should not install dependencies if user declines with the Express API option selected', function(done) {
            helpers.run(generatorRoot)
                .withPrompts({
                    appName: 'name',
                    description: 'my test',
                    type: inputConfig.expressApiPromptValue,
                    installDependencies: false
                })
                .toPromise()
                .then(function() {
                    assert.deepEqual(npmInstallCommandSpy.called, false);
                    assert.deepEqual(installDependenciesCommandSpy.called, false);
                    done();
                });
        });
    });

    suite('VSTS Option Tests:', function() {
        var vstsCommonFiles = [
            'extension-icon.png',
            'OVERVIEW.md',
            'vss-extension.json'
        ];

        suite('VSTS Task Option Tests:', function() {
            var vstsAppName = 'vsts task';
            var appType = inputConfig.vstsTaskPromptValue;
            var appDescription = 'this is a test description';

            suiteSetup(function() {
                return helpers.run(generatorRoot)
                    .withPrompts({
                        appName: vstsAppName,
                        description: appDescription,
                        type: appType,
                    })
                    .toPromise();
            });

            test('Should create all the correct boilerplate files when the VSTS option is selected', function() {
                assert.file(boilerplateFiles);
            });

            test('Should contain all of the common VSTS files', function() {
                assert.file(vstsCommonFiles);
            });

            test('Should create all of the default VSTS Task template files', function() {
                assert.file([
                    'task.json',                    
                    './src/main.ts',
                    './src/helper.ts',
                    './test/unit/main-tests.ts',
                    './test/unit/helper-tests.ts',
                    './build/tasks/package.js'
                ]);
            });

            test('Should inject the App Name into the README.md file when the VSTS option is selected', function() {
                assert.fileContent('README.md', '# ' + vstsAppName);
            });

            test('Should create and scaffold into a new directory if the specified app name differs from the current directory with the VSTS option', function(done) {
                helpers.run(generatorRoot)
                    .withPrompts({
                        appName: vstsAppName,
                        description: 'my test',
                        type: inputConfig.vstsTaskPromptValue,
                    })
                    .toPromise()
                    .then(function(dir) {
                        assert.equal(path.basename(process.cwd()), vstsAppName);
                        assert.equal(path.resolve(process.cwd()), path.join(dir, vstsAppName));
                        done();
                    });
            });

            test('Should scaffold into the current directory when the specified app name matches the current directory name with the VSTS option', function(done) {
                sandbox.stub(yeoman.Base.prototype, yoDestinationPathFunctionName, function() {
                    return path.join(process.cwd(), vstsAppName);
                });

                helpers.run(generatorRoot)
                    .withPrompts({
                        appName: vstsAppName,
                        description: 'my test',
                        type: inputConfig.vstsTaskPromptValue,
                    })
                    .toPromise()
                    .then(function(dir) {
                        assert.equal(path.basename(process.cwd()), path.basename(dir));
                        assert.equal(path.resolve(process.cwd()), path.resolve(dir));
                        assert.noFile(path.join(process.cwd(), vstsAppName));
                        done();
                    });
            });

            test('Should install dependencies if user confirms with the VSTS option selected', function(done) {
                helpers.run(generatorRoot)
                    .withPrompts({
                        appName: 'name',
                        description: 'my test',
                        type: inputConfig.vstsTaskPromptValue,
                        installDependencies: true
                    })
                    .toPromise()
                    .then(function() {
                        assert.deepEqual(npmInstallCommandSpy.called, true);
                        assert.deepEqual(installDependenciesCommandSpy.called, false);
                        done();
                    });
            });

            test('Should not install dependencies if user declines with the VSTS option selected', function(done) {
                helpers.run(generatorRoot)
                    .withPrompts({
                        appName: 'name',
                        description: 'my test',
                        type: inputConfig.vstsTaskPromptValue,
                        installDependencies: false
                    })
                    .toPromise()
                    .then(function() {
                        assert.deepEqual(npmInstallCommandSpy.called, false);
                        assert.deepEqual(installDependenciesCommandSpy.called, false);
                        done();
                    });
            });
        });
    });
});