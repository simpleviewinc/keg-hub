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

# Add the yarn global bin to the path
keg_add_yarn_bin_to_path(){
  # Adds the yarn globaly installed .bin to the $PATH
  # This allows calling expo-cli
  export PATH="/usr/local/share/.config/yarn/global/node_modules/.bin:$PATH"
}



# Runs yarn install at run time
# Use whnode_modules to keg-components
keg_run_yarn_install(){

  # Check if we should run yarn install
  # Is $NM_INSTALL doesn't exist, just return
  if [[ -z "$NM_INSTALL" ]]; then
    return
  fi

  keg_message "Running yarn install for keg-components..."
  keg_message "Switching to keg-components directory..."
  cd $NM_CACHE
  yarn install
}

# Copies over the locally cached node_modules
keg_copy_node_modules(){

  # ensure we know where the node_module cache is
  if [[ -z "$NM_CACHE" ]]; then
    return
  fi

  # Copy recursivly (-r) and prompt before overwrite (-i)
  # Then pipe to dev/null, so we hide the overwrite prompts
  keg_message "Running node_modules copy from cache to keg-components..."
  false | cp -ir $NM_CACHE/node_modules/. $DOC_APP_PATH/node_modules 2>/dev/null

}

# Runs a keg-components repo
keg_run_components(){

  cd $COMPONENTS_PATH

  local KEG_EXEC_CMD="$EXEC_CMD"

  # Check if no exect command exists, or if it's set to web
  # Then default it to storybook
  if [[ -z "$KEG_EXEC_CMD" || "$KEG_EXEC_CMD" == 'web' ]]; then
    KEG_EXEC_CMD="storybook"
  fi

  keg_message "Running command 'yarn $KEG_EXEC_CMD'"
  yarn $KEG_EXEC_CMD

}

# Add yarn global bin to the $PATH ENV
keg_add_yarn_bin_to_path

# Run yarn install for any extra node_modules from the mounted components package.json
keg_run_yarn_install

# Copies over the locally cached node_modules into the apps node_modules
keg_copy_node_modules

# Start the keg core instance
keg_run_components