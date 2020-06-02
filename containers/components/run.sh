#!/bin/bash

COMPONENTS_PATH=/keg/keg-components
CLI_PATH=/keg/keg-cli

keg_message(){
  echo $"[ KEG-CLI ] $1" >&2
  return
}

# Overwrite the default cli, core, components paths with passed in ENVs
keg_set_container_paths(){
  
  if [[ "$DOC_CLI_PATH" ]]; then
    CLI_PATH="$DOC_CLI_PATH"
  fi

  if [[ "$DOC_COMPONENTS_PATH" ]]; then
    COMPONENTS_PATH="$DOC_COMPONENTS_PATH"
  fi

}

# Runs yarn install at run time
# Use when adding extra node_modules to keg-core without rebuilding
keg_run_tap_yarn_setup(){

  # Check if we should run yarn install
  # Is $NM_INSTALL doesn't exist, just return
  if [[ -z "$NM_INSTALL" ]]; then
    return
  fi

  keg_message "Running yarn install for keg-components..."
  keg_message "Switching to keg-components directory..."
  cd $COMPONENTS_PATH
  yarn install
}

# Runs a Tap
keg_run_the_components(){

  cd $COMPONENTS_PATH

  local KEG_EXEC_CMD="$EXEC_CMD"
  if [[ -z "$KEG_EXEC_CMD" ]]; then
    KEG_EXEC_CMD="web"
  fi

  keg_message "Running command 'yarn $KEG_EXEC_CMD'"
  yarn $KEG_EXEC_CMD

}

# Run yarn setup for any extra node_modules to be installed from the mounted tap's package.json
keg_run_tap_yarn_setup

# Start the keg core instance
keg_run_the_components