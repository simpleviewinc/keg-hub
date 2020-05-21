const path = require('path')
const { deepFreeze, keyMap } = require('jsutils')
const cliRootDir = path.join(__dirname, '../../../')

// Locations where local folders get mounted
const mountPaths = {
  base: {
    cli: '/keg/cli'
  },
  core: {
    core: '/keg/keg-core'
  },
  tap: {
    core: '/keg/tap/node_modules/keg-core',
    tap: '/keg/tap',
  },
  components: {
    tap: '/keg/keg-components',
  }
}

module.exports = deepFreeze({
  cliRootDir,
  containers: Object.keys(mountPaths),
  configEnv: process.env.NODE_ENV || 'local',
  containersPath: path.join(cliRootDir, 'containers'),
  mountPaths
})

