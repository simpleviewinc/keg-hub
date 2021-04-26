#!/bin/bash
# Description: links a single repo located at keg-hub/repos/$REPO_NAME
# using the $ALIAS_NAME alias

source $GITHUB_WORKSPACE/keg-cli/keg
keg && cd repos/$REPO_NAME && keg tap link $ALIAS_NAME