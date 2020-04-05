#!/bin/bash

# Check if homebrew is installed
mac_brew_install(){
  # Check for brew install
  if [[ -x "$(command -v brew)" ]]; then
    echo "Brew is installed"
  else
    #  Install brew
    /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
  fi
}

# Check if docker is installed
mac_docker_install(){

  if [[ -x "$(command -v docker)" ]]; then
    echo "Docker is installed"
  else
    brew cask install docker
  fi

}

mac_setup_docker_machine(){
  zr_message "Setting up docker-machine"
  docker-machine create --driver virtualbox default
  docker-machine env default
  eval "$(docker-machine env default)"
}

mac_setup_virtualbox(){

  # Check for virtualbox install
  if [[ -x "$(command -v VBoxManage)" ]]; then
    zr_message "Virtualbox is installed"
  else
    brew cask install virtualbox
    mac_setup_docker_machine
  fi

}


# Check if yarn is installed
mac_setup_yarn(){
  
  # Check for yarn install
  if [[ -x "$(command -v yarn)" ]]; then
    zr_message "yarn is installed"
  else
    curl -sL https://dl.yarnpkg.com/rpm/yarn.repo -o /etc/yum.repos.d/yarn.repo
    sudo yum -y install yarn
  fi
  
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
  #  * Runs only the docker portion of this script
  if [[ $INIT_SETUP || "$SETUP_TYPE" == "brew" ]]; then
    echo "Checking for brew install..."
    mac_brew_install "${@:2}"
  fi

  # Setup and install docker
  # To run:
  # bash setup.sh docker
  #  * Runs only the docker portion of this script
  if [[ $INIT_SETUP || "$SETUP_TYPE" == "docker" ]]; then
    echo "Checking for docker install..."
    mac_docker_install "${@:2}"
  fi

  # Setup and install virtualbox
  # To run:
  # bash setup.sh virtualbox
  #  * Runs only the docker portion of this script
  if [[ $INIT_SETUP || "$SETUP_TYPE" == "virtualbox" ]]; then
    echo "Checking for virtualbox install..."
    mac_setup_virtualbox "${@:2}"
  fi

  # Setup and install yarn
  # To run:
  # bash setup.sh yarn
  #  * Runs only the docker portion of this script
  if [[ $INIT_SETUP || "$SETUP_TYPE" == "yarn" ]]; then
    echo "Checking for yarn install..."
    mac_setup_yarn "${@:2}"
  fi


}