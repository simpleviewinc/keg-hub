#!/bin/bash
# Description: links any injected tap in the keg-hub/repos directory. Ignores the others.

source $KEG_CLI_PATH/keg

log_result () {
  if [[ $2 -eq 1 ]]; then
    echo "No alias key in tap config for \"$1\". Skipping..."
  fi
}

link_repos() {
  local KEG_REPOS=$(ls "$KEG_HUB_PATH/repos")
  for REPO in $KEG_REPOS; do
    local REPO_PATH="$KEG_HUB_PATH/repos/$REPO"
    if [[ ! -d "$REPO_PATH" ]]; then
      continue
    fi
    cd "$REPO_PATH"
    keg tap link --silent
    log_result $REPO $?
  done
}

link_repos