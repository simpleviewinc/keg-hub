const { deepFreeze, deepMerge, keyMap } = require('@svkeg/jsutils')
const { cliRootDir, images } = require('./values')

// TODO: Updated this to use DefaultENVs object
// Locations where local folders get mounted
// Also uses the mountPaths object keys to get image names array
const mountPaths = {
  base: {
    cli: '/keg/keg-cli'
  },
  core: {
    core: '/keg/keg-core'
  },
  tap: {
    core: '/keg/tap/node_modules/keg-core',
    tap: '/keg/tap',
  },
  components: {
    components: '/keg/keg-components',
    comps: '/keg/keg-components',
  },
  proxy: {
    proxy: '/keg/keg-proxy',
  }
}

const DEFAULT = {
  PATHS: {
    cli: mountPaths.base.cli,
  },
  DEV_DEFAULTS: []
}

/**
 * Sets up the default mount volumes for each container
 * @object
 */
const VOLUMES = images.reduce((data, image) => {

  if(!mountPaths[image]) return data

  if(!mountPaths[image].core){
    data[image.toUpperCase()] = deepMerge(DEFAULT, { PATHS: { ...mountPaths[image] } })
    return data
  }

  const corePath = mountPaths[image].core
  data[image.toUpperCase()] = deepMerge(DEFAULT, {
    PATHS: {
      components: `${corePath}/node_modules/@simpleviewinc/keg-components`,
      resolver: `${corePath}/node_modules/@simpleviewinc/tap-resolver`,
    },
  })

  return data
}, {})

module.exports = deepFreeze({
  VOLUMES,
})
