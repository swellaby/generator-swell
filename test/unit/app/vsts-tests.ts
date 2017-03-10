'use strict';

import assert = require('yeoman-assert');
import fs = require('fs');
import helpers = require('yeoman-test');
import path = require('path');
import sinon = require('sinon');

import inputConfig = require('./../../../generators/app/input-config');
import vsts = require('./../../../generators/app/vsts');

/**
 * Contains unit tests for the functions in vsts.ts
 */
suite('VSTS Task Tests:', () => {
    let sandbox;
    const generatorRoot = path.join(__dirname, './../../../generators/app');
    const vstsCommonFiles = [
        'extension-icon.png',
        'OVERVIEW.md',
        'vss-extension.json'
    ];

    setup(() => {
        sandbox = sinon.sandbox.create();
    });
    teardown(() => {
        sandbox.restore();
    });

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

        // test('Should create and scaffold into a new directory if the specified app name differs from the'
        //     + 'current directory with the VSTS option', (done) => {
        //         helpers.run(generatorRoot)
        //             .withPrompts({
        //                 appName: vstsAppName,
        //                 description: 'my test',
        //                 type: inputConfig.vstsTaskPromptValue
        //             })
        //             .toPromise()
        //             .then((dir) => {
        //                 assert.equal(path.basename(process.cwd()), vstsAppName);
        //                 assert.equal(path.resolve(process.cwd()), path.join(dir, vstsAppName));
        //                 done();
        //             });
        //     });

        // test('Should scaffold into the current directory when the specified app name matches the current'
        //     + 'directory name with the VSTS option', (done) => {
        //         sandbox.stub(yeoman.prototype, yoDestinationPathFunctionName, () => {
        //             return path.join(process.cwd(), vstsAppName);
        //         });

        //         helpers.run(generatorRoot)
        //             .withPrompts({
        //                 appName: vstsAppName,
        //                 description: appDescription,
        //                 type: inputConfig.vstsTaskPromptValue
        //             })
        //             .toPromise()
        //             .then((dir) => {
        //                 assert.equal(path.basename(process.cwd()), path.basename(dir));
        //                 assert.equal(path.resolve(process.cwd()), path.resolve(dir));
        //                 assert.noFile(path.join(process.cwd(), vstsAppName));
        //                 done();
        //             });
        //     });

        // test('Should install dependencies if user confirms with the VSTS option selected', (done) => {
        //     helpers.run(generatorRoot)
        //         .withPrompts({
        //             appName: 'name',
        //             description: appDescription,
        //             type: inputConfig.vstsTaskPromptValue,
        //             installDependencies: true
        //         })
        //         .toPromise()
        //         .then(() => {
        //             assert.deepEqual(npmInstallCommandSpy.called, true);
        //             assert.deepEqual(installDependenciesCommandSpy.called, false);
        //             done();
        //         });
        // });

        // test('Should not install dependencies if user declines with the VSTS option selected', (done) => {
        //     helpers.run(generatorRoot)
        //         .withPrompts({
        //             appName: vstsAppName,
        //             description: appDescription,
        //             type: inputConfig.vstsTaskPromptValue,
        //             installDependencies: false
        //         })
        //         .toPromise()
        //         .then(() => {
        //             assert.deepEqual(npmInstallCommandSpy.called, false);
        //             assert.deepEqual(installDependenciesCommandSpy.called, false);
        //             done();
        //         });
        // });
    });
});