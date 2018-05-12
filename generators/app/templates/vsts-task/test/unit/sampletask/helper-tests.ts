'use strict';

import Chai = require('chai');
import Sinon = require('sinon');
import request = require('request');

import Helper = require('../../../tasks/sampletask/helper');

const assert = Chai.assert;

/**
 * Suite of tests for Helper class defined in /src/helper.ts
 */
suite('Helper Suite -', () => {
    const sut = new Helper();

    suite('getNumTeamProjects Suite -', () => {
        let teamProjectCollectionUri;
        let accessToken;
        const sandbox: Sinon.SinonSandbox = Sinon.createSandbox();
        let getStub: Sinon.SinonStub;

        setup(() => {
            getStub = sandbox.stub(request, 'get');
        });

        teardown(() => {
            sandbox.restore();
            teamProjectCollectionUri = null;
            accessToken = null;
        });

        test('Detects missing teamProjectCollectionUri -', (done: () => void) => {
            teamProjectCollectionUri = undefined;
            accessToken = 'token';
            sut.getNumTeamProjects(teamProjectCollectionUri, accessToken).catch((err) => {
                assert.equal(err.message, 'Invalid params.');
                done();
            });
        });

        test('Detects missing accessToken -', (done: () => void) => {
            teamProjectCollectionUri = 'uri';
            accessToken = undefined;
            sut.getNumTeamProjects(teamProjectCollectionUri, accessToken).catch((err) => {
                assert.equal(err.message, 'Invalid params.');
                done();
            });
        });

        test('Handles failed request - ', (done: () => void) => {
            teamProjectCollectionUri = 'uri';
            accessToken = 'token';
            getStub.yields(null, { statusCode: 500 }, null);
            sut.getNumTeamProjects(teamProjectCollectionUri, accessToken).catch((err) => {
                assert.equal(err.message, 'Error calling API');
                assert.isTrue(getStub.called);
                done();
            });
        });

        test('Handles bad response - ', (done: () => void) => {
            teamProjectCollectionUri = 'uri';
            accessToken = 'token';
            getStub.yields(null, { statusCode: 200 }, null);
            sut.getNumTeamProjects(teamProjectCollectionUri, accessToken).catch((err) => {
                assert.equal(err.message, 'Error parsing API response');
                assert.isTrue(getStub.called);
                done();
            });
        });

        test('Gets Proper Count - ', async () => {
            teamProjectCollectionUri = 'uri';
            accessToken = 'token';

            const res = { count: 4 };
            getStub.yields(null, { statusCode: 200 }, JSON.stringify(res));
            const count = await sut.getNumTeamProjects(teamProjectCollectionUri, accessToken);
            assert.equal(count, res.count);
            assert.isTrue(getStub.called);
        });
    });
});