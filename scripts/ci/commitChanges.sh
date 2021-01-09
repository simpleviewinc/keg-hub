#!/bin/bash

# Exit when any command fails
set -e

# Auto commit changes to repo after yarn command is run
keg_commit_changes(){

  local MESSAGE=""
  if [[ -z "$1" ]]; then
    MESSAGE="( Auto-Commit )"
  else
    MESSAGE="$1 ( Auto-Commit )"
  fi

  # Get the last users email / name for the commit message
  git config --local user.email "$(git log --format='%ae' HEAD^!)"
  git config --local user.name "$(git log --format='%an' HEAD^!)"
  git add  -A
  git commit -m "Github Actions - $MESSAGE" --allow-empty
  git push -u origin ${GITHUB_REF##*/}
}

keg_commit_changes "$@"