#!/bin/bash

# Exit when any command fails
set -e

[[ "$KEG_ROOT" ]] || KEG_ROOT=$(pwd)

export KEG_CLI_PATH="$KEG_ROOT/repos/keg-cli"

echo "::debug::Keg-CLI will be installed to $KEG_CLI_PATH"

# Loop over the repos and run the passed in command on them
keg_setup_cli(){

  echo "::debug::Cloning keg-cli from github..."

  # Clone keg-hub into the root directory
  git clone https://github.com/simpleviewinc/keg-cli.git $KEG_CLI_PATH

  # Setup the config paths for the global cli config 
  export KEG_CONFIG_PATH=$KEG_CLI_PATH/.kegConfig
  export KEG_CONFIG_FILE=cli.config.json

  echo "::debug::Setting up keg-cli global config"
  echo "::debug::Keg-CLI global config path is $KEG_CONFIG_PATH"
  # Ensure the global config folder exists
  mkdir -p $KEG_CONFIG_PATH

  # Setup the global config for the keg-cli
  node $KEG_CLI_PATH/scripts/ci/setupCLIConfig.js

  local KEG_GLOBAL_CONFIG=$KEG_CONFIG_PATH/cli.config.json
  if [[ -f "$KEG_GLOBAL_CONFIG" ]]; then
    export KEG_GLOBAL_CONFIG
  else
    echo "Keg-CLI global config file does not exist at $KEG_GLOBAL_CONFIG" 1>&2
    echo "::debug::Keg-CLI global config file does not exist at $KEG_GLOBAL_CONFIG"
    exit 1
  fi

}

keg_setup_cli "$@"