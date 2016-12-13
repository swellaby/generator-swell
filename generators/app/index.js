'use strict';

// var chalk = require('chalk');
var extend = require('deep-extend');
var glob = require('glob');
var path = require('path');
var mkdirp = require('mkdirp');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');

var inputConfig = require('./input-config');

var templateRoot = path.join(__dirname, 'templates');
var boilerplateRoot = path.join(templateRoot, 'boilerplate');
var vstsRoot = path.join(templateRoot, 'vsts-task');

module.exports = yeoman.Base.extend({
    initializing: function() {
        this.log(yosay('Welcome to the Swellaby Node TypeScript Generator!'));
    },

    prompting: function() {
        return this.prompt(inputConfig.prompts).then(function(extensionConfig) {
            this.extensionConfig = extensionConfig;
        }.bind(this));
    },

    default: function() {
        var appName = this.extensionConfig.appName;

        if (path.basename(this.destinationPath()) !== appName) {
            this.log('Your generator must be inside a directory with the same name as your extension name \'' + appName + '\'\n' + 
            'I\'ll automatically create this directory for you.');

            mkdirp(appName);
            this.destinationRoot(this.destinationPath(appName));            
        }
    },

    writing: function() {
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

    _writingBoilerplate: function() {
        this.sourceRoot(boilerplateRoot);
        // this.sourceRoot = 
        // var pkg = this.fs.readJSON(this.sourceRoot('package.json'), {});
        // extend(pkg, {
        //     name: '<%- JSON.stringify(name) %>'
        // });

        // this.fs.writeJSON(this.sourceRoot('package.json'));

        var context = this.extensionConfig;
        context.dot = true;
        this.fs.copyTpl(glob.sync(this.sourceRoot() + '/**/*', { dot: true }), this.destinationRoot(), context);
    },

    _writingCli: function() {
        this.log(yosay('New CLI coming'));
    },

    _writingExpress: function() {
        this.log(yosay('Super API underway'));
    },

    _writingVSTSTask: function() {
        this.log(yosay('A new task to make a great platform even better'));
        this.sourceRoot(vstsRoot);
        var context = this._buildVSTSContext();     

        this.fs.copyTpl(glob.sync(this.sourceRoot() + '/**/*', { dot: true }), this.destinationRoot(), context);

        // this.npmInstall(['vsts-task-lib q request'], { 'save': true});
        
        var pkg = this.fs.readJSON(path.join(this.destinationRoot(), 'package.json'), {});
        extend(pkg, {
            dependencies: {
                'q': '^1.4.1',
                'request': '2.73.0',
                'vsts-task-lib': '^1.1.0'
            },
            devDependencies: {
                '@types/q': '0.0.32',
                '@types/request': '0.0.34',
            }
        });

        this.fs.writeJSON(path.join(this.destinationRoot(), 'package.json'), pkg);
    },

    _buildVSTSContext: function() {
        var context = this.extensionConfig;
        context.dot = true;
        // need to figure out the best way to pump these values in from the secondary prompts
        context.taskId = 'foo'; // new guid
        context.author = 'me'; // this can be moved to the core generator
        context.category = 'Utility'; // from new prompt

        return context;
    },

    install: function() {
        var installDependencies = this.extensionConfig.installDependencies;

        if (installDependencies === true) {
            this.log('Installing dependencies');
            this.npmInstall();
        } else {
            this.log('You said you wanted to install dependencies yourself, so don\'t forget!');
        }     
    }
});