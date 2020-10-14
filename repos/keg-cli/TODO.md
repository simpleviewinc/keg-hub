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
  * Add tags to tap docker images
    * This will allow us to see if the image for that tap exists or not
  * Look into building tap images without the name tap

BUG: 
* Sometimes when killing a service,
* After killing the service it asks for a container, figure out why?
* Fix tests to no rely on globalConfig values
  * Users can customize their config values, which means tests will fail

Expo / React-Native-Package IP's
  * Update envs EXPO_DEVTOOLS_LISTEN_ADDRESS && REACT_NATIVE_PACKAGER_HOSTNAME
    * Need to bind IP's to 0.0.0.0 inside the docker container when using docker-for-desktop