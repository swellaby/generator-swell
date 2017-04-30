'use strict';

var path = require('path');
var srcRoot = './src';
var testRoot = './test';
var typescriptDefinitions = './node_modules/@types/*/index.d.ts';
var tsconfig = './tsconfig.json';

module.exports = {
    packageJSON: path.resolve('package.json'),
    root: srcRoot,
    allJavascript: [
        './**/*.js',
        '!node_modules/**',
    ],
    allTranspiledJavascript: [
        srcRoot + '/**/*.js*',
        testRoot + '/**/*.js*',
    ],
    appTranspiledJavaScript: [
        srcRoot + '/**/*.js',          
    ],
    javascriptUnitTests: testRoot + '/unit/**/*.js',
    javascriptComponentIntegrationTests: testRoot + '/component-integration/**/*.js',
    allTypescript: [
        srcRoot + '/**/*.ts',
        testRoot + '/**/*.ts',
        typescriptDefinitions,
    ],
    appTypescript: [
        srcRoot + '/**/*.ts',
    ],
    typescriptCompilerOptions: tsconfig
};
