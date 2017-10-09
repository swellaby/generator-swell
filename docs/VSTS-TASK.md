# VSTS Task
The VSTS Task project type gives you everything you need to build your own custom Build/Release tasks for [Visual Studio Team Services][vsts-url]. The generator provides you with a new project containing a working sample task, as well as everything you need to [package and upload][pack-pub-section] your tasks to your VSTS Accounts, and to [package and publish][pack-pub-section] your task(s) to the [VSTS Marketplace][vsts-marketplace-url] as an extension if you want to share your work with others!

If you are unfamiliar with VSTS, check out the [VSTS overview][about-vsts-section] at the bottom of this doc.

## Overview  
As with all other project types, the generator will give you all of the [boilerplate content][boilerplate-doc], which we highly recommend reviewing as it provides the details on generator content
that is standard across all project types like testing, linting, and more. You can also review the [high level usage overview][usage-overview-url] for more details about how to run/use the generator.

Content in this document:

- [Directory structure][directory-structure-section]
- [VSTS Extension files][vsts-extension-files-section]
- [VSTS Task Content][task-content-section]
- [Tests][unit-test-section]
- [Debugging][debugging-section]

## Directory Structure
The generator will create a new VSTS Task project with the directory structure and content outlined below (*note the below image includes the optional [VS Code settings][vscode-doc] provided by the generator*):  
  
![VSTS Task Directory Structure][vsts-dir-structure-img]

This includes:

- (optionally) VS Code content.
- Common [Boilerplate][boilerplate-standard-section] content with npm scripts, gulp tasks, and more.
- [Standard VSTS files][vsts-extension-files-section].
- [Source code][task-content-section] for the task implementation.
- [Unit tests][unit-test-section] for the task source code.
- [Packaging and publishing][pack-pub-section] capabilities to package your task(s), upload it to your VSTS account, and publish it to the VSTS marketplace.

The directory structure layout:
- (optionally) `.vscode` directory with the [VS Code settings][vscode-doc]
- `gulp` directory with configuration and gulp tasks. The [Boilerplate][boilerplate-building-section] documentation contains details about the common/shared gulp information, and the [below][scripts-section] has details on the additional gulp tasks for the VSTS task project type.
- `tasks` directory which is the root directory for each individual VSTS task (each contained within a subdirectory under `tasks`).
- `test` directory which contains all the various tests for your task code. 
- several common files at the root of the project directory. Many of these are the common files as described in the [Boilerplate documentation][boilerplate-doc], as well as the [required VSTS extension files][vsts-extension-files-section]

## VSTS Extension Standard Files
There are 3 common files that are required to define an Extension for VSTS, and the generator creates them for you at the root of your new project:

- `extension-icon.png` - This is the image/icon that will represent your extension on the VSTS Marketplace.
- `EXTENSION.md` - Contains the information/page that will be displayed for your extension in the VSTS Marketplace.
- `vss-extension.json` - Defines your extension configuration, which is required if you choose to package and publish your task(s) to the VSTS Marketplace for others to consume. More details on this file can be found in the [next section][vss-extension-section] below.

### vss-extension.json
This is the file that defines your extension once published to the [VSTS Marketplace][vsts-marketplace-url]. See the official [VSTS Extension manifest reference guide][vsts-extension-manifest-url] for more details about the content of the file and how it is used. We recommend that you update the following fields at a minimum in `vss-extension.json` in order to accurately define your own extension:

- *name* - This will be defaulted to the value you gave to the generator for your app name.
- *publisher* - This will be defaulted to the value you gave to the generator for your app author. It will need to map to the [VSTS publisher account][vsts-publisher-extension-url] you create on the VSTS Marketplace in order to be able to publish.
- *tags* - Add whatever tags are applicable in order to accurately represent and categorize your extension
- *gallery-flags* - This will be defaulted to a single flag: 'Preview'. If you choose to make your extension Paid then you will need to add the appropriate flags. When and if you decide to make your extension public/discoverable by others, then you will have to add the 'Public' flag. Note that you will have to get your [Publisher account verified][vsts-publicize-extension-url] in order to be able to publicise your extensions on the marketplace.

## VSTS Task Content and Source
The initial project structure created by the generator has a `tasks` directory at the project root. This is intended to be the root directory where you place the source code and content for each task. This is a very common practice and is the driver of all the tasks/scripts the generator places into your new projects. You can also add additional tasks (following the same pattern) if you'd like. See the [below section][multi-task-section] for more details on working with multiple tasks.

Note that you can refactor the directory structure if you'd like, but be aware that will break much of the existing gulp configuration and npm scripts (so you'll have to modify all of those too). 

![VSTS Sample Task][vsts-sample-task-dir-img]

The generator provides you with a functional sample task (contained in `tasks/sampletask`) that provides examples of doing common activities. It also includes corresponding unit tests for the sample task. You can modify these source files to build your own task, or you can delete them entirely. 

 This sample content shows various patterns and ways of performing activities within the VSTS build/release context. For example, how to retrieve input parameters, how to to interact with VSTS using the OAuth token, displaying information to users, failing or passing a task, using async/await, how to break up the functionality, and more.

The initial sample task does two basic things:
- retreive the input parameters defined in the definition, and do something with them.
- tell the user how many Team Projects exist in the VSTS account.

