const path = require('path')
const { deepFreeze, keyMap } = require('jsutils')
const cliRootDir = path.join(__dirname, '../../../')
const { getDefaultEnv } = require('./getDefaultEnv')

// Locations where local folders get mounted
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
  containers: Object.keys(mountPaths),
  configEnv: process.env.NODE_ENV || 'local',
  containersPath: path.join(cliRootDir, 'containers'),
  defaultEnv: getDefaultEnv(cliRootDir),
  locationContext,
  mountPaths
})

