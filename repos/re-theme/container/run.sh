#!/usr/bin/env

export SUPPRESS_SUPPORT=1

APP_PATH=/keg/app

# If DOC_APP_PATH env is passed override the default app path
if [[ "$DOC_APP_PATH" ]]; then
  APP_PATH="$DOC_APP_PATH"
fi

# Helper to print a message to the terminal
keg_message(){
  echo $"[ KEG-CLI ] $1" >&2
  return
}

# Runs yarn install at run time
# Use when adding extra node_modules to keg-core without rebuilding
keg_run_app_yarn_setup(){

  # Check if $KEG_NM_INSTALL exist, if it doesn't, then return
  if [[ -z "$KEG_NM_INSTALL" ]]; then
    return
  fi

  # Navigate to the app directory, and run the yarn install here
  cd $APP_PATH

  keg_message "Running yarn setup for app..."
  yarn setup

}

# Runs retheme build / watch proccess automatically
# This way the build for the app matches the codebase
keg_retheme_watch_build(){
  
  cd $APP_PATH
  keg_message "Starting bundler for ReTheme"
  yarn dev 2> retheme.log &
}

# Uses yarn link, to link the re-theme lib to the local app
keg_setup_retheme_link(){

  local BUILD_PATH=$APP_PATH/app/node_modules/@simpleviewinc/re-theme/build
  rm -rf $BUILD_PATH

  # Symlink the re-theme build dir to the app node_module build dir
  cp -R $APP_PATH/build $BUILD_PATH

}

# Runs a yarn command from the package.json
keg_run_the_app(){

  cd $APP_PATH

  # Check if no exect command exists, or if it's set to web
  # Then default it to run the re-theme app
  if [[ -z "$KEG_EXEC_CMD" || "$KEG_EXEC_CMD" == 'web' ]]; then
    KEG_EXEC_CMD="app"
  fi

  keg_message "Running command 'yarn $KEG_EXEC_CMD'"
  yarn $KEG_EXEC_CMD

}

# If the no KEG_DOCKER_EXEC env is set, just sleep forever
# This is to keep our container running forever
if [[ -z "$KEG_DOCKER_EXEC" ]]; then
  tail -f /dev/null
  exit 0

else

  # Run yarn setup for any extra node_modules to be installed
  keg_run_app_yarn_setup

  # Link the main retheme repo into the demo app
  keg_setup_retheme_link

  # Start the retheme build / watch proccess
  keg_retheme_watch_build

  # Start the retheme app
  keg_run_the_app "$@"
fi



