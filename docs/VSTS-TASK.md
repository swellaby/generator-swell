# VSTS Task
The VSTS Task project type gives you everything you need to build your own custom Build/Release tasks for [Visual Studio Team Services][vsts-url]. The generator provides you with a new project containing a working sample task, as well as everything you need to [package and upload][pack-pub-section] your tasks to your VSTS Accounts, and to [package and publish][pack-pub-section] your task(s) to the [VSTS Marketplace][vsts-marketplace-url] as an extension if you want to share your work with others!

If you are unfamiliar with VSTS, check out the [VSTS overview][about-vsts-section] at the bottom of this doc.

## Overview  
As with all other project types, the generator will give you all of the [boilerplate content][boilerplate-doc], which we highly recommend reviewing as it provides the details on generator content
that is standard across all project types like testing, linting, and more. You can also review the [high level usage overview][usage-overview-url] for more details about how to run/use the generator.

## Contents

- [Quick start usage][quickstart-section]
- [Get started with your own task(s)][get-started-section]
- [Directory structure][directory-structure-section]
- [VSTS Extension files][vsts-extension-files-section]
- [VSTS Task Content][task-content-section]
- [Tests][unit-test-section]
- [Debugging][debugging-section]
- [Packaging and publishing][pack-pub-section]
- [Scripts][scripts-section]


## Quick Start
These steps assume you have already created a new project using the generator

1. `npm install` - install dependencies if you haven't already done so
2. Create a [personal access token (PAT)][vsts-pat-url] *
3. `npm run tfx-login`  
    a. enter your target VSTS account (included with TPC), i.e. https://youraccount.visualstudio.com/defaultcollection  
    b. enter the PAT you created in step 2

Now you can go straight to the [packaging-and-publishing][pack-pub-section] section to upload the sampletask to your VSTS account and/or publish it as an extension to the [VSTS Marketplace][vsts-marketplace-url]

*PAT note - You will need to create the PAT with the [appropriate scopes][vsts-extension-pat-url] under an account that has access to upload build tasks to the target VSTS account(s) i.e. needs to be in the top level Agent Pool Administrators group for the account to manipulate tasks.

[Back to table of contents][contents-section]

## Get Started With Your Own Task
The initial project structure created by the generator is immediately ready for usage with a real/functional sample task(including publishing!). Check the below sections (like [Directory structure][directory-structure-section] and [VSTS Task Content][task-content-section]) for more details about the content in your new project, or the [quick start guide][quickstart-section] for info on how to publish/upload the sample task.

Your new project contains a real/working task example (more details [here][task-content-section]). Future versions of the generator will include both the sample/example task, as well as an empty starting task for use. For now though, you will want to go through the below steps to configure/modify the sample task in your project to perform your desired action(s). 

Once you are ready to start writing your own task (including going through the first 3 steps above in the [Quick start section][quickstart-section]), you will need to decide whether you want to use the sample content as a starting point, or if you want to delete it entirely. 

We'd recommend building off the sample content. Once you make the below modifications the task will be all yours!

1) Rename the directory containing the sample task (`tasks/sampletask/`) to something more pertinent (i.e `tasks/mytask`)
2) Rename the task directory under the unit tests to match the new directory name you picked from #1 (i.e. `test/unit/mytask/` to `test/unit/mytask/`
3) Update the [vss-extension.json file contents][vss-extension-section]  
a) Change the `id` for the task in the `contributions` section  
b) Change the `name` field in the same task to match the directory name you changed in #1  
c) Change the `path` field in the `files` section to match the directory name you changed in #1  
![vss-extension.json][get-started-vss-extension-img]
4) Update the `package.json` scripts (in the `scripts` section)  
a) Change the sample task script names `upload-sample-vsts-task` and `delete-sample-vsts-task` to something that matches the name you picked in the previous steps (for example change `upload-sample-vsts-task` to something like `upload-my-vsts-task`)  
b) Modify the _value_ of the `upload-all-vsts-tasks` by changing it from `npm run upload-sample-vsts-task` to `npm run upload-my-vsts-task`

