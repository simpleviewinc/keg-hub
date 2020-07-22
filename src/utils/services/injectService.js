const path = require('path')
const { get, isStr } = require('@ltipton/jsutils')
const { pathExists } = require('KegFileSys')
const { throwMissingFile } = require('../error/throwMissingFile')
const { getServiceName } = require('../docker/compose/getServiceName')

/**
 * Checks if the passed in path exists on the local file system
 * @function
 * @param {string} checkPAth - Path to check if exists on the local file system
 *
 * @returns {boolean} - True if the checkPath exists on the local file system
 */
const containerPathExist = async checkPath => {
  const [ err, rep ] =  await pathExists(checkPath)
  return Boolean(rep)
}

/**
 * Checks if the mainPath exists, and if it doesn't then checks the altPAth
 * <br/>Returns either path if they exist
 * @function
 * @param {string} mainPath - Path to check if exists first
 * @param {string} altPath - Path to check if mainPath does not exist
 *
 * @returns {string} - Found path that exists from either the mainPath or altPath
 */
const checkMultiPath = async (mainPath, altPath) => {
  let hasPath = await containerPathExist(mainPath) && mainPath
  hasPath = hasPath || await containerPathExist(altPath) && altPath

  return hasPath
}

/**
 * Checks that a docker-compose file exists in the container path of the app
 * @function
 * @param {string} containerPath - Path to the apps container folder
 *
 * @returns {string} - Found docker-compose file path
 */
const checkComposeFile = async containerPath => {
  const hasComp = await checkMultiPath(
    path.join(containerPath, 'docker-compose.yml'),
    path.join(containerPath, 'docker-compose.yaml')
  )

  return hasComp
}

/**
 * Checks that a Dockerfile exists in the root or container path of the app
 * @function
 * @param {string} injectPath - Path to the root of the app being injected
 * @param {string} containerPath - Path to the apps container folder
 *
 * @returns {string} - Found Dockerfile path
 */
const checkDockerFile = async (injectPath, containerPath) => {
  const hasDocker = await checkMultiPath(
    path.join(containerPath, 'Dockerfile'),
    path.join(injectPath, 'Dockerfile')
  )

  return hasDocker
}

/**
 * Checks that the passed in fileName exists as a yml file
 * <br/>Checks both yml and yaml
 * @function
 * @param {string} containerPath - Path to the apps container folder
 * @param {string} fileName - Name of the yaml file to get the path for
 *
 * @returns {string} - Found yaml files path
 */
const checkYmlFile = async (containerPath, fileName) => {
  const hasYml = await checkMultiPath(
    path.join(containerPath, `${ fileName }.yml`),
    path.join(containerPath, `${ fileName }.yaml`)
  )

  return hasYml
}

/**
 * Calls the docker constants inject methods
 * <br/>Adds the app and container paths to the docker constants at runtime
 * @function
 * @param {string} params.app - Name of the app to inject
 * @param {string} params.injectPath - Local path to the app to be injected
 * @param {Object} containerPaths - Paths to the apps container files
 *
 * @returns {Void}
 */
const injectData = async ({ app, injectPath }, currentEnv, containerPaths) => {
  const { injectImage } = require('KegConst/docker/values')
  const { injectContainer } = require('KegConst/docker/containers')

  // Add the app name to the docker IMAGES constants
  injectImage(app)

  // Add the app container info to the docker CONTAINERS constants
  injectContainer(app, currentEnv, {
    ...containerPaths,
    // Add the KEG ENVS for the correct paths when running docker commands
    ENVS: {
      KEG_CONTEXT_PATH: injectPath,
      KEG_CONTAINER_PATH: containerPaths.containerPath,
      KEG_MUTAGEN_PATH: containerPaths.mutagenPath,
      KEG_DOCKER_FILE: containerPaths.dockerPath,
      KEG_VALUES_FILE: containerPaths.valuesPath,
      KEG_COMPOSE_DEFAULT: containerPaths.composePath,
      KEG_COMPOSE_SERVICE: containerPaths.serviceName,
    }
  })

}

/**
 * Gets the mutagen config. If no config is found it uses the tap mutagen config
 * @function
 * @param {string} containerPath - Path to the apps container folder
 *
 * @returns {string} - Path to the mutagen config
 */
const getMutagenPath = async containerPath => {
  const mutagenPath = await checkYmlFile(containerPath, 'mutagen')
  if(mutagenPath) return mutagenPath

  const { containersPath } = require('KegConst/docker/values')

  return path.join(containersPath, 'tap', 'mutagen.yml')
}

/**
 * Checks if there is a container folder in the tap
 * <br/>Then checks if it has the correct files needed to build tap
 * <br/>If it does, then uses that container folder over the keg-cli default
 * @function
 * @param {string} app - Name of the app to inject
 * @param {string} injectPath - Local path to the app to be injected
 *
 * @returns {Object} - ENVs for the context, with the KEG_CONTEXT_PATH added if needed
 */
