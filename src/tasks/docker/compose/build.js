const { get, reduceObj } = require('jsutils')
const { Logger } = require('KegLog')
const { spawnCmd } = require('KegProc')
const { buildComposeCmd, buildComposeName } = require('KegUtils/docker')
const { buildLocationContext } = require('KegUtils/builders')

/**
 * Runs the docker-compose build command
 * @function
 * @param {Object} args - arguments passed from the runTask method
 * @param {Object} args.globalConfig - Global config object for the keg-cli
 *
 * @returns {void}
 */
const buildDockerCompose = async args => {
  const { globalConfig, params, task } = args
  const { cache, remove, pull, context } = params

  // Get the context data for the command to be run
  const { location, cmdContext, contextEnvs } = await buildLocationContext({
    globalConfig,
    task,
    params
  })

  // Build the docker compose command
  const dockerCmd = await buildComposeCmd(
    globalConfig,
    'build',
    cmdContext,
    params
  )

  // Build the name of the composer service
  const buildName = buildComposeName(cmdContext, contextEnvs)

  // Run the docker compose build command
  await spawnCmd(
    `${dockerCmd} ${ buildName }`,
    { options: { env: contextEnvs }},
    location
  )

}

module.exports = {
  build: {
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
}