Finally all that is left is your actual task source (and the corresponding tests). You will need to modifiy the `input` values specified on the [task.json file][task-json-section] and the source code in `task.ts` to suit your purposes. Note that we recommed continued usage of the pattern leveraging the separate `task-wrapper.js` file.

[Back to table of contents][contents-section]

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

[Back to table of contents][contents-section]

## VSTS Extension Standard Files
There are 3 common files that are required to define an Extension for VSTS, and the generator creates them for you at the root of your new project:

- `extension-icon.png` - This is the image/icon that will represent your extension on the VSTS Marketplace.
- `EXTENSION.md` - Contains the information/page that will be displayed for your extension in the VSTS Marketplace.
- `vss-extension.json` - Defines your extension configuration, which is required if you choose to package and publish your task(s) to the VSTS Marketplace for others to consume. More details on this file can be found in the [next section][vss-extension-section] below.

[Back to table of contents][contents-section]

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

[Back to table of contents][contents-section]

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
  
[Back to table of contents][contents-section]

## Unit Tests
The generator creates corresponding suites of tests for the aforementioned example classes/files, along with all the basic plumbing. 
This plumbing allows you to run the tests from an npm script as well as directly through a gulp task. You can find more details about the tests, code coverage, and more in 
[the common testing documentation][boilerplate-testing-section]. Note that running the tests will automatically transpile your code for you, so there is no need to run any tasks manually
in advance.  
  
You can kick off your unit tests via:
```sh
npm test
```  
[Back to table of contents][contents-section]

## Debugging
It is possible to run your task locally via Node, and you can find some good info on that [here][vsts-task-lib-local-run]. However, we find that we frequently will upload our task(s) to a VSTS account in order to validate the functionality and debug, somewhat (albeit vaguely) similar to localhost for web apps. 

The generator configures your project with [gulp tasks and scripts][scripts-section] to handle all of the packaging, uploading, etc. process for you.

[Back to table of contents][contents-section]

## Packaging and Publishing
You can then run the following command to upload the sample task:
```sh
npm run pack-up-vsts-tasks
```
Also note that you will need to manually bump the version (patch, minor, or major) in the [task.json][task-json-section] file for each task prior to uploading. We're [working][gulp-vsts-bump-url] on a gulp plugin to automate that process and will add it to the generator as soon as we're done.


Or this command to packge the sample task as an extension, and publish it to your Marketplace account (note you will again be prompted to enter your PAT)
```sh
npm run bump-pack-pub-vsts-extension
```

*PAT note - You will need to create the PAT with the [appropriate scopes][vsts-extension-pat-url] under an account that has access to upload build tasks to the target VSTS account(s) i.e. needs to be in the top level Agent Pool Administrators group for the account to manipulate tasks.

[Back to table of contents][contents-section]

## Scripts
The generator creates your project with the standard [tasks and scripts][boilerplate-building-section] that exist in all projects, and it also includes several specialized tasks/scripts for VSTS content. These are defined in various gulp tasks, but all the functionality is wrapped via a specialized npm script (so you can run them via an `npm run script-name`).  

We recommend checking out the [quick start info][quickstart-section] for the basic details 

![][vsts-npm-scripts-img]

[Back to table of contents][contents-section]

Included scripts:
- [tfx-login][tfx-login-section] - Authenticates with a VSTS account
- [create-task][create-task-section] - Create new task
- [package-vsts-tasks][package-vsts-tasks-section] - package your VSTS task(s) 
- [upload-vsts-task][upload-vsts-task-section] - parameterized upload of a single task to a VSTS account
- [upload-sample-vsts-task][upload-sample-vsts-task-section] - upload the sample task to a VSTS account
- [delete-sample-vsts-task][delete-sample-vsts-task-section] - removes the sample task from a VSTS account
- [delete-vsts-task][delete-vsts-task-section] - parameterized remove of a single task from a VSTS account
- [upload-all-vsts-tasks][upload-all-vsts-tasks-section] - uploads all the tasks in your project to a VSTS account
- [pack-up-single-vsts-task][pack-up-single-vsts-task-section] - parameterized package and upload of a single task to a VSTS account
- [pack-up-vsts-tasks][pack-up-vsts-tasks-section] - parameterized package and upload of all the tasks in your project to a VSTS account
- [package-vsts-extension][package-vsts-extension-section] - creates a VSTS extension that contains the task(s) in your project
- [bump-package-vsts-extension][bump-package-vsts-extension-section] - creates a VSTS extension that contains the task(s) in your project and automatically increments the patch number in the extension version
- [publish-vsts-extension][publish-vsts-extension-section] - publishes an existing VSTS extension from your project to the VSTS marketplace
- [bump-pack-pub-vsts-extension][bump-pack-pub-vsts-extension-section] - automatically creates a VSTS extension of your project, bumps the extension patch version, and publishes the extension to the VSTS marketplace
- [pack-pub-vsts-extension][pack-pub-vsts-extension-section] - automatically creates a VSTS extension of your project and publishes the extension to the VSTS marketplace 

