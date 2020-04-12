const { getBuildTags } = require('./getBuildTags')
const { getDirsToMount } = require('./getDirsToMount')
const { addContainerName, addTapMount, getDockerArgs } = require('./getDockerArgs')
const { getVolumeMounts } = require('./getVolumeMounts')
const { getBuildArgs } = require('./getBuildArgs')

/**
 * Creates a docker run command as a string. Adds any needed volume mounts
 * @param {Object} globalConfig - Global config object for the keg-cli
 * @param {Object} params - Data to build the docker command
 * @param {string} params.dockerCmd - docker command being built
 * @param {string} params.name - Name of the image to be built
 * @param {Array} params.tags - Tag names for the image being built
 *
 * @returns {string} - Built docker build command
 */
const createBuildCmd = (globalConfig, { dockerCmd, ...params }) => {
  const { location, name, branch, tags, version } = params

  // Add any tags if needed
  dockerCmd = getBuildTags({ name, tags, version, dockerCmd })

  // Add the build args for the github key and tap git url
  dockerCmd = getBuildArgs(globalConfig, { name, branch, dockerCmd })

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
 * @param {string} params.img - docker image to use when running the container
 * @param {Array} params.mounts - Key names of repos to be mounted
 *
 * @returns {string} - Built docker run command
 */
const createRunCmd = (globalConfig, { dockerCmd, ...params }) => {
  const { location, name, branch, img, mounts } = params

  // Get the name for the docker container
  dockerCmd = addContainerName(name, dockerCmd)

  // Mount the tap location by default
  dockerCmd = addTapMount(location, dockerCmd)

  // First fet the directory paths to mount
  const toMount = mounts && getDirsToMount(globalConfig, mounts)

  // Then build the docker volume string for each mount path
  dockerCmd = toMount ? getVolumeMounts(toMount, dockerCmd) : dockerCmd

  // Add the location last. This is the location the container will be built from
  return img
    ? `${dockerCmd} ${img}`
    : dockerCmd
}

/**
 * Builds a docker command to be passed to the command line
 * @param {Object} globalConfig - Global config object for the keg-cli
 * @param {Object} params - Data to build the docker command
 * @param {Object} params.cmd - The docker command to run
 * @param {Object} params.name - Name of the docker container to run
 * @param {Object} params.envs - Environment Vars to pass to the docker command
 *
 * @returns {string} - Built docker command
 */
const buildDockerCmd = (globalConfig, params) => {
  const {
    branch,
    cmd,
    docker='',
    envs,
    img,
    location,
    mounts,
    name,
    tags,
    version,
    ...dockerOpts
  } = params

  // Get the default docker arguments
  let dockerCmd = getDockerArgs(cmd, dockerOpts, `docker ${cmd} ${docker}`.trim())

  // Add any tags if needed
  return cmd === 'build'
    ? createBuildCmd(globalConfig, { dockerCmd, location, name, branch, tags, version })
    : createRunCmd(globalConfig, { dockerCmd, location, name, branch, img, mounts })

}

module.exports = {
  buildDockerCmd
}