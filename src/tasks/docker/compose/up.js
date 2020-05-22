const { get } = require('jsutils')
const { spawnCmd } = require('KegProc')
const { Logger } = require('KegLog')
const { addComposeFiles, addDockerArg, getEnvContext } = require('KegDocker')

/**
 * Creates the docker-compose up command
 * @function
 * @param {Object} globalConfig - Global config object for the keg-cli
 * @param {string} cmdContext - Context the command is being run in ( core | tap )
 * @param {Object} params - Parse params passed from the command line
 *
 * @returns {string} - Built docker command
 */
const createDockerCmd = async (globalConfig, cmdContext, params) => {
  const { detached, build } = params

  let dockerCmd = `docker-compose`
  dockerCmd = addComposeFiles(dockerCmd, cmdContext)
  dockerCmd = `${dockerCmd} up`

  dockerCmd = addDockerArg(dockerCmd, '--detach', Boolean(detached))
  dockerCmd = addDockerArg(dockerCmd, '--build', build === false ? build : true)

  return dockerCmd
}

/**
 * Runs docker-compose up command for (components | core | tap)
 * @function
 * @param {Object} args - arguments passed from the runTask method
 * @param {Object} args.globalConfig - Global config object for the keg-cli
 *
 * @returns {void}
 */
const upDockerCompose = async args => {
  const { globalConfig, params, options, task } = args
  const { detached, build, context } = params

  // Get the context data for the command to be run
  const { location, cmdContext, contextEnvs } = buildLocationContext({
    globalConfig,
    task,
    params
  })

  // Build the docker compose command
  const dockerCmd = await createDockerCmd(globalConfig, cmdContext, params)

  const buildName = contextEnvs.IMAGE
    ? contextEnvs.VERSION
      ? `${contextEnvs.IMAGE}:${contextEnvs.VERSION}`
      : `${contextEnvs.IMAGE}:latest`
    : cmdContext

  await spawnCmd(
    `${dockerCmd} ${ buildName }`,
    { options: { env: contextEnvs }},
    location
  )


}

module.exports = {
  name: 'up',
  alias: [ 'u' ],
  action: upDockerCompose,
  description: `Run docker-compose up command`,
  example: 'keg docker compose up <options>',
  options: {
    build: {
      description: 'Build the docker containers before starting',
      example: 'keg docker compose up --build false',
      default: true
    },
    context: {
      allowed: [ 'components', 'core', 'tap' ],
      description: 'Context of docker compose up command (components || core || tap)',
      example: 'keg docker compose up --context core',
      default: 'core'
    },
    detached: {
      description: 'Runs the docker-sync process in the background',
      example: 'keg docker compose up --detached',
      default: false
    }
  }
}
