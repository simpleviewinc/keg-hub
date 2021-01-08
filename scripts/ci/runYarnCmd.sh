#!/bin/bash

# Exit when any command fails
set -e

# Load the repos to run the command on
REPOS=($(cat ../keg-changed-repos.txt))

echo "::debug::Found Repos $REPOS"

# Loop over the repos and run the passed in command on them
keg_run_yarn_cmd(){
  local KEG_ROOT=$(pwd)

  for REPO_PATH in "${REPOS[@]}"; do
    echo "::debug::Runing cmd for repo $REPOS"
  
    cd $REPO_PATH
    for CMD in "$@"; do
      if [[ "$CMD" ]]; then
        yarn "$CMD"
      fi
    done

    echo "::debug::Moving back to $KEG_ROOT"
    cd $KEG_ROOT

  done
}

keg_run_yarn_cmd "$@"
