# generator-swell **** Currently in Alpha ****  

**** Note this is currently in Alpha ****  
  
Highly opinionated [Yeoman][yeoman-url] generator for various types of [Node.js][nodejs-url], Angular and Aurelia projects with [TypeScript][typescript-url]. Yes, there are
others out there, but we wanted one that gave us a 100% of what we need. Pull Requests we like (and that pass all the automated gates) will be happily accepted.

[![NPM Version Badge][npmjs-version-badge]][npmjs-package-url]
[![NPM Stats Badge](https://nodei.co/npm/generator-swell.png)](https://nodei.co/npm/generator-swell/)
[![npm][npmjs-downloads-badge]][npmjs-package-url]  
  
[![Travis CI Badge][travis-ci-build-status-badge]][travis-ci-url]
[![Circle CI Badge][circle-ci-build-status-badge]][circle-ci-url]
[![Code Climate Badge][code-climate-status-badge]][code-climate-url]
[![Codecov Badge][codecov-badge]][codecov-url]
[![Coveralls Badge][coveralls-badge]][coveralls-url]
[![SonarQube Coverage Badge][sonarqube-coverage-badge]][sonarqube-coverage-url]
[![SonarQube Tech Debt Badge][sonarqube-techdebt-badge]][sonarqube-techdebt-url]
[![SonarQube Maintainability Badge][sonarqube-maintainability-badge]][sonarqube-maintainability-url]

## Installation

Ensure you have the necessary prerequisites outlined below. Then install the generator globally (note, you may need to use sudo):
```sh
npm i -g generator-swell
```

### Prerequisites
This should be pretty obvious, but just in case here is what you will need:

- [Node.js][nodejs-url] We are developing on 7.x, but we also run our tests against 4.x, 5.x, 6.x, and 7.x
- [Yeoman][yeoman-url] 

If you don't have [Yeoman][yeoman-url] installed globally (note, you may need to use sudo):
```sh
npm i -g yo
```

## Running
```sh
yo swell
```

More usage details to come..
Note you will need to cd into the newly created directory if you specify an app name that is different than the name of the directory you execute the yo command from.

[npmjs-version-badge]: https://img.shields.io/npm/v/generator-swell.svg
[npmjs-downloads-badge]: https://img.shields.io/npm/dt/generator-swell.svg
[npmjs-package-url]: https://www.npmjs.com/package/generator-swell
[yeoman-url]: http://yeoman.io
[nodejs-url]: https://nodejs.org/
[typescript-url]: http://www.typescriptlang.org/
[git-download-url]: https://git-scm.com/download
[travis-ci-build-status-badge]: https://travis-ci.org/swellaby/generator-swell.svg?branch=master
[travis-ci-url]: https://travis-ci.org/swellaby/generator-swell
[circle-ci-build-status-badge]: https://circleci.com/gh/swellaby/generator-swell.svg?style=shield
[circle-ci-url]: https://circleci.com/gh/swellaby/generator-swell
[code-climate-status-badge]: https://codeclimate.com/github/swellaby/generator-swell/badges/gpa.svg
[code-climate-url]: https://codeclimate.com/github/swellaby/generator-swell
[sonarqube-coverage-badge]: https://img.shields.io/sonar/http/sonarqube.com/swellaby:generator-swell/coverage.svg
[sonarqube-coverage-url]: https://sonarqube.com/component_measures/metric/coverage/list?id=swellaby%3Agenerator-swell
[sonarqube-techdebt-badge]: https://img.shields.io/sonar/http/sonarqube.com/swellaby:generator-swell/tech_debt.svg
[sonarqube-techdebt-url]: https://sonarqube.com/component_measures/metric/sqale_index/list?id=swellaby%3Agenerator-swell
[sonarqube-maintainability-badge]: https://img.shields.io/sonar/http/sonarqube.com/swellaby:generator-swell/sqale_rating.svg
[sonarqube-maintainability-url]: https://sonarqube.com/component_measures/metric/sqale_rating/list?id=swellaby%3Agenerator-swell
[codecov-badge]: https://codecov.io/gh/swellaby/generator-swell/branch/master/graph/badge.svg
[codecov-url]: https://codecov.io/gh/swellaby/generator-swell
[coveralls-badge]: https://coveralls.io/repos/github/swellaby/generator-swell/badge.svg
[coveralls-url]: https://coveralls.io/github/swellaby/generator-swell