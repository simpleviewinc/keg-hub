const { deepFreeze, deepMerge, keyMap } = require('jsutils')
const { containers, mountPaths } = require('./values')

const DEFAULT = {
  PATHS: {
    cli: mountPaths.cliPath,
  },
  DEV_DEFAULTS: [
    'cli',
    'core',
    'components',
    're-theme'
  ]
}

module.exports = deepFreeze({
  VOLUMES: containers.reduce((data, container) => {

    if(!mountPaths[container] || !mountPaths[container].core)
      return data
    
    const corePath = mountPaths[container].core
    data[container.toUpperCase()] = deepMerge(DEFAULT, {
      PATHS: {
        core: corePath,
        components: `${corePath}/node_modules/keg-components`,
        resolver: `${corePath}/node_modules/tap-resolver`,
        're-theme': `${corePath}/node_modules/re-theme`,
      },
    })

    return data
  }, {})

})
