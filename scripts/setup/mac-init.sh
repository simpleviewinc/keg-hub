#!/usr/bin/env

set -e
trap 'echo "Finished with exit code $?"' EXIT

# Github Repos
KEG_CLI_URL=github.com/simpleviewinc/keg-cli.git

# Check if the keg root dir has been set. If not, then set it
if [[ -z "$KEG_ROOT_DIR" ]]; then
  export KEG_ROOT_DIR=$HOME/keg
fi

export KEG_CLI_PATH=$KEG_ROOT_DIR/keg-cli
export KEG_GLOBAL_PATH=$HOME/.kegConfig

KEG_USER="$USER"
KEG_GROUP="$(id -g -n $KEG_USER)"

# If set will exit out of the script with an exit error
KEG_EXIT=""

# Size of the docker-machien virtual box hhd
KEG_VB_SIZE=48576

# Prints a message to the terminal through stderr
keg_message(){
  echo "[ KEG CLI ] $@" >&2
  return
}

# Asks a question in the terminal
keg_ask_question(){
  keg_message "$1"
  read -p "" INPUT;
  local ANSWER="${INPUT:0:1}"

  echo "$ANSWER"
}

# Reloads the .bash_profile and .bashrc if the exist
keg_src_bash(){
  # Check for .bash_profile file
  local PROFILE=~/.bash_profile
  if [[ -f "$PROFILE" ]]; then
    source $PROFILE

  else

    # Check for the .bash_rc file
    local BASH_RC=~/.bash_rc
    if [[ -f "$BASH_RC" ]]; then
      source $BASH_RC
    fi

  fi
}

# Check and install homebrew
keg_brew_install(){
  # Check for brew install
  if [[ -x "$(command -v brew 2>/dev/null)" ]]; then
    keg_message "Brew is installed"
  else
    #  Install brew
    /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
  fi
}

# Checks who owns the Ruby gems folder, and updates the owner if needed
keg_check_ruby_gem_owner(){

  local GEM_PATH=/Library/Ruby/Gems
  local GEM_OWNER="$(ls -ld "$GEM_PATH" | awk '{print $3}')"

  # Check if the gem owner is the same as the current user
  if [[ "$KEG_USER" != $GEM_OWNER ]]; then
    local ANSWER=$(keg_ask_question "Current user $KEG_USER does not own ruby gems path $GEM_PATH. Would you like to update it? (y/N):")

    if [[ "$ANSWER" == "y" || "$ANSWER" == "Y" ]]; then
      keg_message "Updating Ruby Gems folder owner..."
      sudo chown -R $KEG_USER:$KEG_GROUP $GEM_PATH

    else
      KEG_EXIT="Exiting because user does not own ruby gem path. Please update and run this script again!"
    fi
  fi

}

# Checks and install docker / docker-machine / docker-compose
keg_docker_install(){

  if [[ -x "$(command -v docker 2>/dev/null)" ]]; then
    keg_message "Docker is installed"
  else
    brew install docker
  fi

  if [[ -x "$(command -v docker-machine 2>/dev/null)" ]]; then
    keg_message "Docker-machine is installed"
  else
    brew install docker-machine
  fi

  if [[ -x "$(command -v docker-compose 2>/dev/null)" ]]; then
    keg_message "Docker-compose is installed"
  else
    brew install docker-compose
  fi

}

# Setup docker-machine to use virtualbox
# Create a new docker-machine instance
keg_setup_docker_machine(){

  keg_message "Setting up docker-machine..."

  # Ensure docker-machine starts on launch
  local BREW_DOC="$(brew services list | grep docker-machine)"
  if [[ "$BREW_DOC" ]]; then
    local BREW_SPLIT=($BREW_DOC)
    local BREW_STATUS="${BREW_SPLIT[1]}"
    if [[ "$BREW_STATUS" != "started" ]]; then
      keg_message "Starting 'brew docker-machine' service..."
      brew services start docker-machine
    else
      keg_message "The 'brew docker-machine service' is already started!"
    fi
  else
    keg_message "Starting 'brew docker-machine' service..."
    brew services start docker-machine
  fi

  local DOCKER_INSTANCE=$(docker-machine ls | grep $KEG_DOCKER_IP)
  
  if [[ "$DOCKER_INSTANCE" ]]; then
    local DOC_SPLIT=($DOCKER_INSTANCE)
    local DOC_NAME="${DOC_SPLIT[0]}"
    if [[ "$DOC_NAME" == "$KEG_DOCKER_NAME" ]]; then
      keg_message "Docker machine instance '$KEG_DOCKER_NAME' already setup!"
      return
    fi
  fi

  keg_message "Creating docker-machine instance..."
  docker-machine create --driver virtualbox --virtualbox-memory $KEG_VB_SIZE $KEG_DOCKER_NAME

  keg_message "Updating docker-machine environment..."
  docker-machine env $KEG_DOCKER_NAME

  keg_setup_static_ip

}

