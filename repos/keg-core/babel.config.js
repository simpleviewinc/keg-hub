const tapPath = require('app-root-path').path
const getAppConfig = require('@keg-hub/tap-resolver/src/resolvers/getAppConfig')
const tapResolver = require('@keg-hub/tap-resolver')
const { exists, deepMerge, set, get, unset } = require('@keg-hub/jsutils')
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
  // Cache the Babel config by environment
  exists(get(api, 'cache.using')) && api.cache.using(() => process.env.NODE_ENV)

  return tapResolver({
    tapPath,
    kegPath: __dirname,
    config: tapConfig.name !== kegConfig.name && joinConfigs() || kegConfig
  })

}
