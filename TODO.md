### CLI TODOs

**Taps**
  * Create a default init template for a tap - `create-react-tap`

**Tasks**
  * Convert options to args, using ask, if required and option does not exist
    * Should be set as a setting to turn on and off
  * Add dynamic loading of Images list from the containers folder

**Docker**
  * Setup pushing docker images to github packages through provider
  * Setup creating an image from the currently running container
  * Setup pull a docker image from a container
    * Setup a to pull and run helper
    * Used to test pull requests
  * Allow mounting of sub-repos
    * `re-theme`, `tap-resolver`, `keg-components`
    * Need work out a way some they don't get overwritten from `yarn install`
  * Add IMAGE_FROM as an ARG and ENV when build docker containers

**Install**
* Keg cli should be installed through `yarn global` || `npm global`
  * Should run `/scripts/setup/setup-<platform>`
    * Based on platform after install
    * Currently only supports bash
    * Need to add for windows `.bat` || Rewrite in `node`
  * Should run `scripts/setup/cliSetup.js`
    * Sets up cli on the local machine

**CLI Setup**
* Need to gather list of items need to setup the CLI properly
* Create script to properly gather that information from user
  * Git user
    * Stored in `cli.config.json`
  * Github Key
    * Each user should have their own key
    * Ask if the user wants to use secure mode
      * Must type in password each time the key is accessed
    * Stored in `cli.config.json`
  * Editor command
    * VScode => "code"
    * Sublime Text => "subl"
    * Stored in `cli.config.json`
  * Keg repo install locations
    * Set install locations
    * Install each repo
      * First check if the repo exists in that location
      * If not then, git pull from github
        * Could pull from users fork || simpleviewinc
    * Save install locations to `cli.config.json` => Under the `paths` key
    * Stored in `cli.config.json`


## Docker keg-base updates
  * Install all keg repos, and node_modules for repos
  * In other containers, copy over node_modules using the copy-from directive in a Dockerfile
    * This means no need to install node_modules on every rebuild of from docker files

## Docker sync start --clean
  * Should run the full clean task; not just the internal docker-sync command

### Docker Sync w/ unison
* Set one way sync, with no deletion
  * unison /src/dir /dest/dir -force /src/dir -nodeletion /dest/dir



### Setup Scripts
  * Added check machine type
    * Install yarn based on machine type
    * right now uses yum, which does not work on mac
  * Run yarn install after cloning CLI repo / validating it exists
  * Creating cli.config.json is missing one folder in the path
  
