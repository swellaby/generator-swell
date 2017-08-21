/*eslint quotes: ["error", "single"]*/
// Related to: https://github.com/Microsoft/TypeScript/issues/13270
'use strict';

const path = require('path');
const srcRoot = './generators/app';
const testRoot = './test';
const notTemplates = '!' + srcRoot + '/templates/**';
const tsconfig = './tsconfig.json';

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
        notTemplates
    ],
    appTypescript: [
        srcRoot + '/**/*.ts',
        notTemplates
    ],
    typescriptCompilerOptions: tsconfig
};
