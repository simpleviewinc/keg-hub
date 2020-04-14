#!/bin/bash

TAP_PATH=/keg/tap
CLI_PATH=/keg/cli
DOCKER_PATH=/keg/cli/scripts/docker
CORE_PATH=/keg/tap/node_modules/keg-core


keg_message(){
  echo $"[ KEG-CLI ] $1" >&2
  return
}

keg_run_tap_yarn_setup(){

  keg_message "Running yarn setup for tap..."
  keg_message "Switching to tap directory..."
  cd $TAP_PATH
  yarn setup
}

keg_run_from_core(){

  cd $TAP_PATH
  
  local KEG_EXEC_CMD="$EXEC_CMD"
  if [[ -z "$KEG_EXEC_CMD" ]]; then
    KEG_EXEC_CMD="web"
  fi

  keg_message "Running command yarn $KEG_EXEC_CMD"
  yarn $KEG_EXEC_CMD

}

# Run yarn setup for any extra node_modules to be installed form the mounted tap
keg_run_tap_yarn_setup

# Start the keg core instance
keg_run_from_core