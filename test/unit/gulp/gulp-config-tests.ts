'use strict';

import Chai = require('chai');
import path = require('path');

import gulpConfig = require('./../../../generators/app/templates/boilerplate/gulp/gulp-config.js');

const assert = Chai.assert;

/**
 * Contains unit tests to validate the content in @link {generators/app/templates/boilerplate/gulp/gulp-config.js}
 */
suite('gulpConfig Tests:', () => {
    test('Should have correct value for packageJSON', () => {
        assert.deepEqual(gulpConfig.packageJSON, path.resolve('./package.json'));
    });

    test('Should have correct value for root', () => {
        assert.deepEqual(gulpConfig.root, './src');
    });

    test('Should have correct value for allJavascript', () => {
        const expected = [
            './**/*.js',
            '!node_modules/**'
        ];
        assert.deepEqual(gulpConfig.allJavascript, expected);
    });

    test('Should have correct value for allTranspiledJavascript', () => {
        const expected = [
            './src/**/*.js*',
            './test/**/*.js*'
        ];
        assert.deepEqual(gulpConfig.allTranspiledJavascript, expected);
    });

    test('Should have correct value for appTranspiledJavascript', () => {
        const expected = [
            './src/**/*.js'
        ];
        assert.deepEqual(gulpConfig.appTranspiledJavaScript, expected);
    });

    test('Should have correct value for javascriptUnitTests', () => {
        assert.deepEqual(gulpConfig.javascriptUnitTests, './test/unit/**/*.js');
    });

    test('Should have correct value for javascriptComponentIntegrationTests', () => {
        assert.deepEqual(gulpConfig.javascriptComponentIntegrationTests, './test/component-integration/**/*.js');
    });

    test('Should have correct value for allTypescript', () => {
        const expected = [
            './src/**/*.ts',
            './test/**/*.ts'
        ];
        assert.deepEqual(gulpConfig.allTypescript, expected);
    });

    test('Should have correct value for appTypescript', () => {
        const expected = [
            './src/**/*.ts'
        ];
        assert.deepEqual(gulpConfig.appTypescript, expected);
    });

    test('Should have correct value for typescriptCompilerOptions', () => {
        assert.deepEqual(gulpConfig.typescriptCompilerOptions, path.resolve('./tsconfig.json'));
    });
});