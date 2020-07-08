#!/usr/bin/env

# Default path ENVs
DOC_APP_PATH=/keg/keg-core

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

# Overwrite the default cli and core paths with passed in ENVs
keg_set_container_paths(){

  if [[ "$DOC_CORE_PATH" ]]; then
    DOC_APP_PATH="$DOC_CORE_PATH"
  fi

}

# Runs yarn install at run time
# Use when adding extra node_modules to keg-core without rebuilding
keg_run_yarn_install(){

  # Check if $NM_INSTALL exist, if it doesn't, then return
  if [[ -z "$NM_INSTALL" ]]; then
    return
  fi

  # Navigate to the cached directory, and run the yarn install here
  cd $DOC_APP_PATH
  keg_message "Running yarn install for keg-core..."
  yarn install

}


# Runs keg-core application without a tap
keg_run_from_core(){

  cd $DOC_APP_PATH

  # Default to running keg-core in a web-browser
  local KEG_EXEC_CMD="$EXEC_CMD"

  # Set the default yarn command to start
  if [[ -z "$KEG_EXEC_CMD" ]]; then
    KEG_EXEC_CMD="web"
  fi

  keg_message "Running command yarn $KEG_EXEC_CMD"
  yarn $KEG_EXEC_CMD

}

# Add yarn global bin to the $PATH ENV
keg_add_yarn_bin_to_path

# Set the container paths in case they have been overwritten
keg_set_container_paths

# Run yarn install for any extra node_modules to be installed form the mounted volume
keg_run_yarn_install

# Start the keg core instance
keg_run_from_core
