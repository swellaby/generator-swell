# VSTS Task
The VSTS Task project type gives you everything you need to build your own custom Build/Release tasks for [Visual Studio Team Services][vsts-url]. The generator provides you with a new project containing a functional sample task, as well as everything you need to [package and upload][pack-pub-section] your tasks to your VSTS Accounts, and to [package and publish][pack-pub-section] your tasks to the [VSTS Marketplace][vsts-marketplace-url] if you want to share your work with others!

If you are unfamiliar with VSTS, check out the [VSTS overview][about-vsts-section] at the bottom of this doc.

## Overview  
As with other project types, the generator will also give you all of the [boilerplate content][boilerplate-doc], which we highly recommend reviewing as it provides the details on generator content
that is standard across all project types like testing, linting, and more. You can also review the [high level usage overview][usage-overview-url] for more details about using the generator.

## Directory Structure & Content
The generator will create a new VSTS Task project with the directory structure and content outlined below (*note the below image includes the [VS Code settings][vscode-doc] provided by the generator*):  
  
![VSTS Task Directory Structure][vsts-dir-structure-img]

This includes:

- (optionally) VS Code content.
- Common [Boilerplate][boilerplate-doc] content with npm scripts, gulp tasks, and more.
- [Standard VSTS files][standard-files-section].
- [Source code][task-source-section] for the task implementation.
- [Unit tests][unit-test-section] for the task source code.
- [Packaging and publishing][pack-pub-section] capabilities to package your task, upload it to your VSTS account, and publish it to the VSTS marketplace.

It is also worth nothing that the initial structure provided by the generator is based on only having a single build task. If you end up deciding to bundle multiple tasks within the same project/extension, then you will need to make some minor modifications to the directory structure. See the below section on [multiple task support][multi-task-section] for additional details.

### Standard Files
All of the standard files outlined in the [boilerplate doc][boilerplate-standard-section] are included, along with a few VSTS task/extension specific files:

- *extension-icon.png* - This is the image/icon that will represent your extension on the VSTS Marketplace.
- *EXTENSION.md* - Contains the information/page that will be displayed for your extension in the VSTS Marketplace.
- *icon.png* - The icon for your task. This is what will be displayed for your task within VSTS.
- *task-wrapper.js* - Helper file used to execute your task within a VSTS build or release.
- *task.json* - Defines your task.
- *vss-extension.json* - Defines your extension configuration, which is required if you choose to package and publish your task(s) to the VSTS Marketplace for others to consume.

#### task-wrapper.js
This is a nearly empty file that exists only for starting your task within the VSTS build/release flow. The `task.json` file has the Node execution target set to this file, resulting in the equivalent of a `node task-wrapper.js` which executes your task. It exists so that the [Task source file][task-source-file] can be structured in such a way to easily facilitate unit testing. 

#### task.json
This file defines your task for VSTS. See the official [VSTS Task Manifest documentation][vsts-task-manifest-url] for more details about the content of this file and how it is used. We recommend that you update the following fields at a minimum in `task.json` in order to accurately define your own task:

- *name* - This will be defaulted to the value you gave to the generator for your app name.
- *friendlyName* - This is the name/text that users will use to locate your task within the task lists on VSTS. The default value is "Replace with a friendly name", which is what you will see in VSTS if you upload the task created by the generator.
- *description* - Provide a helpful description of what your task does. 
- *instanceNameFormat* - This is the value that will be applied to your task once an instance has been added to a build/release definition. 
- *inputs* - The sample task created adds two sample inputs that show how to take string/text and numerical input for your task.

#### vss-extension.json
This is the file that defines your extension once published to the [VSTS Marketplace][vsts-marketplace-url]. See the official [VSTS Extension manifest reference guide][vsts-extension-manifest-url] for more details about the content of the file and how it is used. We recommend that you update the following fields at a minimum in `vss-extension.json` in order to accurately define your own extension:

- *name* - This will be defaulted to the value you gave to the generator for your app name.
- *publisher* - This will be defaulted to the value you gave to the generator for your app author. It will need to map to the [VSTS publisher account][vsts-publisher-extension-url] you create on the VSTS Marketplace in order to be able to publish.
- *tags* - Add whatever tags are applicable in order to accurately represent and categorize your extension
- *gallery-flags* - This will be defaulted to a single flag: 'Preview'. If you choose to make your extension Paid then you will need to add the appropriate flags. When and if you decide to make your extension public/discoverable by others, then you will have to add the 'Public' flag. Note that you will have to get your [Publisher account verified][vsts-publicize-extension-url] in order to be able to publicise your extensions on the marketplace.

