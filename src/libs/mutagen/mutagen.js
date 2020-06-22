const { Sync } = require('./sync')
const { Config } = require('./config')
const { mutagenCli } = require('./commands')
const { GLOBAL_CONFIG_FOLDER, CLI_ROOT } = require('KegConst/constants')
const { deepMerge } = require('jsutils')

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

}

const mutagen = new Mutagen({})

module.exports = {
  Mutagen,
  mutagen
}