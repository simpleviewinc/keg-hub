#!/bin/bash

# *********************************** NOTES *********************************** #
# IMPORTANT - Expectes 'yarn install' to have been run on the changed repos
# Goes through each of the keg-hub repos, and builds them in the proper order
# Only rebuilds the repo if it's included in the keg-changed-repos.txt file
# For now only includes ( jsutils / re-theme / keg-components )
# Keg-Core does not need to be built, but may need to be at a later time
# For example, when we automate building taps, we could reuse this file
# So I'm leaving this here for now, but commenting it out
# *********************************** NOTES *********************************** #

# Exit when any command fails
set -e

# Get the current path, which is the keg-hub's path
KEG_REPOS_PATH="$(pwd)/repos"
KEG_RESOLVER_PATH="$KEG_REPOS_PATH/tap-resolver"
KEG_RETHEME_PATH="$KEG_REPOS_PATH/re-theme"
KEG_COMPS_PATH="$KEG_REPOS_PATH/keg-components"
KEG_CORE_PATH="$KEG_REPOS_PATH/keg-core"

# Load the changed repos 
REPOS=($(cat ../keg-changed-repos.txt))

JSUTILS_CHANGED="false"
RETHEME_CHANGED="false"
COMPONENTS_CHANGED="false"
RESOLVER_CHANGED="false"

# Build jsutils with the latest changes
keg_build_jsutils(){
  if [[ " ${REPOS[@]} " =~ " repos/jsutils " ]]; then

    echo "::debug::Found jsutils changes, building jsutils..."
    
    # Move to the jsutils directory
    cd $KEG_REPOS_PATH/jsutils

    # Build jsutils
    yarn build
    JSUTILS_CHANGED="true"

  fi
}

# Build re-theme with the latest changes
keg_build_retheme(){
  if [[ " ${REPOS[@]} " =~ " repos/re-theme " ]]; then

    echo "::debug::Found re-theme changes, building re-theme..."

    # Move to the re-theme directory
    cd $KEG_RETHEME_PATH

    # Remove, then copy jsutils latest build into re-theme
    if [[ "$JSUTILS_CHANGED" == "true" ]]; then

      echo "::debug::Repo jsutils was changed, copying into re-theme..."

      rm -rf $KEG_RETHEME_PATH/node_modules/@keg-hub/jsutils/build
      cp -R $KEG_REPOS_PATH/jsutils/build $KEG_RETHEME_PATH/node_modules/@keg-hub/jsutils/build
    fi

    # Build re-theme
    yarn build
    RETHEME_CHANGED="true"

  fi
}

# Build keg-components with the latest changes
keg_build_components(){
  if [[ " ${REPOS[@]} " =~ " repos/keg-components " ]]; then

    echo "::debug::Found keg-components changes, building keg-components..."

    # Move to the keg-components directory
    cd $KEG_COMPS_PATH

    # Remove, and copy jsutils latest build into keg-components
    if [[ "$JSUTILS_CHANGED" == "true" ]]; then

      echo "::debug::Repo jsutils was changed, copying into keg-components..."

      rm -rf $KEG_COMPS_PATH/node_modules/@keg-hub/jsutils/build
      cp -R $KEG_REPOS_PATH/jsutils/build $KEG_COMPS_PATH/node_modules/@keg-hub/jsutils/build
    fi

    # Remove, and copy re-theme latest build into keg-components
    if [[ "$RETHEME_CHANGED" == "true" ]]; then

      echo "::debug::Repo re-theme was changed, copying into keg-components..."

      rm -rf $KEG_COMPS_PATH/node_modules/@keg-hub/re-theme/build
      cp -R $KEG_RETHEME_PATH/build $KEG_COMPS_PATH/node_modules/@keg-hub/re-theme/build
    fi

    # Build keg-components
    yarn build
    COMPONENTS_CHANGED="true"

  fi
}

# Build tap-resolver with the latest changes
keg_build_resolver(){
  if [[ " ${REPOS[@]} " =~ " repos/tap-resolver " ]]; then

    echo "::debug::Found tap-resolver changes, building tap-resolver..."

    # Move to the tap-resolvers directory
    cd $KEG_RESOLVER_PATH

    # Remove, then copy jsutils latest build into tap-resolver
    if [[ -d "$KEG_RESOLVER_PATH/node_modules/@keg-hub/jsutils/build" ]]; then

      echo "::debug::Repo jsutils was changed, copying into tap-resolver..."

      rm -rf $KEG_RESOLVER_PATH/node_modules/@keg-hub/jsutils/build
      cp -R $KEG_REPOS_PATH/jsutils/build $KEG_RESOLVER_PATH/node_modules/@keg-hub/jsutils/build
    fi

    RESOLVER_CHANGED="true"

  fi
}

# Build keg-core with the latest changes
keg_build_core(){
  if [[ " ${REPOS[@]} " =~ " repos/keg-core " ]]; then

    echo "::debug::Found keg-core changes, building keg-core..."

    # Move to the keg-core directory
    cd $KEG_CORE_PATH

    # Remove, and copy jsutils latest build into keg-core
    if [[ -d "$KEG_CORE_PATH/node_modules/@keg-hub/jsutils/build" ]]; then

      echo "::debug::Repo jsutils was changed, copying into keg-core..."

      rm -rf $KEG_CORE_PATH/node_modules/@keg-hub/jsutils/build
      cp -R $KEG_REPOS_PATH/jsutils/build $KEG_CORE_PATH/node_modules/@keg-hub/jsutils/build
    fi

    # Remove, and copy re-theme latest build into keg-core
    if [[ -d "$KEG_CORE_PATH/node_modules/@keg-hub/re-theme/build" ]]; then

      echo "::debug::Repo re-theme was changed, copying into keg-core..."

      rm -rf $KEG_CORE_PATH/node_modules/@keg-hub/re-theme/build
      cp -R $KEG_RETHEME_PATH/build $KEG_CORE_PATH/node_modules/@keg-hub/re-theme/build
    fi

    # Remove, and copy keg-components latest build into keg-core
    if [[ -d "$KEG_CORE_PATH/node_modules/@keg-hub/keg-components/build" ]]; then

      echo "::debug::Repo keg-components was changed, copying into keg-core..."

      rm -rf $KEG_CORE_PATH/node_modules/@keg-hub/keg-components/build
      cp -R $KEG_COMPS_PATH/build $KEG_CORE_PATH/node_modules/@keg-hub/keg-components/build
    fi

    # Remove, and copy tap-resolver latest build into keg-core
    if [[ -d "$KEG_CORE_PATH/node_modules/@keg-hub/tap-resolver/build" ]]; then

      echo "::debug::Repo tap-resolver was changed, copying into keg-core..."

      rm -rf $KEG_CORE_PATH/node_modules/@keg-hub/tap-resolver
      cp -R $KEG_RESOLVER_PATH $KEG_CORE_PATH/node_modules/@keg-hub/tap-resolver
    fi

  fi
}

# Check is a repo has changed since the last commit
# If it has, it gets built, then copied to where it's used as a dependency
keg_build_changed_repos(){

  keg_build_jsutils
  keg_build_retheme
  keg_build_components

  # Skip keg-core and tap-resolver for now
  # keg_build_resolver
  # keg_build_core

}

# Kick off the build process for all changed repos
keg_build_changed_repos