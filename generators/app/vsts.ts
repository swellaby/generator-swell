'use strict';

import extend = require('deep-extend');
import path = require('path');
import yeoman = require('yeoman-generator');
import uuid = require('uuid');
import yosay = require('yosay');

// let vstsRoot: string;

/**
 * Creates the context needed for scaffolding the VSTS Task.
 *
 * @param extensionConfig
 */
// tslint:disable-next-line:no-any
const buildVSTSContext = (extensionConfig: any): any => {
    const context = extensionConfig;
    context.dot = true;
    // need to figure out the best way to pump these values in from the secondary prompts
    context.taskId = uuid.v4();
    context.author = 'me'; // this can be moved to the core generator
    context.category = 'Utility'; // from new prompt

    return context;
};

/**
 *
 * @param context
 */
// tslint:disable-next-line:no-any
const scaffoldSharedVSTSContent = (generator: yeoman, templateRoot: string, context: any) => {
    generator.sourceRoot(path.join(templateRoot, 'vsts-common'));
    generator.fs.copyTpl(generator.sourceRoot() + '/**/*', generator.destinationRoot(), context);
}

/**
 * Scaffolds the VSTS Task project type
 *
 * @param generator
 */
// tslint:disable-next-line:no-any
export const scaffoldVSTSTask = (generator: yeoman, templateRoot: string, extensionConfig: any) => {
    generator.log(yosay('A new task to make a great platform even better'));
    const context = buildVSTSContext(extensionConfig);
    scaffoldSharedVSTSContent(generator, templateRoot, context);

    generator.sourceRoot(path.join(templateRoot, 'vsts-task'));
    generator.fs.copyTpl(generator.sourceRoot() + '/**/*', generator.destinationRoot(), context);

    const pkg = generator.fs.readJSON(path.join(generator.destinationRoot(), 'package.json'), {});
    extend(pkg, {
        dependencies: {
            'request': '^2.79.0',
            'vsts-task-lib': '^1.1.0'
        },
        devDependencies: {
            '@types/request': '^0.0.36'
        }
    });

    generator.fs.writeJSON(path.join(generator.destinationRoot(), 'package.json'), pkg);
};