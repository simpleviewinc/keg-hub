### CLI TODOs

**Taps**
  * Create a default init template for a tap - `create-react-tap`


**Docker**
  * Setup creating an image from the currently running container
  * Setup pull a docker image from a container
    * Setup a to pull and run helper
    * Used to test pull requests
  * Allow mounting of sub-repos
    * `re-theme`, `tap-resolver`, `keg-components`
    * Need work out a way some they don't get overwritten from `yarn install`
  * Add IMAGE_FROM as an ARG and ENV when build docker containers

  * TO FIX - Stop task is not stopping the docker container
    * `keg core stop` does not stop the container, just the sync volumes

**Install**
* Keg repos should be installed through an install command
  * Should use the globalConfig to set the install location
  * Should allow overwriting the globalConfig location
    * If location is overwritten, location should be updated in global config
* Keg cli should be installed through `yarn global` || `npm global`
  * Should run `/scripts/setup/setup-<platform>`
    * Based on platform after install
    * Currently only supports bash
    * Need to add for windows `.bat` || Rewrite in `node`
  * Should run `scripts/setup/cliSetup.js`
    * Sets up cli on the local machine



* Add a full docker clean command
  * clean docker-sync tap / core
  * clean docker containers
  * clean docker images
  * clean docker volumes


* Add tasks to update version for repos
  * Should update the package.json version
  * All - Must follow this order
    * update re-theme
    * update tap-resolver
    * update keg-components
    * update keg-core
    * update taps ( optional )
  * Allow passing in major minor patch
  * Allow auto-committing to develop, then develop to qa, then develop to master
    * This is done for each repo
  



### Setup Scripts
  * Added check machine type
    * Install yarn based on machine type
    * right now uses yum, which does not work on mac
  * Run yarn install after cloning CLI repo / validating it exists
  * Creating cli.config.json is missing one folder in the path
  

### Image pull
  * If a tap is passed in
    * Get the tap location locally
    * From the location get the git remote info
      * This will allow getting the branch / repo name data
      * Use this find the correct package after the have been pulled from github

### Add keg missing options
  * Add `ask` key to option
  * If it's missing, it will ask the user for the value when the command is run
  * Add setting for no ask in globalConfig
