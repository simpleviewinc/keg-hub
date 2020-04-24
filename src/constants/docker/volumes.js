const { deepFreeze, deepMerge, keyMap } = require('jsutils')

const cliPath = '/keg/cli'
const corePath = '/keg/tap/node_modules/keg-core'

const DEFAULT = {
  PATHS: {
    cli: cliPath,
    core: corePath,
    components: `${corePath}/node_modules/keg-components`,
    resolver: `${corePath}/node_modules/keg-components`,
    're-theme': `${corePath}/node_modules/re-theme`,
  },
  DEV_DEFAULTS: [
    'cli',
    'core',
    'components',
    're-theme'
  ]
}

module.exports = deepFreeze({
  VOLUMES: {
    BASE: deepMerge(DEFAULT, {}),
    TAP: deepMerge(DEFAULT, {}),
  }
})
