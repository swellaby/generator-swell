'use strict';

var path = require('path');
var srcRoot = './generators/app';
var testRoot = './test';
var notTemplates = '!' + srcRoot + '/templates/**';
var typescriptDefinitions = './node_modules/@types/*/index.d.ts';
var tsconfig = './tsconfig.json';

module.exports = {
    packageJSON: path.resolve('package.json'),
    root: srcRoot,
    allJavascript: [
        './**/*.js',
        '!node_modules/**',
        notTemplates
    ],
    allTranspiledJavascript: [
        srcRoot + '/**/*.js*',
        testRoot + '/**/*.js*',
        notTemplates     
    ],
    appTranspiledJavaScript: [
        srcRoot + '/**/*.js',
        notTemplates              
    ],
    javascriptUnitTests: testRoot + '/unit/**/*.js',
    javascriptComponentIntegrationTests: testRoot + '/component-integration/**/*.js',
    allTypescript: [
        srcRoot + '/**/*.ts',
        testRoot + '/**/*.ts',
        typescriptDefinitions,
        notTemplates
    ],
    appTypescript: [
        srcRoot + '/**/*.ts',
        notTemplates
    ],
    typescriptCompilerOptions: tsconfig
};
