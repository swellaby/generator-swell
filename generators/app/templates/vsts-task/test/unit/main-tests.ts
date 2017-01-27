'use strict';

import Chai = require('chai');
import Sinon = require('sinon');
import tl = require('vsts-task-lib/task');

import Helper = require('../../src/helper');
import main = require('../../src/main');

const assert = Chai.assert;

suite('Main Suite: ', () => {
    let sandbox: Sinon.SinonSandbox;
    let taskLibGetInputStub: Sinon.SinonStub;

    suiteSetup(() => {
        sandbox = Sinon.sandbox.create();
        taskLibGetInputStub = Sinon.stub(tl, 'getInput');
    });

    suiteTeardown(() => {
        sandbox.restore();
    });
});
