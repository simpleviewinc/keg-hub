const docker = require('KegDocCli')
const { get } = require('@svkeg/jsutils')
const { DOCKER } = require('KegConst/docker')
const { runInternalTask } = require('KegUtils/task/runInternalTask')
const { throwContainerNotFound } = require('KegUtils/error/throwContainerNotFound')
const { getServiceArgs } = require('./getServiceArgs')

/**
 * Runs the run service, to run a container directly, but overwrite the entry point
 * <br/>Also creates a sync with the local repo when the sync param is true
 * @function
 * @param {Object} args - Default task arguments passed from the runTask method
 * @param {Object} argsEXT - Extra arguments to run the service
 * @param {string} argsEXT.context - The context to run the `docker-compose` command in
 * @param {string} argsEXT.tap - Name of the tap to run the `docker-compose` command in
 *
 * @returns {*} - Response from the compose service
 */
const runService = async (args, exArgs) => {
  const { context, tap } = exArgs
  
  // Build the service arguments
  const serviceArgs = getServiceArgs(args, exArgs)
  const { params } = serviceArgs
  const { sync, local, remote } = params

  // Step 1 - Run the docker container, but don't attach to it
  // We do this so we can create a mutagen sync after the container has been started
  const imageContext = await runInternalTask('docker.tasks.image.tasks.run', {
    ...args,
    __internal: { skipExists: true },
    params: {
      ...params,
      tap,
      context,
      // Set connect to false to we run it in the background
      connect: false,
      // set the cmd to tail /dev/null to keep the container running
      cmd: 'tail -f /dev/null'
    }
  })

  // Step 2 - Create a mutagen sync between the local repo and the docker container
  const { container } = imageContext
  const foundContainer = imageContext.id ? imageContext : await docker.container.get(container)
  
  // If no container exists, if means the container started and stopped right away
  // So throw that not found error
  !foundContainer && throwContainerNotFound(container)

  // Build the container context, so the values are cache on calls to buildContainerContext
  const containerContext = { cmdContext: context, ...imageContext, ...foundContainer }
  const syncName = `img-${ context }-run`
  
  // Check if we should sync the local repo to the container
  const syncContext = sync
    ? await runInternalTask('mutagen.tasks.create', {
        ...args,
        __internal: {
          skipExists: true,
          containerContext,
        },
        params: {
          ...params,
          tap,
          context,
          container,
          local: local || get(imageContext, `contextEnvs.KEG_CONTEXT_PATH`),
          remote: remote || get(imageContext, `contextEnvs.DOC_APP_PATH`),
          name: syncName,
        }
      })
    : containerContext

  // Step 3 - Attach to the container as if we didn't run it in the background
  await runInternalTask('tasks.docker.tasks.exec', {
    ...args,
    __internal: { containerContext },
    params: {
      ...params,
      tap,
      context,
      options: '-it',
    },
  })

  // Step 4 - Clean up the container and the sync after the user has disconnected

  // Force remove the docker container
  await runInternalTask('docker.tasks.container.tasks.remove', {
    ...serviceArgs,
    params: {
      context: containerContext.id || container,
      force: true,
    }
  })

  // Terminate all mutagen sync process for the context type
  await runInternalTask('mutagen.tasks.clean', {
    ...serviceArgs,
    params: {
      ...serviceArgs.params,
      context: syncName,
      force: true,
    }
  })

}


module.exports = {
  runService
}