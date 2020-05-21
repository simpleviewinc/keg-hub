const { get, reduceObj } = require('jsutils')
const { Logger } = require('KegLog')
const { spawnCmd } = require('KegProc')
const { DOCKER } = require('KegConst/docker')
const {
  getPathFromConfig,
  throwNoConfigPath
} = require('KegUtils')
const {
  addDockerArg,
  addComposeFiles,
  buildDockerCmd,
  getEnvContext,
  getBuildArgs,
  getDockerMachineEnv
} = require('KegDocker')

const buildArgs = {
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
const addBuildOpts = (dockerCmd, params) => {
  return reduceObj(params, (key, value, added) => {
    return !buildArgs[key]
      ? added
      : addDockerArg(
          added,
          buildArgs[key],
          key === 'cache' ? !Boolean(value) : Boolean(value)
        )
  }, dockerCmd)
}

/**
 * Creates the docker-compose build command
 * @function
 * @param {Object} globalConfig - Global config object for the keg-cli
 * @param {string} cmdContext - Context the command is being run in ( core | tap )
 * @param {Object} params - Parse params passed from the command line
 *
 * @returns {string} - Built docker command
 */
const createDockerCmd = async (globalConfig, cmdContext, params) => {
  let dockerCmd = `docker-compose`
  dockerCmd = addComposeFiles(dockerCmd, cmdContext)
  dockerCmd = `${dockerCmd} build`
  dockerCmd = await getBuildArgs(globalConfig, { name: cmdContext, dockerCmd })

  return addBuildOpts(dockerCmd, params)
}

/**
 * Cleans docker-sync containers
 * @function
 * @param {Object} args - arguments passed from the runTask method
 * @param {Object} args.globalConfig - Global config object for the keg-cli
 *
 * @returns {void}
 */
const buildDockerCompose = async args => {
  const { globalConfig, params } = args
  const { cache, remove, pull, context } = params

  // Get the context data for the command to be run
  const { location, cmdContext, contextEnvs } = buildLocationContext({
    globalConfig,
    task,
    params
  })

  // Build the docker compose command
  const dockerCmd = await createDockerCmd(globalConfig, cmdContext, params)

  // Get the docker-machine env to add to the running process
  // const machineEnv = await getDockerMachineEnv()

  const buildName = contextEnvs.IMAGE
    ? contextEnvs.VERSION
      ? `${contextEnvs.IMAGE}:${contextEnvs.VERSION}`
      : `${contextEnvs.IMAGE}:latest`
    : cmdContext

  // Run the docker compose build command
  await spawnCmd(
    `${dockerCmd} ${ buildName }`,
    { options: { env: contextEnvs }},
    location
  )

}

module.exports = {
  name: 'build',
  alias: [ 'b' ],
  action: buildDockerCompose,
  description: `Run docker-compose build command`,
  example: 'keg docker compose build <options>',
  options: {
    context: {
      allowed: [ 'components', 'core', 'tap' ],
      description: 'Context of docker compose build command (tap || core)',
      example: 'keg docker compose build --context core',
      default: 'base'
    },
    remove: {
      description: 'Always remove intermediate containers',
      example: 'keg docker compose build --remove',
      default: true
    },
    cache: {
      description: 'Use cache when building the container',
      example: 'keg docker compose build --cache',
      default: true
    },
    pull: {
      description: 'Always attempt to pull a newer version of the image',
      example: 'keg docker compose build --pull',
      default: true
    }
  }
}
