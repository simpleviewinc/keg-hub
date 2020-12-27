#!/bin/bash

# Get all changed files for the PR
CHANGED_FILES=($(cat ../keg-changed-files.txt))

# Load the repos to run the command on
REPOS=($(cat ../keg-changed-repos.txt))

keg_generate_file_changes(){
  local NL=$'\n'
  local PR_COMMENT="### Changed Files${NL}${NL}<br/>${NL}${NL}"

  for REPO_PATH in "${REPOS[@]}"; do
    # Creat a new array, to hold all the files for the repo
    local REPO_FILES=()

    # Loop over the files and look for any that match the current repo
    for FILE in "${CHANGED_FILES[@]}"; do
      if [[ "$FILE" =~ "$REPO_PATH" ]]; then
        REPO_FILES=(${REPO_FILES[@]} "$FILE")
      fi
    done

    if [[ ${#REPO_FILES[@]} -ne 0 ]]; then
      PR_COMMENT="$PR_COMMENT**${REPO_PATH##*/}**"

      for REPO_FILE in "${REPO_FILES[@]}"; do
        PR_COMMENT="$PR_COMMENT${NL}* \`$REPO_FILE\`"
      done
      PR_COMMENT="$PR_COMMENT${NL}${NL}"
    fi

  done

  echo "$PR_COMMENT"

}

# Writes the PR comment to file, so the next set can use it
keg_generate_pr_changes(){
  local PR_COMMENT="$(keg_generate_file_changes)"
  if [[ "$PR_COMMENT" ]]; then
    echo "$PR_COMMENT" > ../pr-comment.md
  fi
}

keg_generate_pr_changes "$@"