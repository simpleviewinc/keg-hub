#!/usr/bin/env

source $(pwd)/keg

source $(pwd)/scripts/cli/updates/update_helpers.sh

keg_cli_1_4_1_update(){

  keg_message "Running update for version 1.4.1..."

  local RUNNING_CONT="$(command docker ps -aq)"
  if [[ "$RUNNING_CONT" ]]; then
    keg_error "All docker containers must be stopped before updating!"
    return
  fi
  
  keg_docker_clean "$@"

  # Resync the global config
  keg config sync --confirm false
  keg config set --key cli.settings.checkUpdates --value true --confirm false
  keg config set --key cli.settings.defaultEnv --value development --confirm false

  keg d build base --cache false

  echo ""
  keg_message "1.4.1 Update Complete!"
  echo ""

}

keg_cli_1_4_1_update "$@"
