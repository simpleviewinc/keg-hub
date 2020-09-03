const { Sync } = require('./sync')
const { Config } = require('./config')
const { mutagenCli } = require('./commands')
const { GLOBAL_CONFIG_FOLDER, CLI_ROOT } = require('KegConst/constants')
const { deepMerge } = require('@keg-hub/jsutils')
const { executeCmd } = require('KegProc')

/**
 * Default Mutagen argument options
 * @object
 */
const defOptions = {
  configFolder: GLOBAL_CONFIG_FOLDER,
  cliRoot: CLI_ROOT,
}

class Mutagen {

  constructor(options={}){
    this.options = deepMerge(defOptions, options)
    this.sync = new Sync(this)
    this.config = new Config(this)
  }

  /**
  * Starts the mutagen daemon
  * @function
  * @member Mutagen
  *
  * @returns {*} - Response from the mutagenCli
  */
  start = () => {
    return mutagenCli({ opts: 'daemon start' })
  }

  /**
  * Stops the mutagen daemon
  * @function
  * @member Mutagen
  *
  * @returns {*} - Response from the mutagenCli
  */
  stop = () => {
    return mutagenCli({ opts: 'daemon stop' })
  }

  /**
  * Gets the status of the mutagen daemon, by calling ps ax and filtering the response
  * @function
  * @member Mutagen
  *
  * @returns {boolean|string} - False if the daemon is not running, or the daemon pid
  */
  isRunning = async () => {
    const { error, data } = await executeCmd(
      `ps ax | grep -v docker | grep -v grep  | grep "mutagen"`
    )

    // If there's an error or no data assume the daemon is NOT running
    // Otherwise return the pid
    return error || !data
      ? false
      : data.trim().split(' ')[0]
  }

}

const mutagen = new Mutagen({})

module.exports = {
  Mutagen,
  mutagen
}