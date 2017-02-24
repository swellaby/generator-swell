# Contributing to the Swellaby Generator

This page provides some general guidelines for contriubting to the Swellaby Generator.  

2 Things you should keep in mind:  
1. Dont be an idiot!  
2. Have Fun!  

## Topics

* [Reporting issues](#reporting-issues)
* [Feature requests](#feature-requests)
* [Contribution tips and guidelines](#contribution-tips-and-guidelines)

## Reporting issues

You can help out a lot by reporting any issues you encounter when using the generator [here](https://github.com/swellaby/generator-swell/issues).  

First make sure that the issue has not already been reported. If you find that your issue has already been reported, 
you can subscribe to that issue so that you will be notified of updates. Do *not* leave random "+1" or "I have this 
too" comments, as they don't help resolve the issue. The being said, if you have additional information or suggestions 
feel free to post that.

When reporting issues, always include:

* The output of `node --version`.
* The output of `npm --version`.
* The output of `yo --version`.
* Your Operating System  
* As detailed steps as possible to recreate the issue  

**Be sure to scrub any sensetive information if you include logs**  

## Feature requests
Feature requests are welcome. We may take a request and impliment it, we may ask if you want to impliment it, amd we may reject it. 
Please first check to make sure the feature has not already been requested (or implimented).

## Contribution tips and guidelines

### Pull requests are always welcome

If you found a bug or typo feel free to open a pull request with a fix. For any significant contribution, 
please open an issue before working on it.  

Pull requests will need to pass a number of automated gates before being considered for approval. After the
gates automated gates, the pull request will be reviewed by one or more core callaborators before being merged.  

### Commit Messages

We are not commit message Nazi's but here are a few guidelines:  
- Use clear and precise language  
- Try to stick to under 50 characters  
- Stick to the what/why not the how  

[Here](https://chris.beams.io/posts/git-commit/) is a good reference if you are unsure about what a good commit message should look like.  

### Coding Rules  

Rules are strickly enforced by automated processes. Rules will be enforced by precommit hooks, automated gates, and core callaborator reviews.

The rules:

1. Test coverage will not dip below 100%
2. All code must passed the tslint rules defined [here](./tslint.json)
3. All code must passed the eslint rules defined [here](./eslintrc.js)
4. Inline linter exceptions or rule changes can be *requested* in the relevant pull request
5. Documentation should be updated to reflect new features being add and/or behaviour changes  
