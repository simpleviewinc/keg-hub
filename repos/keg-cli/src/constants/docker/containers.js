const path = require('path')
const { KEG_ENVS } = require('../envs')
const { PREFIXED } = require('./machine')
const { loadYmlSync } = require('../../libs/fileSys/yml')
const { checkLoadEnv } = require('../../libs/fileSys/env')
const { GLOBAL_CONFIG_FOLDER } = require('../constants')
const { defineProperty } = require('../../utils/helpers/defineProperty')
const { deepFreeze, deepMerge, keyMap, get } = require('@svkeg/jsutils')
const { cliRootDir, containersPath, images } = require('./values')

/**
 * Holds each docker containers meta data that can be built by the CLI
 * @internal
 * @object
 */
let __CONTAINERS

// 
/**
 * Default container meta data for all containers that can be built by the CLI
 * @internal
 * @object
 */
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
  BUILD_ARGS_FILTER: [],
}

/*
 * Checks if an ENV file exists for the current currentEnv and loads it
 * @function
 * @param {string} container - Name of the container to build the config for
 *
 * @returns {Object} - Loaded ENVs for the current environment
*/
const getEnvFiles = (container, currentEnv, __internal={}) => {

  const envPaths = [
    // ENVs in the container folder based on current environment
    // Example => /containers/core/local.env
    path.join(containersPath, container, `${ currentEnv }.env`),
    // ENVs in the global config folder based on current environment
    // Example => ~/.kegConfig/local.env
    path.join(GLOBAL_CONFIG_FOLDER, `${ currentEnv }.env`),
    // ENVs in the global config folder based on current container and environment
    // Example => ~/.kegConfig/core-local.env
    path.join(GLOBAL_CONFIG_FOLDER, `${ container }-${ currentEnv }.env`),
  ]

  // If an internal ENV path is passed in, add it to the paths array
  const { envsPath } = __internal
  envsPath && envPaths.push(envsPath)

  // Try to load each of the envPaths if then exists
  // Then merge and return them
  return deepMerge(
    ...envPaths.reduce((envs, envPath) => {
      return envs.concat([ checkLoadEnv(envPath) ])
    }, [])
  )

}

/*
 * Checks if a yml file exists for the current currentEnv and loads it's env values
 * @function
 * @param {string} container - Name of the container to build the config for
 *
 * @returns {Object} - Loaded yaml envs for the current environment
*/
const getValuesFiles = (container, currentEnv, __internal={}) => {
  const { valuesPath, containerPath } = __internal

  const globalPaths = [
    // ENVs in the global config folder based on current environment
    // Example => ~/.kegConfig/values_local.yml
    path.join(GLOBAL_CONFIG_FOLDER, `values_${ currentEnv }.yml`),
    path.join(GLOBAL_CONFIG_FOLDER, `values-${ currentEnv }.yml`),

    // ENVs in the global config folder based on current container and environment
    // Example => ~/.kegConfig/core_values_local.yml
    path.join(GLOBAL_CONFIG_FOLDER, `${ container }_values_${ currentEnv }.yml`),
    path.join(GLOBAL_CONFIG_FOLDER, `${ container }-values-${ currentEnv }.yml`),
  ]

  // If it's an injected app, load the injected values fiels
  // Otherwise load the internal values paths
  const ymlPaths = containerPath
  ? [
      // Load the global values before the external values
      // This allows apps to overwrite global defaults
      ...globalPaths,
      // Add the main injected values path first
      valuesPath,
      // Also try to load an injected ENV values file that override the default
      containerPath && path.join(containerPath, `values_${ currentEnv }.yml`),
      containerPath && path.join(containerPath, `values-${ currentEnv }.yml`),
    ]
  : [
      // ENVs in the container folder based on current environment
      // Example => /containers/core/values.yml
      path.join(containersPath, container, 'values.yml'),
      // ENVs in the container folder based on current environment
      // Example => /containers/core/values_local.yml
      path.join(containersPath, container, `values_${ currentEnv }.yml`),
      path.join(containersPath, container, `values-${ currentEnv }.yml`),
      // Load the global values after the internal values
      // This allows global defaults to overwrite internal values
      ...globalPaths
    ]

  // Try to load each of the envPaths if it exists, then merge and return them
  return deepMerge(
    ...ymlPaths.reduce((ymls, ymlPath) => {
      return ymlPath
        ? ymls.concat([ loadYmlSync(ymlPath, false).env ])
        : ymls
    }, [])
  )

}

/**
 * Builds a config for a container from the images array
 * @function
 * @param {string} container - Name of the container to build the config for
 *
 * @returns {Object} - Built container config
*/
const containerConfig = (container, currentEnv, __internal={}) => {
  const upperCase = container.toUpperCase()

  const dockerFile = __internal.dockerPath || path.join(containersPath, container, `Dockerfile`)

  // Merge the container config with the default config and return
  return deepMerge(DEFAULT, {
    VALUES: { file: `-f ${ dockerFile }` },
    // Ensures the Git url for the container gets added as a build arg
    ARGS: keyMap([
      `GIT_${ container.toUpperCase() }_URL`,
      `GIT_APP_URL`,
    ], true),
    // Build the ENVs by merging with the default, context, and environment
    ENV: deepMerge(
      PREFIXED,
      KEG_ENVS,
      __internal.ENVS,
      getValuesFiles(container, currentEnv, __internal),
      getEnvFiles(container, currentEnv, __internal)
    ),
  })

}

/**
 * Builds the config for each container in the values images array
 * @function
 *
 * @returns {Object} - Built container config
*/
const buildContainers = (container, currentEnv, __internal) => {

  container &&
    !images.includes(container) &&
    images.push(container)

  // Builds the docker locations for the container and Dockerfile
  __CONTAINERS = images.reduce((data, image) => {
    
    data[ image.toUpperCase() ] = image === container
      ? containerConfig(image, currentEnv, __internal)
      : containerConfig(image, currentEnv)

    return data
  }, {})

  return __CONTAINERS

}

/**
 * Gets the __CONTAINERS object or builds it if it does not exist
 * @function
 *
 * @returns {Object} - Built container config
*/
const getContainers = () => (__CONTAINERS || buildContainers())

/**
 * Injector helper to build a __CONTAINERS object dynamically
 * @function
 * @param {string} container - Name of the container to inject
 * @param {Object} __internal - Paths to files for the injected container
 *
 * @returns {Object} - Built container config
*/
const injectContainer = (container, currentEnv, __internal) => buildContainers(
  container,
  currentEnv,
  __internal,
)

/**
 * Exported object of this containers module
 * @Object
 */
const containersObj = { injectContainer }

/**
 * Defines the CONTAINERS property on the values object with a get method of getContainers
 * <br/>Allows the getContainers method to dynamically build the __CONTAINERS object at runtime
 * @function
 */
defineProperty(containersObj, 'CONTAINERS', { get: getContainers })

module.exports = deepFreeze(containersObj)