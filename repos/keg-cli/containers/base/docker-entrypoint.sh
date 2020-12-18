#!/bin/bash

# Set the location of the globalConfig
export KEG_GLOBAL_CONFIG=$HOME/.kegConfig

# Ensure the directory exists
mkdir -p $KEG_GLOBAL_CONFIG

# Set the location of the keg-hub directory
export KEG_ROOT_DIR=/keg-hub

# If no git keg it set, the add a placeholder
if [[ -z "$PUBLIC_GIT_KEY" ]]; then
  export PUBLIC_GIT_KEY=12345678
fi

# Load the keg-cli
source /keg-hub/repos/keg-cli/keg
