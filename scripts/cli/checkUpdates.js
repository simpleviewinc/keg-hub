require('module-alias/register')

const axios = require('axios')
const { Logger } = require('KegLog')
const { get, limbo, keyMap } = require('@ltipton/jsutils')
const localPackage = require('../../package.json')
const localVersion = get(localPackage, 'version')

// URL to the github package.json for the Keg-CLI 
const CLI_PACKAGE_JSON_URL = `https://raw.githubusercontent.com/simpleviewinc/keg-cli/master/package.json`


/**
 * Calls github to get the latest version of the Keg-CLI
 *
 * @returns {boolean} - If local version is up to date
 */
const checkUpdates = async () => {

  const [ err, res ] = await limbo(axios({
    url: CLI_PACKAGE_JSON_URL,
    method: 'get',
    headers: {},
  }))

  const gitVersion = get(res, 'data.version')
  if(localVersion === gitVersion) return true

  Logger.empty()
  Logger.warn(`A new version of Keg-CLI is available.`)
  Logger.print(
    Logger.colors.brightCyan(`Local:`),
    Logger.colors.brightWhite(localVersion),
    Logger.colors.brightYellow(`  |  `),
    Logger.colors.brightCyan(`Latest:`),
    Logger.colors.brightWhite(gitVersion),
  )
  Logger.empty()
  Logger.highlight(`Please pull down the latest version, then run`, `"keg cli update"`),
  Logger.empty()

  // TODO: Ask if the user wants to upgrade, then do it if yes
  // Need to add an upgrade Task before this can happen

}


// Check if script should be auto-run when running form terminal
!module.parent && checkUpdates()

module.exports = { checkUpdates }