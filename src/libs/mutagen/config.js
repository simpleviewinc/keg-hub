const path = require('path')
const { deepMerge } = require('jsutils')
const { loadYml, writeYml, stat } = require('KegFileSys')
const { generalError } = require('KegUtils/error')

/**
* Helper to build the mutagen config path
* <br/> Ensures the config file is saved as a yml file
* @function
* @param {Object} options - Mutagen Instance options
* @param {string} name - Name of mutagen config file
*
* @returns {Object} - Mutagen config file path
*/
const buildPath = ({ configFolder }, name) => {
  name = name.split('.').pop() === '.yml' ? name : `${name}.yml`
  return path.join(configFolder, name)
}

/**
 * Default config argument options
 * @object
 */
const configDefs = {}

class Config {

  constructor(mutagen){
    this.mutagen = mutagen
    this.options = deepMerge(configDefs, this.mutagen.options)
  }

  /**
  * Loads a mutagen config from the passed in name
  * @function
  * @member Config
  * @param {string} name - Name of mutagen config to load
  *
  * @returns {Object} - Mutagen config file
  */
  get = async name => {
    return loadYml(buildPath(options, name))
  }

  /**
  * Writes a mutagen config to the local file system
  * @function
  * @member Config
  * @param {string} name - Name of mutagen config to load
  * @param {string|Object} content - Content to save to file
  *
  * @returns {boolean} - True if the file could be saved
  */
  write = (name, content) => {
    return writeYml(buildPath(options, name), content)
  }

  /**
  * Checks if a config file exists
  * @function
  * @member Config
  * @param {string} name - Name of mutagen config to load
  *
  * @returns {boolean} - True if the file exists
  */
  exists = async name => {
    const [ err, doesExist ] = await stat(buildPath(options, name))
    return err ? generalError(err) : doesExist
  }

}

module.exports = {
  Config
}