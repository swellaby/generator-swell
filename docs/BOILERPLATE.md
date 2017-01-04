# Boilerplate
All project types include all of the content outlined below. You can choose the first option 'New App with just the boilerplate' for the project type 
if you only want these files.

## Directory Structure & Files
The generator will create the following boilerplate directory structure and files for you. Note that if you pick a different project type, then the generator may
create additional files and/or directories for you. Also note that you won't have the 'node_modules' directory if you tell the generator to not install dependencies for your project.  
  
![Directory Structure][boilerplate-dir-image]  
  
See the below sections for detailed information about the [standard files][standard-section], [gulp tasks/building][building-section], [linting][linting-section],
[testing with mocha and istanbul][testing-section], [git hooks][git-hooks-section], and [npm scripts][npm-scripts-section].


## Standard Files
Naturally, the below common files are created for you. 

- .gitignore
- package.json
- README.md
- .npmignore
- tsconfig.json

## Gulp & Building
There is a gulpfile.js created in the root of the project directory, however, all of the gulp tasks are defined within the 'tasks' subdirectory within the 'build' directory.

![Gulp Tasks][gulp-tasks-image]  
  
The configuration values for the various gulp tasks are contained with the files prefixed with '*-config.js'. The individual gulp tasks are contained within the respective files
under the 'tasks' directory.

## Linting

## Testing

### Coverage

## Git Hooks

## NPM Scripts


[building-section]: BOILERPLATE.md#gulp-&-building
[gulp-tasks-image]: gulp-tasks.png "Gulp Tasks"
[linting-section]: BOILERPLATE.md#linting
[testing-section]: BOILERPLATE.md#testing
[boilerplate-dir-image]: boilerplate-dir-structure.png "Boilerplate Directory Structure"
[standard-section]: BOILERPLATE.md#standard-files
[git-hooks-section]: BOILERPLATE.md#git-hooks
[npm-scripts-section]: BOILERPLATE.md#npm-scripts