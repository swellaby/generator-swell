/*eslint quotes: ["error", "single"]*/
// Related to: https://github.com/Microsoft/TypeScript/issues/13270
'use strict';

const path = require('path');
const srcRoot = './generators/app';
const testRoot = './test';
const templatesRoot = '/templates';
const templatesRootPath = srcRoot + templatesRoot;
const notGlob = '!';
const nodeModulesRoot = 'node_modules';
const notNodeModules = notGlob + nodeModulesRoot + '/**';
const notTemplateRoot = notGlob + templatesRootPath;
const notTemplates = notTemplateRoot + '/**';
const tsconfig = './tsconfig.json';

module.exports = {
    packageJSON: path.resolve('./package.json'),
    root: srcRoot,
    templateJavascript: [
        templatesRootPath + '/**/*.js'
    ],
    allGeneratorJavascript: [
        './**/*.js',
        notNodeModules,
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
    allGeneratorTypescript: [
        srcRoot + '/**/*.ts',
        testRoot + '/**/*.ts',
        notTemplates
    ],
    appTypescript: [
        srcRoot + '/**/*.ts',
        notTemplates
    ],
    templateTypescript: [
        templatesRootPath + '/**/*.ts'
    ],
    typescriptCompilerOptions: path.resolve(tsconfig)
};