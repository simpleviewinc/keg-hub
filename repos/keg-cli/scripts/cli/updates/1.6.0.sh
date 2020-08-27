#!/usr/bin/env

source $(pwd)/keg

source $(pwd)/scripts/cli/updates/update_helpers.sh

keg_cli_1_6_0_update(){

  keg_message "Running update for version 1.6.0..."

  # Remove node_modules, and re-install
  yarn clean:full

  # Remove regulator from the config files
  keg config unset --key cli.paths.retheme --confirm false
  keg cli env unset --key RETHEME_PATH --confirm false --comment false
  keg cli env unset --key GIT_RETHEME_URL --confirm false --comment false
  keg cli env unset --key DOC_RETHEME_PATH --confirm false --comment false

  echo ""
  keg_message "1.6.0 Update Complete!"
  echo ""

}

keg_cli_1_6_0_update "$@"
