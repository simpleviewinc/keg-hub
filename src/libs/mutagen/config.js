const path = require('path')
const { deepMerge, deepClone } = require('@ltipton/jsutils')
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
 * Default sync create config arguments
 * @Object
 */
const configDefs = {
  defaultFileMode: '0644',
  defaultDirectoryMode: '0755',
  syncMode: `one-way-replica`,
  ignoreVcs: true,
  ignore: {
    paths: [
      'node_modules',
      '/core/base/assets/*',
      '/.*',
      '!/.storybook',
      '!/.npmrc',
      '*.lock',
      '*.md',
      '/temp',
      '/web-build',
      '/reports',
      '/build',
      '/docs',
    ]
  }
}

class Config {

  constructor(mutagen){
    this.mutagen = mutagen
    this.defaults = deepClone(configDefs)
  }

  /**
  * Gets the default config, and merges with the passed in overrides object
  * @function
  * @member Config
  * @param {Object} overrides - Config object to override the default config options 
  *
  * @returns {Object} - Mutagen config
  */
  get = (overrides={}) => {
    return deepMerge(this.defaults, overrides)
  }


  /**
  * Loads a mutagen config from the passed in name
  * @function
  * @member Config
  * @param {string} name - Name of mutagen config to load
  *
  * @returns {Object} - Mutagen config file
  */
  load = async name => {
    return loadYml(buildPath(this.mutagen.options, name))
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
    return writeYml(buildPath(this.mutagen.options, name), content)
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
    const [ err, doesExist ] = await stat(buildPath(this.mutagen.options, name))
    return err ? generalError(err) : doesExist
  }

}

module.exports = {
  Config
}