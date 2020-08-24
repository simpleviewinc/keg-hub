const tapPath = require('app-root-path').path
const getAppConfig = require('@svkeg/tap-resolver/src/resolvers/getAppConfig')
const tapResolver = require('@svkeg/tap-resolver')
const { checkCall, deepMerge, set, get, unset } = require('@svkeg/jsutils')
const tapConfig = getAppConfig(tapPath, false, false)
const kegConfig = require('./app.json')
const configOverrides = get(kegConfig, [ 'keg', 'overrides' ])
unset(kegConfig, [ 'keg', 'overrides' ])

let config
const joinConfigs = () => {
  config = config || deepMerge(kegConfig || {}, tapConfig || {})

  configOverrides && Object.keys(configOverrides)
    .map(key => {
      const override = configOverrides[key]
      set(config, override, get(kegConfig, override))
    })

  return config
}

module.exports = api => {
  checkCall(api && api.cache, true)

  return tapResolver({
    tapPath,
    kegPath: __dirname,
    config: tapConfig.name !== kegConfig.name && joinConfigs() || kegConfig
  })

}
