# Usage Overview
This generator is for creating a variety of Node.js, Angular (planned), and Aurelia (planned) projects. All projects 
use TypeScript, gulp, mocha, eslint, jshint, and more. See the documentation below for details about using the generator. 
The following types of projects are supported:

- [Boilerplate files only][boilerplate-doc-url]
- [Node.js CLI application][cli-doc-url] (planned)
- [Node.js API with Express & Docker][express-api-doc-url]
- [VSTS Task][vsts-task-doc-url]
- [Chatbot][chatbot-doc-url]
- [Angular 2][angular-doc-url] (planned)
- [Aurelia][aurelia-doc-url] (planned)


## Running
Run the below command to launch the generator:
```sh
yo swell
```

### Prompts and Inputs
The generator will prompt you for a few pieces of information in order to create your new project. Note that certain project types
may prompt you for additional information.

#### Application Name
- **Display Message**: 'The name of your app'
- **Prompt Type**: Free entry
- **Required?**: Yes
- **Default Value**: N/A

The value you provide here will be used as the name of your new project. **Note** the generator will create
your new project in a directory that matches the name you specify for the application name. If the current directory
name does *not* match the value inputted for the application name, then a new subdirectory (with the app name) will be
created within the current directory. This value is also applied to several of the files the generator creates
for you, such as the package.json and the README.md.

#### Description 
- **Display Message**: 'The description of your app'
- **Prompt Type**: Free entry
- **Required?**: No
- **Default Value**: N/A

This (optional) value will be injected into your package.json and markdown files.

#### Application Type
- **Display message**: 'What type of app is this?'
- **Prompt Type**: Selection
- **Required?**: Yes
- **Default Value**: Boilerplate - 'New App with just the boilerplate'

This option determines which type of project (and which files, directories, etc.) the generator will create for you. The
generator supports the following types of projects:  
  
- [Boilerplate files only][boilerplate-doc-url]
- [Node.js CLI application][cli-doc-url] (planned)
- [Node.js API with Express & Docker][express-api-doc-url]
- [VSTS Task][vsts-task-doc-url]
- [Chatbot][chatbot-doc-url]
- [Angular 2][angular-doc-url] (planned)
- [Aurelia][aurelia-doc-url] (planned)

#### Install Dependencies
- **Display message**: 'Do you want me to install dependencies for you?'
- **Prompt Type**: Confirmation
- **Required?**: Yes
- **Default Value**: True

The generator can install the dependencies for your new project after scaffolding is complete. Dependencies will be installed
automatically by default, but you can decline this option and install the dependencies (```npm install```) yourself afterwards 
if you would like.

[boilerplate-doc-url]: BOILERPLATE.md
[cli-doc-url]: CLI.md
[express-api-doc-url]: EXPRESS-API.md
[vsts-task-doc-url]: VSTS-TASK.md
[chatbot-doc-url]: CHATBOT.md
[angular-doc-url]: ANGULAR.md
[aurelia-doc-url]: AURELIA.md