const path = require('path')
const { CLI_ROOT } = require('KegConst/constants')
const packageJson = require('KegRoot/package.json')
const cliJson = require('KegRoot/cli.json')
const { deepMerge } = require('jsutils')
const cliParent = path.join(CLI_ROOT, '../')

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
        cli: CLI_ROOT,
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