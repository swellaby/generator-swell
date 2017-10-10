# Visual Studio Code Support  
[Visual Studio Code][vscode-url] workspaces are configured via the files in the `.vscode` folder at the root of your workspace. The VS Code configuration provided by the generator provides some good building blocks that can always be changed when and if required.

## Workspace Settings
The generator adds a `settings.json` file to the `.vscode` directory in your new project. This file defines workspace specific settings for VS Code (it won't impact any other workspaces/projects/directories/etc.).

 It only includes a single setting: `files.exclude` that configures VS Code to not display the listed files and directories. The generator specifies this configuration to try to keep your workspace concise and focused on the source files you will actually be working with and having VS Code not display files and/or directories you typically won't work with. You can always remove/add any of these lines from `.vscode/settings.json` temporarily if needed or permanently if you discover otherwise. The files and directories that VS Code will hide:

- Transpiled JavaScript and map files that are the output from your TypeScript source. 
- `npm-debug.log`
- `.coverage` - This is the directory where the gulp tasks put code coverage reports. 
- `.testresults` - This is the directory where the gulp tasks place the test result files.
- `.vsts-publish` - This is the directory used as the output/distribution and packaging folder for VSTS Tasks/Extensions. It is only relevant for VSTS Task project types.
- `node_modules`  
  
![settings.json][vscode-settings-json-img]  

## Debugging  
Visual Studio Code has great support for debugging applications. Debug settings for your project are configured in the `.vscode/launch.json` file.
After you transpile your code, start debugging by hitting `F5`.  

### Chatbot  
By default this will start your `src/server.ts` file. If you wish to interact with the bot over the console, 
you should adjust the `program` line in your `.vscode/launch.json` to be `src/console.ts`.  

### Express API  
By default this will start your `src/app.ts`.  

### Other Node.js Project Types
By default this will start whatever file you have open and in context. Keep in mind that many files are not made to be executed like this, 
so you may need to create a little debug script in order to invoke the code you actually wish to debug. The `program` entry of the `.vscode/launch.json` 
file can be edited to change this behaviour.

### Angular, Aurelia  
Coming Soon!  
  
## Extension Recommendations
Visual Studio Code allows for specifying workspace/project specific recommendations for extensions. The generator scaffolding will include a `.vscode/extensions.json` file that defines the VS Code extensions it recommends for your new project. Some of common recommendations for all of the project types the generator creates are:  
  
  - [Status Bar Tasks][tasks-extension-url]: Adds executable tasks to VS Code status bar
  - [TSLint][tslint-extension-url]: Adds TSLint to VS Code  
  - [Document This][docthis-extension-url]: [JSDoc][jsdoc-url] generator for TypeScript and JavaScript
  - [npm Intellisense][npm-intellisense-extension-url]: Auto-completes npm modules in import statements
  - [Path Intellisense][path-intellisense-extension-url]: Auto-completes paths/filenames
  - [VS Team Services][team-extension-url]: [VSTS][vsts-url] integration from VS Code  
  
  
## Status Bar Tasks  
Status Bar Tasks are defined in the `.vscode/tasks.json` file. This functionality comes from the extension [Status Bar Tasks][tasks-extension-url], 
which turns your tasks into buttons at the button of VS Code. Each of these Task items execute an npm script defined in the `package.json` file.

The generator provides the following tasks:  

- install dependencies: Exactly what it sounds like :) 
- lint: Runs TSLint and ESLint against
- clean: Removes transpiled js and js.map files
- transpile: Runs the TypeScript compiler
- build: Cleans, transpiles, lints
- unit test: Runs unit tests and checks security (via Node Security Project cli)
- unit test coverage: Runs unit tests and displays the Istanbul Code Coverage report in the browser
- pack: Packages your application

[vscode-url]: https://code.visualstudio.com  
[tasks-extension-url]: https://marketplace.visualstudio.com/items?itemName=GuardRex.status-bar-tasks
[team-extension-url]: https://marketplace.visualstudio.com/items?itemName=ms-vsts.team
[tslint-extension-url]: https://marketplace.visualstudio.com/items?itemName=eg2.tslint
[docthis-extension-url]: https://marketplace.visualstudio.com/items?itemName=joelday.docthis
[path-intellisense-extension-url]: https://marketplace.visualstudio.com/items?itemName=christian-kohler.path-intellisense
[npm-intellisense-extension-url]: https://marketplace.visualstudio.com/items?itemName=christian-kohler.npm-intellisense
[jsdoc-url]: http://usejsdoc.org/about-getting-started.html
[vsts-url]: https://www.visualstudio.com/team-services/
[vscode-settings-json-img]: images/vscode-settings-json.png "VS Code Settings"