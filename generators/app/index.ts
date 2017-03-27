/* tslint:disable:function-name */
'use strict';

import extend = require('deep-extend');
import fs = require('fs');
import glob = require('glob');
import path = require('path');
import mkdirp = require('mkdirp');
import uuid = require('uuid');
import yosay = require('yosay');
import yeoman = require('yeoman-generator');

import chatbot = require('./chatbot');
import inputConfig = require('./input-config');
import pathHelpers = require('./path-helpers');
import vsts = require('./vsts');

/**
 * The Swellaby Generator Class
 *
 * @class SwellabyGenerator
 * @extends {yeoman}
 */
class SwellabyGenerator extends yeoman {
    // tslint:disable-next-line:no-any
    public extensionConfig: any;

    constructor(args: string | string[], options: {}) {
        super(args, options);
    }

    /**
     *
     *
     *
     * @memberOf SwellabyGenerator
     */
    public initializing() {
        this.log(yosay('Welcome to the Swellaby Generator!'));
    }

    /**
     *
     *
     * @returns
     *
     * @memberOf SwellabyGenerator
     */
    public prompting() {
        // tslint:disable-next-line:no-any
        return this.prompt(inputConfig.prompts).then((extensionConfig: any) => {
            this.extensionConfig = extensionConfig;
        });
    }

    /**
     *
     *
     *
     * @memberOf SwellabyGenerator
     */
    // tslint:disable-next-line:max-func-body-length
    public writing() {
        this._writingBoilerplate();
        const extensionType = this.extensionConfig.type;

        if (this.extensionConfig.vscode) {
            this._writingVsCode();
        }

        switch (extensionType) {
            case inputConfig.boilerplatePromptValue:
                this.log(yosay('Just the basic boilerplate'));
                break;

            case inputConfig.cliPromptValue:
                this._writingCli();
                break;

            case inputConfig.expressApiPromptValue:
                this._writingExpress();
                break;

            case inputConfig.vstsTaskPromptValue:
                vsts.scaffoldVSTSTaskProject(this, this.extensionConfig);
                break;

            case inputConfig.chatbotPromptValue:
                chatbot.scaffoldChatbotProject(this, this.extensionConfig);
                break;
        }
    }

    /**
     *
     *
     *
     * @memberOf SwellabyGenerator
     */
    public install() {
        const installDependencies = this.extensionConfig.installDependencies;

        if (installDependencies === true) {
            this.log('Installing dependencies');
            this.npmInstall();
        } else {
            this.log('You said you wanted to install dependencies yourself, so don\'t forget!');
        }
    }

    /**
     *
     *
     * @private
     *
     * @memberOf SwellabyGenerator
     */
    private _validateDirectoryName() {
        const appName = this.extensionConfig.appName;

        if (path.basename(this.destinationPath()) !== appName) {
            this.log('Your generator must be inside a directory with the same name as your extension name \'' + appName + '\'\n' +
                'I\'ll automatically create this directory for you.');

            mkdirp(appName, null);
            this.destinationRoot(this.destinationPath(appName));
        }
    }

    /**
     *
     *
     * @private
     *
     * @memberOf SwellabyGenerator
     */
    private _validateGitRepository() {
        try {
            const gitPath = path.join(path.resolve(this.destinationRoot()), '.git');

            if (fs.statSync(gitPath).isFile()) {
                this.log('Are you being mischievous? You have a file in the target directory named \'.git\' with' +
                    'the same name as the directory git uses. I am deleting this because it will cause errors and you' +
                    'absolutely do not need it. :)');
                fs.unlinkSync(gitPath);

                this._initGitRepo();
            }
        } catch (err) {
            // fs.statSync will throw an exception when the directory does not exist so need to init
            this._initGitRepo();
        }
    }

    /**
     *
     *
     * @private
     *
     * @memberOf SwellabyGenerator
     */
    private _initGitRepo() {
        this.log('I see that you don\'t have a git repo in the target directory. I\'ll initialize it for you now, and then you can add' +
            ' your remote later on via a \'git remote add origin << insert your remote url - like https://github.com/me/my-repo.git >>\'');
        this.spawnCommandSync('git', ['init', '--quiet']);
    }

    /**
     *
     *
     * @private
     *
     * @memberOf SwellabyGenerator
     */
    private _writingBoilerplate() {
        this._validateDirectoryName();
        this._validateGitRepository();
        this.sourceRoot(pathHelpers.boilerplateRoot);
        const context = this.extensionConfig;
        context.dot = true;
        this.fs.copyTpl(this.sourceRoot() + '/**/*', this.destinationRoot(), context);
        const destRoot = path.resolve(this.destinationRoot());
        this.fs.move(path.join(destRoot, 'gitignore'), path.join(destRoot, '.gitignore'));
        this.fs.move(path.join(destRoot, 'npmignore'), path.join(destRoot, '.npmignore'));
        this.fs.move(path.join(destRoot, 'eslintignore'), path.join(destRoot, '.eslintignore'));
        this.fs.move(path.join(destRoot, 'eslintrc.js'), path.join(destRoot, '.eslintrc.js'));
    }

    /**
     *
     *
     * @private
     *
     * @memberOf SwellabyGenerator
     */
    private _writingVsCode() {
        this.sourceRoot(pathHelpers.vscodeRoot);
        const context = this.extensionConfig;
        context.dot = true;
        this.fs.copyTpl(this.sourceRoot() + '/**/*', this.destinationRoot() + '/.vscode', context);

        const launch = this.fs.readJSON(path.join(this.destinationRoot(), '.vscode/launch.json'), {});
        if (context.type === inputConfig.chatbotPromptValue) {
            launch.configurations[0].program = '${workspaceRoot}/src/server.ts';
        } else if (context.type === inputConfig.expressApiPromptValue) {
            launch.configurations[0].program = '${workspaceRoot}/src/app.ts';
        }
        this.fs.writeJSON(path.join(this.destinationRoot(), '.vscode/launch.json'), launch);
    }

    /**
     *
     *
     * @private
     *
     * @memberOf SwellabyGenerator
     */
    private _writingCli() {
        this.log(yosay('New CLI coming'));
    }

    /**
     *
     *
     * @private
     *
     * @memberOf SwellabyGenerator
     */
    private _writingExpress() {
        this.log(yosay('Super API underway'));
        this.sourceRoot(pathHelpers.expressRoot);
        const context = this._buildExpressContext();

        this.fs.copyTpl(this.sourceRoot() + '/**/*', this.destinationRoot(), context);

        const pkg = this.fs.readJSON(path.join(this.destinationRoot(), 'package.json'), {});
        extend(pkg, {
            scripts: {
                'docker-build': 'bash build.sh',
                'start': 'node src/app.js'
            },
            dependencies: {
                'express': '^4.14.0'
            },
            devDependencies: {
                '@types/express': '^4.0.34'
            }
        });

        this.fs.writeJSON(path.join(this.destinationRoot(), 'package.json'), pkg);
        this.fs.move(path.join(this.destinationRoot(), 'dockerignore'), path.join(this.destinationRoot(), '.dockerignore'));
    }

    /**
     *
     *
     * @private
     * @returns
     *
     * @memberOf SwellabyGenerator
     */
    private _buildExpressContext() {
        const context = this.extensionConfig;
        context.dot = true;
        context.author = 'me';

        return context;
    }
}

export = SwellabyGenerator;