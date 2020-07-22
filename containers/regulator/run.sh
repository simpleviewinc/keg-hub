#!/usr/bin/env

if [[ "$1" == "sleep" ]]; then
  tail -f /dev/null
  exit 0
fi

TEST_PATH=/keg/keg-regulator

keg_message(){
  echo $"[ KEG-CLI ] $1" >&2
  return
}

# Overwrite the default cli, core, regulator paths with passed in ENVs
keg_set_container_paths(){

  if [[ "$DOC_APP_PATH" ]]; then
    TEST_PATH="$DOC_APP_PATH"
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
keg_run_regulator_yarn_setup(){

  # Check if $KEG_NM_INSTALL exist, if it doesn't, then return
  if [[ -z "$KEG_NM_INSTALL" ]]; then
    return
  fi

  # Navigate to the cached directory, and run the yarn install here
  cd $TEST_PATH
  keg_message "Running yarn setup for regulator..."
  keg_add_git_key
  yarn install
  keg_remove_git_key

}

# Runs a Tap
keg_run_the_regulator(){

  cd $TEST_PATH

  if [[ -z "$KEG_EXEC_CMD" ]]; then
    KEG_EXEC_CMD="cli"
  fi

  keg_message "Running command 'yarn $KEG_EXEC_CMD'"
  yarn $KEG_EXEC_CMD

}

# Checks for path overrides of the core, tap paths with passed in ENVs
keg_set_container_paths

# Run yarn setup for any extra node_modules from the mounted regulator's package.json
keg_run_regulator_yarn_setup

# Start the keg regulator cli
keg_run_the_regulator

