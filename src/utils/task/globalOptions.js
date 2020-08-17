const { ENV_MAP } = require('KegConst/constants')
const { deepMerge, get, set } = require('@ltipton/jsutils')

/**
 * All env shortcuts mapped to a single array
 * @array
 */
const envOpts = Object.entries(ENV_MAP)
  .reduce((options, [ main, shortcuts ]) => {
    return options.concat(shortcuts)
  }, [])


/**
 * Cache holder for the default env
 * @object
 */
let __defaultEnv

/**
 * Gets the default env setting from the keg global config
 * @function
 *
 * @returns {string} - Default env from the global config 
 */
const getDefaultEnv = () => {
  if(__defaultEnv) return __defaultEnv
  
  const { getSetting } = require('../globalConfig/getSetting')
  __defaultEnv = getSetting('defaultEnv')

  return __defaultEnv
}

/**
 * Builds the global options object, and returns it
 * @function
 * @param {Object} task - Task Model of current task being run
 *
 * @returns {Object} - Built global Options object
 */
const getGlobalOptions = (task, action) => {
  return {
    env: {
      alias: [ 'environment' ],
      allowed: envOpts,
      description: 'Environment to run the task in',
      example: 'keg ${ task } ${ action } --env staging',
      default: getDefaultEnv() || 'development',
    },
  }
}

/**
 * Merges the passed in tasks options with the default global task options
 * @function
 * @param {Object} task - Task Model of current task being run
 *
 * @returns {Object} - Task with the task options updated
 */
const addGlobalOptions = (namedTask, name, parent) => {
  set(namedTask, `${ name }.options`, deepMerge(
    get(namedTask, `${ name }.options`),
    getGlobalOptions(parent, name),
  ))

  return namedTask
}

module.exports = {
  addGlobalOptions,
  getGlobalOptions,
}