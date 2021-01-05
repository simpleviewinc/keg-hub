#!/bin/bash

keg_get_changed_files(){
  # Pull down origin, so we have access to all branches
  git fetch origin --force --depth=1

  # Get the current branch to check if we are on develop
  local CURRENT_BRANCH="$(git rev-parse --abbrev-ref HEAD)"
  local CHECK_BRANCH="develop"

  # If we are on the develop branch, then check file changes against the master branch
  if [[ "$CURRENT_BRANCH" == "develop" ]]; then
    CHECK_BRANCH="master"
  fi

  # Get the list of changed files
  local CHANGED_FILES="$(git diff --name-only origin/$CHECK_BRANCH)"

  # Write the changed files to a local file
  echo "$CHANGED_FILES" >> ../keg-changed-files.txt
}

keg_get_changed_files "$@"