### tfx-login
The projects leverage the cross-platform cli to interact with your VSTS accounts, and that cli is included as a dev-dependency with your project for those users that do not want to install it globally. 

You can run this script once to ensure that all of your subsequent task related scripts will run without having to enter your PAT every time.  

You will first need to create a [personal access token (PAT)][vsts-pat-url]. Note that you will need to create the PAT with the [appropriate scopes][vsts-extension-pat-url] under an account that has access to upload build tasks to the target VSTS account(s) i.e. needs to be in the top level Agent Pool Administrators group for the account to manipulate tasks.

```sh
npm run tfx-login
```
You will then be prompted to enter your account information:  
1. enter your target VSTS account (included with TPC), i.e. https://youraccount.visualstudio.com/defaultcollection   

2. enter the PAT you created in step 2

You should then be able to run all your subsequent task upload/delete/etc. commands without having to re-authenticate. *Note that the VSTS extension publish process does require the PAT to be entered every time

[Back to the top of Scripts][scripts-section]

### create-task
This script can be used if you want to add multiple tasks to your project. This script is a wrapper around the tfx-cli that runs `tfx build tasks create`. Note that running this script (via the below command) will be followed by several prompts you will need to respond to. See the [adding multiple task][multi-task-section] section for a more detailed look into adding multiple 

```sh
npm run create-task
```
[Back to the top of Scripts][scripts-section]

### package-vsts-tasks
This script will take the existing TypeScript source of the task(s) in your project, transpile it, and create the necessary packaged content in the publish directory. Note that it does *not* actually upload the task(s) to your account. You will need to manually run one of the upload scripts (like [upload-vsts-task][upload-vsts-task-section], [upload-sample-vsts-task][upload-sample-vsts-task-section], or [upload-all-vsts-tasks][upload-all-vsts-tasks-section]) to upload, or use one of the multi-stage scripts that do *_both_* for you, like [pack-up-vsts-tasks][pack-up-vsts-tasks-section].

```sh
npm run package-vsts-tasks
```
[Back to the top of Scripts][scripts-section]

### upload-vsts-task
Use this script when you want to upload a single task (which has already been packaged) by specifying the path to the packaged task directory within the publish/distribution directory (something within `.vsts-publish/tasks/`)

The intent is to primarily to support multi-task scenarios where you may want to only upload one task (and not the others) at a time.

This script requires a parameter value (the packaged task directory path) be passed as a parameter to the npm script via the ` -- .vsts-publish/tasks/your-target-task-name`

```sh
npm run upload-vsts-task -- .vsts-publish/tasks/sampletask
```
[Back to the top of Scripts][scripts-section]

### upload-sample-vsts-task
Will upload the sampletask (which you must have already packaged previously) created by the generator.

This is a task-specific script that supports the same upload functionality as [upload-vsts-task][upload-vsts-task-section], but without having to specify the parameter. When we have projects that contain multiple tasks, we will create a specialized task like this for each task in the project. See the [adding multiple task][multi-task-section] section for more details.

```sh
npm run upload-sample-vsts-task
```
[Back to the top of Scripts][scripts-section]

### delete-sample-vsts-task
Will remove a previously uploaded instance of the sampletask created by the generator. The script will return an error of the sample task does not exist on the VSTS account.

