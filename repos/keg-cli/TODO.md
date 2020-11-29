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


Docker-Compose
  * Injected docker-compose.yml config files are not being properly removed when the service is killed


 ---- Keg Image ---- 

Downloads in install the latest of
  - Expo
  - Keg-Hub
  - Keg-CLI

From Image
 - Uses Keg Image in multistage build
 - Must define the Keg Image first
 - Then use Copy command to copy over things as needed


Make container

Start empty alpine image
Copy in app/tap code
- app can be tap/core/components
- use ENVs to define paths
Copy over keg helper files / local repos
- helper files pull from keg git repos
- execute helper files based on defined keg repos to pull
- helpers will pull repo from git and copy to correct location
- use sync actions to run git commands
Don’t add labels or any proxy stuff
Don’t expose any ports for taps

Run questions
Copy local or pull tap
Copy local or pull core
Copy local or pull components
Copy local or pull resolver / jsutils/ retheme
- USE ENV *_path ENVs to know which ones to ask questions for copy/pull
Ask for branch in each copy or use default
Install and build as needed for each repo

Ask for tags
default to develop
Must be explicit for other tags in make task

Use keg package url to push image to provider