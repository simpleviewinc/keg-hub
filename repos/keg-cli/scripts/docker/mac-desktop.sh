#!/bin/bash

set -e
trap 'echo "Finished with exit code $?"' EXIT

# Location of the keg-cli config folder
KEG_CONFIG=~/.kegConfig

# Location to donwload the docker.dmg to
DOCKER_DMG_PATH=$KEG_CONFIG/Docker.dmg

# Applications folder, where the docker app will be installed
APPLICATIONS='/Applications'

# Will hold the name of the docker.dml volume; i.e. /volumes/Docker
DOCKER_VOL="/Volumes/Docker"

# Will hold the name of the docker.dml app; i.e. /volumes/Docker/Docker.app
DOCKER_APP="Docker.app"

# Global var to check if this is an initial setup
INIT_SETUP=""

# Global var to track the setup type
SETUP_TYPE=""

# If set will exit out of the script with an exit error
KEG_EXIT=""

# Prints a message to the terminal through stderr
keg_message(){
  echo "[ KEG CLI ] $@" >&2
  return
}

# Prints a message to the terminal through stderr
keg_error(){
  echo "[ KEG ERROR ] $@" >&2
  return
}

# Asks a question in the terminal
keg_ask_question(){
  keg_message "$1"
  read -p "" INPUT;
  local ANSWER="${INPUT:0:1}"

  echo "$ANSWER"
}

# Uninstalls a package from brew, allows us to re-use code for remove packages
keg_uninstall_brew_package(){

  local PACK_NAME="$2"
  if [[ -z "$2" ]]; then
    PACK_NAME="$1"
  fi

  local ANSWER=$(keg_ask_question "Confirm remove $PACK_NAME? (y/N):")
  if [[ "$ANSWER" == "y" || "$ANSWER" == "Y" ]]; then

    keg_message "Removing $PACK_NAME..."
    local RESP=$(brew uninstall $1)
    local SYM="/usr/local/bin/$1"

    if [[ -f "$SYM" ]]; then
      keg_message "Removing $1 symlink at ($SYM) ..."
      rm -f $SYM
    fi
  fi

}

# Removed the ENVs related to docker-machine
keg_unset_envs(){
  unset DOCKER_TLS_VERIFY
  unset DOCKER_CERT_PATH
  unset DOCKER_MACHINE_NAME
  unset DOCKER_HOST
  unset KEG_DOCKER_IP
  unset KEG_DOCKER_BROADCAST
  unset KEG_DOCKER_SUBNET_MASK
  unset KEG_DOCKER_NAME
}

# Make sure the docker-machine docker-keg is stopped and removed
keg_stop_docker_keg(){
  if [[ -x "$(command -v docker-machine 2>/dev/null)" ]]; then
    keg_message "Removing docker-keg from docker-machine..."
    docker-machine stop docker-keg
    yes | docker-machine rm docker-keg
  fi
}

# Uninstall docker-machine and the docker/docker-compose versions tied to it
keg_uninstall_docker(){

  keg_message "Removing Homebrew apps..."

  local HAS_DC="$(brew ls --versions docker-compose)"
  if [[  -z "$HAS_DC" ]]; then
    keg_message "Homebrew package for docker-compose already removed!"
  else
    keg_uninstall_brew_package "docker-compose"
  fi

  local HAS_DM="$(brew ls --versions docker-machine)"
  if [[  -z "$HAS_DM" ]]; then
    keg_message "Homebrew package for docker-machine already removed!"
  else
    keg_uninstall_brew_package "docker-machine"
  fi

  local HAS_DOC="$(brew ls --versions docker)"
  if [[  -z "$HAS_DOC" ]]; then
    keg_message "Homebrew package for docker already removed!"
  else
    keg_uninstall_brew_package "docker"
  fi

}

