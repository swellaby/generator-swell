'use strict';

import Chai = require('chai');
import Sinon = require('sinon');
import request = require('request');

import Helper = require('../../../tasks/sample/helper');

const assert = Chai.assert;

/**
 * Suite of tests for Helper class defined in ./tasks/<%-taskName%>/helper.ts
 */
suite('<%= taskName %> Helper Suite:', () => {
    const sut = new Helper();

    suite('getNumTeamProjects Suite:', () => {
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

        test('Should reject with error when missing teamProjectCollectionUri', (done: () => void) => {
            teamProjectCollectionUri = undefined;
            accessToken = 'token';
            sut.getNumTeamProjects(teamProjectCollectionUri, accessToken).catch((err) => {
                assert.equal(err.message, 'Invalid params.');
                done();
            });
        });

        test('Should reject with error when missing accessToken', (done: () => void) => {
            teamProjectCollectionUri = 'uri';
            accessToken = undefined;
            sut.getNumTeamProjects(teamProjectCollectionUri, accessToken).catch((err) => {
                assert.equal(err.message, 'Invalid params.');
                done();
            });
        });

        test('Should reject with error when there is a failed request - ', (done: () => void) => {
            teamProjectCollectionUri = 'uri';
            accessToken = 'token';
            getStub.yields(null, { statusCode: 500 }, null);
            sut.getNumTeamProjects(teamProjectCollectionUri, accessToken).catch((err) => {
                assert.equal(err.message, 'Error calling API');
                assert.isTrue(getStub.called);
                done();
            });
        });

        test('Should reject with error when API call returns bad response', (done: () => void) => {
            teamProjectCollectionUri = 'uri';
            accessToken = 'token';
            getStub.yields(null, { statusCode: 200 }, null);
            sut.getNumTeamProjects(teamProjectCollectionUri, accessToken).catch((err) => {
                assert.equal(err.message, 'Error parsing API response');
                assert.isTrue(getStub.called);
                done();
            });
        });

        test('Should resolve with correct count when the API call succeeds', async () => {
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