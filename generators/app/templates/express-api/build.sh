#!/bin/bash
npm install
if [[ $? != 0 ]]; then
    echo "Dependency install failed"
    exit 1
fi

typings install
if [[ $? != 0 ]]; then
    echo "Typings install failed"
    exit 1
fi

gulp run-unit-test
if [[ $? != 0 ]]; then
    echo "Failed to transpile or unit test successfully"
    exit 1
fi

npm prune --production
if [[ $? != 0 ]]; then
    echo "Failed to remove dev dependencies"
    exit 1
fi

# TODO: populate user/image name from inputs
docker build -t user/appname .
if [[ "$?" != "0" ]]; then
    echo "Docker build failed"
    exit 1
fi