const checkContainerPaths = async (app, injectPath) => {
  const containerPath = path.join(injectPath, 'container')

  // Check if there is a container folder at the app path
  const hasContainer = await containerPathExist(containerPath)
  // If no container folder, just return
  if(!hasContainer) return

  // Check if there is a Dockerfile at the injectPath or app container folder
  const dockerPath = await checkDockerFile(injectPath, containerPath)
  !dockerPath && throwMissingFile(app, containerPath, `Dockerfile`)

  // Check if there is a docker-compose file at in the app container folder
  const composePath = await checkYmlFile(containerPath, 'docker-compose')
  !composePath && throwMissingFile(app, containerPath, `docker-compose.yml`)

  // Get the service name from the docker compose file
  const serviceName = await getServiceName({ composePath })

  // Check if there is a values file at in the app container folder
  const valuesPath = await checkYmlFile(containerPath, 'values')
  !valuesPath && throwMissingFile(app, containerPath, `values.yml`)

  // Get the mutagen config path. If not config, it uses the taps mutagen config
  const mutagenPath = await getMutagenPath(containerPath)

  // TODO: get .envs path
  // const envsPath = await getEnvsPath(containerPath)

  // If we get to here, all files exist, so return the paths object
  return {
    serviceName,
    valuesPath,
    dockerPath,
    mutagenPath,
    composePath,
    containerPath,
    injectPath,
  }

}

/**
 * Gets the value for the image and container names
 * @function
 * @param {string} app - Name of the app to be injected
 * @param {Object} taskOptions - Allowed options defined for task to be run
 *
 * @returns {Object} - Extra params to be added to the tasksData's params object
 */
const buildOverrideParams = (app, taskOptions, serviceName) => {
  const { CONTAINERS } = require('KegConst/docker/containers')

  const injectedEnv = get(CONTAINERS, `${ app.toUpperCase() }.ENV`, {})
  const image = (isStr(injectedEnv.IMAGE) && injectedEnv.IMAGE) || app
  const container = (isStr(injectedEnv.CONTAINER_NAME) && injectedEnv.CONTAINER_NAME) || image

  return {
    serviceName,
    tap: app,
    context: app,
    ...(taskOptions.image && { image }),
    ...(taskOptions.container && { container }),
    __injected: {
      image,
      container,
      serviceName,
      tap: app,
      context: app,
    }
  }
}

/**
 * Add the __injected object to the taskData param
 * <br/>Adds the location context for docker commands to the params.__injected object
 * @function
 * @param {string} params.app - Name of the app to inject
 * @param {string} params.injectPath - Local path to the app to be injected
 * @param {Object} - params.taskData used to run the task defined from the command line
 * @param {Object} containerPaths - Paths to the apps container files
 *
 * @returns {Object} - taskData object with the injected location context for the app
 */
const buildInjectedParams = async ({ app, taskData, injectPath }, containerPaths) => {
  // Get the tasks location context
  const taskLocContext = get(taskData, 'task.locationContext')
  // Get the locationContext values
  const { locationContext:locContext } = require('KegConst/docker/values')
  // Build and add image / container name params
  const injectedParams = buildOverrideParams(app, get(taskData, 'task.options'))

  // Add the __injected object to the params with the proper location set
  // Adds some extra params to update the context and image / container names
  taskData.params = {
    ...taskData.params,
    ...injectedParams,
    __injected: {
      ...taskData.params.__injected,
      ...injectedParams.__injected,
      ...containerPaths,
      // Check what context should be used
      // Then add the corresponding injected location context
      location: Boolean(taskLocContext !== locContext.REPO)
        ? get(containerPaths, 'containerPath')
        : injectPath
    }
  }

  return taskData
}

/**
 * Injects the passed in app params into the DOCKER constants
 * <br/>This allows linked app to define their own container folders outside of the Keg-Cli
 * @function
 * @param {string} args.app - Name of the app to inject
 * @param {string} args.injectPath - Local path to the app to be injected
 * @param {Object} - args.taskData used to run the task defined from the command line
 *
 * @returns {Object} - Updated taskData used to run the task defined from the command line
 */
const injectService = async args => {

  // If the task does no allow injections, then just return
  if(!get(args, 'taskData.task.inject')) return args.taskData

  const { app, injectPath, taskData } = args
  const { params: { env } } = taskData

  // Get the container paths for the app
  const containerPaths = await checkContainerPaths(app, injectPath)

  // If no container paths just return
  // This will use the default tap container
  if(!containerPaths) return taskData

  // Inject the app and it's paths into the docker constants
  await injectData(args, env, containerPaths)

  // Set the context for where the docker command should be run from
  return buildInjectedParams(args, containerPaths)

}

module.exports = {
  injectService
}