const path = require('path')
const { deepFreeze, deepMerge, keyMap } = require('jsutils')
const { cliRootDir, containersPath, configEnv, containers, defaultEnv } = require('./values')
const { loadENV } = require('KegFileSys/env')

let __CONTAINERS

// Default config for all containers
const DEFAULT = {
  VALUES: {
    clean: '--force-rm',
    nocache: '--no-cache'
  },
  DEFAULTS: {
    clean: true,
    nocache: false,
    file: true,
  },
  ARGS: keyMap([
    'GIT_KEY',
    'GIT_CLI_URL',
  ], true),
  ENV: {}
}

/*
 * Checks if an ENV file exists for the current configEnv
 * @param {string} container - Name of the container to build the config for
 *
 * @returns {Object} - Loaded ENVs for the current environment
*/
const getCurrentEnvFile = (container) => {
  if(configEnv === 'local') return {}

  // If the configEnv is not local, then load the configEnv, and merge with local
  const currentEnvFile = path.join(containersPath, container, `${ configEnv }.env`)

  // Require at runtime to speed up other cli calls
  const { pathExistsSync } = require('KegFileSys/fileSys')
  return pathExistsSync(currentEnvFile) ? loadENV(currentEnvFile) : {}

}

/*
 * Builds a config for a container from the containers array
 * @param {string} container - Name of the container to build the config for
 *
 * @returns {Object} - Built container config
*/
const containerConfig = (container) => {
  const upperCase = container.toUpperCase()

  const dockerFile = path.join(containersPath, container, `Dockerfile`)

  // Build config ENVs
  const contextEnv = loadENV(path.join(containersPath, container, 'context.env'))

  // Merge the container config with the default config and return
  return deepMerge(DEFAULT, {
    VALUES: { file: `-f ${ dockerFile }` },
    // Ensures the Git url for the container gets added as a build arg
    ARGS: keyMap([ `GIT_${ container.toUpperCase() }_URL` ], true),
    // Build the ENVs by merging with the default, context, and environment
    ENV: deepMerge(defaultEnv, contextEnv, getCurrentEnvFile(container)),
  })

}

/*
 * Builds the config for each container in the values containers array
 *
 * @returns {Object} - Built container config
*/
const buildContainers = () => {
  // Builds the docker locations for the container and Dockerfile
  __CONTAINERS = __CONTAINERS || containers.reduce((data, container) => {
    data[ container.toUpperCase() ] = containerConfig(container)

    return data
  }, {})

  return __CONTAINERS

}


const containersObj = {}
// Add the CONTAINERS property, with a get function do it only get called when referenced
Object.defineProperty(containersObj, 'CONTAINERS', { get: buildContainers, enumerable: true })

module.exports = containersObj