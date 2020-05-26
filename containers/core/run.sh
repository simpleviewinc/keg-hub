#!/bin/bash

# Default path ENVs
CLI_PATH=/keg/keg-cli
CORE_PATH=/keg/keg-core

keg_message(){
  echo $"[ KEG-CLI ] $1" >&2
  return
}

# Overwrite the default cli and core paths with passed in ENVs
keg_set_container_paths(){
  if [[ "$DOC_CLI_PATH" ]]; then
    CLI_PATH="$DOC_CLI_PATH"
  fi

  if [[ "$DOC_CORE_PATH" ]]; then
    CORE_PATH="$DOC_CORE_PATH"
  fi
}

# Runs yarn install at run time
# Use when adding extra node_modules to keg-core without rebuilding
keg_run_yarn_install(){

  # Check if we should run yarn install
  # Is $NM_INSTALL doesn't exist, just return
  if [[ -z "$NM_INSTALL" ]]; then
    return
  fi

  keg_message "Running yarn setup for keg-core..."
  keg_message "Switching to keg-core directory..."
  cd $CORE_PATH
  yarn install

}

# Runs keg-core application without a tap
keg_run_from_core(){

  cd $CORE_PATH

  # Default to running keg-core in a web-browser
  local KEG_EXEC_CMD="$EXEC_CMD"

  # Set the default yarn command to start
  if [[ -z "$KEG_EXEC_CMD" ]]; then
    KEG_EXEC_CMD="web"
  fi

  keg_message "Running command yarn $KEG_EXEC_CMD"
  yarn $KEG_EXEC_CMD

}

# Set the container paths in case they have been overwritten
keg_set_container_paths

# Run yarn setup for any extra node_modules to be installed form the mounted volume
keg_run_yarn_install

# Start the keg core instance
keg_run_from_core