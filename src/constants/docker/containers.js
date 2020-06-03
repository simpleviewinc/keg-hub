const path = require('path')
const { deepFreeze, deepMerge, keyMap } = require('jsutils')
const { cliRootDir, dockerEnv, defaultENVs, images } = require('./values')
const { loadENV } = require('KegFileSys/env')
const { pathExistsSync } = require('KegFileSys/fileSys')
const { GLOBAL_CONFIG_FOLDER } = require('../constants')

let __CONTAINERS

// Default config for all containers
const DEFAULT = {
  VALUES: {
    clean: '--force-rm',
    nocache: '--no-cache',
    entrypoint: '--entrypoint',
  },
  DEFAULTS: {
    clean: true,
    entrypoint: false,
    file: true,
    nocache: false,
  },
  ARGS: keyMap([
    'GIT_KEY',
    'GIT_CLI_URL',
  ], true),
  ENV: {}
}

/*
 * Checks if an ENV file exists for the current dockerEnv
 * @function
 * @param {string} container - Name of the container to build the config for
 *
 * @returns {Object} - Loaded ENVs for the current environment
*/
const getCurrentEnvFile = (container) => {

  // Check for a global current env file
  const globalCurrentEnv = path.join(GLOBAL_CONFIG_FOLDER, `${ dockerEnv }.env`)

  // Try to load the file if it exists
  const globalEnvs = pathExistsSync(globalCurrentEnv) ? loadENV(globalCurrentEnv) : {}

  // Build path for keg-cli current env file
  const currentEnvFile = path.join(defaultENVs.CONTAINERS_PATH, container, `${ dockerEnv }.env`)

  // Try to load the file if it exists
  const localCurrentEnvs = pathExistsSync(currentEnvFile) ? loadENV(currentEnvFile) : {}

  // Merge and return the loaded env files
  return deepMerge(localCurrentEnvs, globalEnvs)

}

/*
 * Builds a config for a container from the images array
 * @function
 * @param {string} container - Name of the container to build the config for
 *
 * @returns {Object} - Built container config
*/
const containerConfig = (container) => {
  const upperCase = container.toUpperCase()

  const dockerFile = path.join(defaultENVs.CONTAINERS_PATH, container, `Dockerfile`)

  // Build config ENVs
  const contextEnv = loadENV(path.join(defaultENVs.CONTAINERS_PATH, container, 'context.env'))

  // Merge the container config with the default config and return
  return deepMerge(DEFAULT, {
    VALUES: { file: `-f ${ dockerFile }` },
    // Ensures the Git url for the container gets added as a build arg
    ARGS: keyMap([ `GIT_${ container.toUpperCase() }_URL` ], true),
    // Build the ENVs by merging with the default, context, and environment
    ENV: deepMerge(defaultENVs, contextEnv, getCurrentEnvFile(container)),
  })

}

/*
 * Builds the config for each container in the values images array
 * @function
 *
 * @returns {Object} - Built container config
*/
const buildContainers = () => {
  // Builds the docker locations for the container and Dockerfile
  __CONTAINERS = __CONTAINERS || images.reduce((data, container) => {
    data[ container.toUpperCase() ] = containerConfig(container)

    return data
  }, {})

  return __CONTAINERS

}


const containersObj = {}
// Add the CONTAINERS property, with a get function do it only get called when referenced
Object.defineProperty(containersObj, 'CONTAINERS', { get: buildContainers, enumerable: true })

module.exports = containersObj