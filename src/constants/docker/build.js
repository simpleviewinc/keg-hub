const path = require('path')
const { deepFreeze, deepMerge, keyMap } = require('jsutils')
const { loadENV } = require('KegFileSys')

const cliRootDir = path.join(__dirname, '../../../')
const containersPath = path.join(cliRootDir, 'containers')
const baseDockerFile = path.join(containersPath, 'base/Dockerfile')
const tapDockerFile = path.join(containersPath, 'tap/Dockerfile')

const configEnv = process.env.NODE_ENV
  ? process.env.NODE_ENV === 'development'
    ? 'local'
    : process.env.NODE_ENV
  : 'local'

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
  ENV: deepMerge(
    loadENV(path.join(containersPath, 'config/.env')) || {},
    loadENV(path.join(containersPath, `config/${ configEnv }.env`)) || {},
  )
}

module.exports = deepFreeze({
  CONTAINERS_PATH: containersPath,
  DOCKER_CONFIG_PATH: path.join(containersPath, 'config'),
  BUILD: {
    BASE: deepMerge(DEFAULT, {
      ENV: loadENV(path.join(containersPath, 'base/.env'))
    }),
    TAP: deepMerge(DEFAULT, {
      VALUES: {
        file: `-f ${tapDockerFile}`,
      },
      ARGS: keyMap([
        'GIT_TAP_URL',
      ], true),
      ENV: loadENV(path.join(containersPath, 'tap/.env'))
    })
  },
})