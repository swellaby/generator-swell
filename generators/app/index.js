'use strict';

// var chalk = require('chalk');
// var extend = require('deep-extend');
var glob = require('glob');
var path = require('path');
var mkdirp = require('mkdirp');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');

var inputConfig = require('./input-config');

var templateRoot = path.join(__dirname, 'templates');
var boilerplateRoot = path.join(templateRoot, 'boilerplate');

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
        this.sourceRoot = path.join(templateRoot, extensionType);

        switch (extensionType) {
            case inputConfig.basePromptValue:
                this._writingBase();
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
        // var pkg = this.fs.readJSON(this.sourceRoot('package.json'), {});
        // extend(pkg, {
        //     name: '<%- JSON.stringify(name) %>'
        // });

        // this.fs.writeJSON(this.sourceRoot('package.json'));

        var context = this.extensionConfig;
        context.dot = true;
        this.fs.copyTpl(glob.sync(this.sourceRoot() + '/**/*', { dot: true }), this.destinationRoot(), context);
    },

    _writingBase: function() {
        this.log(yosay('Created just the basics.'));

    },

    _writingCli: function() {
        this.log(yosay('New CLI coming'));
    },

    _writingExpress: function() {
        this.log(yosay('Super API underway'));
    },

    _writingVSTSTask: function() {
        this.log(yosay('A new task to make a great platform even better'));
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