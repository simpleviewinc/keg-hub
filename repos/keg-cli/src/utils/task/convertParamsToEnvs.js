const { getSetting } = require('../globalConfig/getSetting')

/**
 * Builds the env object for the container
 * 
 * @function
 * @param {object} params - Formatted arguments passed to the current task
 * @param {object} contextEnv - context env for the container to run
 * @returns {object}
 */
const convertParamsToEnvs = ({ env, command, install, local }, contextEnv={}) => {
  const extraENVs = {}

  env && ( extraENVs.NODE_ENV = env )
  command && ( extraENVs.KEG_EXEC_CMD = command )
  command && ( extraENVs.EXEC_CMD = command )
  install && ( extraENVs.KEG_NM_INSTALL = true )

  // Check if we should copy the local repo into the docker container on image build
  ;(local || getSetting('docker.defaultLocalBuild')) && ( extraENVs.KEG_COPY_LOCAL = true )

  return {
    ...contextEnv,
    ...extraENVs,
  } 
}

module.exports = {
  convertParamsToEnvs
}