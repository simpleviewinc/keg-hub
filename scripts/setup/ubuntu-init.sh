#!/usr/bin/env

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

keg_install_docker(){
  # Update the apt package list.
  sudo apt-get update -y

  # Install Docker's package dependencies.
  sudo apt-get install -y \
      apt-transport-https \
      ca-certificates \
      curl \
      software-properties-common

  # Download and add Docker's official public PGP key.
  curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -

  # Verify the fingerprint.
  sudo apt-key fingerprint 0EBFCD88

  # Add the `stable` channel's Docker upstream repository.
  #
  # If you want to live on the edge, you can change "stable" below to "test" or
  # "nightly". I highly recommend sticking with stable!
  sudo add-apt-repository \
    "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
    $(lsb_release -cs) \
    stable"

  # Update the apt package list (for the new apt repo).
  sudo apt-get update -y

  # Install the latest version of Docker CE.
  sudo apt-get install -y docker-ce

  # Allow your user to access the Docker CLI without needing root access.
  sudo usermod -aG docker $USER
}

keg_install_compose(){
  # Install Python 3 and PIP.
  sudo apt-get install -y python3 python3-pip

  # Install Docker Compose into your user's home directory.
  pip3 install --user docker-compose
}

keg_add_to_path(){
  mkdir -p /keg/keg-cli/bin
  ln -s $HOME/keg/keg-cli/keg $HOME/keg/keg-cli/bin/keg
  ln -s $HOME/keg/keg-cli/keg-cli $HOME/keg/keg-cli/bin/keg-cli
  
  export PATH="$PATH:$HOME/.local/bin:$HOME/keg/keg-cli/bin"
}

keg_set_docker_host(){
  echo "export DOCKER_HOST=tcp://localhost:2375" >> ~/.bashrc
  source ~/.bashrc
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

keg_setup_yarn(){
  # Check for yarn install
  if [[ -x "$(command -v yarn 2>/dev/null)" ]]; then
    keg_message "Yarn is installed"
  else

    keg_message "Installing yarn..."
    curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
    sudo apt update
    sudo apt install --no-install-recommends yarn
    
    export PATH="$PATH:`yarn global bin`"
    echo "alias nodejs=nodejs" >> ~/.bashrc
    source ~/.bashrc
    # 
    
  fi
}

keg_fix_key_issue(){
  curl -sL "http://keyserver.ubuntu.com/pks/lookup?op=get&search=" | sudo apt-key add
}


keg_set_docker_networ_ip(){
  docker --bip 192.168.99.101
}

# Runs methods to setup the keg-cli, with docker and vagrant
# Params
#   * $1 - (Optional) - Section of the setup script to run
#     * If it does not exist, all setup sections are run
keg_setup(){

  # Determin the setup type
  local SETUP_TYPE=$1

  # To run:
  # bash mac-init.sh
  #  * Full install
  #  * Should be run when first setting up the machine
  #  * Running `bash mac-init.sh init` will do the same thing
  if [[ -z "$SETUP_TYPE" || "$SETUP_TYPE" == "init" ]]; then
    INIT_SETUP="true"
  fi




  # Setup and install docker
  # To run:
  # bash mac-init.sh docker
  #  * Runs only the docker portion of this script
  if [[ -z "$KEG_EXIT" ]] && [[ "$INIT_SETUP" || "$SETUP_TYPE" == "docker" ]]; then
    keg_message "Checking for docker install..."
    keg_install_docker "${@:2}"
  fi

  # Setup and install docker-compose
  # To run:
  # bash mac-init.sh docker
  #  * Runs only the docker portion of this script
  if [[ -z "$KEG_EXIT" ]] && [[ "$INIT_SETUP" || "$SETUP_TYPE" == "compose" ]]; then
    keg_message "Checking for docker-compose install..."
    keg_install_compose "${@:2}"
  fi

  # Add the keg-cli/bin to the users path
  # To run:
  # bash mac-init.sh docker
  #  * Runs only the docker portion of this script
  if [[ -z "$KEG_EXIT" ]] && [[ "$INIT_SETUP" || "$SETUP_TYPE" == "compose" ]]; then
    keg_message "Adding keg-cli to you path"
    keg_add_to_path "${@:2}"
  fi

  keg_add_to_path

  keg_set_docker_host

  # Add the keg-cli/bin to the users path
  # To run:
  # bash mac-init.sh docker
  #  * Runs only the docker portion of this script
  if [[ -z "$KEG_EXIT" ]] && [[ "$INIT_SETUP" || "$SETUP_TYPE" == "compose" ]]; then
    keg_message "Check for nvm and node install...."
    keg_setup_nvm_node "${@:2}"
  fi

  

}


keg_setup