'use strict';

var extend = require('deep-extend');
var glob = require('glob');
var path = require('path');
var mkdirp = require('mkdirp');
var uuid = require('uuid');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');

var inputConfig = require('./input-config');

var templateRoot = path.join(__dirname, 'templates');
var boilerplateRoot = path.join(templateRoot, 'boilerplate');
var vstsCommonRoot = path.join(templateRoot, 'vsts-common');
var vstsRoot = path.join(templateRoot, 'vsts-task');
var expressRoot = path.join(templateRoot, 'express-api');

module.exports = yeoman.Base.extend({
    initializing: function () {
        this.log(yosay('Welcome to the Swellaby Generator!'));
    },

    prompting: function () {
        return this.prompt(inputConfig.prompts).then(function (extensionConfig) {
            this.extensionConfig = extensionConfig;
        }.bind(this));
    },

    default: function () {
        var appName = this.extensionConfig.appName;

        if (path.basename(this.destinationPath()) !== appName) {
            this.log('Your generator must be inside a directory with the same name as your extension name \'' + appName + '\'\n' +
                'I\'ll automatically create this directory for you.');

            mkdirp(appName);
            this.destinationRoot(this.destinationPath(appName));
        }
    },

    writing: function () {
        this._writingBoilerplate();
        var extensionType = this.extensionConfig.type;

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
                this._writingVSTSTask();
                break;

        }
    },

    _writingBoilerplate: function () {
        this.sourceRoot(boilerplateRoot);
        var context = this.extensionConfig;
        context.dot = true;
        this.fs.copyTpl(glob.sync(this.sourceRoot() + '/**/*', { dot: true }), this.destinationRoot(), context);
    },

    _writingCli: function () {
        this.log(yosay('New CLI coming'));
    },

    _writingExpress: function () {
        this.log(yosay('Super API underway'));
        this.sourceRoot(expressRoot);
        var context = this._buildExpressContext();

        this.fs.copyTpl(glob.sync(this.sourceRoot() + '/**/*', { dot: true }), this.destinationRoot(), context);

        var pkg = this.fs.readJSON(path.join(this.destinationRoot(), 'package.json'), {});
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
    },

    _writingVSTSTask: function () {
        this.log(yosay('A new task to make a great platform even better'));
        this._writeSharedVSTSContent();
        this.sourceRoot(vstsRoot);
        var context = this._buildVSTSContext();

        this.fs.copyTpl(glob.sync(this.sourceRoot() + '/**/*', { dot: true }), this.destinationRoot(), context);

        var pkg = this.fs.readJSON(path.join(this.destinationRoot(), 'package.json'), {});
        extend(pkg, {
            dependencies: {
                'request': '^2.79.0',
                'vsts-task-lib': '^1.1.0'
            },
            devDependencies: {
                '@types/request': '^0.0.36',
            }
        });

        this.fs.writeJSON(path.join(this.destinationRoot(), 'package.json'), pkg);
    },

    _writeSharedVSTSContent: function () {
        this.sourceRoot(vstsCommonRoot);
        this.fs.copyTpl(glob.sync(this.sourceRoot() + '/**/*', { dot: true }), this.destinationRoot(), this.extensionConfig);
    },

    _buildVSTSContext: function () {
        var context = this.extensionConfig;
        context.dot = true;
        // need to figure out the best way to pump these values in from the secondary prompts
        context.taskId = uuid.v4(); // new guid
        context.author = 'me'; // this can be moved to the core generator
        context.category = 'Utility'; // from new prompt

        return context;
    },

    _buildExpressContext: function () {
        //Copied from above
        var context = this.extensionConfig;
        context.dot = true;
        // need to figure out the best way to pump these values in from the secondary prompts
        context.taskId = 'foo'; // new guid
        context.author = 'me'; // this can be moved to the core generator
        context.category = 'Utility'; // from new prompt

        return context;
    },

    install: function () {
        var installDependencies = this.extensionConfig.installDependencies;

        if (installDependencies === true) {
            this.log('Installing dependencies');
            this.npmInstall();
        } else {
            this.log('You said you wanted to install dependencies yourself, so don\'t forget!');
        }
    }
});