'use strict';

import YeomanGenerator = require('yeoman-generator');
import yosay = require('yosay');

/**
 * Scaffolds the CLI project type
 *
 * @param {YeomanGenerator} generator - The yeoman generator.
 * @param {JSON} extensionConfig - The configuration specified for generation.
 */
// tslint:disable-next-line:no-any
export const scaffoldCliProject = (generator: YeomanGenerator, extensionConfig: any) => {
    if (!generator || !extensionConfig) {
        console.error('Oh no! Encountered an unexpected error while trying to create a new CLI ' +
            'project :( The CLI files were not added to the project.');
        return;
    }

    generator.log(yosay('New CLI coming... but not yet. The CLI Project is not yet supported'));
}