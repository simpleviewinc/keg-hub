const { isStr, isObj } = require('jsutils')

/**
 * Validates the required App data
 * @param {string} appRoot - Path to the root of the project
 * @param {Object} appConfig - app.json config file
 *
 * @return {void}
 */
module.exports = (appRoot, appConfig) => {
  if(!appRoot || !isStr(appRoot))
    throw new Error(`App root directory path ( String ) is required as the first argument!`)

  if(!appConfig || !isObj(appConfig))
    throw new Error(`App config ( Object ) is required as the second argument!`)
}