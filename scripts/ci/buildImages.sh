#!/bin/bash

# Exit when any command fails
set -e

# Log a message to the terminal
keg_message(){
  echo "::debug::[ KEG CLI ] $@"
}

# Setup the config paths for the global cli config 
keg_message "Setting up Keg-CLI required envs"
[[ "$KEG_ROOT" ]] || KEG_ROOT=$(pwd)
[[ "$KEG_CLI_PATH" ]] || export KEG_CLI_PATH="$KEG_ROOT/repos/keg-cli"
[[ "$KEG_CONFIG_PATH" ]] || export KEG_CONFIG_PATH="$KEG_CLI_PATH/.kegConfig"
[[ "$KEG_CONFIG_FILE" ]] || export KEG_CONFIG_FILE="cli.config.json"
[[ "$KEG_GLOBAL_CONFIG" ]] || export KEG_GLOBAL_CONFIG="$KEG_CONFIG_PATH/$KEG_CONFIG_FILE"

# Source the keg-cli so we have access to it
keg_message "Adding Keg-CLI to active session"
. $KEG_CLI_PATH/keg

# Ensure the build tag is set
if [ -z "$KEG_BUILD_TAG" ]; then
  KEG_BUILD_TAG='master'
fi

# Overwrite the defualt tag if the first argument exists
if [ "$1" ]; then
  KEG_BUILD_TAG="$1"
fi

# Build all the keg-hub images 
keg_build_images(){
  keg_message "Building keg-base:$KEG_BUILD_TAG image..."
  keg base build --push --tag $KEG_BUILD_TAG --no-cache

  keg_message "Building keg-core:$KEG_BUILD_TAG image..."
  keg core build --push --tag $KEG_BUILD_TAG --no-cache

  keg_message "Building keg-components:$KEG_BUILD_TAG image..."
  keg components build --push --tag $KEG_BUILD_TAG --no-cache

  keg_message "Building tap:$KEG_BUILD_TAG image..."
  keg tap build --push --tag $KEG_BUILD_TAG --no-cache
}

# Kick off the image builds and pushes
keg_build_images