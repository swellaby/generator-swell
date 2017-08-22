'use strict';

const path = require('path');
const srcRoot = './src';
const testRoot = './test';
const tsconfig = './tsconfig.json';

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
    ],
    appTypescript: [
        srcRoot + '/**/*.ts',
    ],
    typescriptCompilerOptions: tsconfig
};
