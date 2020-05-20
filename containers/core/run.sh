#!/bin/bash

CLI_PATH=/keg/cli
CORE_PATH=/keg/tap/node_modules/keg-core

keg_message(){
  echo $"[ KEG-CLI ] $1" >&2
  return
}

keg_set_container_paths(){
  if [[ "$DOC_CLI_PATH" ]]; then
    CLI_PATH="$DOC_CLI_PATH"
  fi

  if [[ "$DOC_CORE_PATH" ]]; then
    CORE_PATH="$DOC_CORE_PATH"
  fi
}


keg_run_yarn_setup(){

  if [[ "$KEG_INSTALL" ]]; then
    keg_message "Running yarn setup for keg-core..."
    keg_message "Switching to keg-core directory..."
    cd $CORE_PATH
    yarn setup
  fi
}

keg_run_from_core(){

  cd $CORE_PATH

  local KEG_EXEC_CMD="$EXEC_CMD"
  if [[ -z "$KEG_EXEC_CMD" ]]; then
    KEG_EXEC_CMD="web"
  fi

  keg_message "Running command yarn $KEG_EXEC_CMD"
  yarn $KEG_EXEC_CMD

}

# Set the container paths in case they have been overwritten
keg_set_container_paths

# Run yarn setup for any extra node_modules to be installed form the mounted volume
keg_run_yarn_setup

# Start the keg core instance
keg_run_from_core