#!/bin/bash
#
# Command to build the retheme with in the tap docker container, then copy to the host build folder
# This ensures a consistent environment when compiling the library
# At somepoint we could also automate pushing the build to NPM / Github / etc..
#

# Set the default context to be retheme. Can be overridden when this script is called
KEG_CONTEXT=retheme
RETHEME_PATH=/keg/tap

keg_ensure_cli_loaded(){
  if [[ -z "$KEG_CLI_PATH" ]]; then
    echo "[ KEG ERROR ] Keg-CLI path not set! Ensure the env \"KEG_CLI_PATH\" is set before running this command!" >&2
    exit 1
  fi

  # Ensure the keg-cli is loaded
  source $KEG_CLI_PATH/keg
}

keg_set_context(){
  # Call the keg_context first to ensure we move to the retheme repo
  keg $KEG_CONTEXT

  # Then check if the context should be updated
  if [[ "$1" ]]; then
    KEG_CONTEXT=$1
  fi
}

keg_setup_repo(){
  if [[ "$KEG_CONTEXT" != "retheme"  ]]; then
    RETHEME_PATH=/keg/tap/node_modules/keg-core/node_modules/@keg-hub/re-theme
  fi

  # Path to the taps local build folder
  LOCAL_BUILD_DIR=$(pwd)/build

  # Remove the local build folder if it exists
  if [[ -d "$LOCAL_BUILD_DIR" ]]; then
    rm -rf $LOCAL_BUILD_DIR
  fi
}

keg_run_build_command(){
  # Run the build command in the tap docker container
  # keg d ex context=tap cmd=\"yarn build\" workdir=/keg/tap/node_modules/keg-core/node_modules/@keg-hub/re-theme
  keg d ex context=$KEG_CONTEXT cmd=\"yarn build\" workdir=$RETHEME_PATH
}

keg_run_copy_command(){
  # Command to build keg-component, and copy it from the docker container
  # This is just to test building retheme to ensure changes are reflected in that build
  keg d cp context=$KEG_CONTEXT source=docker remote=$RETHEME_PATH/build local=$LOCAL_BUILD_DIR
}

keg_ensure_cli_loaded

keg_set_context "$1"

keg_setup_repo

keg_run_build_command

keg_run_copy_command