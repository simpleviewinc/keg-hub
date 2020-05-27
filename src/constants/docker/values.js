const path = require('path')
const { deepFreeze, keyMap } = require('jsutils')
const cliRootDir = path.join(__dirname, '../../../')
const { getDefaultENVs } = require('./getDefaultENVs')

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

const locationContext = keyMap([
  'repo',
  'containers'
], true)

module.exports = deepFreeze({
  cliRootDir,
  runtimeEnv: process.env.NODE_ENV || 'local',
  defaultENVs: getDefaultENVs(cliRootDir),
  images: Object.keys(mountPaths),
  locationContext,
  mountPaths
})

