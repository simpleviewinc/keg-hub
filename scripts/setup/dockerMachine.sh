#!/bin/bash

# Loads the docker-machine ENVs needed to setup the local machine
# First finds the path to the current directory
# Then loads the docker-machine.env file, setting all variables to be exported
keg_load_docker_machine_envs(){

  # Get the current directory of the script
  # local CUR_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
  SOURCE="${BASH_SOURCE[0]}"

  # Resolve $SOURCE until the file is no longer a symlink
  while [ -h "$SOURCE" ]; do 

    # Get the directory of the bash source
    DIR="$( cd -P "$( dirname "$SOURCE" )" >/dev/null 2>&1 && pwd )"

    SOURCE="$(readlink "$SOURCE")"

    # If $SOURCE was a relative symlink, we need to resolve it 
    # relative to the path where the symlink file was located
    [[ $SOURCE != /* ]] && SOURCE="$DIR/$SOURCE"

  done

  local CUR_DIR="$( cd -P "$( dirname "$SOURCE" )" >/dev/null 2>&1 && pwd )"

  # Ensure the env file exists
  if [[ -f "$CUR_DIR/docker-machine.env" ]]; then
    echo "[ KEG CLI ] setting docker-machine ENVs" >&2
    set -o allexport
    source $CUR_DIR/docker-machine.env
    set +o allexport
    return 0
  else
    # Print message, and direct to stderr, so it's not captured in stdout
    echo "[ KEG CLI ] Missing ENV file as $CUR_DIR/docker-machine.env" >&2
    echo  "[ KEG CLI ] Can not run setup script" >&2
    return 1
  fi

}

# Call method to load docker-machine envs
keg_load_docker_machine_envs
