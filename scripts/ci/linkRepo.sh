#!/bin/bash
# Description: links a single repo located at keg-hub/repos/$REPO_NAME
# using the $ALIAS_NAME alias

source $KEG_CLI_PATH/keg

keg && cd repos/$REPO_NAME && keg tap link $ALIAS_NAME