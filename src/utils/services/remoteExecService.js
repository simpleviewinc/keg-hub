const { runInternalTask } = require('../task/runInternalTask')

/**
  TODO: Setup actions to run when creating a mutagen sync for a subrepo
  Steps:
    1. Get the running container to execute the task on
    2. Get command that should be executed on container
      * Needs to be configurable
      * Maybe mutagen.yml file by sync
        * Example => 
          actions:
            retheme:
              - "cd /keg/keg-components/node_modules/@simpleviewinc/re-them"
              - "yarn install"
              - "yarn dev"
    3. Pull in action for retheme
      * Build the action
        * Example => 
          * Join array items with `; `
          * Wil allow calling each item in the array sequentially
    4. Call keg docker exec action on the container with the action
      * Example =>
        * keg docker exec --context components --cmd <Built Action>
 */
 
/**
 * Executes specific commands on a docker container based on passed in arguments 
 * @param {Object} args - Default arguments passed to all tasks
 * @param {Object} argsExt - Arguments to override the passed in args.params
 * @param {Object} argsExt.context - Docker container context to execute on
 * @param {Object} argsExt.tap - Tap name the container is running
 * @param {Object} argsExt.containerContext - Information about the container to execute on
 *
 * @returns {*} - Response from the mutagen create task
 */
const remoteExecService = async (args, { context, tap, containerContext }) => {
  const { params } = args


}