# Update docker-machines ip-address to be static
# So it's the same every time the instance boots
keg_setup_static_ip(){

  # Add this to the bootup script
  # Will kill the dhcp server for eth1,
  # Then sets a static ip address for the machine everytime it boots up
  echo "kill \$(more /var/run/udhcpc.eth1.pid); ifconfig eth1 $KEG_DOCKER_IP netmask $KEG_DOCKER_SUBNET_MASK broadcast $KEG_DOCKER_BROADCAST up" | docker-machine ssh $KEG_DOCKER_NAME sudo tee /var/lib/boot2docker/bootsync.sh > /dev/null

  keg_message "Stoping $KEG_DOCKER_NAME to set static ip address..."
  docker-machine stop $KEG_DOCKER_NAME

  keg_message "Starting $KEG_DOCKER_NAME with ip address => $KEG_DOCKER_IP"
  docker-machine start $KEG_DOCKER_NAME

  keg_message "Regenerating $KEG_DOCKER_NAME certs..."
  docker-machine regenerate-certs --force $KEG_DOCKER_NAME
  
  keg_message "Docker IP Address: $(docker-machine ip $KEG_DOCKER_NAME)"
  
  eval $(docker-machine env $KEG_DOCKER_NAME)
}

# Check and install virtualbox
keg_setup_virtualbox(){

  # Check for virtualbox install
  if [[ -x "$(command -v VBoxManage 2>/dev/null)" ]] && [[ -d "/Applications/VirtualBox.app" ]]; then
    keg_message "Virtualbox is installed"
  else
    brew cask install virtualbox
  fi

}

# Fixes a bug that leaves some virtual-box processes still running
keg_virtualbox_process_fix(){
  local VB_PIDS=$(ps aux | grep VB | | awk '{ print $2 }' | cut -d'/' -f1)
  # Loop over pids, and kill -9 each one
}

