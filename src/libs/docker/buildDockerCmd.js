const { getVolumeMounts } = require('./getVolumeMounts')
const { getDockerArgs } = require('./getDockerArgs')
const { getBuildTags } = require('./getBuildTags')

const getName = (cmd, name, dockerCmd='') => {
  return cmd !== 'build'
    ? `${dockerCmd} --name ${name}`
    : dockerCmd
}

/**
 * Builds a docker command to be passed to the command line
 * @param {Object} params - Data to build the docker command
 * @param {Object} params.cmd - The docker command to run
 * @param {Object} params.name - Name of the docker container to run
 * @param {Object} params.envs - Environment Vars to pass to the docker command
 *
 * @returns {string} - Built docker command
 */
const buildDockerCmd = args => {
  const {
    cmd,
    envs,
    location,
    mounts,
    name,
    tags,
    ...dockerOpts
  } = args

  // Get the default docker arguments
  let dockerCmd = getDockerArgs(cmd, dockerOpts, `docker ${cmd}`)

  // Get the name for the docker container
  dockerCmd = getName(cmd, name, dockerCmd)

  // Add any volume mounts if needed
  dockerCmd = mounts ? getVolumeMounts(mounts, dockerCmd) : dockerCmd

  // Add any tags if needed
  dockerCmd = name && tags ? getBuildTags(name, tags, dockerCmd) : dockerCmd
  
  // Add the location last. This is the location the container will be built from
  return location
    ? `${dockerCmd} ${location}`
    : dockerCmd

}

module.exports = {
  buildDockerCmd
}