/**
 * Builds the env object for the container
 * 
 * @function
 * @param {object} params - Formatted arguments passed to the current task
 * @param {object} contextEnv - context env for the container to run
 * @returns {object}
 */
const convertParamsToEnvs = ({ env, command, install }, contextEnv) => {
  const extraENVs = { ENV: env, NODE_ENV: env }
  command && ( extraENVs.EXEC_CMD = command )
  install && ( extraENVs.NM_INSTALL = true )
  
  return {
    ...contextEnv,
    ...extraENVs
  } 
}

module.exports = {
  convertParamsToEnvs
}