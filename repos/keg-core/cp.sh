#!/bin/bash

# Repos that can be copied
KG_REPOS=(keg resolver retheme jsutils)


keg_do_copy_cmd(){

  # Get the current directory sv-keg
  local CUR_DIR=$(pwd)
  
  # Navigate back to the tap
  cd ../../

  ## When developing on the sv-keg ##
  if [[ "$1" == "keg" ]]; then
    if [[ "$2" == "full" ]]; then

      echo "Copying over full sv-keg repo...."
      rm -rf node_modules/sv-keg
      cp -Rf ~/zerista/repos/sv-keg node_modules/sv-keg

    else

      echo "Copying over sv-keg development files...."
      rm -rf node_modules/sv-keg/App.js
      rm -rf node_modules/sv-keg/app.json
      rm -rf node_modules/sv-keg/babel.config.js
      rm -rf node_modules/sv-keg/core
      rm -rf node_modules/sv-keg/cp.sh
      rm -rf node_modules/sv-keg/package.json
      cp -Rf ~/zerista/repos/sv-keg/App.js node_modules/sv-keg/App.js
      cp -Rf ~/zerista/repos/sv-keg/app.json node_modules/sv-keg/app.json
      cp -Rf ~/zerista/repos/sv-keg/babel.config.js node_modules/sv-keg/babel.config.js
      cp -Rf ~/zerista/repos/sv-keg/core node_modules/sv-keg/core
      cp -Rf ~/zerista/repos/sv-keg/cp.sh node_modules/sv-keg/cp.sh
      cp -Rf ~/zerista/repos/sv-keg/package.json node_modules/sv-keg/package.json

    fi

    echo "Done!"

  ## When developing on the sv-tap-resolver ##
  elif [[ "$1" == "resolver" ]]; then

    if [[ "$2" == "full" ]]; then

      echo "Copying over full sv-tap-resolver repo...."
      rm -rf node_modules/sv-keg/node_modules/tap-resolver
      cp -Rf ~/zerista/repos/sv-tap-resolver node_modules/sv-keg/node_modules/tap-resolver

    else

      echo "Copying over sv-tap-resolver development files...."
      rm -rf node_modules/sv-keg/node_modules/tap-resolver/src
      rm -rf node_modules/sv-keg/node_modules/tap-resolver/babel.config.js
      rm -rf node_modules/sv-keg/node_modules/tap-resolver/package.json
      cp -Rf ~/zerista/repos/sv-tap-resolver/src node_modules/sv-keg/node_modules/tap-resolver/src
      cp -Rf ~/zerista/repos/sv-tap-resolver/babel.config.js node_modules/sv-keg/node_modules/tap-resolver/babel.config.js
      cp -Rf ~/zerista/repos/sv-tap-resolver/package.json node_modules/sv-keg/node_modules/tap-resolver/package.json

    fi

    echo "Done!"

  ## When developing on the sv-retheme ##
  elif [[ "$1" == "retheme" ]]; then

    echo "Copying over sv-re-theme development files...."
    rm -rf ~/zerista/repos/sv-keg/node_modules/re-theme/build
    cp -Rf ~/zerista/repos/sv-re-theme/build ~/zerista/repos/sv-keg/node_modules/re-theme/build

    echo "Done!"

  # When developing on the jsutils
  elif [[ "$1" == "jsutils" ]]; then

    echo "Copying over jsutils development files...."
    rm -rf ~/zerista/repos/sv-keg/node_modules/jsutils/cjs
    rm -rf ~/zerista/repos/sv-keg/node_modules/jsutils/esm
    cp -Rf ~/zerista/repos/jsUtils/cjs ~/zerista/repos/sv-keg/node_modules/jsutils/cjs
    cp -Rf ~/zerista/repos/jsUtils/esm ~/zerista/repos/sv-keg/node_modules/jsutils/esm

    echo "Done!"

  fi

  # Navigate back to the keg, to run the start command
  cd $CUR_DIR

}

# Check for which repo to copy over
keg_var_in_array(){
  local IN_ARRAY="false"
  for i in "${@:2}"; do
    if [ "$i" == "$1" ]; then
      IN_ARRAY="true"
    fi
  done

  echo $IN_ARRAY
}

# Loop over all repos and check if the are an argument
# Also look for the full argument
keg_check_for_copy_repos(){

  # Check for the full argument
  local KG_FULL
  if [[ $(keg_var_in_array "full" "$@")  == "true" ]]; then
    KG_FULL="full"
  fi

  # Loop the arguments, and see if one is a repo
  for KG_REPO in "$@"; do
    if [[ $(keg_var_in_array $KG_REPO ${KG_REPOS[*]})  == "true" ]]; then
      # If a repo is found, run the copy commend
      keg_do_copy_cmd $KG_REPO $KG_FULL
    fi
  done

}

# Call the check copy command
keg_check_for_copy_repos "$@"
