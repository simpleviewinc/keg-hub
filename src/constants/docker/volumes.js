const { deepFreeze, deepMerge, keyMap } = require('jsutils')

const cliPath = '/keg/cli'
const coreInTap = '/keg/tap/node_modules/keg-core'
const coreAsRoot = '/keg/keg-core'

const DEFAULT = {
  PATHS: {
    cli: cliPath,
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
    CORE: deepMerge(DEFAULT, {
      PATHS: {
        core: coreAsRoot,
        components: `${coreAsRoot}/node_modules/keg-components`,
        resolver: `${coreAsRoot}/node_modules/tap-resolver`,
        're-theme': `${coreAsRoot}/node_modules/re-theme`,
      },
    }),
    TAP: deepMerge(DEFAULT, {
      PATHS: {
        core: coreInTap,
        components: `${coreInTap}/node_modules/keg-components`,
        resolver: `${coreInTap}/node_modules/tap-resolver`,
        're-theme': `${coreInTap}/node_modules/re-theme`,
      }
    }),
  }
})
