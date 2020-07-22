#!/usr/bin/env

TAP_PATH=/keg/tap
CLI_PATH=/keg/keg-cli
CORE_PATH=/keg/tap/node_modules/keg-core

keg_message(){
  echo $"[ KEG-CLI ] $1" >&2
  return
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

# Add .npmrc so node_modules installs does not fail
keg_add_git_key(){
  git config --global url.https://$GIT_KEY@github.com/.insteadOf https://github.com/
  echo "@simpleviewinc:registry=https://npm.pkg.github.com/" > .npmrc
  echo "//npm.pkg.github.com/:_authToken=${GIT_KEY}" >> .npmrc
}

# Remove .npmrc so git key is not saved
keg_remove_git_key(){
  git config --global url.https://github.com/.insteadOf url.https://$GIT_KEY@github.com/
  rm -rf .npmrc
}

# Runs yarn install at run time
# Use when adding extra node_modules to keg-core without rebuilding
keg_run_tap_yarn_setup(){

  # Check if $KEG_NM_INSTALL exist, if it doesn't, then return
  if [[ -z "$KEG_NM_INSTALL" ]]; then
    return
  fi

  if [[ "$KEG_NM_INSTALL" != "core" ]]; then
    # Navigate to the cached directory, and run the yarn install here
    cd $TAP_PATH
    keg_add_git_key
    keg_message "Running yarn setup for tap..."
    yarn install
    keg_remove_git_key
  fi
  
  if [[ "$KEG_NM_INSTALL" ]]; then
    keg_message "Running yarn install for keg-core..."
    cd $DOC_CORE_PATH
    keg_add_git_key
    yarn install
    keg_remove_git_key
  fi

}

# Runs a Tap
keg_run_the_tap(){

  cd $TAP_PATH

  if [[ -z "$KEG_EXEC_CMD" ]]; then
    KEG_EXEC_CMD="web"
  fi

  keg_message "Running command 'yarn $KEG_EXEC_CMD'"
  yarn $KEG_EXEC_CMD

}

# Checks for path overrides of the core, tap paths with passed in ENVs
keg_set_container_paths

# Run yarn setup for any extra node_modules to be installed
keg_run_tap_yarn_setup

# Start the keg core instance
keg_run_the_tap
