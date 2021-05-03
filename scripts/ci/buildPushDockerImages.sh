#!/bin/bash

# Exit when any command fails
set -e

# Source the keg-cli so we have access to it
export KEG_CLI_PATH=${KEG_CLI_PATH:=../..}
source $KEG_CLI_PATH/keg

# Ensure the build tag is set
if [ -z "$KEG_BUILD_TAG" ]; then
  KEG_BUILD_TAG='develop'
fi

# Overwrite the defualt tag if the first argument exists
if [ "$1" ]; then
  KEG_BUILD_TAG="$1"
fi

# Log a message to the terminal
keg_message(){
  echo "::debug::[ KEG CLI ] $@"
}

keg_clean_docker(){
  keg_message "Cleaning docker images..."
  keg d clean -f
}

keg_build_repo () {
  keg_message "Building $1:$2 image..."
  keg "$1" build --push --tag "$2" --no-cache
}

# Build all the keg-hub images 
keg_build_images(){

  # Clear out any old docker images so we start fresh
  keg_clean_docker

  # only build one repo if the env is set
  if [[ ! -z "$KEG_REPO" ]]; then
    keg_build_repo $KEG_REPO $KEG_BUILD_TAG
    return 
  fi

  # otherwise build and push each keg-hub image
  for REPO in base core components tap retheme
  do
    keg_build_repo $REPO $KEG_BUILD_TAG
  done
}

# Kick off the image builds and pushes
keg_build_images