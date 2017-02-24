# Visual Studio Code Support  
[Visual Studio Code][vscode-url] workspaces are configured via the files in the `.vscode` folder at the root of your workspace.  

### Other Node
## Debugging  
Visual Studio Code has built in support for debugging node applicaitons. Debug settings are configured in the `.vscode/launch.json` file.
After you transpile your code, start debugging by hitting `F5`.  

### Chatbot  
By default this will start your `src/server.ts` file. If you wish to interact with the bot over the console, 
you should adjust the `program` line in your `launch.json` to be `src/console.ts`.  

### Express API  
By default this will start your `src/app.ts`.  

### Other Node
By default this will start whatever file you have open and in context. Keep in mind that many files are not made to be executed like this, 
so you may need to create a little debug script in order to invoke the code you actually wish to debug. The `program` entry of the `launch.json` 
file can be edited to change this behaviour.

### Angular, Aurelia  
Coming Soon!  

## Tasks  
Tasks are defined in the `.vscode/tasks.json` file. I would highly reccomend the extension [Status Bar Tasks][tasks-extension], 
it turns you tasks into buttons at the button of VS Code.  

We provide the following tasks:  

- package install:  
- build: Cleans, Transpiles, Lints
- test: Tests & Checks Security
- clean: Removes transpiled js and js.map files
- pack: Packages your application

[vscode-doc-url]: https://code.visualstudio.com  
[tasks-extension]: https://marketplace.visualstudio.com/items?itemName=GuardRex.status-bar-tasks