#!/bin/bash

# Load the repos to run the command on
REPOS=($(cat ../keg-changed-repos.txt))

echo "::debug::Found Repos $REPOS"

# Loop over the repos and run the passed in command on them
keg_run_yarn_cmd(){
  for REPO_PATH in "$REPOS"; do
    echo "::debug::Runing cmd for repo $REPOS"
  
    cd $REPO_PATH
    for CMD in "$@"; do
      if [[ "$CMD" ]]; then
        yarn "$CMD"
      fi
    done
  done
}

keg_run_yarn_cmd "$@"
