'use strict';

// tslint:disable:no-var-requires
import Chai = require('chai');
const fileEditor = require('mem-fs-editor');
const findUp = require('find-up');
import path = require('path');
import Sinon = require('sinon');
const yeomanEnvironment = require('yeoman-environment');
import YeomanGenerator = require('yeoman-generator');

import Index = require('././../../../generators/app/index');
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
    let generatorGetGlobalStorageStub: Sinon.SinonStub;
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
        yeomanEnvironmentForceUpdate = sandbox.stub(yeomanEnvironment, 'enforceUpdate');
        fileEditorCreateStub = sandbox.stub(fileEditor, 'create');
        findUpSyncStub = sandbox.stub(findUp, 'sync');
        generatorOptionStub = sandbox.stub(YeomanGenerator.prototype, 'option');
        generatorDetermineAppNameStub = sandbox.stub(YeomanGenerator.prototype, 'determineAppname');
        generatorGetStorageStub = sandbox.stub(YeomanGenerator.prototype, '_getStorage');
        generatorGetGlobalStorageStub = sandbox.stub(YeomanGenerator.prototype, '_getGlobalStorage');
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