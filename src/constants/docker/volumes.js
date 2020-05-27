const { deepFreeze, deepMerge, keyMap } = require('jsutils')
const { cliRootDir, images, mountPaths } = require('./values')

const DEFAULT = {
  PATHS: {
    cli: mountPaths.base.cli,
  },
  DEV_DEFAULTS: [
    'cli',
    // 'core',
    'resolver',
    'components',
    'retheme'
  ]
}

module.exports = deepFreeze({
  VOLUMES: images.reduce((data, image) => {

    if(!mountPaths[image] || !mountPaths[image].core)
      return data
    
    const corePath = mountPaths[image].core
    data[image.toUpperCase()] = deepMerge(DEFAULT, {
      PATHS: {
        // core: corePath,
        components: `${corePath}/node_modules/keg-components`,
        resolver: `${corePath}/node_modules/tap-resolver`,
        retheme: `${corePath}/node_modules/re-theme`,
      },
    })

    return data
  }, {})

})
