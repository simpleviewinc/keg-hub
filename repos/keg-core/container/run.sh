#!/usr/bin/env

# Ensure required envs are set
[[ -z "$KEG_PROXY_PORT" ]] && KEG_PROXY_PORT=19006
[[ -z "$DOC_APP_PATH" ]] && DOC_APP_PATH=/keg/keg-core
[[ -z "$DOC_BUILD_PATH" ]] && DOC_BUILD_PATH==/keg/core-build

# If the no KEG_DOCKER_EXEC env is set, just sleep forever
# This is to keep our container running forever
[[ -z "$KEG_DOCKER_EXEC" ]] && tail -f /dev/null && exit 0;

# Check the NODE_ENV, and use that to know which environment to start
# For non-development environments, we want to serve the bundle if it exists
if [[ ! " development develop local test " =~ " $NODE_ENV " ]]; then
  [[ -d "$DOC_BUILD_PATH" ]] && npx serve $DOC_BUILD_PATH --cors -n -l $KEG_PROXY_PORT && exit 0;
  echo $"[ KEG-CLI ] Serve path $DOC_BUILD_PATH does not exist!" >&2
fi

# Serve the app bundle in development environemnts
echo $"[ KEG-CLI ] Running development server!" >&2
cd $DOC_APP_PATH
[[ -z "$KEG_EXEC_CMD" ]] && yarn web || yarn $KEG_EXEC_CMD
