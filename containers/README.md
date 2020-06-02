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

## Docker Image per Folder 
* Each folder relates to a docker image that is built with the `keg-cli`
  * Each Folders is required to have
    * `Dockerfile` - How to build the docker image
    * `context.env` - Environment file containing envs to pass to the docker container
  * Some folders contain
    * `compose-default.yml` - Default `docker-compose` file
    * `compose-local.yml` - Environment specific file
    * `docker-sync.yml` - Docker Sync configuration file


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
