const docker = require('KegDocCli')
const { get } = require('jsutils')
const { Logger } = require('KegLog')
const { mutagen } = require('KegMutagen')
const { DOCKER } = require('KegConst/docker')
const { runInternalTask } = require('KegUtils/task/runInternalTask')
const { buildContainerContext } = require('KegUtils/builders/buildContainerContext')
const { getContainerFromContext } = require('KegUtils/docker/getContainerFromContext')
const { throwRequired, generalError, throwContainerNotFound } = require('KegUtils/error')


/**
  Steps to do sync
  * Once container is running, get the container id
  * Load in mutagen config for the context
    * Should include ignores / mount locations / create args etc 
*/


const startContainer = async (args, contextData) => {
  await runInternalTask('tasks.docker.tasks.compose.tasks.up', {
    ...args,
    command: 'up',
    params: {
      ...args.params,
      detached: true,
      tap: contextData.tap,
      context: contextData.cmdContext
    },
    __internal: contextData,
  })

  return getContainerFromContext(contextData)

}

/**
 * Start the mutagen daemon
 * @param {Object} args - arguments passed from the runTask method
 * @param {string} args.command - Initial command being run
 * @param {Array} args.options - arguments passed from the command line
 * @param {Object} args.tasks - All registered tasks of the CLI
 * @param {Object} globalConfig - Global config object for the keg-cli
 *
 * @returns {void}
 */
const mutagenCreate = async args => {
  const { command, globalConfig, params, task } = args
  const { context, container, local, options, remote } = params

  // Ensure we have a content to build the container
  !context && !container && throwRequired(task, 'context', task.options.context)

  // Get the context data for the command to be run
  let contextData = await buildContainerContext({
    globalConfig,
    task,
    params,
  })
  
  // Check if the id exists, if not id / then the container does not exist
  // So we need to start it
  contextData = contextData.id ? contextData : await startContainer(args, contextData)

  // Ensure we have a container id to do the sync
  // If not throw not found error
  !contextData.id && throwContainerNotFound(contextData.tap || contextData.cmdContext)

  const localPath = get(contextData, 'contextEnvs.CONTEXT_PATH')
  const remotePath = get(contextData, 'contextEnvs.DOC_APP_PATH')

  !localPath && generalError(
    `Can not set the local path, missing "CONTEXT_PATH" environment variable!`
  )
  !remotePath && generalError(
    `Can not set the remote path, missing "DOC_APP_PATH" environment variable!`
  )

  // TODO: Create sync for each repo based on the cmdContext
  // If cmdContext === core
  // Create sync for core / re-theme (node_modules) / tap-resolver (node_modules) / etc...

  // Make call to start the mutagen sync
  const res = await mutagen.sync.create({
    container: contextData.id,
    name: contextData.cmdContext,
    local: localPath,
    remote: remotePath,
  })


}

module.exports = {
  create: {
    name: 'create',
    alias: [ 'cr' ],
    action: mutagenCreate,
    description: `Creates a mutagen sync between the local filesystem and a docker container`,
    example: 'keg mutagen create <options>',
    options: {
      context: {
        alias: [ 'name' ],
        allowed: DOCKER.IMAGES,
        description: 'Context or name of the container to sync with',
        example: 'keg mutagen create --context core',
        enforced: true,
      },
      container: {
        alias: [ 'id' ],
        description: 'Name or Id of the container to sync with. Overrides context option',
        example: 'keg mutagen create --container my-container',
      },
      local: {
        alias: [ 'from' ],
        description: 'Local path to sync when container option is passed',
        example: 'keg mutagen create --container my-container --local ~/keg/keg-core',
        depends: { container: true },
        enforced: true,
      },
      remote: {
        alias: [ 'to' ],
        description: 'Remote path to sync when container option is passed',
        example: 'keg mutagen create --container my-container --remote keg/keg-core',
        depends: { container: true },
        enforced: true,
      },
      options: {
        alias: [ 'opts' ],
        description: 'Extra options to pass to the mutagen create command',
        example: 'keg mutagen create --options "--ignore /ignore/path"',
        depends: { container: true },
        enforced: true,
      },
      tap: {
        description: 'Name of the tap to build. Only needed if "context" argument is "tap"',
      },
    }
  }
}
