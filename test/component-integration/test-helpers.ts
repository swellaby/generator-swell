'use strict';

import path = require('path');

export const generatorRoot = path.join(__dirname, './../../generators/app');

export const boilerplateFiles = [
    '.eslintignore',
    '.gitignore',
    '.eslintrc.js',
    'gulpfile.js',
    'package.json',
    'README.md',
    'tsconfig.json',
    'tslint.json',
    './build/gulp-config.js',
    './build/istanbul-config.js',
    './build/mocha-config.js',
    './build/tasks/build.js',
    './build/tasks/build.js',
    './build/tasks/clean.js',
    './build/tasks/lint.js',
    './build/tasks/test.js'
];