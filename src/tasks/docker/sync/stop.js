const { spawnCmd } = require('KegProc')
const { confirmExec } = require('KegUtils')
const { buildLocationContext } = require('KegUtils/builders')

/**
 * Cleans docker-sync containers
 * @function
 * @param {Object} args - arguments passed from the runTask method
 * @param {Object} args.globalConfig - Global config object for the keg-cli
 *
 * @returns {void}
 */
const stopDockerSync = async args => {
  const { globalConfig, task, params } = args
  const { detached, context } = params

  // Get the context data for the command to be run
  const { location, contextEnvs } = buildLocationContext({
    globalConfig,
    task,
    context,
    envs: {},
    defContext: task.options.context.default,
  })

  confirmExec({
    confirm: `Running this command will stop all running docker-sync containers. Are you sure?`,
    success: `Finished running 'docker-sync stop' command`,
    cancel: `Command 'keg docker sync stop' has been cancelled!`,
    preConfirm: true,
    execute: async () => {
      await spawnCmd(`docker-sync stop`, { options: { env: contextEnvs }}, location)
    },
  })

}

module.exports = {
  name: 'stop',
  alias: [ 'sp' ],
  action: stopDockerSync,
  description: `Stops the docker-sync deamon`,
  example: 'keg docker sync stop',
  options: {
    context: {
      allowed: [ 'components', 'core', 'tap' ],
      description: 'Context of docker compose up command (components || core || tap)',
      example: 'keg docker sync start --context core',
      required: true
    }
  }
}
