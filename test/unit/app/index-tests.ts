'use strict';

import Chai = require('chai');
import FileEditor = require('mem-fs-editor');
import findUp = require('find-up');
import path = require('path');
import Sinon = require('sinon');
import YeomanEnvironment = require('yeoman-environment');
import YeomanGenerator = require('yeoman-generator');

import Index = require('././../../../generators/app/index');
import inputConfig = require('./../../../generators/app/input-config');
import SwellabyGenerator = require('./../../../generators/app/swellaby-generator');
import testHelpers = require('./../test-helpers');

const assert = Chai.assert;

/**
 * Contains unit tests for the main generator defined in index.ts
 */
suite('Index Tests:', () => {
    const sandbox = Sinon.sandbox.create();
    let index: Index;
    let swellabyGeneratorCreateProjectStub: Sinon.SinonStub;
    let yeomanEnvironmentForceUpdate: Sinon.SinonStub;
    let fileEditorCreateStub: Sinon.SinonStub;
    let findUpSyncStub: Sinon.SinonStub;
    let generatorOptionStub: Sinon.SinonStub;
    let generatorDetermineAppNameStub: Sinon.SinonStub;
    let generatorGetStorageStub: Sinon.SinonStub;
    let generatorGetGlobalSTorageStub: Sinon.SinonStub;
    let generatorSourceRootStub: Sinon.SinonStub;
    let pathJoinStub: Sinon.SinonStub;
    let pathDirnameStub: Sinon.SinonStub;
    const options = {
        env: {
            adapter: {
                log: () => { return ''; }
            }
        },
        resolved: 'foo'
    };

    setup(() => {
        yeomanEnvironmentForceUpdate = sandbox.stub(YeomanEnvironment, 'enforceUpdate');
        fileEditorCreateStub = sandbox.stub(FileEditor, 'create');
        findUpSyncStub = sandbox.stub(findUp, 'sync');
        generatorOptionStub = sandbox.stub(YeomanGenerator.prototype, 'option');
        generatorDetermineAppNameStub = sandbox.stub(YeomanGenerator.prototype, 'determineAppname');
        generatorGetStorageStub = sandbox.stub(YeomanGenerator.prototype, '_getStorage');
        generatorGetGlobalSTorageStub = sandbox.stub(YeomanGenerator.prototype, '_getGlobalStorage');
        generatorSourceRootStub = sandbox.stub(YeomanGenerator.prototype, 'sourceRoot');
        pathJoinStub = sandbox.stub(path, 'join');
        pathDirnameStub = sandbox.stub(path, 'dirname');
        swellabyGeneratorCreateProjectStub = sandbox.stub(SwellabyGenerator.prototype, 'createProject');
    });

    teardown(() => {
        sandbox.restore();
    });

    test('Should invoke the createProject method defined by the SwellabyGenerator', () => {
        index = new Index([], options);
        index.execute();
        assert.isTrue(swellabyGeneratorCreateProjectStub.called);
    });
});