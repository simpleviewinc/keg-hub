const { createGlobalConfig } = require('KegUtils/globalConfig')

const syncGlobalConfig = (args) => {
  
  const { command, options, globalConfig } = args
  const merge = options.indexOf('merge') !== -1

  return createGlobalConfig(globalConfig, merge)

}

module.exports = {
  name: 'sync',
  action: syncGlobalConfig,
  description: `Syncs config from this repo with the global config.`,
  example: 'keg global sync <options>'
}