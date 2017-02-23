'use strict';

var path = require('path');
var srcRoot = './generators/app';
var outputRoot = './out';
var testRoot = './test';
var notTemplates = '!' + srcRoot + '/templates/**';
var typescriptDefinitions = './node_modules/@types/*/index.d.ts';
var tsconfig = './tsconfig.json';

module.exports = {
    packageJSON: path.resolve('package.json'),
    root: srcRoot,
    output: outputRoot,
    appOutput: outputRoot + srcRoot,
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
    allTypescript: [
        srcRoot + '/**/*.ts',
        testRoot + '/**/*-tests.ts',
        typescriptDefinitions,
        notTemplates
    ],
    appTypescript: [
        srcRoot + '/**/*.ts',
        testRoot + '/**/*-tests.ts',
        notTemplates
    ],
    typescriptCompilerOptions: tsconfig
};
