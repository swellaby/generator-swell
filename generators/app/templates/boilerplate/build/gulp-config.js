'use strict';

var srcRoot = './src';
var outputRoot = './out';
var testRoot = './test';
var typescriptDefinitions = './typings/index.d.ts';
var tsconfig = './tsconfig.json';

module.exports = {
    root: srcRoot,
    output: outputRoot,
    appOutput: outputRoot + srcRoot,
    allJavascript: [
        '**/*.js',
        '!node_modules/**'
    ],
    allTranspiledJavascript: [
        srcRoot + '**/*.js*',
        testRoot + '**/*.js*'
    ],
    appTranspiledJavaScript: srcRoot + '**/*.js*',
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
