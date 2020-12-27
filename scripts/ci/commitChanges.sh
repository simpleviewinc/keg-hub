#!/bin/bash

# Auto commit changes to repo after yarn command is run
keg_commit_changes(){
  # Get the last users email / name for the commit message
  git config --local user.email "$(git log --format='%ae' HEAD^!)"
  git config --local user.name "$(git log --format='%an' HEAD^!)"
  git add  -A
  git commit -m "Github Actions - Auto-Format" --allow-empty
  git push -u origin HEAD
}

keg_commit_changes "$@"