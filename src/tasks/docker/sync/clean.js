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
const cleanDockerSync = async args => {
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
    confirm: `Running this command will remove all docker-sync containers. Are you sure?`,
    success: `Finished running 'docker-sync clean' command`,
    cancel: `Command 'keg docker sync clean' has been cancelled!`,
    preConfirm: true,
    execute: async () => {
      // TODO: ensure the docker container is removed before running the clean command
      // Need to add `docker rm <container>` command

      await spawnCmd(`docker-sync clean`, { options: { env: contextEnvs }}, location)
    },
  })

}

module.exports = {
  name: 'clean',
  alias: [ 'cl' ],
  action: cleanDockerSync,
  description: `Cleans the docker-sync containers`,
  example: 'keg docker sync clean <options>',
  options: {
    context: {
      allowed: [ 'components', 'core', 'tap' ],
      description: 'Context of docker compose up command (components || core || tap)',
      example: 'keg docker sync start --context core',
      required: true
    }
  }
}