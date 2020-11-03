const { getBuildTags } = require('./getBuildTags')
const { getDockerImg } = require('./getDockerImg')
const { getBuildArgs } = require('./getBuildArgs')
const { getDockerArgs } = require('./getDockerArgs')
const { getBuildLabels } = require('./getBuildLabels')

/**
 * Creates a docker run command as a string. Adds any needed volume mounts
 * @param {Object} args - Arguments passed to the task
 * @param {Object} args.globalConfig - Global config object for the keg-cli
 * @param {Object} args.params - Data to build the docker command
 * @param {string} args.params.dockerCmd - docker command being built
 * @param {string} args.params.context - Name of the image to be built
 * @param {Array} args.params.tags - Tag names for the image being built
 *
 * @returns {string} - Built docker build command
 */
const createBuildCmd = async (args, dockerCmd, container) => {
  const { globalConfig, params } = args
  const {
    buildArgs,
    location,
    context,
    branch,
    options=[],
    tap,
    version
  } = params

  // Ensure we have an image name to build
  const image = getDockerImg(params.image, container)

  // Add any build tags
  dockerCmd = getBuildTags({
    dockerCmd,
    container,
    image,
    context,
    options,
    version
  })

  // Add any build labels
  dockerCmd = getBuildLabels(args, dockerCmd)

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
  return location ? `${dockerCmd} ${location}` : dockerCmd
}

/**
 * Builds a docker command to be passed to the command line
 * @param {Object} args - Arguments passed to the task
 * @param {Object} args.globalConfig - Global config object for the keg-cli
 * @param {Object} params - Data to build the docker command
 * @param {Object} params.cmd - The docker command to run
 * @param {Object} params.context - Name of the docker container to run
 * @param {Object} params.env - Environment to run the container in
 * @param {Object} params.envs - Environment Vars to pass to the docker command
 *
 * @returns {string} - Built docker command
 */
const buildDockerCmd = args => {
  const { params={} } = args
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
  const buildContainer = (container || context).toUpperCase()

  // Get the default docker arguments
  const dockerCmd = getDockerArgs({
    cmd,
    context,
    args: dockerOpts,
    dockerCmd: `docker ${cmd} ${docker}`.trim()
  })

  return createBuildCmd(args, dockerCmd, buildContainer)

}

module.exports = {
  buildDockerCmd
}
