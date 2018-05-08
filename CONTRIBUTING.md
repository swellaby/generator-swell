# Contributing to the Swellaby Generator

This page provides some general guidelines for contriubting to the Swellaby Generator.  

## Topics

* [Opening issues](#opening-issues)
* [Feature requests](#feature-requests)
* [Contribution tips and guidelines](#contribution-tips-and-guidelines)

## Opening Issues
Click the below links to create a new issue:

- [Report a bug][create-bug-url]
- [Request an enhancement or feature][create-enhancement-url]
- [Ask a question][create-question-url]

**Be sure to scrub any sensetive information if you include logs**  

## Contribution tips and guidelines

### Pull requests are always welcome

If you found a bug or typo feel free to open a pull request with a fix. For any significant contribution, 
please open an issue before working on it.  

Pull requests will need to pass a number of automated gates before being considered for approval. After the automated gates pass, 
the pull request will be reviewed by one or more core callaborators before being merged.  

Swellaby members should create a branch within the repository, make changes there, and then submit a PR. 

Outside contributors should fork the repository, make changes in the fork, and then submit a PR.

### Commit Messages

We are not commit message police but here are a few guidelines:  
- Use clear and precise language  
- Try to stick to under 50 characters  
- Stick to the what/why not the how  

[Here](https://chris.beams.io/posts/git-commit/) is a good reference if you are unsure about what a good commit message should look like.  

### Coding Rules  

Rules will be enforced by precommit hooks, automated gates, and core callaborator reviews.

The rules:

1. Test coverage will not dip below 100%
2. All code must pass the tslint rules defined [here](./tslint.json)
3. All code must pass the eslint rules defined [here](./.eslintrc.js)
4. Inline linter exceptions or rule changes can be *requested* in the relevant pull request
5. Documentation should be updated to reflect new features being add and/or behaviour changes  

[create-bug-url]: https://github.com/swellaby/generator-swell/issues/new?template=BUG_TEMPLATE.md&labels=bug,unreviewed&title=Bug:%20
[create-question-url]: https://github.com/swellaby/generator-swell/issues/new?template=QUESTION_TEMPLATE.md&labels=question,unreviewed&title=Q:%20
[create-enhancement-url]: https://github.com/swellaby/generator-swell/issues/new?template=ENHANCEMENT_TEMPLATE.md&labels=enhancement,unreviewed&title=E:%20