The sample task, just like any custom VSTS task you write, is made up of the [standard required][standard-task-files-section] VSTS task files as well as the [actual source code][task-source-files-section] that perform the tasks functions.

### Standard Task Files
Each individual task (build and release) in VSTS is defined in two core files, and the `sampletask` example has these predefined with the information you gave the generator.

- *icon.png* - The icon for your task. This is what will be displayed for your task within VSTS.
- *task.json* - Defines a task. More details about this file can be found [below][task-json-section].

### task.json
This file defines your task for VSTS. See the official [VSTS Task Manifest documentation][vsts-task-manifest-url] for more details about the content of this file and how it is used. We recommend that you update the following fields at a minimum in `task.json` in order to accurately define your own task:

- *name* - This will be defaulted to the value you gave to the generator for your app name.
- *friendlyName* - This is the name/text that users will use to locate your task within the task lists on VSTS. The default value is "Replace with a friendly name", which is what you will see in VSTS if you upload the task created by the generator.
- *description* - Provide a helpful description of what your task does. 
- *instanceNameFormat* - This is the value that will be applied to your task once an instance has been added to a build/release definition. 
- *inputs* - The sample task created adds two sample inputs that show how to take string/text and numerical input for your task.

### Sample Task Source
The task source is broken into 3 different files within the task directory (`task/sampletask`) :

- `task.ts`
- `task-wrapper.js`
- `helper.ts`

#### task.ts
The `task.ts` file is the main entry point for execution of your task. It includes an import of the [vsts-task-lib][vsts-task-lib-repo-url] library, which is used to interface directly with the VSTS build/release context. It will do things like access the user input parameters, display status/debug/error/etc. messages to the user, and ultimately determine whether or not the task should be marked as successful or failed. It will typically leverage other functions/classes/etc. defined in other files to do most of the work of the task.

Note that `task.ts` exports a single function (`run`) and that the `task.ts` file does **_not_** contain any invocations of the `run` function (for example there is no `run();` anywhere). We do this so that it it is possible to actually run unit tests against the code within the `task.ts` file. It would be very difficult to do true unit tests if there were, because you could not easily control/stub/mock the external touchpoints. 

Instead, the `task-wrapper.js` file handles the actual execution of the task. 

#### task-wrapper.js

This is a nearly empty file that exists only for starting your task within the VSTS build/release flow. The `task.json` file has the Node execution target set to this file, resulting in the equivalent of a `node task-wrapper.js` which executes your task. It exists so that the [Task source file][task-source-file] can be structured in such a way to easily facilitate unit testing. We use this pattern for all of our tasks so that we can fully unit test all of our task code.

#### helper.ts
The Helper class defined in the `helper.ts` file is a simple example of a helper class that provides some functionality which is consumed by `task.ts`. The class exposes a single method that provides the ability to determine the number of Team Projects that exist on the specified VSTS account.
  
## Unit Tests
The generator creates corresponding suites of tests for the aforementioned example classes/files, along with all the basic plumbing. 
This plumbing allows you to run the tests from an npm script as well as directly through a gulp task. You can find more details about the tests, code coverage, and more in 
[the common testing documentation][boilerplate-testing-section]. Note that running the tests will automatically transpile your code for you, so there is no need to run any tasks manually
in advance.  
  
You can kick off your unit tests via:
```sh
npm test
```  

## Debugging & Validating
Due to the nature of the VSTS tasks, there isn't really a "localhost" equivalent to validate the functionality of your task. The easiest way (that we know of) is to simply publish your task
to a VSTS account where you have the necessary permissions. 


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
[vsts-sample-task-dir-img]: images/vsts-sample-task-dir-structure.png
[boilerplate-standard-section]: BOILERPLATE.md#standard-files
[boilerplate-building-section]: BOILERPLATE.md#gulp-&-building
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
[about-vsts-section]: VSTS-TASK.md#about-vsts
[standard-files-section]: VSTS-TASK.md#standard-files
[task-source-section]: VSTS-TASK.md#task-source-code
[task-source-file]: VSTS-TASK.md#taskts
[unit-test-section]: VSTS-TASK.md#unit-tests
[debugging-section]: VSTS-TASK.md#debugging
[vsts-task-manifest-url]: https://www.visualstudio.com/en-us/docs/integrate/extensions/develop/build-task-schema
[vsts-extension-manifest-url]: https://www.visualstudio.com/en-us/docs/integrate/extensions/develop/manifest 
[vsts-build-task-tutorial-url]: https://www.visualstudio.com/en-us/docs/integrate/extensions/develop/add-build-task 
[vsts-marketplace-publisher-url]: https://marketplace.visualstudio.com/manage/
[multi-task-section]: VSTS-TASK.md#multiple-task
[directory-structure-section]: VSTS-TASK.md#directory-structure
[vsts-extension-files-section]: VSTS-TASK.md#vsts-extension-standard-files
[task-content-section]: VSTS-TASK.md#vsts-task-content-and-source
[standard-task-files-section]: VSTS-TASK.md#standard-task-files
[task-source-files-section]: VSTS-TASK.md#sample-task-source
[vss-extension-section]: VSTS-TASK.md#vss-extensionjson
[task-json-section]: VSTS-TASK.md#taskjson
[vsts-task-lib-repo-url]: https://github.com/Microsoft/vsts-task-lib