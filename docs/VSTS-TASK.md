# VSTS Task
The VSTS Task project type gives you everything you need to add your own custom Build and/or Release tasks for [Visual Studio Team Services][vsts-url] (VSTS is a *free* end to end ALM platform, 
you should definitely check it out!). Although VSTS Tasks can be written in either Node.js or PowerShell, this generator scaffolds a new project for working with Node.js. 
  
As with other project types, the generator will also give you all of the [boilerplate content][boilerplate-doc]. 
See the [high level usage overview][usage-overview-url] for more details about using the generator.

## Directory Structure & Content
The generator will create a new VSTS Task project that has the following content:  
  
![VSTS Task Directory Structure][vsts-dir-structure-img]

### Standard Files
All of the standard files outlined in the [boilerplate doc][boilerplate-standard-section] are included, along with a couple of VSTS task/extension specific files:

- *extension-icon.png* - This is the image/icon that will represent your task in VSTS
- *OVERVIEW.md* - Contains the information/page that will be displayed for your extension in the VSTS Marketplace
- *task.json* - Defines your task
- *vss-extension.json* - Defines your extension configuration, if you choose to package and publish your task(s) to the VSTS Marketplace

### Source Code
The application source code is contained within the 'src' directory. There are two sample starting files created:

- *main.ts*
- *helper.ts*

The 'main.ts' file is the main executable that is called by the VSTS task runner engine. This file 

[usage-overview-url]: USAGE-OVERVIEW.md
[vsts-url]: https://www.visualstudio.com/team-services/
[boilerplate-doc]: BOILERPLATE.md
[vsts-dir-structure-img]: vsts-dir-structure.png
[boilerplate-standard-section]: BOILERPLATE.md#standard-files