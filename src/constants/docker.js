const { deepFreeze } = require('jsutils')
const path = require('path')
const cliRootDir = path.join(__dirname, '../../')

const dockerFile = path.join(cliRootDir, 'scripts/docker/Dockerfile')
const corePath = '/keg/tap/node_modules/sv-keg'

module.exports = deepFreeze({
  DOCKER: {
    RUN: {
      VALUES: {
        network: '--network=host',
        clean: '--rm',
        attached: '-it',
        detached: '-d'
      },
      DEFAULTS: {
        attached: true,
        clean: true,
        network: true,
      }
    },
    BUILD: {
      VALUES: {
        file: `-f ${dockerFile}`,
        clean: '--rm',
      },
      DEFAULTS: {
        clean: true,
        file: true,
      }
    },
    MOUNT_PATHS: {
      core: corePath,
      components: `${corePath}/node_modules/keg-components`,
      resolver: `${corePath}/node_modules/keg-components`,
      're-theme': `${corePath}/node_modules/re-theme`,
    }
  }
})