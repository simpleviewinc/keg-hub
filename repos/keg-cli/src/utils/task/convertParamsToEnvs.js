const { getSetting } = require('../globalConfig/getSetting')
const { exists, toBool } = require('@keg-hub/jsutils')

/**
 * Gets the copy local flag from params || container ENVs || cli settings
 * @function
 * 
 * @param {boolean} local - Copy local flag, passed from the command line
 * @param {object} copyLocalEnv - Copy local flag, set in the container ENVs
 * 
 * @returns {boolean}
 */
const getCopyLocal = (local, copyLocalEnv) => {
  return exists(local)
    ? toBool(local)
    : exists(copyLocalEnv)
      ? toBool(copyLocalEnv)
      : toBool(getSetting('docker.defaultLocalBuild'))
}

/**
 * Builds the env object for the container
 * 
 * @function
 * @param {object} params - Formatted arguments passed to the current task
 * @param {object} copyLocalEnv - Copy local flag, set in the container ENVs
 * @returns {object}
 */
const convertParamsToEnvs = ({ env, command, install, local }, copyLocalEnv) => {
  const extraENVs = {}

  env && ( extraENVs.NODE_ENV = env )
  command && ( extraENVs.KEG_EXEC_CMD = command )
  install && ( extraENVs.KEG_NM_INSTALL = true )

  // Check if we should copy the local repo into the docker container on image build
  getCopyLocal(local, copyLocalEnv) && ( extraENVs.KEG_COPY_LOCAL = true )

  return extraENVs
}

module.exports = {
  convertParamsToEnvs
}