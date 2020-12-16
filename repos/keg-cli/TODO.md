### CLI TODOs

**Taps**
  * Create a default init template for a tap - `create-react-tap`

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
  * Keg repos should be installed through an install command
    * Should use the globalConfig to set the install location
    * Should allow overwriting the globalConfig location
      * If location is overwritten, location should be updated in global config
  * Auto clean up docker images / cache
    * Figure out how to call this in the background as tasks are called
  * Look into building tap images without the name tap

BUG: 
* Fix tests to no rely on globalConfig values
  * Users can customize their config values, which means tests will fail

### IMAGE FROM UPDATES
**Status**
  Currently images need keg-base:develop image to be built, before they can be built
  All code is copied from their local, and yarn packages are installed
  These yarn packages could be out-of date compared to what's on the git develop branch

**Fix**
Update tasks
  * Should to pull the keg-base:develop image instead of building it
    * Pull from provider
    * Tag the pulled image as keg-base:develop
  * On every start / build, run check for new keg-base:develop image
    * When a new image is pulled, then re-build the dependent container with the latest keg-base changes
  * After building a dependent container
    * Add the latest tag to the image
    * This will allow docker-compose to automatically use that image without needing to update the config
    * Ensure it is removed from the image before pushing it anywhere
