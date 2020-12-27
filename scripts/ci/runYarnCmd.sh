#!/bin/bash

# Loop over the repos and run the passed in command on them
keg_run_cmd(){
  REPOS=$(cat ../keg-changed-repos.txt)

  for REPO_PATH in "$REPOS"; do
    cd $REPO_PATH
    for CMD in "$@"; do
      if [[ "$CMD" ]]; then
        yarn "$CMD"
      fi
    done
  done
}

# Run yarn install before runnign yarn command
# Ensure we have all repo dependencies
keg_run_install(){
  REPOS=$(cat ../keg-changed-repos.txt)

  for REPO_PATH in "$REPOS"; do
    cd $REPO_PATH
    yarn install
  done
}

keg_run_yarn_cmd(){
  keg_run_install
  keg_run_cmd "$@"
}

keg_run_yarn_cmd "$@"
