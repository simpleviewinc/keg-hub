# Keg Containers
* Docker containers for keg repos

## Install
* Requires the [keg-cli](keg-cli-url.com)
* The `keg-containers` should automatically be installed when install the `keg-cli`
* If there were issue with the install, run `keg install containers` to install the containers

## Setup
* Updated the your local `cli.config.json` && `defaults.env` files with the install path
  * The install path should be automatically added to both files
  * Files should be located at `~/.kegConfig/<file>`

## Folder Files
* Each folder relates to a docker image that is built with the `keg-cli`
  * Folders should container the following files
    * `Dockerfile` - How to build the docker image
    * `values.yml` - Environment file containing envs to pass to the docker container
  * Some folders contain
    * `compose-default.yml` - Default `docker-compose` file
    * `compose-sync.yml` - Overrides `compose-default.yml` with `docker-sync` settings
    * `docker-sync.yml` - Docker Sync configuration file

### Values / ENV files
* See `src/constants/docker/containers.js`
  * The `value` and `env` files are loaded dynamically based on the current env and image/container
  * The cli will attempt to load the following `yml` file in this order
    * `containers/< container >/values.yml`
    * `containers/< container >/values_< env >.yml`
      * The `_` is used to follow the [SV-Kubernetes](https://github.com/simpleviewinc/sv-kubernetes) format 
    * `containers/< container >/values-< env >.yml` ( Uses `-` instead of `_` )
    * `~/.kegConfig/values_< env >.yml`
    * `~/.kegConfig/values-< env >.yml` ( Uses `-` instead of `_` )
    * `~/.kegConfig/< container >_values_< env >.yml`
    * `~/.kegConfig/< container >-values-< env >.yml` ( Uses `-` instead of `_` )
  * The cli will attempt to load the following `.env` file in this order
    * `containers/< container >/< env >.env`
    * `~/.kegConfig/< env >.env`
    * `~/.kegConfig/<container>-< env >.env`
  * **IMPORTANT**
    * `< container >` && `< env >` are replaced with the current container and environment
    * **These files must be created manually**, then are **NOT** automatically created
    * All loaded file are merged into a single `JS Object`
      * The order of the loaded files is important
      * It allows for overwriting the default ENV's with a local configuration of the machine

## Folders
* **base**
  * Root image that other images pull from
  * Installs the `expo-cli` and a few other dependencies
  * Installs the `keg-cli` 
  * Exposes most commonly used ports for expo
  * Required a `GIT_KEY` build-arg
* **core**
  * Runs the `keg-core` repo
  * Used for development on `keg-core`, not needed if only building `taps`
  * Required a `GIT_KEY` build-arg
  * Runs yarn install at build time
    * Copies over local `package.json` && `yarn.lock` into the container




