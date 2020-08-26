#!/usr/bin/env

# Notes
# File for finding the correct os type, then running the setup file for that os

# Gets the os type from $OSTYPE and normalizes it
keg_get_os_type(){
  local OS_TYPE="$OSTYPE"

  if [[ "$OSTYPE" == "linux-gnu"* ]]; then
    OS_TYPE="linux"

  elif [[ "$OSTYPE" == "darwin"* ]]; then
    OS_TYPE="mac"

  elif [[ "$OSTYPE" == "cygwin" ]]; then
    OS_TYPE="linux"

  elif [[ "$OSTYPE" == "msys" ]]; then
    OS_TYPE="win"

  elif [[ "$OSTYPE" == "win32" ]]; then
    OS_TYPE="win"

  elif [[ "$OSTYPE" == "freebsd"* ]]; then
     OS_TYPE="linux"

  fi

  echo $OS_TYPE
}

# Gets the os type, and runs the setup script for it
# Example on mac
#   OS_TYPE === mac
#   SETUP_FILE === ~/keg/keg-cli/setup/scripts/mac-init.sh
keg_run_os_setup_file(){

  local OS_TYPE="$(keg_get_os_type)"
  local SETUP_FILE=$KEG_CLI_PATH/setup/scripts/$OS_TYPE-init.sh

  if [[ -f "$SETUP_FILE" ]]; then
    /bin/bash $SETUP_FILE
  else
    echo "[ KEG-CLI ] ERROR: Could not find setup script for $OS_TYPE."
    echo "[ KEG-CLI ] ERROR: Please ensure your Operating System is supported!"
  fi

}

# Run the setup script
keg_run_os_setup_file