const { deepFreeze } = require('jsutils')
const path = require('path')
const cliRootDir = path.join(__dirname, '../../')

const dockerFile = path.join(cliRootDir, 'scripts/docker/Dockerfile')

module.exports = deepFreeze({
  DOCKER: {
    RUN: {
      VALUES: {
        file: `-f ${dockerFile}`,
        network: '--network=host',
        clean: '--rm',
        attached: '-it',
        detached: '-d'
      },
      DEFAULTS: {
        attached: true,
        clean: true,
        file: true,
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
    }
  }
})