'use strict';

import Chai = require('chai');
import semver = require('semver');
import Sinon = require('sinon');
import FeatureFlagManager = require('../../generators/feature-flag-manager');

const packageJson = require('../../package.json');
const version = packageJson.version;
const assert = Chai.assert;

/**
 * Contains unit tests for the feature flag functions defined in ./generators/feature-flag-manager.ts
 */
suite('FeatureFlagManager Suite:', () => {
    let semverGteStub: Sinon.SinonStub;

    setup(() => {
        semverGteStub = Sinon.stub(semver, 'gte').callsFake(() => false);
    });

    teardown(() => {
        Sinon.restore();
    });

    suite('is2xFlagEnabled Suite:', () => {
        test('Should compare against 2.x.x version', () => {
            FeatureFlagManager.is2xFlagEnabled();
            assert.isTrue(semverGteStub.calledWith(version, '2.x.x'));
        });

        test('Should return false when the major version is 1', () => {
            packageJson.version = '1.4.6';
            assert.isFalse(FeatureFlagManager.is2xFlagEnabled());
        });

        test('Should return false when the major version is 0', () => {
            packageJson.version = '0.9.9';
            assert.isFalse(FeatureFlagManager.is2xFlagEnabled());
        });

        test('Should return true when the major version is 2', () => {
            packageJson.version = '2.0.0';
            semverGteStub.callsFake(() => true);
            assert.isTrue(FeatureFlagManager.is2xFlagEnabled());
        });

        test('Should return true when the major version is greater than 2', () => {
            packageJson.version = '3.1.2';
            semverGteStub.callsFake(() => true);
            assert.isTrue(FeatureFlagManager.is2xFlagEnabled());
        });
    });

    suite('isAngularProjectTypeEnabled Suite:', () => {
        test('Should return false when the major version is 1', () => {
            packageJson.version = '1.4.6';
            assert.isFalse(FeatureFlagManager.isAngularProjectTypeEnabled());
        });

        test('Should return false when the major version is 0', () => {
            packageJson.version = '0.9.9';
            assert.isFalse(FeatureFlagManager.isAngularProjectTypeEnabled());
        });

        test('Should return false when the major version is 2', () => {
            packageJson.version = '2.0.0';
            semverGteStub.callsFake(() => true);
            assert.isFalse(FeatureFlagManager.isAngularProjectTypeEnabled());
        });

        test('Should return false when the major version is greater than 2', () => {
            packageJson.version = '3.1.2';
            semverGteStub.callsFake(() => true);
            assert.isFalse(FeatureFlagManager.isAngularProjectTypeEnabled());
        });
    });

    suite('isCliProjectTypeEnabled Suite:', () => {
        test('Should return true', () => {
            assert.isTrue(FeatureFlagManager.isCliProjectTypeEnabled());
        });
    });

    suite('isOptionalGulpEnabled Suite:', () => {
        test('Should return false when the major version is 1', () => {
            packageJson.version = '1.4.6';
            assert.isFalse(FeatureFlagManager.isOptionalGulpEnabled());
        });

        test('Should return false when the major version is 0', () => {
            packageJson.version = '0.9.9';
            assert.isFalse(FeatureFlagManager.isOptionalGulpEnabled());
        });

        test('Should return false when the major version is 2', () => {
            packageJson.version = '2.0.0';
            semverGteStub.callsFake(() => true);
            assert.isFalse(FeatureFlagManager.isOptionalGulpEnabled());
        });

        test('Should return false when the major version is greater than 2', () => {
            packageJson.version = '3.1.2';
            semverGteStub.callsFake(() => true);
            assert.isFalse(FeatureFlagManager.isOptionalGulpEnabled());
        });
    });
});