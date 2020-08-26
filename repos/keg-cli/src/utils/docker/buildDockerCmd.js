const { isObj } = require('@svkeg/jsutils')
const { getBuildTags } = require('./getBuildTags')
const { getDirsToMount, getAppMount, getVolumeMounts } = require('./buildDockerMounts')
const { getDockerImg } = require('./getDockerImg')
const { getBuildArgs } = require('./getBuildArgs')
const {
  addContainerName,
  addContainerEnv,
  getDockerArgs,
  getPortMap,
} = require('./getDockerArgs')

/**
 * Creates a docker run command as a string. Adds any needed volume mounts
 * @param {Object} globalConfig - Global config object for the keg-cli
 * @param {Object} params - Data to build the docker command
 * @param {string} params.dockerCmd - docker command being built
 * @param {string} params.context - Name of the image to be built
 * @param {Array} params.tags - Tag names for the image being built
 *
 * @returns {string} - Built docker build command
 */
const createBuildCmd = async (globalConfig, dockerCmd, params) => {
  const {
    buildArgs,
    container,
    location,
    context,
    branch,
    options=[],
    tap,
    version
  } = params

  // Ensure we have an image name to build
  const image = getDockerImg(params.image, container)

  // Add any options if needed
  dockerCmd = getBuildTags({ dockerCmd, container, image, context, options, version })

  // Add the build args for the github key and tap git url
  dockerCmd = await getBuildArgs(globalConfig, {
    buildArgs,
    branch,
    context,
    dockerCmd,
    location,
    tap
  })

  // Add the location last. This is the location the container will be built from
  return location
    ? `${dockerCmd} ${location}`
    : dockerCmd
}

/**
 * Creates a docker run command as a string. Adds any needed volume mounts
 * @param {Object} globalConfig - Global config object for the keg-cli
 * @param {Object} params - Data to build the docker command
 * @param {string} params.dockerCmd - docker command being built
 * @param {string} params.image - docker image to use when running the container
 * @param {Array} params.mounts - Key names of repos to be mounted
 *
 * @returns {string} - Built docker run command
 */
const createRunCmd = (globalConfig, dockerCmd, params) => {
  const {
    container,
    env,
    envs={},
    execCmd,
    context,
    branch,
    image,
    mounts,
    platform,
    tap
  } = params

  // Get the name for the docker container
  dockerCmd = addContainerName(
    dockerCmd,
    tap ? `${context}-${tap}` : context,
  )

  // Temp helper to map port 80 to the DOC_APP_PORT
  // This should be removed when keg-proxy is setup
  // dockerCmd = getPortMap(dockerCmd, context)

  // Add the env to the docker command
  dockerCmd = addContainerEnv(dockerCmd, {
    TAP: tap,
    GIT_BRANCH: branch,
    PLATFORM: platform,
    KEG_EXEC_CMD: execCmd,
    // Join the envs object to be added as envs to the docker container
    ...(isObj(envs) && envs),
  })

  // Mount the tap location by default
  // TODO: Add a setting to globalConfig which sets mount docker app by default
  // Commenting out for now, must explicitly set the mount option from command line
  // dockerCmd = getAppMount(dockerCmd, context, location)

  // First fet the directory paths to mount
  const toMount = getDirsToMount(
    globalConfig,
    mounts,
    env,
    container
  )

  // Then build the docker volume string for each mount path
  dockerCmd = toMount ? getVolumeMounts(toMount, dockerCmd) : dockerCmd

  // Add the location last. This is the location the container will be built from
  return `${ dockerCmd } ${ getDockerImg(image, container, 'latest') }`
}

/**
 * Builds a docker command to be passed to the command line
 * @param {Object} globalConfig - Global config object for the keg-cli
 * @param {Object} params - Data to build the docker command
 * @param {Object} params.cmd - The docker command to run
 * @param {Object} params.context - Name of the docker container to run
 * @param {Object} params.env - Environment to run the container in
 * @param {Object} params.envs - Environment Vars to pass to the docker command
 *
 * @returns {string} - Built docker command
 */
const buildDockerCmd = (globalConfig, params) => {
  const {
    branch,
    cmd,
    docker='',
    env,
    envs,
    execCmd,
    image,
    location,
    mounts,
    context,
    container,
    platform,
    tags,
    tap,
    version,
    ...dockerOpts
  } = params
  
  // In no container is set, try to use the context of the docker image to build
  params.container = (container || context).toUpperCase()

  // Get the default docker arguments
  const dockerCmd = getDockerArgs({
    cmd,
    context,
    args: dockerOpts,
    dockerCmd: `docker ${cmd} ${docker}`.trim()
  })

  // Figure out which docker command to run
  return cmd === 'build'
    ? createBuildCmd(globalConfig, dockerCmd, params)
    // createRunCmd not currently used!
    : createRunCmd(globalConfig, dockerCmd, params)

}

module.exports = {
  buildDockerCmd
}
