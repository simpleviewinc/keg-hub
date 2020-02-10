const { isObj, isEmpty, isStr, get } = require('jsutils')
const { requireFile } = require('../helpers')
const tapConstants = require('../tap/tapConstants')

const { configNames, configKeys }  = tapConstants

/**
 * Search's a number of paths in the applications root for tapResolver config
 * @param {string} appRoot - Root directory of the mobile keg
 * @param {boolean} validate - Should the found config object be validated
 *
 * @returns {Object} - Object with the tapResolver config if found
 */
const getAppConfig = (appRoot, validate=true) => (
  configNames.reduce((foundConfig, file) => {

    // If we already found the config just return it
    if(foundConfig) return foundConfig

    // Try to load the config file
    const { data: config, location } = requireFile(appRoot, file)

    // If config is not an object, just return
    if(!isObj(config)) return foundConfig
    
    // Add the location and file name for future reference
    config[configKeys.TAP_RESOLVER_LOC] = location
    config[configKeys.TAP_RESOLVER_FILE] = file
  
    // If we're not validating, just return the config
    // Otherwise check that it has the tapResolver key defined
    // If it does return it, otherwise return foundConfig
    return !validate
      ? config
      : get(config, [ 'keg', 'tapResolver' ])
        ? config
        : foundConfig

  }, null)
)

/**
 * Gets the app config from app.json || package.json
 * Validates the paths of the app config
 * @param {string} appRoot - Root directory of the mobile keg
 * @param {boolean} validate - Should the found config object be validated
 *
 * @returns {Object} app config object
 */
module.exports = (appRoot, validateObj=true, validatePaths=true) => {

  if(!isStr(appRoot))
    throw new Error(`Application root directory is required!`)
  
  // Get the app config from possible options
  let appConfig = getAppConfig(appRoot, validateObj)
  
  if(validateObj && (!isObj(appConfig) || isEmpty(appConfig)))
    throw new Error(
      `Could not find config in ${configNames.join(', ')} from the applications root directory!`
    )
  
  if(!validatePaths) return appConfig
  
  const paths = get(appConfig, [ 'keg', 'tapResolver', 'paths' ])

  if(!isObj(paths))
    throw new Error(
      `App config does NOT define 'keg.tapResolver.paths'. The path key is required, and must be an object!`
    )

  Array
    .from([ 'kegSrc' ])
    .map(path => {
      if(!isStr(paths[path]) && paths[path] !== false)
        throw new Error(
          `Your app config 'keg.tapResolver.paths' must contain a ${path} key as a string!`
        )
    })

  return appConfig
}
