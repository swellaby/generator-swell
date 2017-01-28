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
    let taskLibGetVariableStub: Sinon.SinonStub;
    const exampleMessageParamName = "exampleMessage";
    const aParamName = "inputA";
    const bParamName = "inputB";

    suiteSetup(() => {
        sandbox = Sinon.sandbox.create();
        taskLibGetInputStub = Sinon.stub(tl, "getInput");
        taskLibGetVariableStub = Sinon.stub(tl, "getVariable").returns("doesn't really matter");
    });

    suiteTeardown(() => {
        sandbox.restore();
    });

    test('Should fail when both numeric input params are null', function (done) {
        taskLibGetInputStub.withArgs(exampleMessageParamName).returns("test");
        taskLibGetInputStub.withArgs(aParamName).returns(null);
        taskLibGetInputStub.withArgs(bParamName).returns(null);
    });
});
