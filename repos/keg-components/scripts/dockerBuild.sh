#!/bin/bash
# 
# Command to build the keg-sessions component with in the tap docker container, then copy to the host build folder
# This ensures a consistent environment when compiling the component
# At somepoint we could also automate pushing the component to NPM / Github / etc..
# 

if [[ -z "$KEG_CLI_PATH" ]]; then
  echo "[ KEG ERROR ] Keg-CLI path not set! Ensure the env \"KEG_CLI_PATH\" is set before running this command!" >&2
  exit 1
fi

# Ensure the keg-cli is loaded
source $KEG_CLI_PATH/keg

# Move to the events-force directory
keg components

# Path to the taps local build folder
LOCAL_BUILD_DIR=$(pwd)/build

# Remove the local build folder if it exists
if [[ -d "$LOCAL_BUILD_DIR" ]]; then
  rm -rf $LOCAL_BUILD_DIR
fi

# Run the build command in the tap docker container
keg d ex context=components cmd=\"yarn build\"

# Command to build keg-component, and copy it from the docker container
# This is just to test building keg-components to ensure changes are reflected in that build
keg d cp context=components source=docker remote=/keg/tap/build local=$LOCAL_BUILD_DIR
