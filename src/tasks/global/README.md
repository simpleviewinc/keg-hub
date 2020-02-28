# Global Tasks
  * These tasks are for global Keg operations that apply to more then one repo
  * Although a global task might be run on just one repo, or many depending on the task

### Sync
  * **Description**
    * Will sync the cli.json of the keg-cli repo with the users global cli.config.json
      * The users global cli.config.json is saved locally to `~/.kegConfig/cli.config.json`
  * **Example**
    * `keg sync <options>`
  * **Options**
    * merge - Merge the users global cli.config.json with the cli.json from this repo
      * Useful if the user has a custom config, and does not want to overwrite those settings
