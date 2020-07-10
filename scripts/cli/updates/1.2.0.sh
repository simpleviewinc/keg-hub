#!/usr/bin/env

. ~/keg/keg-cli/keg

source ./update_helpers


# Check for docker-sync, then asks if you want to remove it
keg_remove_docker_sync(){
  if [[ -x "$(command -v docker-sync 2>/dev/null)" ]]; then
    local ANSWER=$(keg_ask_question "Confirm remove docker-sync? (y/N):")
    if [[ "$ANSWER" == "y" || "$ANSWER" == "Y" ]]; then
      keg_message "Removing docker-sync..."
      gem uninstall docker-sync
      brew uninstall eugenmayer/dockersync/unox
      echo ""
    fi
  fi
}

# Check for unison, then asks if you want to remove it
keg_remove_unison(){
  if [[ ! -z "$(which unison)" ]]; then
    local ANSWER=$(keg_ask_question "Confirm remove unison ( Used for docker-sync )? (y/N):")
    if [[ "$ANSWER" == "y" || "$ANSWER" == "Y" ]]; then
      keg_message "Removing unison..."
      brew uninstall unison
      echo ""
    fi
  fi
}

# Check for mutagen, then installs it if it doesn't exist
keg_install_mutagen(){
  if [[ -x "$(command -v mutagen 2>/dev/null)" ]]; then
    return
  else
    brew install mutagen-io/mutagen/mutagen
    echo ""
  fi
}

keg_reset_default_env(){
  local KEG_DEFS=~/.kegConfig/defaults.env
  if [[ -f "$KEG_DEFS" ]]; then
    rm -rf ~/.kegConfig/defaults.env
  fi
}

keg_cli_1_2_0_update(){

  # Clean up docker so we can do the update
  keg_destroy_all_docker

  # Remove docker-sync from the local machine
  keg_remove_docker_sync

  # Remove unison from the local machine
  # Its a dependecy of docker-sync
  keg_remove_unison

  # Install mutagen on the local machine
  keg_install_mutagen

  # Reset the default envs
  keg_reset_default_env

  # Resync the global config
  keg config sync

  echo ""
  keg_message "1.2.0 Update Complete!"
  echo ""

}

# Run update
keg_cli_1_2_0_update "$@"