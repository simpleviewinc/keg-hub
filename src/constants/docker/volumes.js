const { deepFreeze, deepMerge, keyMap } = require('jsutils')
const { cliRootDir, images } = require('./values')

// TODO: Updated this to use DefaultENVs object
// Locations where local folders get mounted
// Also uses the mountPaths object keys to get image names array
const mountPaths = {
  base: {
    cli: '/keg/keg-cli'
  },
  core: {
    core: '/keg/tap'
  },
  tap: {
    core: '/keg/tap/node_modules/keg-core',
    tap: '/keg/tap',
  },
  components: {
    tap: '/keg/keg-components',
  },
  proxy: {
    proxy: '/keg/keg-proxy',
  }
}

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

/**
 * Sets up the default mount volumes for each container
 * @object
 */
const VOLUMES = images.reduce((data, image) => {

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

module.exports = deepFreeze({ VOLUMES })
