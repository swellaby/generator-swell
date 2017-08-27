/*eslint quotes: ["error", "single"]*/
// Related to: https://github.com/Microsoft/TypeScript/issues/13270'
'use strict';

const path = require('path');
const srcRoot = './src';
const vstsPublishRoot = './.vsts-publish';
const testRoot = './test';
const tsconfig = './tsconfig.json';

module.exports = {
    packageJSON: path.resolve('package.json'),
    root: srcRoot,
    vstsPublishRoot: vstsPublishRoot,
    vstsPublishSrc: vstsPublishRoot + '/src',
    vstsTaskContent: [
        './task.json',
        './package.json',
        './icon.png'
    ],
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