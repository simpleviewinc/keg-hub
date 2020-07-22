const docker = require('KegDocCli')
const { DOCKER } = require('KegConst/docker')
const { exists } = require('KegUtils/helpers/exists')
const { HTTP_PORT_ENV } = require('KegConst/constants')
const { reduceObj, get, isStr } = require('@ltipton/jsutils')
const { loadComposeConfig } = require('./compose/loadComposeConfig')
const { getBoundServicePorts } = require('./compose/getServicePorts')
const { getComposeConfig } = require('./compose/getComposeConfig')

/**
 * Temp helper method to map the app port to port 80
 * <br/> Once keg-proxy is setup this method will not be needed
 * @param {string} [dockerCmd=''] - Docker command to add the name to
 * @param {string} context - Context of the docker container
 *
 * @returns {string} - dockerCmd with the port arg added
 */
const getPortMap = async (context, contextEnvs, __injected={}) => {
  const envPath = `CONTAINERS.${context.toUpperCase()}.ENV`

  // Get the compose path for the app
  const composePath = __injected.composePath || get(DOCKER, `${ envPath }.KEG_COMPOSE_DEFAULT`)

  // Load the docker-compose file as a json object
  const composeConfig = await getComposeConfig(contextEnvs, composePath)

  const exposedPorts = composeConfig
    ? await getBoundServicePorts(contextEnvs, composeConfig)
    : []

  // Get the doc app port and bind it to 80 if it exists
  const appPort = get(DOCKER, `${ envPath }.${ HTTP_PORT_ENV }`)

  // Bind the app port to port 80 so we can access it from the browser
  // This is only needed until keg-proxy is setup
  const boundPort = appPort && `-p 80:${appPort}`.trim()

  // Add the bound port if it does not already exist
  boundPort &&
    !exposedPorts.includes(boundPort) &&
    exposedPorts.unshift(boundPort)

  return exposedPorts
}


/**
 * Loops over the passed in args and maps them to the docker constants
 * Matching keys will use the passed in value or the constants value
 * @example
 * const dockerArgs = getDockerArgs({ network: true, file: '/repo/Dockerfile' })
 * @param {Object} args - Key/Values to map to docker arguments
 * @param {string|boolean} args.file - Dockerfile to use for the docker command
 * @param {string|boolean} args.network - Type of docker network setup to use
 * @param {string|boolean} args.attached - Docker container interactive mode
 * @param {string|boolean} args.detached - Docker container detached mode
 * @param {string|boolean} args.nocache - Build docker container without using cache
 * @param {string} [dockerCmd=''] - Docker command to add args to
 *
 * @returns {string} - Joint docker command arguments
 */
const getDockerArgs = ({ args, cmd, context, dockerCmd='' }) => {

  const containerOpts = get(DOCKER, `CONTAINERS.${ context.toUpperCase() }`)

  // Override the default docker arguments with passed in arguments
  const checkArgs = { ...containerOpts.DEFAULTS, ...args }

  // Loop the containerOpts.Value object and check for any extra arguments to add
  // Get All values get compared against the checkArgs array
  // If set to true, then the value from containerOpts.VALUES is added to the cmd
  return reduceObj(containerOpts.VALUES, (key, value, joinedArgs) => {

    // Only add the Dockerfile path when building, not durring run
    if(key === 'file' && cmd === 'run')  return joinedArgs

    // Only add connect '-it' when running, not durning build
    if(key === 'connect' && cmd === 'build')  return joinedArgs

    // Ensure both detached and attached are not added to the docker args
    if(key === 'detached' && args.attached) return joinedArgs
    if(key === 'attached' && args.detached) return joinedArgs

    // Check if cache is explicitly set to false
    // And if so, turn off caching for builds
    if(key === 'nocache')
      return args.cache === false
        ? `${ joinedArgs } ${ value }`.trim()
        : joinedArgs

    // Get the key value from the args object
    // This will be either a passed in value from the command line
    // Or the key value from DOCKER.CONTAINERS.DEFAULTS constants ( boolean )
    const argVal = checkArgs[key]

    // Special handling for the container entrypoint override
    // We need both the key and the value
    // So check if the value exists, and is the correct type
    if(key === 'entrypoint')
      return exists(argVal) && isStr(argVal)
        ? `${ joinedArgs } ${ value } ${ argVal }`.trim()
        : joinedArgs

    // Ensure if the key exists in the args object, otherwise set to empty string
    const addArg = exists(argVal) ? argVal === true ? value : argVal : ''

    // Join and return the args
    return `${joinedArgs} ${ addArg || '' }`.trim()
  }, dockerCmd)

}

/**
 * Adds the name of the container to the dockerCmd
 * @param {string} [dockerCmd=''] - Docker command to add the name to
 * @param {string} name - Name of the container to add to the dockerCmd
 *
 * @returns {string} - dockerCmd with the name arg added
 */
const addContainerName = (dockerCmd='', name) => {
  return `${dockerCmd} --name ${name}`
}

/**
 * Adds Envs to the passed in dockerCmd ( -e key=value )
 * @param {string} [dockerCmd=''] - Command to add the envs to
 * @param {Object} [options={}] - Items to add as Envs
 *
 * @returns {string} - dockerCmd with envs added
 */
const addContainerEnv = (dockerCmd='', options={}) => {
  return reduceObj(options, (key, value, cmd) => {
    return docker.asContainerEnv(
      key.toUpperCase(),
      value,
      cmd
    )
  }, dockerCmd)
}

module.exports = {
  addContainerEnv,
  addContainerName,
  getDockerArgs,
  getPortMap,
}