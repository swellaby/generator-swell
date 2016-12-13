#!/bin/bash

FORCE="y"
usage() {
  cat <<EOF

Usage: $0 
          -n <build-number>  - The resulting image will be tagged, W.X.Y.Z; W.X.Y coming from package.json and Z coming from this arg
          -f <force> - If anything other than "y", the build will stop if unit tests fail. Defaults to "y"
EOF
}

unset BUILD_NUMBER 
while getopts "n:f:h" opt ; do
  case $opt in
    n) BUILD_NUMBER=$OPTARG;;
    f) FORCE=$OPTARG;;
    h) usage; exit 0;;
    ?) usage; exit 1;;
  esac
done

if [[ -z "$BUILD_NUMBER" ]] ;  then
    echo "Build Number not provided using 0"
    BUILD_NUMBER=0
fi

npm install
if [[ $? != 0 ]]; then
    echo "Dependency install failed"
    exit 1
fi

npm run build
if [[ $? != 0 ]]; then
    echo "Transpile Failed"
    exit 1
fi

npm run test
if [[ $? != 0 ]]; then
    echo "Unit Test Run Failed"
    if [[ "$FORCE" != "y" ]]; then
        echo "Force not set, failing build"
        exit 1
    else
        echo "Force set, BEWARE YOUR UNIT TESTS ARE FAILING!"
    fi
fi

npm prune --production
if [[ $? != 0 ]]; then
    echo "Failed to remove dev dependencies"
    exit 1
fi

IMAGE_TAG=$(cat package.json | grep -o 'version": ".*"' | sed 's/"//g' | cut -d " " -f 2).$BUILD_NUMBER
IMAGE_NAME=<%= dockerUser %>/<%= appName %>
docker build -t $IMAGE_NAME .
if [[ $? != 0 ]]; then
    echo "Docker build failed"
    exit 1
fi

docker tag  $IMAGE_NAME:latest $IMAGE_NAME:$IMAGE_TAG
