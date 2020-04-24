const path = require('path')
const { deepFreeze, deepMerge, keyMap } = require('jsutils')

const cliRootDir = path.join(__dirname, '../../../')
const containersPath = path.join(cliRootDir, 'containers'),
const baseDockerFile = path.join(containersPath, 'base/Dockerfile')
const tapDockerFile = path.join(containersPath, 'tap/Dockerfile')

const DEFAULT = {
  VALUES: {
    file: `-f ${baseDockerFile}`,
    clean: '--rm',
  },
  DEFAULTS: {
    clean: true,
    file: true,
  },
  ARGS: keyMap([
    'GIT_KEY',
    'GIT_CLI_URL',
  ], true),
}

module.exports = deepFreeze({
  CONTAINERS_PATH: containersPath,
  DOCKER_CONFIG_PATH: path.join(containersPath, 'config'),
  BUILD: {
    BASE: deepMerge(DEFAULT, {}),
    TAP: deepMerge(DEFAULT, {
      {
        VALUES: {
          file: `-f ${tapDockerFile}`,
        },
        ARGS: keyMap([
          'GIT_TAP_URL',
        ], true),
      },
    })
  },
})