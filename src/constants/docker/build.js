const path = require('path')
const { deepFreeze, deepMerge, keyMap } = require('jsutils')
const { loadENV } = require('KegFileSys/env')

const cliRootDir = path.join(__dirname, '../../../')
const containersPath = path.join(cliRootDir, 'containers')
const composePath = path.join(containersPath, 'compose')
const coreDockerFile = path.join(containersPath, 'core/Dockerfile')
const tapDockerFile = path.join(containersPath, 'tap/Dockerfile')

const configEnv = process.env.NODE_ENV || 'local'

const DEFAULT = {
  VALUES: {
    file: `-f ${coreDockerFile}`,
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
    loadENV(path.join(composePath, '.env')) || {},
    loadENV(path.join(composePath, `${ configEnv }.env`)) || {},
  )
}

module.exports = deepFreeze({
  CONTAINERS_PATH: containersPath,
  COMPOSE_PATH: composePath,
  NODE_ENV: configEnv,
  BUILD: {
    CORE: deepMerge(DEFAULT, {
      ENV: loadENV(path.join(containersPath, 'core/.env'))
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