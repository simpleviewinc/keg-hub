#!/usr/bin/env

source $(pwd)/keg

source $(pwd)/scripts/cli/updates/update_helpers.sh

keg_cli_2_1_0_update(){

  keg_message "Running update for version 2.1.0..."

  # Remove all running containers and clean out all images
  keg_destroy_all_docker

  # Remove node_modules, and re-install
  yarn clean:full

  # Update the DEFUALT ENVs
  keg cli env unset --key EXPO_DEBUG_PORT --confirm false --comment false
  keg cli env unset --key EXPO_APP_PORT --confirm false --comment false
  keg cli env unset --key KEG_BASE_URL --confirm false --comment false
  keg cli env unset --key KEG_IMAGE_FROM --confirm false --comment false
  keg cli env unset --key KEG_BASE_VERSION --confirm false --comment false
  keg cli env unset --key RN_PACKAGER_IP --confirm false --comment false

  # Clean up git ENVs
  keg cli env unset --key GIT_CLI_URL --confirm false --comment false
  keg cli env unset --key GIT_CORE_URL --confirm false --comment false
  keg cli env unset --key GIT_COMPONENTS_URL --confirm false --comment false
  keg cli env unset --key GIT_RESOLVER_URL --confirm false --comment false
  keg cli env unset --key GIT_PROXY_URL --confirm false --comment false

  keg cli env set --key GIT_HUB_URL --value https://github.com/simpleviewinc/keg-hub.git --confirm false
  keg cli env set --key GIT_HUB_BRANCH --value develop --confirm false
  keg cli env set --key KEG_BASE_IMAGE --value docker.pkg.github.com/simpleviewinc/keg-packages/keg-base:develop --confirm false

  # Update the globalConfig
  keg config set --key cli.settings.docker.imagePullPolicy --value Always --confirm false
  keg config set --key version --value 2.1.0 --confirm false

  # Restart the keg-proxy
  keg proxy start

  # Pull down the keg-base:develop image
  keg base pull

  echo ""
  keg_message "2.1.0 Update Complete!"
  echo ""

}

keg_cli_2_1_0_update "$@"
