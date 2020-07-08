#!/bin/sh

if [[ "$1" == "sleep" ]]; then
  tail -f /dev/null
  exit 0
fi

TEST_PATH=/keg/keg-regulator

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

# Overwrite the default cli, core, regulator paths with passed in ENVs
keg_set_container_paths(){

  if [[ "$DOC_APP_PATH" ]]; then
    TEST_PATH="$DOC_APP_PATH"
  fi

}

# Runs yarn install at run time
# Use when adding extra node_modules to keg-core without rebuilding
keg_run_regulator_yarn_setup(){

  # Check if $NM_INSTALL exist, if it doesn't, then return
  if [[ -z "$NM_INSTALL" ]]; then
    return
  fi

  # Navigate to the cached directory, and run the yarn install here
  cd $TEST_PATH
  keg_message "Running yarn setup for regulator..."
  yarn install

}

# Runs a Tap
keg_run_the_regulator(){

  cd $TEST_PATH

  local KEG_EXEC_CMD="$EXEC_CMD"
  if [[ -z "$KEG_EXEC_CMD" ]]; then
    KEG_EXEC_CMD="cli"
  fi

  keg_message "Running command 'yarn $KEG_EXEC_CMD'"
  yarn $KEG_EXEC_CMD

}

# Add yarn global bin to the $PATH ENV
keg_add_yarn_bin_to_path

# Run yarn setup for any extra node_modules from the mounted regulator's package.json
keg_run_regulator_yarn_setup

# Start the keg regulator cli
keg_run_the_regulator

