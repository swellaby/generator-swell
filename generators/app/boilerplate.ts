'use strict';

import path = require('path');
import YeomanGenerator = require('yeoman-generator');

import pathHelpers = require('./path-helpers');

/**
 * Scaffolds the Boilerplate content
 *
 * @param {YeomanGenerator} generator - The yeoman generator.
 * @param {JSON} extensionConfig - The configuration specified for generation.
 */
// tslint:disable-next-line:no-any
export const scaffoldBoilerplateContent = (generator: YeomanGenerator, extensionConfig: any) => {
    if (!generator || !extensionConfig) {
        console.error('Oh no! Encountered an unexpected error while trying to scaffold the ' +
            'boilerplate content :( The boilerplate files were not added to the project.');
        return;
    }

    generator.sourceRoot(pathHelpers.boilerplateRoot);
    const context = extensionConfig;
    context.dot = true;
    generator.fs.copyTpl(generator.sourceRoot() + '/**/*', generator.destinationRoot(), context);
    const destRoot = path.resolve(generator.destinationRoot());
    generator.fs.move(path.join(destRoot, 'gitignore'), path.join(destRoot, '.gitignore'));
    generator.fs.move(path.join(destRoot, 'npmignore'), path.join(destRoot, '.npmignore'));
    generator.fs.move(path.join(destRoot, 'eslintignore'), path.join(destRoot, '.eslintignore'));
    generator.fs.move(path.join(destRoot, 'eslintrc.js'), path.join(destRoot, '.eslintrc.js'));
}