const { DOCKER } = require('KegConst/docker')
const { get } = require('jsutils')

const composeArgs = {
  clean: '--force-rm',
  cache: '--no-cache',
  pull: '--pull'
}

/**
 * Adds the paths to the docker compose file for the env
 * @function
 * @param {string} dockerCmd - Docker command to add the compile file paths to
 * @param {string} context - Context the docker command is being run in ( core / tap )
 *
 * @returns {string} - dockerCmd string with the file paths added
 */
const addComposeFiles = (dockerCmd, context='') => {

  const compDefPath = get(DOCKER, `CONTAINERS.${ context.toUpperCase() }.ENV.COMPOSE_DEFAULT`)
  const defCompose = compDefPath ? `-f ${ compDefPath }` : ''

  return `${dockerCmd} ${defCompose}`.trim()
}

/**
 * Conditionally adds a docker argument based on the passed in arguments
 * @function
 * @param {string} dockerCmd - Docker command to add the compile file paths to
 * @param {string} toAdd - The arguments to be added to the docker command
 * @param {boolean} condition - If the argument should be added to the dockerCmd
 *
 * @returns {string} - dockerCmd string with the file paths added
 */
const addDockerArg = (dockerCmd, toAdd, condition) => {
  return condition
    ? `${dockerCmd} ${toAdd}`
    : dockerCmd
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


const getDownArgs = (dockerCmd, remove) => {
  return remove.split(',').reduce((builtCmd, toRemove) => {
    if(toRemove === 'all' || toRemove === 'local')
      dockerCmd = `${dockerCmd} -rmi ${toRemove}`
    else if(toRemove === 'v' || toRemove === 'volumes')
      dockerCmd = `${dockerCmd} --volumes`
    else if(toRemove === 'or' || toRemove === 'orphans')
      dockerCmd = `${dockerCmd} --remove-orphans`

    return dockerCmd
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
  const { attach, build, remove } = params

  let dockerCmd = `docker-compose`
  dockerCmd = addComposeFiles(dockerCmd, cmdContext)
  dockerCmd = `${dockerCmd} ${cmd}`
  
  if(cmd === 'up')  dockerCmd = addDockerArg(dockerCmd, '--detach', !Boolean(attach))
  if(cmd === 'build') dockerCmd = addCmdOpts(dockerCmd, params)
  if(cmd === 'down') dockerCmd = remove ? getDownArgs(dockerCmd, remove) : dockerCmd

  return dockerCmd
}

module.exports = {
  buildComposeCmd
}

