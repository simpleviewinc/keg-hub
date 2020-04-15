#!/bin/bash


keg_message(){
  echo "[ KEG CLI ] $@" >&2
  return
}


# Check and install homebrew
mac_brew_install(){
  # Check for brew install
  if [[ -x "$(command -v brew)" ]]; then
    keg_message "Brew is installed"
  else
    #  Install brew
    /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
  fi
}

# Check and install docker
mac_docker_install(){

  if [[ -x "$(command -v docker)" ]]; then
    keg_message "Docker is installed"
  else
    brew install docker
  fi

  if [[ -x "$(command -v docker-machine)" ]]; then
    keg_message "Docker-machine is installed"
  else
    brew install docker-machine
  fi

  if [[ -x "$(command -v docker-compose)" ]]; then
    keg_message "Docker-compose is installed"
  else
    brew install docker-compose
  fi

}

# Setup docker-machine to use virtualbox
# Allows port-forwarding on mac
mac_setup_docker_machine(){
  keg_message "Setting up docker-machine"

  # Ensure docker-machine starts on launch
  brew services start docker-machine

  # Setup docker-machine to use the virtualbox drive
  # docker-machine create --driver virtualbox default
  # Create the docker VM with virtualbox, and force the IP address to be consistent
  docker-machine create --driver virtualbox --virtualbox-hostonly-cidr "192.168.99.1/24" default

  # Save as the default environment
  docker-machine env default

  # Execute the default environment in place for the active terminal
  eval "$(docker-machine env default)"
}

# Check and install virtualbox
mac_setup_virtualbox(){

  # Check for virtualbox install
  if [[ -x "$(command -v VBoxManage)" ]]; then
    keg_message "Virtualbox is installed"
  else
    brew cask install virtualbox
  fi

  mac_setup_docker_machine
}

# Check and install nvm and node
mac_setup_nvm_node(){

  if [[ -x "$(command -v nvm)" ]]; then
    keg_message "NVM already installed!"
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
mac_setup_yarn(){

  # Check for yarn install
  if [[ -x "$(command -v yarn)" ]]; then
    keg_message "yarn is installed"
  else
    curl -sL https://dl.yarnpkg.com/rpm/yarn.repo -o /etc/yum.repos.d/yarn.repo
    sudo yum -y install yarn
  fi
  
}

# If you run into this problem =>
# mkmf.rb can't find header files for ruby at /System/Library/Frameworks/Ruby.framework/Versions/2.3/usr/lib/ruby/include/ruby.h
# Follow the stpes of the first answer here=>
# https://stackoverflow.com/questions/46377667/docker-for-mac-mkmf-rb-cant-find-header-files-for-ruby
mac_setup_docker_sync(){

  if which ruby >/dev/null && which gem >/dev/null; then
    keg_message "Installing docker-sync"
    gem install docker-sync
    keg_message "Updating \$PATH"
    export PATH="$(ruby -r rubygems -e 'puts Gem.user_dir')/bin:$PATH"
    
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
  fi

  # Install the docker-sync dep unison
  if [[ -x "$(command -v unison)" ]]; then
    keg_message "Installing unison"
    brew install unison
    brew tap eugenmayer/dockersync
    brew install eugenmayer/dockersync/unox
    # brew install autozimu/homebrew-formulas/unison-fsmonitor
  fi

}

keg_install_cli(){
  echo "TODO!!!"
}

keg_setup(){

  # Determin the setup type
  SETUP_TYPE=$1

  # To run:
  # bash setup.sh
  #  * Full install
  #  * Should be run when first setting up the machine
  #  * Running `bash setup.sh init` will do the same thing
  if [[ -z "$SETUP_TYPE" || "$SETUP_TYPE" == "init" ]]; then
    INIT_SETUP="true"
  fi

  # Setup and install brew
  # To run:
  # bash setup.sh brew
  #  * Runs only the brew portion of this script
  if [[ $INIT_SETUP || "$SETUP_TYPE" == "brew" ]]; then
    keg_message "Checking for brew install..."
    mac_brew_install "${@:2}"
  fi

  # Setup and install docker
  # To run:
  # bash setup.sh docker
  #  * Runs only the docker portion of this script
  if [[ $INIT_SETUP || "$SETUP_TYPE" == "docker" ]]; then
    keg_message "Checking for docker install..."
    mac_docker_install "${@:2}"
  fi

  # Setup and install virtualbox
  # To run:
  # bash setup.sh virtualbox
  #  * Runs only the virtualbox portion of this script
  if [[ $INIT_SETUP || "$SETUP_TYPE" == "virtualbox" ]]; then
    keg_message "Checking for virtualbox install..."
    mac_setup_virtualbox "${@:2}"
  fi

  # Setup and install node
  # To run:
  # bash setup.sh node
  #  * Runs only the node portion of this script
  if [[ $INIT_SETUP || "$SETUP_TYPE" == "node" ]]; then
    keg_message "Checking for node install..."
    mac_setup_nvm_node "${@:2}"
  fi

  # Setup and install yarn
  # To run:
  # bash setup.sh yarn
  #  * Runs only the yarn portion of this script
  if [[ $INIT_SETUP || "$SETUP_TYPE" == "yarn" ]]; then
    keg_message "Checking for yarn install..."
    mac_setup_yarn "${@:2}"
  fi

  # Setup and install cli
  # To run:
  # bash setup.sh cli
  #  * Runs only the keg cli portion of this script
  if [[ $INIT_SETUP || "$SETUP_TYPE" == "cli" ]]; then
    keg_message "Checking keg cli install..."
    keg_install_cli "${@:2}"
  fi

  # Setup and install cli
  # To run:
  # bash setup.sh cli
  #  * Runs only the keg cli portion of this script
  if [[ $INIT_SETUP || "$SETUP_TYPE" == "sync" ]]; then
    keg_message "Checking docker-sync install..."
    mac_setup_docker_sync "${@:2}"
  fi


  keg_message "Keg CLI setup complete!"

}

keg_setup