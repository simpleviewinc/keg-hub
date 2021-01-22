#!/usr/bin/env

export SUPPRESS_SUPPORT=1

# If the no KEG_DOCKER_EXEC env is set, just sleep forever
# This is to keep our container running forever
if [[ -z "$KEG_DOCKER_EXEC" ]]; then
  tail -f /dev/null
  exit 0

else

  # Ensure the DOC_APP_PATH is set
  if [[ -z "$DOC_APP_PATH" ]]; then
    DOC_APP_PATH=/keg/tap
  fi

  # cd into the tap repo
  cd $DOC_APP_PATH

  # Check if no exect command exists, or if it's set to web
  # Then default it to run the re-theme app
  if [[ -z "$KEG_EXEC_CMD" || "$KEG_EXEC_CMD" == 'web' ]]; then
    KEG_EXEC_CMD="sb"
  fi

  # Start the tap instance
  echo $"[ KEG-CLI ] Running command 'yarn $KEG_EXEC_CMD'" >&2
  yarn $KEG_EXEC_CMD

fi
