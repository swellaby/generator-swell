'use strict';

var path = require('path'); 
var srcRoot = './generators';
var testRoot = './test';

module.exports = {
    packageJSON: path.resolve('package.json'),
    root: srcRoot,
    allJavascript: [
        '**/*.js',
        '!node_modules/**'
    ],
    allSrcJavascript: [
        srcRoot + '/**/*.js'
    ],
    srcJavascript: [
        srcRoot + '/**/*.js',
        '!' + srcRoot + '/**/templates/**/*.js'
    ],
    appJavascript: [
        srcRoot + '/**/*.js',
        testRoot + '/**/*-tests.js'
    ],
    javascriptUnitTests: [
        testRoot + '/**/*-tests.js'
    ]
};
