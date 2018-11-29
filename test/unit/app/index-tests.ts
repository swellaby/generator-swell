'use strict';

// tslint:disable:no-var-requires
import Chai = require('chai');
const fileEditor = require('mem-fs-editor');
import path = require('path');
import Sinon = require('sinon');
const yeomanEnvironment = require('yeoman-environment');
const yeomanGenerator = require('yeoman-generator');

import Index = require('././../../../generators/app/index');
import SwellabyGenerator = require('./../../../generators/app/swellaby-generator');

const assert = Chai.assert;

/**
 * Contains unit tests for the main generator defined in index.ts
 */
suite('Index Tests:', () => {
    let index: Index;
    let swellabyGeneratorCreateProjectStub: Sinon.SinonStub;
    const cwd = '/foo/bar/roo';
    const options = {
        env: {
            adapter: {
                log: () => ''
            },
            runLoop: true,
            sharedFs: true
        },
        cwd: cwd,
        resolved: 'foo'
    };

    /**
     * Helper function for stubbing internal Yo Generator functions in order
     * to take control of execution flow.
     */
    const stubInternalGeneratorFunctions = () => {
        Sinon.stub(Object, 'assign').callsFake(() => {
            return options;
        });
        Sinon.stub(yeomanEnvironment, 'enforceUpdate');
        Sinon.stub(fileEditor, 'create');
        Sinon.stub(yeomanGenerator.prototype, 'option');
        Sinon.stub(yeomanGenerator.prototype, '_getStorage');
        Sinon.stub(yeomanGenerator.prototype, '_getGlobalStorage');
        Sinon.stub(yeomanGenerator.prototype, 'determineAppname');
        Sinon.stub(yeomanGenerator.prototype, 'sourceRoot');
    };

    setup(() => {
        stubInternalGeneratorFunctions();
        Sinon.stub(path, 'join');
        Sinon.stub(path, 'dirname');
        const dirRoot = <path.ParsedPath>{ root: undefined };
        Sinon.stub(path, 'parse').callsFake(() => dirRoot);
        swellabyGeneratorCreateProjectStub = Sinon.stub(SwellabyGenerator.prototype, 'createProject');
    });

    teardown(() => {
        Sinon.restore();
    });

    test('Should invoke the createProject method defined by the SwellabyGenerator', async () => {
        index = new Index([], options);
        await index.execute();
        assert.isTrue(swellabyGeneratorCreateProjectStub.called);
    });
});