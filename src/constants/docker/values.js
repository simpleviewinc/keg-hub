const path = require('path')
const { deepFreeze, keyMap } = require('jsutils')
const cliRootDir = path.join(__dirname, '../../../')
const containers = [ 'base', 'core', 'tap' ]

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
  }
}

module.exports = deepFreeze({
  containers,
  cliRootDir,
  configEnv: process.env.NODE_ENV || 'local',
  containersPath: path.join(cliRootDir, 'containers'),
  mountPaths
})

