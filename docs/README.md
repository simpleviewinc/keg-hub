# Keg-CLI Docs

## Help
  * To see help information for a task
    * Pass one of `help` | `--help` | `h` | `-h` as the last argument
    * Example `keg tap -h`
  * To see help for all tasks, run `keg -h`,


## Tasks
  * Tasks are work that can be done through the keg-cli
  * Execute a task by running `keg <name of task> <options>` 
  * Most tasks take options that affect how the task is run
    * Some tasks have **REQUIRED** options
    * Some options only allow **SPECIFIC** values
    * Use the help command for more information about a task and its options
      * `keg <name of task> -h` 

## Core Repos
  * [keg-cli]() - Commands to run the keg, and taps
  * [keg-components]() - A cross-platform component library for React / React-Native
  * [keg-core]() - Main keg repo, which contains code to run taps
  * [tap-resolver]() - Allows resolving tap files through aliases
  * [re-theme]() - Manages cross-platform styles for web and native

## Taps
* Taps can be installed anywhere on the local machine
  * **IMPORTANT** - Taps must be linked to work with the keg-cli `tap` commands

### Linked Taps
  * Taps should be linked to the keg-cli
  * To link a tap run command `keg tap link <tap link name> <path to tap folder>`
    * Tap link name can be anything, but must be unique
    * Uses the current working directory if no `path to tap folder` is passed

## Docker
  * Application used to ensure a consistent dev environment
    * [docker]() - Runs the containers and images of the keg
    * [docker-machine]() - Runs the core docker instance through virtualbox 
    * [docker-compose]() - Run multiple docker containers from one yml file
    * [mutagen]() - syncs local folder with the running docker containers
    * [virtualbox]() - Run by docker-machine

### Docker Containers
  * Build core container
    * `keg doc build core`
  * Build tap container
    * `keg tap build name=<name of linked tap>`
    * **IMPORTANT** - core container should be built before building a tap container