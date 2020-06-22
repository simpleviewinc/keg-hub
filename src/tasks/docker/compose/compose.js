const { get, reduceObj } = require('jsutils')
const { Logger } = require('KegLog')
const { spawnCmd } = require('KegProc')
const { buildComposeCmd, buildComposeName } = require('KegUtils/docker')
const { buildContainerContext } = require('KegUtils/builders/buildContainerContext')
const { DOCKER } = require('KegConst/docker')

/**
 * Runs a docker-compose command
 * @function
 * @param {Object} args - arguments passed from the runTask method
 * @param {string} args.command - Initial command being run
 * @param {Array} args.options - arguments passed from the command line
 * @param {Object} args.tasks - All registered tasks of the CLI
 * @param {Object} args.task - The current task being run
 * @param {Object} args.params - Formatted options as an object
 * @param {Object} globalConfig - Global config object for the keg-cli
 *
 * @returns {Object} - Build image as a json object
 */
const composeCmd = async args => {
  const { globalConfig, params, task } = args
  const { cmd, context } = params

  // Get the context data for the command to be run
  const { location, cmdContext, contextEnvs } = await buildContainerContext({
    globalConfig,
    task,
    params
  })

  // Build the docker compose command
  const dockerCmd = await buildComposeCmd(
    globalConfig,
    cmd,
    cmdContext,
    params
  )

  // Build the name of the composer service
  // TODO: Need to add container prefixes to this
  const buildName = buildComposeName(cmdContext, contextEnvs)

  // Run the docker compose command
  await spawnCmd(
    `${dockerCmd} ${ buildName }`,
    { options: { env: contextEnvs }},
    location
  )

}

module.exports = {
  compose: {
    name: 'compose',
    alias: [ 'comp', 'cmp', 'cm', 'dcp' ],
    action: composeCmd,
    description: `Runs docker compose command`,
    example: 'keg docker compose <options>',
    tasks: {
      ...require('./build'),
      ...require('./down'),
      ...require('./up'),
    },
    options: {
      context: {
        alias: [ 'name' ],
        allowed: DOCKER.IMAGES,
        description: 'Context of the docker container to build',
        example: 'keg docker compose --context core',
        enforced: true,
      },
      cmd: {
        alias: [ 'command' ],
        description: 'The docker-compose command to run',
        example: 'keg docker compose --cmd ps',
        required: true,
      },
      options: {
        alias: [ 'opts' ],
        description: 'Extra options to pass to the docker-compose command',
        example: 'keg docker compose --cmd ps --options "| grep core"',
      }
    }
  }
}