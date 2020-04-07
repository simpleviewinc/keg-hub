const { getBuildTags } = require('./getBuildTags')
const { getDirsToMount } = require('./getDirsToMount')
const { getDockerArgs } = require('./getDockerArgs')
const { getVolumeMounts } = require('./getVolumeMounts')

const getName = (name, dockerCmd='') => {
  return `${dockerCmd} --name ${name}`
}

const addTapMount = (location, dockerCmd) => {
  return `${dockerCmd} -v ${location}:/keg/tap`
}

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
const createBuildCmd = ({ dockerCmd, location, name, tags, version }) => {

  // Add any tags if needed
  dockerCmd = getBuildTags({ name, tags, version, dockerCmd })

  // TODO: Move these into their own function
  const gitHubKey = `--build-arg GIT_HUB_KEY=${ process.env.GIT_HUB_KEY }`
  const git_tap_url = 'https://github.com/simpleviewinc/tap-events-force.git'

  const gitHubUrl = `--build-arg GIT_TAP_URL=${git_tap_url}`

  // Add the location last. This is the location the container will be built from
  return location
    ? `${dockerCmd} ${gitHubKey} ${gitHubUrl} ${location}`
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
const createRunCmd = (globalConfig, { dockerCmd, img, location, mounts, name }) => {

  // Get the name for the docker container
  dockerCmd = getName(name, dockerCmd)

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
const buildDockerCmd = (globalConfig, args) => {
  const {
    cmd,
    envs,
    img,
    location,
    mounts,
    name,
    tags,
    version,
    ...dockerOpts
  } = args

  // Get the default docker arguments
  let dockerCmd = getDockerArgs(cmd, dockerOpts, `docker ${cmd}`)

  // Add any tags if needed
  return cmd === 'build'
    ? createBuildCmd({ dockerCmd, location, name, tags, version })
    : createRunCmd(globalConfig, { dockerCmd, img, location, name, mounts })

}

module.exports = {
  buildDockerCmd
}