'use strict';

const path = require('path');
const taskSrcRoot = './tasks';
const testRoot = './test';
const tsconfig = './tsconfig.json';
const vstsPublishRoot = './.vsts-publish';
const vstsPublishTasksRoot = vstsPublishRoot + '/tasks';
const vstsPublishImageRoot = vstsPublishRoot + '/images';
const vssExtensionManifest = './vss-extension.json';
const taskManifestFiles = taskSrcRoot + '/**/task.json';

module.exports = {
    packageJSON: path.resolve('package.json'),
    root: taskSrcRoot,
    vstsPublishRoot: vstsPublishRoot,
    vstsPublishTasksRoot: vstsPublishTasksRoot,
    vstsTaskContent: [
        taskManifestFiles,
        taskSrcRoot + '/**/icon.png',
        taskSrcRoot + '/**/*.js',
    ],
    vstsExtensionManifest: vssExtensionManifest,
    vstsTaskManifestFiles: taskManifestFiles,
    vstsExtensionContent: [
        vssExtensionManifest,
        './README.md',
        './EXTENSION.md'
    ],
    vstsExtensionImages: [
        './extension-icon.png'
    ],
    vstsPublishImageRoot: vstsPublishImageRoot,
    allJavascript: [
        './**/*.js',
        '!node_modules/**',
    ],
    allTranspiledJavascript: [
        taskSrcRoot + '/**/*.js*',
        testRoot + '/**/*.js*',
        '!' + taskSrcRoot + '/**/*task-wrapper.js',
        '!' + taskSrcRoot + '/**/*task.json'
    ],
    appTranspiledJavaScript: [
        taskSrcRoot + '/**/*.js',
        '!' + taskSrcRoot + '/**/*task-wrapper.js',
        '!' + taskSrcRoot + '/**/*task.json'
    ],
    javascriptUnitTests: testRoot + '/unit/**/*.js',
    javascriptComponentIntegrationTests: testRoot + '/component-integration/**/*.js',
    allTypescript: [
        taskSrcRoot + '/**/*.ts',
        testRoot + '/**/*.ts',
    ],
    appTypescript: [
        taskSrcRoot + '/**/*.ts',
    ],
    typescriptCompilerOptions: tsconfig
};