keg_remove_machine_meta(){
  local DOC_META=~/.docker/machine
  if [[ -d "$DOC_META" ]]; then
    keg_message "Removing docker-machine metadata ..."
    rm -rf ~/.docker/machine
  fi
}

# Cleans up and remove the docker-machine setup for keg-cli
keg_remove_docker_machine(){

  if [[ -z "$KEG_EXIT" ]] && [[ "$INIT_SETUP" || "$SETUP_TYPE" == "unset" ]]; then
    keg_unset_envs
  fi

  if [[ -z "$KEG_EXIT" ]] && [[ "$INIT_SETUP" || "$SETUP_TYPE" == "stop" ]]; then
    local RESP=$(keg_stop_docker_keg)
  fi

  if [[ -z "$KEG_EXIT" ]] && [[ "$INIT_SETUP" || "$SETUP_TYPE" == "rm" ]]; then
    keg_uninstall_docker
  fi
  
  if [[ -z "$KEG_EXIT" ]] && [[ "$INIT_SETUP" || "$SETUP_TYPE" == "rm" ]]; then
    keg_remove_machine_meta
  fi

}

# Checks if docker-for-desktop app is already installed
keg_check_docker_app(){
  local DOCKER_APP_PATH="$APPLICATIONS/$DOCKER_APP"
  if [[ -d "$DOCKER_APP_PATH" ]]; then
    open -a "$DOCKER_APP_PATH"
    echo "true"
  fi
}

# Download the docker.dmg from the docker site
keg_download_install_docker(){
  keg_message "Downloading docker.dmg ($DOCKER_DMG_PATH) ..."
  curl -# -L -o $DOCKER_DMG_PATH https://download.docker.com/mac/stable/Docker.dmg
}

# Mound the docker volume, and get it's name
keg_mount_docker_volume(){
  keg_message "Mounting docker.dmg ..."
  DOCKER_VOL=`hdiutil mount $DOCKER_DMG_PATH | tail -n1 | perl -nle '/(\/Volumes\/[^ ]+)/; print $1'`
  
  if [[ -z "$DOCKER_VOL" ]]; then
    KEG_EXIT="Could not find the docker volume name!"
    return
  else
    keg_message "Docker.dmg mounted ($DOCKER_VOL)"
  fi
}

# Copy the contents of the docker volume app into the /Applications directory
keg_copy_docker_app(){

  keg_message "Installing docker ..."
  local DOCKER_PATH="$DOCKER_VOL/$DOCKER_APP"
  local DOCKER_APP_PATH="$APPLICATIONS/$DOCKER_APP"

  yes | cp -ir $DOCKER_PATH $DOCKER_APP_PATH

  if [[ -d "$DOCKER_APP_PATH" ]]; then
    open -a "$DOCKER_APP_PATH"
  else
    KEG_EXIT="Could not find the docker app in the volume $DOCKER_VOL!"
  fi

}

# Remove the mounted docker volume and downloded docker.dmg file
keg_unmount_docker_volume(){
  # hdiutil unmount "/Volumes/Docker.app"
  keg_message "Cleaning up temp files ..."
  hdiutil unmount $DOCKER_VOL -quiet
  rm $DOCKER_DMG_PATH
}

# Checks the user bash file for the KEG_NO_MACHINE env
# If it exists do nothing, otherwise add it
keg_check_bash_file(){

  keg_message "Checking bash profile for KEG-CLI..."

  # Check if the bashfile exists
  local BASHRC_FILE

  # Check for .bash file
  local PROFILE=~/.bash_profile
  local BRC=~/.bashrc
  if [[ -f "$PROFILE" ]]; then
    BASH_FILE="$PROFILE"
  elif [[ -f "$BRC" ]]; then
    BASH_FILE="$BRC"
  fi

  local HAS_NO_MACH_ENV="$(cat "$BASH_FILE" | grep "KEG_NO_MACHINE=true")"

  # Check if the keg cli is installed, and if not, add it to bash file
  if [[ -z "$HAS_NO_MACH_ENV" ]]; then
    echo "export KEG_NO_MACHINE=true" >> $BASH_FILE
  else
    keg_message "KEG_NO_MACHINE already added to $BASH_FILE"
  fi

}

