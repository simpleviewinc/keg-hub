#!/usr/bin/env
# Hides annoying story-book warnings
export SUPPRESS_SUPPORT=1
# Ensure required envs are set
[[ -z "$KEG_PROXY_PORT" ]] && KEG_PROXY_PORT=60710
[[ -z "$DOC_APP_PATH" ]] && DOC_APP_PATH=/keg/keg-components
[[ -z "$DOC_BUILD_PATH" ]] && DOC_BUILD_PATH==/keg/components-build
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
[[ -z "$KEG_EXEC_CMD" || "$KEG_EXEC_CMD" == 'web' ]] && yarn sb || yarn $KEG_EXEC_CMD