### Task Source Code
The generator provides you with a functional sample task that provides examples of doing common activities. It also includes corresponding unit tests for the sample task. You can modify these source files to build your own task, or you can delete them entirely 

 This sample content shows various patterns and ways of performing activities within the VSTS build/release context. For example, how to retrieve input parameters, how to to interact with VSTS using the OAuth token, displaying information to users, failing or passing a task, using async/await, how to break up the functionality, and more.

The initial task does two basic things:
- retreive the input parameters from the user and do something with them
- tell the user how many Team Projects exist in the VSTS account.

The task source is broken into 3 different files under the `src` directory:

- *task.ts*
- *task-logger.ts*
- *helper.ts*

#### task.ts
The `task.ts` file is the main entry point for execution of your task. It includes an import of the [vsts-task-lib][] library, which is used to interface directly with the VSTS build/release context. It will do things like access the user input parameters, display status/debug/error/etc. messages to the user, and ultimately determine whether or not the task should be marked as successful or failed. It will typically leverage other functions/classes/etc. defined in other files to do most of the work of the task.

Note that `task.ts` exports a single function (`run`) and that the `task.ts` file does **_not_** contain any invocations of the `run` function (for example there is no `run();` anywhere). We do this so that it it is possible to actually run unit tests against the code within the `task.ts` file. It would be very difficult to do true unit tests if there were, because you could not easily control/stub/mock the external touchpoints. 

Instead, there is a `task-wrapper.js` file (in the root of your project) that will run the task. 

#### helper.ts
The Helper class defined in the `helper.ts` file is a simple example of a helper class that provides some functionality which is consumed by `task.ts`. The class exposes a single method that provides the ability to determine the number of Team Projects that exist on the specified VSTS account.

#### task-logger.ts

The 'main.ts' file is the main executable that is called by the VSTS task runner engine. This is where build information, variables, etc. can be obtained by interacting with the VSTS task system.
Think of this main file as the entry point to begin the process of executing your task. However, the bulk of the work for your task should be performed by other classes/files. This is demonstrated by 
the 'main.ts' file interacting with a Helper class defined in the 'helper.ts' file. 
  
The 'main.ts' shows how you can get inputs (via build variables and user defined parameter values), use those inputs to perform various operations, and display info/output. The 'helper.ts' file 
defines the Helper class which performs a couple of basic operations, while using ES6 promises: basic addition of two numbers and getting the number of Team Projects in the account by interacting 
with the VSTS APIs.  
  
![VSTS Task Main.ts][main.ts-img]  
  
![VSTS Task Helper.ts][helper.ts-img]  

### Unit Tests
The generator creates corresponding suites of tests for the aforementioned example classes/files, along with all the basic plumbing. 
This plumbing allows you to run the tests from an npm script as well as directly through a gulp task. You can find more details about the tests, code coverage, and more in 
[the common testing documentation][boilerplate-testing-section]. Note that running the tests will automatically transpile your code for you, so there is no need to run any tasks manually
in advance.  
  
You can kick off your unit tests via:
```sh
npm test
```  

### Debugging/Validating
Due to the nature of the VSTS tasks, there isn't really a "localhost" equivalent to validate the functionality of your task. The easiest way (that we know of) is to simply publish your task
to a VSTS account where you have the necessary permissions. This is accomplished via the CLI Utility (tfx)


### Packaging & Publishing
Once you have created your new VSTS Task project with the generator, and installed the dependencies, you can upload your new task to your VSTS account by running:

```sh
npm run tfx-login
npm run pack-up-vsts-task
```
The login script will prompt you to enter your VSTS Service Url - https://{accountName}.visualstudio.com/{collection} i.e. https://foo.visualstudio.com/defaultcollection and
then for a [Personal Access Token][vsts-pat-url] (PAT).

You can also publish your task as an extension directly to the [VSTS Marketplace][vsts-marketplace-url] by running:

```sh
npm run pack-pub-vsts-task-extension
```

