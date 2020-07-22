#!/usr/bin/env

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
# Use whnode_modules to keg-components
keg_run_yarn_install(){

  # Check if we should run yarn install
  # Is $KEG_NM_INSTALL doesn't exist, just return
  if [[ -z "$KEG_NM_INSTALL" ]]; then
    return
  fi

  keg_message "Running yarn install for keg-components..."
  keg_message "Switching to keg-components directory..."
  cd $COMPONENTS_PATH
  keg_add_git_key
  yarn install
  keg_remove_git_key
}

# Runs a keg-components repo
keg_run_components(){

  cd $COMPONENTS_PATH

  # Check if no exect command exists, or if it's set to web
  # Then default it to storybook
  if [[ -z "$KEG_EXEC_CMD" || "$KEG_EXEC_CMD" == 'web' ]]; then
    KEG_EXEC_CMD="sb"
  fi

  keg_message "Running command 'yarn $KEG_EXEC_CMD'"
  yarn $KEG_EXEC_CMD

}

# Checks for path overrides of the core, tap paths with passed in ENVs
keg_set_container_paths

# Run yarn install for any extra node_modules from the mounted components package.json
keg_run_yarn_install

# Start the keg core instance
keg_run_components