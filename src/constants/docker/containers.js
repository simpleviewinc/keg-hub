const path = require('path')
const { deepFreeze, deepMerge, keyMap, get } = require('jsutils')
const { cliRootDir, dockerEnv, defaultENVs, images } = require('./values')
const { checkLoadEnv } = require('KegFileSys/env')
const { loadYmlSync } = require('KegFileSys/yml')
const { GLOBAL_CONFIG_FOLDER } = require('../constants')
const { PREFIXED } = require('./machine')

let __CONTAINERS

// Default config for all containers
const DEFAULT = {
  VALUES: {
    clean: '--rm',
    nocache: '--no-cache',
    entrypoint: '--entrypoint',
    connect: '-it'
  },
  DEFAULTS: {
    clean: true,
    connect: true,
    entrypoint: false,
    file: true,
    nocache: false,
  },
  ARGS: keyMap([
    'GIT_KEY',
    'GIT_CLI_URL',
  ], true),
  ENV: {},
  // Filter envs from becoming build-args durning the build process
  BUILD_ARGS_FILTER: [
    'SYNC_LOGS'
  ],
}

/*
 * Checks if an ENV file exists for the current dockerEnv and loads it
 * @function
 * @param {string} container - Name of the container to build the config for
 *
 * @returns {Object} - Loaded ENVs for the current environment
*/
const getEnvFiles = (container) => {

  const envPaths = [
    // ENVs in the container folder based on current environment
    // Example => /containers/core/local.env
    path.join(defaultENVs.CONTAINERS_PATH, container, `${ dockerEnv }.env`),
    // ENVs in the global config folder based on current environment
    // Example => ~/.kegConfig/local.env
    path.join(GLOBAL_CONFIG_FOLDER, `${ dockerEnv }.env`),
    // ENVs in the global config folder based on current container and environment
    // Example => ~/.kegConfig/core-local.env
    path.join(GLOBAL_CONFIG_FOLDER, `container-${ dockerEnv }.env`),
  ]

  // Try to load each of the envPaths if then exists
  // Then merge and return them
  return deepMerge(
    ...envPaths.reduce((envs, envPath) => {
      return envs.concat([ checkLoadEnv(envPath) ])
    }, [])
  )

}

/*
 * Checks if a yml file exists for the current dockerEnv and loads it's env values
 * @function
 * @param {string} container - Name of the container to build the config for
 *
 * @returns {Object} - Loaded yaml envs for the current environment
*/
const getValuesFiles = container => {

  const ymlPaths = [
    // ENVs in the container folder based on current environment
    // Example => /containers/core/values.yml
    path.join(defaultENVs.CONTAINERS_PATH, container, 'values.yml'),
    // ENVs in the container folder based on current environment
    // Example => /containers/core/values_local.yml
    path.join(defaultENVs.CONTAINERS_PATH, container, `values_${ dockerEnv }.yml`),
    path.join(defaultENVs.CONTAINERS_PATH, container, `values-${ dockerEnv }.yml`),
    // ENVs in the global config folder based on current environment
    // Example => ~/.kegConfig/values_local.yml
    path.join(GLOBAL_CONFIG_FOLDER, `values_${ dockerEnv }.yml`),
    path.join(GLOBAL_CONFIG_FOLDER, `values-${ dockerEnv }.yml`),
    // ENVs in the global config folder based on current container and environment
    // Example => ~/.kegConfig/core_values_local.yml
    path.join(GLOBAL_CONFIG_FOLDER, `${ container }_values_${ dockerEnv }.yml`),
    path.join(GLOBAL_CONFIG_FOLDER, `${ container }-values-${ dockerEnv }.yml`),
  ]

  // Try to load each of the envPaths if then exists
  // Then merge and return them
  return deepMerge(
    ...ymlPaths.reduce((ymls, ymlPath) => {
      return ymls.concat([ loadYmlSync(ymlPath, false).env ])
    }, [])
  )

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

  // Merge the container config with the default config and return
  return deepMerge(DEFAULT, {
    VALUES: { file: `-f ${ dockerFile }` },
    // Ensures the Git url for the container gets added as a build arg
    ARGS: keyMap([ `GIT_${ container.toUpperCase() }_URL` ], true),
    // Build the ENVs by merging with the default, context, and environment
    ENV: deepMerge(
      PREFIXED,
      defaultENVs,
      getValuesFiles(container),
      getEnvFiles(container)
    ),
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