This is a task-specific script that supports the same delete functionality as [delete-vsts-task][delete-vsts-task-section], but without having to specify the parameter. When we have projects that contain multiple tasks, we will create a specialized task like this for each task in the project. See the [adding multiple task][multi-task-section] section for more details.

```sh
npm run delete-sample-vsts-task
```
[Back to the top of Scripts][scripts-section]

### delete-vsts-task
Use this script when you want to remove a single task from a VSTS account by specifying the task id. The script will return an error of the specified task does not exist on the VSTS account.

This script requires a parameter value (the id of the task) be passed as a parameter to the npm script via the ` -- e6538b4e-f02b-4ab6-b398-897ed7a32b0c`

This is a task-specific script that supports the same delete functionality as [delete-vsts-task][delete-vsts-task-section], but without having to specify the parameter. When we have projects that contain multiple tasks, we will create a specialized task like this for each task in the project. See the [adding multiple task][multi-task-section] section for more details.

```sh
npm run delete-sample-vsts-task
```
[Back to the top of Scripts][scripts-section]

### upload-all-vsts-tasks
This script is designed to upload all of the tasks that exist in the publish directory (i.e. they were previously packaged already). The current structure has the value of this script configured to run the npm script that uploads each specific task. 

If you add multiple tasks to your project, then you will need to update this script accordingly. See the [multiple task][multi-task-section] section for more details.

```sh
npm run upload-all-vsts-tasks
```
[Back to the top of Scripts][scripts-section]

### pack-up-single-vsts-task
This script will package all of the tasks, and then upload the particular task specified in the script parameter. It is very similar to the [upload-vsts-task][upload-vsts-task-section] script, except that it _also_ packages the tasks first. 

Use this script when you want to package and upload a single task by specifying the path to the packaged task directory within the publish/distribution directory (something within `.vsts-publish/tasks/`)

The intent is to primarily to support multi-task scenarios where you may want to only upload one task (and not the others) at a time.

This script requires a parameter value (the packaged task directory path) be passed as a parameter to the npm script via the ` -- .vsts-publish/tasks/your-target-task-name`

```sh
npm run pack-up-single-vsts-task -- .vsts-publish/tasks/sampletask
```
[Back to the top of Scripts][scripts-section]

### pack-up-vsts-tasks
This script will package all of the tasks, and then upload them all. It very similar to the [pack-up-single-vsts-task][pack-up-single-vsts-task] script, except that it will upload _all_ the tasks.

We find this is the primary script we use during development/testing of the individual tasks.

```sh
npm run pack-up-vsts-tasks
```
[Back to the top of Scripts][scripts-section]

### package-vsts-extension
This script will package up all of your tasks (just like the [package-vsts-tasks][package-vsts-tasks-section] script), and then build a VSTS extension (*.vsix file) which can be installed on a VSTS account and/or published to the market place. 

Use this script if you want to create your extension package, but want to manually install it on a VSTS or TFS account. You could also run the [publish-vsts-extension][publish-vsts-extension-section] script afterwards to publish to the marketplace, but the single [pack-pub-vsts-extension][pack-pub-vsts-extension-section] script will do both for you automatically.

```sh
npm run package-vsts-extension
```
[Back to the top of Scripts][scripts-section]

### bump-package-vsts-extension
This is identical to the above [package-vsts-extension][package-vsts-extension-section] script except that it also automatically bumps the version (patch) of your extension/project in the [vss-extension.json][vss-extension-section].

Use this for the same use cases as [package-vsts-extension][package-vsts-extension-section] plus the version bump. You could also run the [publish-vsts-extension][publish-vsts-extension-section] script afterwards to publish to the marketplace, but the single [bump-pack-pub-vsts-extension][bump-pack-pub-vsts-extension-section] script will do both for you automatically.

```sh
npm run bump-package-vsts-extension
```
[Back to the top of Scripts][scripts-section]

### publish-vsts-extension
This script will publish a local extension package that must already exist (i.e. you would have to create the package beforehand by running a script like [package-vsts-extension][package-vsts-extension-section] or [bump-package-vsts-extension][bump-package-vsts-extension-section])

 The script exists to allow you to explicitly do the publish step independently, but we recommend using the single [bump-pack-pub-vsts-extension][bump-pack-pub-vsts-extension-section] script which will do both for you automatically.

