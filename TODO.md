### CLI TODOs

**Taps**
  * Create a default init template for a tap - `create-react-tap`

**Docker**
  * Allow mounting of sub-repos
    * `re-theme`, `tap-resolver`, `keg-components`

**Install**
* Keg cli should be installed through `yarn global` || `npm global`
  * Should run `/scripts/setup/setup-<platform>`
    * Based on platform after install
    * Currently only supports bash
    * Need to add for windows `.bat` || Rewrite in `node`
  * Should run `scripts/setup/cliSetup.js`
    * Sets up cli on the local machine

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

### Image pull
  * If a tap is passed in
    * Get the tap location locally
    * From the location get the git remote info
      * This will allow getting the branch / repo name data
      * Use this find the correct package after the have been pulled from github

### TODO: 
  * compose service should check if an existing compose service is already running
    * If it is, ask the user if if should be destroyed
      * Can not run two compose services at once 
    * This is only temporary until keg-proxy is setup
  * Keg repos should be installed through an install command
    * Should use the globalConfig to set the install location
    * Should allow overwriting the globalConfig location
      * If location is overwritten, location should be updated in global config
  * Auto clean up docker images / cache
    * Figure out how to call this in the background as tasks are called
  * Add tags to tap docker images
    * This will allow us to see if the image for that tap exists or not
  * Look into building tap images without the name tap

