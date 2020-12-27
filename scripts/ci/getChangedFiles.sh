#!/bin/bash

keg_get_changed_files(){
  # Pull down origin, so we have access to all branches
  git fetch origin --force --depth=1

  local CHANGED_FILES="$(git diff --name-only origin/develop)"

  # Write the changed files to a local file
  echo "$CHANGED_FILES" >> ../keg-changed-files.txt
}

keg_get_changed_files "$@"