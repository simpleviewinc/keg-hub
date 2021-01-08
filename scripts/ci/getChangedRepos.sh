#!/bin/bash

# Exit when any command fails
set -e

keg_get_changed_repos(){

  # Get all keg-hub repos
  REPOS=($(ls repos))

  # Ensure the changed repos file exists
  touch ../keg-changed-repos.txt

  # Get all changed files for the PR
  CHANGED_FILES=($(cat ../keg-changed-files.txt))

  # Loop over the repos and run the tests on them
  for REPO in "${REPOS[@]}"; do

    # Don't run tests for keg-cli ( currently requires a docker setup )
    if [[ "$REPO" == "keg-cli" || "$REPO" == "keg-regulator" ]]; then
      continue
    fi

    # Get the full repos path
    REPO_PATH="repos/${REPO##*/}"

    # Loop over the files and look for any that match the current repo
    for FILE in "${CHANGED_FILES[@]}"; do
      if [[ "$FILE" =~ "$REPO_PATH" ]]; then
        # If there a matching path, write the repo path to the local change-repos.txt
        echo "$REPO_PATH" >> ../keg-changed-repos.txt
        break
      fi
    done

  done
}

keg_get_changed_repos "$@"