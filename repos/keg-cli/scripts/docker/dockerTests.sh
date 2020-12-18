#!/bin/bash 

source $KEG_CLI_PATH/keg

# Pull the latest keg-base:develop image
docker pull docker.pkg.github.com/simpleviewinc/keg-packages/keg-base:develop

# Tag it with the ci tag
keg di tag --context base --tag ci

keg_container(){
  docker run --rm -it -v /var/run/docker.sock:/var/run/docker.sock --name keg-base-tests keg-base:ci keg "$@"
}

tap_container(){
  docker run --rm -it -v /var/run/docker.sock:/var/run/docker.sock -v $KEG_ROOT_DIR/taps/$1:/keg-hub/taps/$1 --name keg-base-tests keg-base:ci keg "${@:2}"
}

# Run the keg-cli tests
# keg_container "cli" "test"

# Run publish task
keg_container "hub" "publish" "--context" "keg" "--dry-run"

# Build and push keg-core
keg_container "core" "build"
keg_container "di" "tag" "--context" "core"" --tag" "develop"
keg_container "core" "push"

# Build and push keg-components
keg_container "components" "build"
keg_container "di" "tag" "--context" "components"" --tag" "develop"
keg_container "components" "push"


# docker run --rm -it -v /var/run/docker.sock:/var/run/docker.sock --name keg-base-tests keg-base:ci keg di tag --context core --tag develop

# docker run --rm -it -v /var/run/docker.sock:/var/run/docker.sock --name keg-base-tests keg-base:ci keg core push

# docker run --rm -it -v /var/run/docker.sock:/var/run/docker.sock --name keg-base-tests keg-base:ci keg components push

# docker run --rm -it -v /var/run/docker.sock:/var/run/docker.sock --name keg-base-tests keg-base:ci keg hub publish --context keg --dry-run