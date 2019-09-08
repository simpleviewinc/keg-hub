const path = require('path')
const { isObj, isEmpty, isStr, get } = require('jsutils')
const { requireFile } = require('./helpers')

/**
 * Gets the app config from app.json || package.json
 * Validates the paths of the app config
 * @param {string} appRoot - Root directory of the mobile keg
 *
 * @returns {Object} app config object
 */
module.exports = appRoot => {

  if(!isStr(appRoot))
    throw new Error(`Application root directory is required!`)

  let appConfig = requireFile(appRoot, './app.json', false) || requireFile(appRoot, './package.json', true)

  if(!isObj(appConfig) || isEmpty(appConfig))
    throw new Error(`Could not find app.json in root directory!. app.json is required!`)

  const paths = get(appConfig, [ 'clientResolver', 'paths' ])

  if(!isObj(paths))
    throw new Error(`App config does NOT define 'clientResolver.paths'. This path is required!`)

  Array
    .from([ 'externalClients', 'localClients', 'baseClient' ])
    .map(path => {
      if(!isStr(paths[path]))
        throw new Error(
          `Your app config 'clientResolver.paths' must contain a ${path} key as a string!`
        )
    })

  return appConfig
}