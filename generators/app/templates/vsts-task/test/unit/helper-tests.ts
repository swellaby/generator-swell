'use strict';

/* tslint:disable:no-single-line-block-comment ESLint needs single line block comments */
/* eslint-disable max-statements */

// This is a temporary fix due to the way the TypeScript compiler currently functions
// it converts single quotes to double quotes on import/require statements.
/* eslint-disable quotes */
import Chai = require('chai');
import Sinon = require('sinon');
import request = require('request');

import Helper = require('../../src/helper');
/* eslint-enable quotes */

/* tslint:enable:no-single-line-block-comment -- Leave this line*/

const assert = Chai.assert;

/**
 * Suite of tests for Helper class defined in /src/helper.ts
 */
suite('Helper Suite -', () => {
    const sut = new Helper();

    suite('Add Suite -', () => {
        let x;
        let y;

        suiteTeardown(() => {
            x = null;
            y = null;
        });

        test('Add Valid Entry -', (done: () => void) => {
            x = 1;
            y = 2;
            sut.add(x, y).then((result) => {
                assert.equal(result, x + y);
                done();
            });
        });

        test('Detects invalid Entry -', (done: () => void) => {
            x = 1;
            y = undefined;
            sut.add(x, y).catch((err) => {
                console.log(err.message);
                assert.equal(err.message, 'Invalid params.');
                done();
            });
        });
    });

    suite('getNumTeamProjects Suite -', () => {
        let teamProjectCollectionUri;
        let accessToken;
        let sandbox: Sinon.SinonSandbox;
        let getStub: Sinon.SinonStub;

        suiteSetup(() => {
            sandbox = Sinon.sandbox.create();
            getStub = Sinon.stub(request, 'get');
        });

        suiteTeardown(() => {
            teamProjectCollectionUri = null;
            accessToken = null;
            sandbox.restore();
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

        test('Gets Proper Count - ', (done: () => void) => {
            teamProjectCollectionUri = 'uri';
            accessToken = 'token';
            // Ths should be better fake data
            const res = { count: 4 };
            getStub.yields(null, { statusCode: 200 }, JSON.stringify(res));
            sut.getNumTeamProjects(teamProjectCollectionUri, accessToken).then((count) => {
                assert.equal(count, res.count);
                assert.isTrue(getStub.called);
                done();
            });
        });
    });
});