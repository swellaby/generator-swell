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
        '!node_modules/**'
    ],
    allTranspiledJavascript: [
        srcRoot + '/**/*.js*',
        testRoot + '/**/*.js*'
    ],
    appTranspiledJavaScript: srcRoot + '/**/*.js',
    javascriptUnitTests: testRoot + '/unit/**/*.js',
    allTypescript: [
        srcRoot + '/**/*.ts',
        testRoot + '/**/*-tests.ts',
        typescriptDefinitions       
    ],
    appTypescript: [
        srcRoot + '/**/*.ts',
        testRoot + '/**/*-tests.ts',
    ],
    typescriptCompilerOptions: tsconfig
};
