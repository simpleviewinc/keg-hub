#!/usr/bin/env

TAP_PATH=/keg/tap
CLI_PATH=/keg/keg-cli
CORE_PATH=/keg/tap/node_modules/keg-core

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

}

# Runs yarn install at run time
# Use when adding extra node_modules to keg-core without rebuilding
keg_run_tap_yarn_setup(){

  # Check if $NM_INSTALL exist, if it doesn't, then return
  if [[ -z "$NM_INSTALL" ]]; then
    return
  fi

  if [[ "$NM_INSTALL" != "core" ]]; then
    # Navigate to the cached directory, and run the yarn install here
    cd $TAP_PATH
    keg_message "Running yarn setup for tap..."
    yarn install
  fi
  
  if [[ "$NM_INSTALL" ]]; then
    keg_message "Running yarn install for keg-core..."
    cd $DOC_CORE_PATH
    yarn install
  fi

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

# Start the keg core instance
keg_run_the_tap