# Prints out the docker version to confirm the install
keg_print_docker_versions(){
  echo ""
  keg_message "Finished installing docker-desktop!"
  echo ""
}

# Downloads and installs the docker for mac app
keg_install_docker_desktop(){

  # Check if docker-for-desktop is already install
  local HAS_DOCKER_APP="$(keg_check_docker_app)"
  if [[ "$HAS_DOCKER_APP" ]]; then
    keg_message "Docker for Desktop app already installed!"
    keg_message "exiting ..."
    return
  fi

  # Determin the setup type
  local SETUP_TYPE=$1

  # If no argument is passed the set INIT_SETUP
  # All actions will be run when INIT_SETUP is true
  if [[ -z "$SETUP_TYPE" || "$SETUP_TYPE" == "init" ]]; then
    INIT_SETUP="true"
  fi

  # Download the Docker-Desktop mac app
  if [[ -z "$KEG_EXIT" ]] && [[ "$INIT_SETUP" || "$SETUP_TYPE" == "download" ]]; then
    keg_download_install_docker
  fi

  local IS_MOUNTED
  # Mounts the downloaded app at a volume on the machine
  if [[ -z "$KEG_EXIT" ]] && [[ "$INIT_SETUP" || "$SETUP_TYPE" == "mount" || "$SETUP_TYPE" == "install" ]]; then
    keg_mount_docker_volume
    IS_MOUNTED="true"
  fi

  # Copys the docker app to the Applications folders
  # Must be mouned first
  if [[ -z "$KEG_EXIT" ]] && [[ "$INIT_SETUP" || "$SETUP_TYPE" == "copy" || "$SETUP_TYPE" == "install" ]]; then
    if [[ "$IS_MOUNTED" == "true" ]]; then
      keg_copy_docker_app
    fi
  fi

  # Removes the mounted docker app volume
  # Must be mounted first
  if [[ -z "$KEG_EXIT" ]] && [[ "$INIT_SETUP" || "$SETUP_TYPE" == "clean" || "$SETUP_TYPE" == "install" ]]; then
    if [[ "$IS_MOUNTED" == "true" ]]; then
      keg_unmount_docker_volume
    fi
  fi

  # Check the users bashc file for KEG_NO_MACHINE env
  # Adds it if needed
  if [[ -z "$KEG_EXIT" ]] && [[ "$INIT_SETUP" || "$SETUP_TYPE" == "clean" || "$SETUP_TYPE" == "bash" ]]; then
    keg_check_bash_file
  fi

}

# Kicks of the migration process from docker-machine to docker-desktop for mac
keg_init_migration(){

  # Set the setup type base on the first passed in argument
  SETUP_TYPE=$1

  # If no argument is passed the set INIT_SETUP
  # All actions will be run when INIT_SETUP is true
  if [[ -z "$SETUP_TYPE" || "$SETUP_TYPE" == "init" ]]; then
    INIT_SETUP="true"
  fi

  # Remove docker-machine
  keg_remove_docker_machine "$@"

  # Install docker-for-desktop
  keg_install_docker_desktop "$@"

  # If exit error is set, print and return
  if [[ "$KEG_EXIT" ]]; then
    echo "[ KEG ERROR ] $KEG_EXIT" >&2
    exit 1
  fi

  keg_print_docker_versions

  echo ""
  keg_message "--------------------------------------------- [ KEG CLI ]"
  echo ""
  echo "                       Docker Migration complete!"
  echo "     Open docker from the /Applications folder to get started!"
  echo ""
  keg_message "--------------------------------------------- [ KEG CLI ]"
  echo ""

}

# Kick off the migration
keg_init_migration "$@"