```sh
npm run publish-vsts-extension
```
[Back to the top of Scripts][scripts-section]

### bump-pack-pub-vsts-extension
This script will handle the entire workflow for you by automatically packaging up your tasks into an extension, bumping your extension version, and then publishing it to the Marketplace (note you will again be prompted to enter your PAT).

We recommend using this script heavily if you are packaging your tasks as an extension that you want to share

```sh
npm run bump-package-vsts-extension
```
[Back to the top of Scripts][scripts-section]

### old
You will also need to have a [VSTS Marketplace Publisher Account][vsts-publisher-extension-url] and a [PAT with access to the Marketplace][vsts-extension-pat-url] in order to be able to publish your extension. Additionally, your extension will be private by default and you will be able to share it with various VSTS accounts. If you want your extension to be public and discoverable on the Marketplace, then you will have to follow the steps to [Publicize][vsts-publicize-extension-url] your extension.
  
#### Transpiling
The TypeScript source code needs to be transpiled to JavaScript prior to publishing. You won't likely ever need to explicitly trigger transpilation directly as it will happen automatically as part of the gulp workflows like running your tests, packaging up your task, uploading your task to VSTS, publishing to the VSTS Marketplace, etc. This 

However, there is an npm script available that you can run if you want to run a simple transpile. It can be done via the below npm script (or gulp if you really want) as outlined in the 
[boilerplate documentation][boilerplate-building=section].  

```sh
npm run transpile
```  

## 

### Multiple Tasks


### About VSTS
VSTS is a an end to end ALM platform that you can start using for *free*. It gives users/teams everything they need to plan & manage work, collaborate on source code (unlimited private git repos + a centralized VCS repo), automate builds and deployments/releases, track bugs, manage tests cases, and more! It also integrates fabulously with a ton of other platforms (including GitHub) so you should definitely check it out. Both the build and release system in VSTS are driven off of tasks that perform some action. Although VSTS Tasks can be written in either Node.js or PowerShell, this generator scaffolds a new project for working with Node.js. 

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
[get-started-section]: VSTS-TASK.md#get-started-with-your-own-task
[quickstart-section]: VSTS-TASK.md#quick-start
[pack-pub-section]: VSTS-TASK.md#packaging-and-publishing
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
[scripts-section]: VSTS-TASK.md#scripts
[vsts-npm-scripts-img]: images/vsts-task-npm-scripts.png
[vsts-task-lib-local-run]: https://github.com/Microsoft/vsts-task-lib/blob/master/node/docs/stepbystep.md#run-the-task
[tfx-login-section]: VSTS-TASK.md#tfx-login
[create-task-section]: VSTS-TASK.md#create-task
[package-vsts-tasks-section]: VSTS-TASK.md#package-vsts-tasks
[upload-vsts-task-section]: VSTS-TASK.md#upload-vsts-task
[upload-sample-vsts-task-section]: VSTS-TASK.md#upload-sample-vsts-task
[delete-sample-vsts-task-section]: VSTS-TASK.md#delete-sample-vsts-task
[delete-vsts-task-section]: VSTS-TASK.md#delete-vsts-task
[upload-all-vsts-tasks-section]: VSTS-TASK.md#upload-all-vsts-tasks
[pack-up-single-vsts-task-section]: VSTS-TASK.md#pack-up-single-vsts-task
[pack-up-vsts-tasks-section]: VSTS-TASK.md#pack-up-vsts-tasks
[package-vsts-extension-section]: VSTS-TASK.md#package-vsts-extension
[bump-package-vsts-extension-section]: VSTS-TASK.md#bump-package-vsts-extension
[publish-vsts-extension-section]: VSTS-TASK.md#publish-vsts-extension
[bump-pack-pub-vsts-extension-section]: VSTS-TASK.md#bump-pack-pub-vsts-extension
[pack-pub-vsts-extension-section]: VSTS-TASK.md#pack-pub-vsts-extension
[gulp-vsts-bump-url]: https://github.com/swellaby/gulp-vsts-bump
[get-started-vss-extension-img]: images/vsts-task-get-started-vss-extension.png
[contents-section]: VSTS-TASK.md#contents