#!/usr/bin/env

# Default path ENVs
DOC_APP_PATH=/keg/keg-core

keg_message(){
  echo $"[ KEG-CLI ] $1" >&2
  return
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

  # Check if $KEG_NM_INSTALL exist, if it doesn't, then return
  if [[ -z "$KEG_NM_INSTALL" ]]; then
    return
  fi

  # Navigate to the cached directory, and run the yarn install here
  keg_message "Running yarn install for keg-core..."
  cd $DOC_APP_PATH
  yarn install

}


# Runs keg-core application without a tap
keg_run_from_core(){

  cd $DOC_APP_PATH

  # Set the default yarn command to start
  if [[ -z "$KEG_EXEC_CMD" ]]; then
    KEG_EXEC_CMD="web"
  fi

  keg_message "Running command yarn $KEG_EXEC_CMD"
  yarn $KEG_EXEC_CMD

}

# If the no KEG_DOCKER_EXEC env is set, just sleep forever
# This is to keep our container running forever
if [[ -z "$KEG_DOCKER_EXEC" ]]; then
  tail -f /dev/null
  exit 0

else

  # Checks for path overrides of the core, tap paths with passed in ENVs
  keg_set_container_paths

  # Run yarn install for any extra node_modules to be installed form the mounted volume
  keg_run_yarn_install

  # Start the keg core instance
  keg_run_from_core

fi