You will also need to have a [VSTS Marketplace Publisher Account][vsts-publisher-extension-url] and a [PAT with access to the Marketplace][vsts-extension-pat-url] in order to be able to publish your extension. Additionally, your extension will be private by default and you will be able to share it with various VSTS accounts. If you want your extension to be public and discoverable on the Marketplace, then you will have to follow the steps to [Publicize][vsts-publicize-extension-url] your extension.
  
### Transpiling
The TypeScript source code needs to be transpiled to JavaScript prior to publishing. You won't likely ever need to explicitly trigger transpilation directly as it will happen automatically as part of the gulp workflows like running your tests, packaging up your task, uploading your task to VSTS, publishing to the VSTS Marketplace, etc. This 

However, there is an npm script available that you can run if you want to run a simple transpile. It can be done via the below npm script (or gulp if you really want) as outlined in the 
[boilerplate documentation][boilerplate-building=section].  

```sh
npm run transpile
```  
### Multiple Tasks
As previously mentioned, the initial project provided by the generator contains a single VSTS build/release task. However, you will find some VSTS extensions on the marketplace bundle together multiple tasks. If you would like to provide multiple tasks then you will have to make some minor modifications to the directory structure of your project. Below is a (not-necessarily complete) list of changes you will need to make:

- Define a root directory for all tasks. We would recommend creating a `tasks` directory under the `src` directory (i.e. `./src/tasks/`)
- Create a sub-directory under `tasks` for each task. For example: `./src/tasks/taskone/` and `./src/tasks/tasktwo/`
- Move the task-specific files into the correct task sub-directory. For example, move the `task.ts`, `task.json`, `icon.png`, `task-wrapper.js`, etc. under `./src/tasks/taskone` and create the same corresponding files for the second task under `./src/tasks/tasktwo/`.
- Ensure all import/require statements are updated to reflect the path change (for example in `task-wrapper.js`) 
- Ensure all other pointers to paths/files (gulp tasks and configuration, vss-extension.json, npm scripts, etc.) are updated accordingly. 

In the future we will be updating the generator to provide better support out-of-the-box for multiple tasks. 

### About VSTS
VSTS is a an end to end ALM platform that you can start using for *free*. You should definitely check it out!. Although VSTS Tasks can be written in either Node.js or PowerShell, this generator scaffolds a new project for working with Node.js. 

[usage-overview-url]: USAGE-OVERVIEW.md
[vsts-url]: https://www.visualstudio.com/team-services/
[boilerplate-doc]: BOILERPLATE.md
[vsts-dir-structure-img]: images/vsts-task-dir-structure.png
[boilerplate-standard-section]: BOILERPLATE.md#standard-files
[boilerplate-building=section]: BOILERPLATE.md#gulp-&-building
[main.ts-img]: vsts-main.png
[helper.ts-img]: vsts-helper.png
[boilerplate-testing-section]: BOILERPLATE.md#testing
[vsts-pat-url]: https://www.visualstudio.com/en-us/docs/setup-admin/team-services/use-personal-access-tokens-to-authenticate
[vsts-extension-pat-url]: https://www.visualstudio.com/en-us/docs/integrate/extensions/publish/command-line#acquire-a-personal-access-token
[vsts-marketplace-url]: https://marketplace.visualstudio.com/
[vsts-publicize-extension-url]: https://www.visualstudio.com/en-us/docs/integrate/extensions/publish/publicize
[vsts-publisher-extension-url]: https://www.visualstudio.com/en-us/docs/integrate/extensions/publish/overview#create-a-publisher
[vscode-doc]: VSCODE.md
[pack-pub-section]: VSTS-TASK.md#packaging-&-publishing
[about-vstfs-section]: VSTS-TASK.md#about-vsts
[standard-files-section]: VSTS-TASK.md#standard-files
[task-source-section]: VSTS-TASK.md#task-source-code
[task-source-file]: VSTS-TASK.md#task.ts
[unit-test-section]: VSTS-TASK.md#unit-tests
[vsts-task-manifest-url]: https://www.visualstudio.com/en-us/docs/integrate/extensions/develop/build-task-schema
[vsts-extension-manifest-url]: https://www.visualstudio.com/en-us/docs/integrate/extensions/develop/manifest 
[vsts-build-task-tutorial-url]: https://www.visualstudio.com/en-us/docs/integrate/extensions/develop/add-build-task 
[vsts-marketplace-publisher-url]: https://marketplace.visualstudio.com/manage/
[multi-task-section]: VSTS-TASK.md#multiple-task