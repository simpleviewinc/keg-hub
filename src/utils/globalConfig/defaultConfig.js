const path = require('path')
const packageJson = require('../../../package.json')
const cliJson = require('../../../cli.json')
const { deepMerge } = require('jsutils') 

const cliRoot = path.join(__dirname, '../../../')
const cliParent = path.join(__dirname, '../../../../')

/**
 * Builds the default global config from the package.json and the cli.json
 * Merges the two together, and returns it
 *
 * @returns {Object} - Default global config
 */
const defaultConfig = () => {
  const config = {}
  config.version = packageJson.version
  config.name = packageJson.name
  config.keg = {
    cli: {
      paths: {
        cli: cliRoot,
        keg: cliParent,
        core: path.join(cliParent, 'keg-core'),
        components: path.join(cliParent, 'keg-components'),
        taps: path.join(cliParent, 'taps'),
      },
      taps: { links: {} }
    }
  }

  return deepMerge(config, cliJson)
}


module.exports = {
  defaultConfig,
}