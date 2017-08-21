'use strict';

// tslint:disable:no-var-requires
import Chai = require('chai');
const fileEditor = require('mem-fs-editor');
const findUp = require('find-up');
import path = require('path');
import Sinon = require('sinon');
const yeomanEnvironment = require('yeoman-environment');
const yeomanGenerator = require('yeoman-generator');

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
    // The below stubs on the internal yeoman generators stubs are leveraged
    // in order to take over the execution flow that occurs internally, on-start
    // within the core yeoman library. It is necessary to stub these to perform
    // true unit tests.
    // tslint:disable-next-line
    /* eslint-disable no-unused-vars */
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
    // tslint:disable-next-line
    /* eslint-enable no-unused-vars */
    const options = {
        env: {
            adapter: {
                log: () => { return ''; }
            }
        },
        resolved: 'foo'
    };

    /**
     * Helper function for stubbing internal Yo Generator functions in order
     * to take control of execution flow.
     */
    const stubInternalGeneratorFunctions = () => {
        yeomanEnvironmentForceUpdate = sandbox.stub(yeomanEnvironment, 'enforceUpdate');
        fileEditorCreateStub = sandbox.stub(fileEditor, 'create');
        findUpSyncStub = sandbox.stub(findUp, 'sync');
        generatorOptionStub = sandbox.stub(yeomanGenerator.prototype, 'option');
        generatorGetStorageStub = sandbox.stub(yeomanGenerator.prototype, '_getStorage').callsFake(() => null);
        generatorGetGlobalStorageStub = sandbox.stub(yeomanGenerator.prototype, '_getGlobalStorage');
        generatorDetermineAppNameStub = sandbox.stub(yeomanGenerator.prototype, 'determineAppname');
        generatorSourceRootStub = sandbox.stub(yeomanGenerator.prototype, 'sourceRoot');
    };

    setup(() => {
        stubInternalGeneratorFunctions();
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