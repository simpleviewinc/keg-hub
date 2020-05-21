const path = require('path')
const { deepFreeze, deepMerge, keyMap } = require('jsutils')
const { loadENV } = require('KegFileSys/env')
const { cliRootDir, containersPath, configEnv, containers } = require('./values')

// Default config for all containers
const DEFAULT = {
  VALUES: {
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
  ENV: {}
}

/*
 * Builds a config for a container from the containers array
 * @param {string} container - Name of the container to build the config for
 * @param {Array} args - Extra data to be added to the ARGS key
 *
 * @returns {Object} - Built container config
*/
const containerConfig = (container, args=[]) => {
  const upperCase = container.toUpperCase()

  const dockerFile = path.join(containersPath, container, `Dockerfile`)

  // Build config ENVs
  // Always load the default local env
  const localEnv = loadENV(path.join(containersPath, container, 'local.env'))

  // If the configEnv is not local, then load the configEnv, and merge with local
  const currentEnv = configEnv !== 'local'
    ? loadENV(path.join(containersPath, container, `${ configEnv }.env`))
    : {}

  // Merge the contianer config with the default config and return
  return deepMerge(DEFAULT, {
    VALUES: { file: `-f ${ dockerFile }` },
    ARGS: keyMap(args, true),
    ENV: deepMerge(localEnv, currentEnv),
  })
}

// Builds the docker locations for the container and Dockerfile
const dockerData = containers.reduce((data, container) => {
  const upperCase = container.toUpperCase()
  data[upperCase] = containerConfig(container, [ `GIT_${upperCase}_URL` ])

  return data
}, {})


module.exports = deepFreeze({
  CONTAINERS: containers,
  CONTAINERS_PATH: containersPath,
  DOCKER_ENV: configEnv,
  BUILD: dockerData,
})