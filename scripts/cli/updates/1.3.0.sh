#!/usr/bin/env

source $(pwd)/scripts/cli/updates/update_helpers.sh

keg_cli_1_3_0_update(){

  keg_message "Keg CLI 1.3.0 update script"

  # local RUNNING_CONT="$(command docker ps -aq)"
  
  
  
  # if [[ "$RUNNING_CONT" ]]; then
  #   keg_message "All docker containers must be stopped before updating!"
  #   return
  # fi

  # keg_docker_clean "$@"

}

# Updates

# Global
#   defaults.env
#     - IMAGE_FROM => KEG_IMAGE_FROM  (force)
#   cli.config.json
#     settings
#       checkUpdates => true (force)
keg_cli_1_3_0_update "$@"