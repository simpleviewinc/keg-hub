#!/bin/bash

# Set the location of the globalConfig
export KEG_GLOBAL_CONFIG=/root/.kegConfig/cli.config.json
# Set the location of the keg-hub directory
export KEG_ROOT_DIR=/keg-hub
# Ensure we are not using docker-machine
export KEG_NO_MACHINE=true
# Tell the CLI that we are auto-loading it
export KEG_CLI_AUTO_LOAD=true

# Load the keg-cli
source /keg-hub/repos/keg-cli/keg

# Call the keg with the passed in arguments
keg "$@"
