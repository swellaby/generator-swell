'use strict';

import path = require('path');
import YeomanGenerator = require('yeoman-generator');
import yosay = require('yosay');

import pathHelpers = require('./path-helpers');

/**
 * Creates the context needed for scaffolding the Express API project.
 *
 * @param {JSON} extensionConfig - The configuration specified for generation.
 */
// tslint:disable-next-line:no-any
const buildExpressContext = (extensionConfig: any): any => {
    const context = extensionConfig;
    context.dot = true;

    return context;
};

/**
 * Scaffolds the Express API project type
 *
 * @param {YeomanGenerator} generator - The yeoman generator.
 * @param {JSON} extensionConfig - The configuration specified for generation.
 */
// tslint:disable-next-line:no-any
export const scaffoldExpressApiProject = (generator: YeomanGenerator, extensionConfig: any) => {
    if (!generator || !extensionConfig) {
        console.error('Oh no! Encountered an unexpected error while trying to create a new Express ' +
            'API project :( The Express API files were not added to the project.');
        return;
    }

    generator.log(yosay('Super API underway'));
    generator.sourceRoot(pathHelpers.expressRoot);
    const context = buildExpressContext(extensionConfig);

    generator.fs.copyTpl(generator.sourceRoot() + '/**/*', generator.destinationRoot(), context);
    generator.fs.move(path.join(generator.destinationRoot(), 'dockerignore'), path.join(generator.destinationRoot(), '.dockerignore'));

    generator.fs.extendJSON(path.join(generator.destinationRoot(), 'package.json'), {
            scripts: {
                'docker-build': 'bash build.sh',
                'start': 'node src/app.js'
            },
            dependencies: {
                'express': '^4.15.2'
            },
            devDependencies: {
                '@types/express': '^4.0.35'
            }
        }
    );
}