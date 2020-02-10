const { deepFreeze, unset, set, get, deepMerge } = require('jsutils')
const appJson = require('../app.json')
const tapJson = require('../taps/test/app.json')
const configOverrides = get(appJson, [ 'keg', 'overrides' ])
unset(appJson, [ 'keg', 'overrides' ])

const joinConfigs = () => {
  const config = deepMerge(appJson, tapJson)

  configOverrides && Object.keys(configOverrides)
    .map(key => {
      const override = configOverrides[key]
      set(config, override, get(appJson, override))
    })

  return config
}

module.exports = {
  appConfig: deepFreeze(appJson),
  tapConfig: deepFreeze(tapJson),
  config: joinConfigs()
}
