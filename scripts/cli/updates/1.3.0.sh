#!/usr/bin/env

source $(pwd)/keg

source $(pwd)/scripts/cli/updates/update_helpers.sh

keg_reset_default_env(){
  local KEG_DEFS=~/.kegConfig/defaults.env
  if [[ -f "$KEG_DEFS" ]]; then
    rm -rf ~/.kegConfig/defaults.env
  fi

  cp $(pwd)/scripts/setup/defaults.env ~/.kegConfig/defaults.env
}

keg_cli_1_3_0_update(){

  keg_message "Running update for version 1.3.0..."

  keg_reset_default_env

  local RUNNING_CONT="$(command docker ps -aq)"
  if [[ "$RUNNING_CONT" ]]; then
    keg_error "All docker containers must be stopped before updating!"
    return
  fi
  
  keg_docker_clean "$@"

  # Resync the global config
  keg config sync --confirm false
  keg config set --key cli.settings.checkUpdates --value true --confirm false

  keg d build base --cache false

  echo ""
  keg_message "1.3.0 Update Complete!"
  echo ""

}

keg_cli_1_3_0_update "$@"