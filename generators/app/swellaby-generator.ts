// 'use strict';

// import fs = require('fs');
// import path = require('path');
// import mkdirp = require('mkdirp');
// import yosay = require('yosay');
// import YeomanGenerator = require('yeoman-generator');

// import boilerplate = require('./boilerplate');
// import chatbot = require('./chatbot');
// import cli = require('./cli');
// import express = require('./express');
// import inputConfig = require('./input-config');
// import pathHelpers = require('./path-helpers');
// import vscode = require('./vscode');
// import vsts = require('./vsts');

// /**
//  * The main SwellabyGenerator class
//  *
//  * @export
//  * @class SwellabyGenerator
//  */
// export class SwellabyGenerator {
//     // tslint:disable-next-line:no-any
//     private extensionConfig: any;
//     private generator: YeomanGenerator;

//     /**
//      * Creates an instance of SwellabyGenerator.
//      * @param {YeomanGenerator} generator
//      *
//      * @memberOf SwellabyGenerator
//      */
//     constructor(generator: YeomanGenerator) {
//         this.generator = generator;
//     }

//     /**
//      * Creates a new project.
//      *
//      * @memberOf SwellabyGenerator
//      */
//     public createProject() {
//       this.generator.log(yosay('Welcome to the Swellaby Generator!'));
//       this.promptUser();
//       this.validateDirectoryName();
//       this.validateGitRepository();
//       this.scaffoldProjectContent();
//     }

//     /**
//      * Prompts the user for inputs needed to create the new project.
//      *
//      * @private
//      * @memberOf SwellabyGenerator
//      */
//     private promptUser() {
//         // tslint:disable-next-line:no-any
//         return this.generator.prompt(inputConfig.prompts).then((extensionConfig: any) => {
//             this.extensionConfig = extensionConfig;
//         });
//     }

//     /**
//      * Scaffolds the content for the project.
//      *
//      * @private
//      * @memberOf SwellabyGenerator
//      */
//     // tslint:disable-next-line:max-func-body-length
//     private scaffoldProjectContent() {
//         boilerplate.scaffoldBoilerplateContent(this.generator, this.extensionConfig);
//         const extensionType = this.extensionConfig.type;

//         if (this.extensionConfig.vscode) {
//             vscode.scaffoldVSCodeContent(this.generator, this.extensionConfig);
//         }

//         switch (extensionType) {
//             case inputConfig.boilerplatePromptValue:
//                 this.generator.log(yosay('Just the basic boilerplate'));
//                 break;

//             case inputConfig.cliPromptValue:
//                 cli.scaffoldCliProject(this.generator, this.extensionConfig);
//                 break;

//             case inputConfig.expressApiPromptValue:
//                 express.scaffoldExpressApiProject(this.generator, this.extensionConfig);
//                 break;

//             case inputConfig.vstsTaskPromptValue:
//                 vsts.scaffoldVSTSTaskProject(this.generator, this.extensionConfig);
//                 break;

//             case inputConfig.chatbotPromptValue:
//                 chatbot.scaffoldChatbotProject(this.generator, this.extensionConfig);
//                 break;

//             default:
//                 this.generator.log('Encountered an unexpected configuration. You may need to try again.');
//         }
//     }

//     /**
//      * Validates the directory name where the new project will be created.
//      *
//      * @private
//      * @memberOf SwellabyGenerator
//      */
//     private validateDirectoryName() {
//         const appName = this.extensionConfig.appName;

//         if (path.basename(this.generator.destinationPath()) !== appName) {
//             this.generator.log('Your generator must be inside a directory with the same name ' +
//                 'as your extension name \'' + appName + '\'\n' +
//                 'I\'ll automatically create this directory for you.');

//             mkdirp(appName, null);
//             this.generator.destinationRoot(this.generator.destinationPath(appName));
//         }
//     }

//     /**
//      * Validates that the new project has a git repository.
//      *
//      * @private
//      * @memberOf SwellabyGenerator
//      */
//     private validateGitRepository() {
//         try {
//             const gitPath = path.join(path.resolve(this.generator.destinationRoot()), '.git');

//             if (fs.statSync(gitPath).isFile()) {
//                 this.generator.log('Are you being mischievous? You have a file in the target directory named \'.git\' with' +
//                     'the same name as the directory git uses. I am deleting this because it will cause errors and you' +
//                     'absolutely do not need it. :)');
//                 fs.unlinkSync(gitPath);

//                 this.initializeGitRepository();
//             }
//         } catch (err) {
//             // fs.statSync will throw an exception when the directory does not exist so need to init
//             this.initializeGitRepository();
//         }
//     }

//     /**
//      * Initializes a git repository in the created project.
//      *
//      * @private
//      * @memberOf SwellabyGenerator
//      */
//     private initializeGitRepository() {
//         this.generator.log('I see that you don\'t have a git repo in the target directory. I\'ll initialize it for you now, and then ' +
//             'you can add your remote later on via a \'git remote add origin <<insert your remote url here>>\'. For example: ' +
//             '\'git remote add origin https://github.com/me/my-repo.git\'');
//         try {
//             this.generator.spawnCommandSync('git', ['init', '--quiet']);
//         } catch (err) {
//             this.generator.log('Encountered an error while trying to initialize the git repository. ' +
//                 'You may not have git installed. Please consult the internet for information on how to install git');
//         }
//     }

//     /**
//      * Installs dependencies in the created project.
//      *
//      * @private
//      * @memberOf SwellabyGenerator
//      */
//     private installDependencies() {
//         const installDependencies = this.extensionConfig.installDependencies;

//         if (installDependencies === true) {
//             this.generator.log('Installing dependencies');
//             this.generator.npmInstall();
//         } else {
//             this.generator.log('You said you wanted to install dependencies yourself, so don\'t forget!');
//         }
//     }
// }