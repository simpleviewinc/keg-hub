const { addComposeFiles, addDockerArg } = require('KegDocker')

const composeArgs = {
  remove: '--force-rm',
  cache: '--no-cache',
  pull: '--pull'
}

/**
 * Converts the passed in docker-compose params to to string format
 * @function
 * @param {string} dockerCmd - docker-compose command to add params to
 * @param {Object} params - Parse params passed from the command line
 *
 * @returns {string} - docker command with params added
 */
const addCmdOpts = (dockerCmd, params) => {
  return reduceObj(params, (key, value, added) => {
    return !composeArgs[key]
      ? added
      : addDockerArg(
          added,
          composeArgs[key],
          key === 'cache' ? !Boolean(value) : Boolean(value)
        )
  }, dockerCmd)
}

/**
 * Creates the docker-compose up command
 * @function
 * @param {Object} globalConfig - Global config object for the keg-cli
 * @param {string} cmdContext - Context the command is being run in ( core | tap )
 * @param {Object} params - Parse params passed from the command line
 *
 * @returns {string} - Built docker command
 */
const buildComposeCmd = async (globalConfig, cmd, cmdContext, params) => {
  const { detached, build } = params

  let dockerCmd = `docker-compose`
  dockerCmd = addComposeFiles(dockerCmd, cmdContext)
  dockerCmd = `${dockerCmd} ${cmd}`
  
  if(cmd === 'build') return addCmdOpts(dockerCmd, params)

  dockerCmd = addDockerArg(dockerCmd, '--detach', Boolean(detached))
  dockerCmd = addDockerArg(dockerCmd, '--build', build === false ? build : true)

  return dockerCmd
}

module.exports = {
  buildComposeCmd
}

