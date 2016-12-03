# generator-swellaby-node
[![Build Status](https://travis-ci.org/swellaby/generator-swellaby-node.svg?branch=master)](https://travis-ci.org/swellaby/generator-swellaby-node)
[![Code Climate](https://codeclimate.com/github/swellaby/generator-swellaby-node/badges/gpa.svg)](https://codeclimate.com/github/swellaby/generator-swellaby-node)
[![SonarQube Coverage](https://img.shields.io/sonar/http/sonarqube.com/swellaby:generator-swellaby-node/coverage.svg)](https://sonarqube.com/component_measures/metric/coverage/list?id=swellaby%3Agenerator-swellaby-node)
[![SonarQube Coverage](https://img.shields.io/sonar/http/sonarqube.com/swellaby:generator-swellaby-node/tech_debt.svg)](https://sonarqube.com/component_measures/metric/sqale_index/list?id=swellaby%3Agenerator-swellaby-node)
[![SonarQube Coverage](https://img.shields.io/sonar/http/sonarqube.com/swellaby:generator-swellaby-node/sqale_rating.svg)](https://sonarqube.com/component_measures/metric/sqale_rating/list?id=swellaby%3Agenerator-swellaby-node)


Yeoman generator for various types of projects with Node and TypeScript

## Running (temporarily until we publish to npm)
We're assuming you already have Node.js and git installed, because let's be honest.. you should.

If you don't have yeoman installed:
```sh
npm i -g yo
```

```sh
git clone https://github.com/swellaby/generator-swellaby-node && cd generator-swellaby-node
npm i
npm link
cd ..
yo swellaby-node
```

Note you will need to cd into the newly created directory if you specify an app name that is different than the name of the directory you execute the yo command from.
