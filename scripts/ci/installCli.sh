#!/bin/bash

# Exit when any command fails
set -e


# Installs the keg-cli into the workflow
# Which then allows running keg-cli commands
keg_install_cli(){
  git clone https://github.com/lancetipton/keg-cli.git ../keg-cli
  cd ../keg-cli
  local KEG_CLI_PATH=$(pwd)
  yarn install --ignore-engines --frozen-lockfile --silent

}


keg_install_cli "$@"