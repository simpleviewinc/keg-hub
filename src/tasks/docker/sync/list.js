const { spawnCmd } = require('KegProc')
const { buildContainerContext } = require('KegUtils/builders/buildContainerContext')
const { DOCKER } = require('KegConst/docker')

/**
 * List all the docker-sync points based on context
 * @function
 * @param {Object} args - arguments passed from the runTask method
 * @param {Object} args.globalConfig - Global config object for the keg-cli
 *
 * @returns {void}
 */
const listDockerSync = async args => {
  const { globalConfig, params, options, task } = args

  // Get the context data for the command to be run
  const { location, cmdContext, contextEnvs } = await buildContainerContext({
    globalConfig,
    task,
    params,
    // Set a default context path as it's not needed for listing sync points
    // And it will throw if not set for a tap
    envs: { CONTEXT_PATH: 'PLACEHOLDER' }
  })

  // Run docker-sync list command
  await spawnCmd(`docker-sync list`, { options: { env: contextEnvs }}, location)

}

module.exports = {
  name: 'list',
  alias: [ 'ls' ],
  action: listDockerSync,
  description: `List all the docker-sync points`,
  example: 'keg docker sync list',
  options: {
    context: {
      allowed: DOCKER.IMAGES,
      description: 'Context of docker compose up command (components || core || tap)',
      example: 'keg docker sync list --context core',
      required: true
    }
  }
}
