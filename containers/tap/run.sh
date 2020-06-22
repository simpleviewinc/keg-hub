#!/bin/bash

TAP_PATH=/keg/tap
CLI_PATH=/keg/keg-cli
CORE_PATH=/keg/tap/node_modules/keg-core
TAP_NM_CACHE=/keg/nm-cache/tap

keg_message(){
  echo $"[ KEG-CLI ] $1" >&2
  return
}

# Add the yarn global bin to the path
keg_add_yarn_bin_to_path(){
  # Adds the yarn globaly installed .bin to the $PATH
  # This allows calling expo-cli
  export PATH="/usr/local/share/.config/yarn/global/node_modules/.bin:$PATH"
}

# Overwrite the default cli, core, tap paths with passed in ENVs
keg_set_container_paths(){

  if [[ "$DOC_CLI_PATH" ]]; then
    CLI_PATH="$DOC_CLI_PATH"
  fi

  if [[ "$DOC_CORE_PATH" ]]; then
    CORE_PATH="$DOC_CORE_PATH"
  fi

  if [[ "$DOC_APP_PATH" ]]; then
    TAP_PATH="$DOC_APP_PATH"
  fi

  if [[ "$NM_CACHE" ]]; then
    TAP_NM_CACHE="$NM_CACHE"
  fi

}

# Runs yarn install at run time
# Use when adding extra node_modules to keg-core without rebuilding
keg_run_tap_yarn_setup(){

  # Check if $NM_INSTALL exist and that $TAP_NM_CACHE path exists
  # If either does not, then can't install node_modules, so return
  if [[ -z "$NM_INSTALL" || -z "$TAP_NM_CACHE" ]]; then
    return
  fi

  if [[ "$NM_INSTALL" != "core" ]]; then
    # Navigate to the cached directory, and run the yarn install here
    cd $TAP_NM_CACHE
    keg_message "Running yarn setup for tap..."
    yarn install
  fi
  
  if [[ "$NM_INSTALL" ]]; then
    keg_message "Running yarn install for keg-core..."
    cd $DOC_CORE_PATH
    yarn install
  fi

}

# Copies over the locally cached node_modules
keg_copy_node_modules(){

  # ensure we know where the node_module cache is
  if [[ -z "$TAP_NM_CACHE" ]]; then
    return
  fi

  # Copy recursivly (-r) and prompt before overwrite (-i)
  # Then pipe to dev/null, so we hide the overwrite prompts
  keg_message "Running node_modules copy from cache to tap..."
  false | cp -ir $TAP_NM_CACHE/node_modules/. $DOC_APP_PATH/node_modules 2>/dev/null

  keg_message "Running node_modules copy from cache to keg-core..."
  false | cp -ir $TAP_NM_CACHE/node_modules/keg-core/node_modules/. $DOC_CORE_PATH/node_modules 2>/dev/null

}

# Runs a Tap
keg_run_the_tap(){

  cd $TAP_PATH

  local KEG_EXEC_CMD="$EXEC_CMD"
  if [[ -z "$KEG_EXEC_CMD" ]]; then
    KEG_EXEC_CMD="web"
  fi

  keg_message "Running command 'yarn $KEG_EXEC_CMD'"
  yarn $KEG_EXEC_CMD

}

# Add yarn global bin to the $PATH ENV
keg_add_yarn_bin_to_path

# Run yarn setup for any extra node_modules to be installed from the mounted tap's package.json
keg_run_tap_yarn_setup

# Copies over the locally cached node_modules into the apps node_modules
keg_copy_node_modules

# Start the keg core instance
keg_run_the_tap