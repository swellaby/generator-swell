# VSTS Task
The VSTS Task project type gives you everything you need to add your own custom Build and/or Release tasks for [Visual Studio Team Services][vsts-url] (VSTS is a *free* end to end ALM platform, 
you should definitely check it out!). Although VSTS Tasks can be written in either Node.js or PowerShell, this generator scaffolds a new project for working with Node.js. 
  
As with other project types, the generator will also give you all of the [boilerplate content][boilerplate-doc]. 
See the [high level usage overview][usage-overview-url] for more details about using the generator.

## Directory Structure & Content
The generator will create a new VSTS Task project that has the following content:  
  
![VSTS Task Directory Structure][vsts-dir-structure-img]

### Standard Files
All of the standard files outlined in the [boilerplate doc][boilerplate-standard-section] are included, along with a few VSTS task/extension specific files:

- *extension-icon.png* - This is the image/icon that will represent your task in VSTS
- *OVERVIEW.md* - Contains the information/page that will be displayed for your extension in the VSTS Marketplace
- *task.json* - Defines your task
- *vss-extension.json* - Defines your extension configuration, which is required if you choose to package and publish your task(s) to the VSTS Marketplace for others to consume

### Source Code
There are several sample/starter files that the generator creates for you. This sample content shows various patterns and ways of interacting with the VSTS system. The initial task 
created by the generator shows a simple mathematical addition of two numerical parameters, as well as displaying the count of Team Projects by interacting with the VSTS APIs. You may begin building off 
of these starter files or remove them entirely and start from scratch. Regardless, the source code for your task should go within the 'src' directory. The two sample/starter files the generator 
creates for you in the 'src' directory are:

- *main.ts*
- *helper.ts*

The 'main.ts' file is the main executable that is called by the VSTS task runner engine. This is where build information, variables, etc. can be obtained by interacting with the VSTS task system.
Think of this main file as the entry point to begin the process of executing your task. However, the bulk of the work for your task should be performed by other classes/files. This is demonstrated by 
the 'main.ts' file interacting with a Helper class defined in the 'helper.ts' file. 
  
The 'main.ts' shows how you can get inputs (via build variables and user defined parameter values), use those inputs to perform various operations, and display info/output. The 'helper.ts' file 
defines the Helper class which performs a couple of basic operations, while using ES6 promises: basic addition of two numbers and getting the number of Team Projects in the account by interacting 
with the VSTS APIs.


### Transpiling
The TypeScript source code needs to be transpiled to JavaScript prior to publishing. This can be done via an npm command (or gulp if you really want) as outlined in the 
[boilerplate documentation][boilerplate-building=section].

```sh
npm run transpile
```  
  
  
[usage-overview-url]: USAGE-OVERVIEW.md
[vsts-url]: https://www.visualstudio.com/team-services/
[boilerplate-doc]: BOILERPLATE.md
[vsts-dir-structure-img]: vsts-dir-structure.png
[boilerplate-standard-section]: BOILERPLATE.md#standard-files
[boilerplate-building=section]: BOILERPLATE.md#gulp-&-building
[main.ts-img]: vsts-main.png
[helper.ts-img]: vsts-helper.png