# Check and install nvm and node
keg_setup_nvm_node(){
  

  if [[ -d "$HOME/.nvm" ]]; then

    keg_message "NVM already installed!"
    [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"

    local NODE_VER="$(nvm current)"
    if [[ "$NODE_VER" !=  "v12.15.0" ]]; then
      nvm install 12.15.0
    fi
    
  else

    keg_message "Installing NVM"

    # Download and run the bash install script
    curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.34.0/install.sh | bash

    # Sets up NVM to be used right away
    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
    [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"

    # Install the node version
    nvm install 12.15.0
  fi

}

# Check and install yarn
keg_setup_yarn(){

  # Check for yarn install
  if [[ -x "$(command -v yarn 2>/dev/null)" ]]; then
    keg_message "Yarn is installed"
  else
    brew install yarn
  fi
  
}

# Install the dependencies for the keg-cli
keg_install_cli_dependencies(){

  local KEG_CLI_DEPS="$KEG_CLI_PATH/node_modules"
  local HAS_DEPS=""
  if [[ -d "$KEG_CLI_DEPS" ]]; then
    HAS_DEPS="$(ls -A $KEG_CLI_DEPS)"
  fi
  
  if [[ -z "$HAS_DEPS" ]]; then
    keg_message "Installing KEG-CLI node dependencies..."

    # Cache the current diretory
    local CUR_DIR=$(pwd)

    # Navigate to the keg-cli directory
    cd $KEG_CLI_PATH

    # Install the dependencies
    yarn install

    # Navigate back to the original directory
    cd $CUR_DIR
    
  else
    keg_message "KEG-CLI node dependencies already installed"
  fi

}

# Close a github repo locally
# Tries to use the $GITHUB_KEG if it exists, othwise tries to clone without it
keg_install_repo(){

  # Check if the path already exists
  if [[ -d "$2" ]]; then
    keg_message "Skipping git clone of '$2 repo'. Folder already exists!"
    return
  fi

  local USE_GIT_KEY
  # Check if there is GITHUB_KEY || GIT_KEY in the ENV, and is so use it to clone the repos
  if [[ "$GITHUB_KEY" ]]; then
    USE_GIT_KEY=$GITHUB_KEY

  elif  [[ "$GIT_KEY" ]]; then
    USE_GIT_KEY=$GIT_KEY

  fi

  # Check if USE_GIT_KEY is set, and is so use it to clone the repos
  if [[ "$USE_GIT_KEY" ]]; then
    git clone --recurse-submodules https://$USE_GIT_KEY@$1 $2
  
  # Otherwise use the a regular git clone, without the key
  else
    git clone --recurse-submodules https://$1 $2
  fi

  # Navigate to the repo, and update that it's a shared repo in the config
  cd $2
  git reset --hard HEAD
  git config core.sharedRepository group

}

# Checks if the timeout lib exists
keg_check_timeout_in_path(){
  keg_message "Checking timeout is installed..."

  # Checks that the timeout module is install
  if [[ -x "$(command -v timeout 2>/dev/null)" ]]; then
    keg_message "timeout is installed"
    return

  # If not, then use brew to install it 
  else

    # Hack to get around bug in brew coreutils
    local TIMEOUT_PATH=/usr/local/bin/timeout

    # Check if coreutils is installed
    if brew ls --versions coreutils > /dev/null; then
      keg_message "Brew coreutils is installed"

    # Otherwise install coreutils
    else
      keg_message "Installing brew coreutils"
      brew install coreutils

    fi

    # # Ensure the timeout gets symlinked to the bin
    local TIMEOUT_PATH="/usr/local/bin/timeout"
    if [[ -f "$TIMEOUT_PATH" || -h "$TIMEOUT_PATH" ]]; then
      keg_message "Timeout is in bin"
      return

    # Symlink gtimeout to timeout
    else
      keg_message "Setting up timeout sym-link..."
      sudo ln -s /usr/local/bin/gtimeout /usr/local/bin/timeout

    fi

  fi
}

# Checks the bash_profile and bashrc files for entries of the keg-cli
# If not found, it will add it; and reload the bash file
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

  # If no bash file is found, create the bash_profile
  if [[ ! -f "$BASH_FILE" ]]; then
    # Create the file if it does not exist
    keg_message ".bash file not found, creating at $BASH_FILE"
    touch $BASH_FILE
  fi

  # Check if the keg cli is installed, and if not, add it to bash file
  if grep -Fq $KEG_CLI_PATH/keg "$BASH_FILE"; then
    keg_message "KEG-CLI already added to $BASH_FILE"
  else

    # TODO: Add check for NVM => export NVM_DIR=
    # The entry for the keg should come before the NVM entry
    # We need to load the keg-cli and $GIT_KEY before loading NVM

    keg_message "Adding KEG-CLI to $BASH_FILE"
    echo "" >> $BASH_FILE
    echo "source $KEG_CLI_PATH/keg" >> $BASH_FILE

  fi

}

keg_remove_from_bash(){
  keg_message "Removing keg from terminal profile..."

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

  # If no bash file is found, then nothing to remove
  if [[ ! -f "$BASH_FILE" ]]; then
    return
  fi
  
  grep -v "source $KEG_CLI_PATH/keg" $BASH_FILE > $BASH_FILE.tmp; mv $BASH_FILE.tmp $BASH_FILE

}

# Installs the keg-cli, and clones the keg-core / keg-componets repos locally
# Updates the bash_profile to source the keg-cli when loaded!
keg_check_cli_dirs(){

  # Check if the keg-cli install directory exists
  # If not, then create it, and set it's permissions to the current user/group
  if [[ ! -d "$KEG_ROOT_DIR" ]]; then
    keg_message "Creating /keg directory..."
    sudo mkdir -p $KEG_ROOT_DIR
    
    sudo chown -R $KEG_USER:$KEG_GROUP $KEG_ROOT_DIR
  fi

  cd $KEG_ROOT_DIR

  if [[ ! -d "$KEG_CLI_URL" ]]; then
    # Clone the needed key repos
    keg_install_repo $KEG_CLI_URL keg-cli
  fi

  # Update the bash profile to include the keg-cli bash commands
  keg_check_bash_file

}

# Uninstalls a package from brew
keg_uninstall_brew_package(){

  local PACK_NAME="$2"
  if [[ -z "$2" ]]; then
    PACK_NAME="$1"
  fi

  local ANSWER=$(keg_ask_question "Confirm remove $PACK_NAME? (y/N):")
  if [[ "$ANSWER" == "y" || "$ANSWER" == "Y" ]]; then
    keg_message "Removing $PACK_NAME..."
    brew uninstall $1
  fi

}

# Removes all install docker software
keg_clean_all(){

  keg_remove_from_bash

  keg_uninstall_brew_package "mutagen-io/mutagen/mutagen"
  keg_uninstall_brew_package "docker-compose"

  docker-machine rm $KEG_DOCKER_NAME
  keg_uninstall_brew_package "docker-machine"
  
  keg_uninstall_brew_package "docker"
  keg_uninstall_brew_package "github/gh/gh" "Github CLI"
  keg_uninstall_brew_package "coreutils" "coreutils ( timeout )"

  keg_remove_virtual_box

}

# Removes virtual box from the machine
keg_remove_virtual_box(){

  keg_message "Checking if virtualbox is installed!"

  if [[ -d "/Applications/VirtualBox.app" ]]; then
    local ANSWER=$(keg_ask_question "Confirm remove Virtual Box? (y/N):")
    if [[ "$ANSWER" == "y" || "$ANSWER" == "Y" ]]; then
      keg_message "Removing virtualbox..."
      brew cask uninstall virtualbox
    else
      keg_message "Skipping virtualbox removal!"
    fi
  fi

}

# Removes the currently running docker-machine instnace
# Then reinstalls it
keg_reset_docker_machine(){
  docker-machine rm $KEG_DOCKER_NAME
  keg_setup_docker_machine
}

# Removes all installed keg-cli software, including the github keg repos
keg_uninstall_all(){
  keg_clean_all

  if [[ -d "$KEG_ROOT_DIR" ]] && [[ "$KEG_ROOT_DIR" != "/" ]]; then
    local ANSWER=$(keg_ask_question "Confirm remove $KEG_ROOT_DIR? (y/N):")
    if [[ "$ANSWER" == "y" || "$ANSWER" == "Y" ]]; then
      sudo rm -rf $KEG_ROOT_DIR
    fi
  fi

  # Remove the global config folder that holds all the user settings
  keg_remove_global_config

}

# Adds the docker machine-envs to the current session
keg_add_machine_envs(){

  keg_message "Loading docker-machine envs"
  local KEG_DM_ENVS=$KEG_CLI_PATH/scripts/setup/docker-machine.env

  # Ensure the env file exists
  if [[ -f "$KEG_DM_ENVS" ]]; then
    keg_message "Setting docker-machine envs" >&2
    # Load the docker-machine ENVs, but route the output to dev/null
    # This way nothing is printed to the terminal
    set -o allexport
    source $KEG_DM_ENVS >/dev/null 2>&1
    set +o allexport
  else
    # Print message, and direct to stderr, so it's not captured in stdout
    keg_message "Missing ENV file as $KEG_DM_ENVS" >&2
    keg_message  "Can not run setup script" >&2
  fi

}

# Adds act package, which allows testing github actions locally through docker
keg_install_github_cli(){

  # Check for yarn install
  if [[ -x "$(command -v gh 2>/dev/null)" ]]; then
    keg_message "Github CLI is installed"
  else
    brew install github/gh/gh
  fi

}

# Runs the node KEG-CLI config setup script
keg_cli_config_setup(){
  node $KEG_CLI_PATH/scripts/cli/configSetup.js
}

# Check and create the global config folder if it doesn't exist
keg_check_global_config(){

  # Ensure global cli config folder exists
  if [[ ! -d "$KEG_GLOBAL_PATH" ]]; then
    keg_message "Creating global config folder at $KEG_GLOBAL_PATH"
    mkdir -p $KEG_GLOBAL_PATH
  fi

}

# Checks and removes the global config folder if it exists
keg_remove_global_config(){

  if [[ -d "$KEG_GLOBAL_PATH" ]]; then

    local ANSWER=$(keg_ask_question "Confirm remove $KEG_GLOBAL_PATH? (y/N):")
    if [[ "$ANSWER" == "y" || "$ANSWER" == "Y" ]]; then
      keg_message "Removing global config folder at $KEG_GLOBAL_PATH"
      rm -rf $KEG_GLOBAL_PATH
    fi

  fi

}

keg_setup_mutagen(){
  if [[ -x "$(command -v mutagen 2>/dev/null)" ]]; then
    keg_message "Mutagen is installed"
  else
    brew install mutagen-io/mutagen/mutagen
  fi
}

# Runs methods to setup the keg-cli, with docker and vagrant
# Params
#   * $1 - (Optional) - Section of the setup script to run
#     * If it does not exist, all setup sections are run
keg_setup(){

  # Determin the setup type
  local SETUP_TYPE=$1

  # Uninstalls keg-cli and docker software
  # To run:
  # bash mac-init.sh uninstall
  #  * Runs only the uninstall portion of this script
  if [[ "$SETUP_TYPE" == "uninstall" ]]; then
    keg_uninstall_all
    return
  fi

  # Removes all installed docker software, and recreates it
  # To run:
  # bash mac-init.sh clean
  #  * Runs only the clean portion of this script
  if [[ "$SETUP_TYPE" == "clean" || "$SETUP_TYPE" == "uninstall" ]]; then
    keg_clean_all
    return
  fi

  # Remove currently running docker-machine, and remakes it
  # To run:
  # bash mac-init.sh docker-reset
  #  * Runs only the docker-reset portion of this script
  if [[ "$SETUP_TYPE" == "docker-reset" || "$SETUP_TYPE" == "docre" ]]; then
    keg_message "Reseting docker-machine..."
    keg_reset_docker_machine "${@:2}"
    return
  fi

  # Remove the virtual-box software, and reinstall it
  # To run:
  # bash mac-init.sh vb-reset
  #  * Runs only the vb-reset portion of this script
  if [[ "$SETUP_TYPE" == "vb-reset" ]]; then
    keg_remove_virtual_box
    INIT_SETUP="true"
  fi

  # Remove the installed software, and reinstall it
  # To run:
  # bash mac-init.sh reset
  #  * Runs only the reset portion of this script
  if [[ "$SETUP_TYPE" == "reset" ]]; then
    keg_message "Reseting keg-cli..."
    keg_clean_all
    # Set INIT_SETUP to true, so all below processes run
    INIT_SETUP="true"
  fi

  # To run:
  # bash mac-init.sh
  #  * Full install
  #  * Should be run when first setting up the machine
  #  * Running `bash mac-init.sh init` will do the same thing
  if [[ -z "$SETUP_TYPE" || "$SETUP_TYPE" == "init" ]]; then
    INIT_SETUP="true"
  fi

  # Validate the ruby gems owner
  # To run:
  # bash mac-init.sh gem
  #  * Runs only the gem portion of this script
  if [[ -z "$KEG_EXIT" ]] && [[ -z "$INIT_SETUP" || "$SETUP_TYPE" == "gem" ]]; then
    keg_message "Checking for gem path owner..."
    keg_check_ruby_gem_owner
  fi

  # Setup and install brew
  # To run:
  # bash mac-init.sh brew
  #  * Runs only the brew portion of this script
  if [[ -z "$KEG_EXIT" ]] && [[ "$INIT_SETUP" || "$SETUP_TYPE" == "brew" ]]; then
    keg_message "Checking for brew install..."
    keg_brew_install "${@:2}"
  fi

  # Setup and install github cli
  # To run:
  # bash mac-init.sh gh
  #  * Runs only the gh portion of this script
  if [[ -z "$KEG_EXIT" ]] && [[ "$INIT_SETUP" || "$SETUP_TYPE" == "gh" ]]; then
    keg_message "Checking for github cli install..."
    keg_install_github_cli
  fi

  # Setup and install timeout
  # To run:
  # bash mac-init.sh timeout
  #  * Runs only the timeout portion of this script
  if [[ -z "$KEG_EXIT" ]] && [[ "$INIT_SETUP" || "$SETUP_TYPE" == "timeout" ]]; then
    keg_message "Checking for timeout install..."
    keg_check_timeout_in_path
  fi


  # Setup and install docker
  # To run:
  # bash mac-init.sh docker
  #  * Runs only the docker portion of this script
  if [[ -z "$KEG_EXIT" ]] && [[ "$INIT_SETUP" || "$SETUP_TYPE" == "docker" ]]; then
    keg_message "Checking for docker install..."
    keg_docker_install "${@:2}"
  fi

  # Setup and install virtualbox
  # To run:
  # bash mac-init.sh virtualbox
  #  * Runs only the virtualbox portion of this script
  if [[ -z "$KEG_EXIT" ]] && [[ "$INIT_SETUP" || "$SETUP_TYPE" == "virtualbox" ]]; then
    keg_message "Checking for virtualbox install..."
    keg_setup_virtualbox "${@:2}"
  fi

  # Setup and install machine
  # To run:
  # bash mac-init.sh machine
  #  * Runs only the docker-machine portion of this script
  if [[ -z "$KEG_EXIT" ]] && [[ "$INIT_SETUP" || "$SETUP_TYPE" == "machine" ]]; then
    keg_message "Checking if docker-machine is setup..."
    keg_setup_docker_machine "${@:2}"
  fi


  # Setup and install machine
  # To run:
  # bash mac-init.sh machine
  #  * Runs only the docker-machine portion of this script
  if [[ -z "$KEG_EXIT" ]] && [[ "$INIT_SETUP" || "$SETUP_TYPE" == "mutagen" || "$SETUP_TYPE" == "sync" ]]; then
    keg_message "Checking if mutagen is setup..."
    keg_setup_mutagen "${@:2}"
  fi

  # Setup and install node
  # To run:
  # bash mac-init.sh node
  #  * Runs only the node portion of this script
  if [[ -z "$KEG_EXIT" ]] && [[ "$INIT_SETUP" || "$SETUP_TYPE" == "node" ]]; then
    keg_message "Checking for node install..."
    keg_setup_nvm_node "${@:2}"
  fi

  # Setup and install yarn
  # To run:
  # bash mac-init.sh yarn
  #  * Runs only the yarn portion of this script
  if [[ -z "$KEG_EXIT" ]] && [[ "$INIT_SETUP" || "$SETUP_TYPE" == "yarn" ]]; then
    keg_message "Checking for yarn install..."
    keg_setup_yarn "${@:2}"
  fi

  # Setup and install cli
  # To run:
  # bash mac-init.sh cli
  #  * Runs only the keg cli portion of this script
  if [[ -z "$KEG_EXIT" ]] && [[ "$INIT_SETUP" || "$SETUP_TYPE" == "cli" ]]; then
    keg_message "Checking KEG-CLI install..."
    keg_check_cli_dirs "${@:2}"
  fi

  # Setup and install cli deps
  # To run:
  # bash mac-init.sh nm
  #  * Runs only the node_modules portion of this scrip
  if [[ -z "$KEG_EXIT" ]] && [[ "$INIT_SETUP" || "$SETUP_TYPE" == "node_modules" ]]; then
    keg_message "Checking KEG-CLI node dependencies..."
    keg_install_cli_dependencies
  fi

  if [[ -z "$KEG_EXIT" ]] && [[ "$INIT_SETUP" || "$SETUP_TYPE" == "config" ]]; then
    keg_message "Running KEG-CLI config setup..."
    keg_cli_config_setup "${@:2}"

    if [[ "$SETUP_TYPE" == "config" ]]; then
      return
    fi

  fi

  # If exit error is set, print and return
  if [[ "$KEG_EXIT" ]]; then
    echo "[ KEG ERROR ] $KEG_EXIT" >&2
    return
  fi

  echo ""
  keg_message "--------------------------------------------- [ KEG CLI ]"
  echo ""
  echo "                       Keg CLI setup complete!"
  echo "                     Run source ~/.bash_profile"
  echo "            Or open a new terminal window to use the it!"
  echo ""
  keg_message "--------------------------------------------- [ KEG CLI ]"
  echo ""

}

keg_init_setup(){

  # Check that the keg-cli directories have been setup
  keg_check_cli_dirs
  
  # Check that the global config folder exists
  keg_check_global_config

  # Unset these envs so we can validate that the current envs get loaded
  unset KEG_DOCKER_IP
  unset KEG_DOCKER_NAME

  # Re-add all machine envs including $KEG_DOCKER_IP && $KEG_DOCKER_NAME
  keg_add_machine_envs

  # Ensure the ENVs were reset, so we can properly setup the keg-cli
  # $KEG_DOCKER_IP && $KEG_DOCKER_NAME should now be reset from keg_add_machine_envs
  if [[ "$KEG_DOCKER_IP" && "$KEG_DOCKER_NAME" ]]; then
    keg_setup "$@"

  # Show message if setup ENVs could not be set
  else
    keg_message "Error running keg-cli setup. Could not set keg-cli setup ENVs!"
    exit 1
  fi

}

# Call init setup to start the setup proccess
keg_init_setup "$@"