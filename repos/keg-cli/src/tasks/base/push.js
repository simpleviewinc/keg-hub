const { DOCKER } = require('KegConst/docker')
const { runInternalTask } = require('KegUtils/task/runInternalTask')
const { checkImageExists } = require('KegUtils/docker/checkImageExists')
const { mergeTaskOptions } = require('KegUtils/task/options/mergeTaskOptions')

/**
 * Removes the keg base docker image
 * @param {Object} args - arguments passed from the runTask method
 * @param {string} args.command - Initial command being run
 * @param {Array} args.options - arguments passed from the command line
 * @param {Object} args.tasks - All registered tasks of the CLI
 * @param {Object} globalConfig - Global config object for the keg-cli
 *
 * @returns {void}
 */
const pushBase = async (args) => {
  const { params } = args
  const { build, log, env, tag=env } = params
  const exists = await checkImageExists({ image: 'keg-base', tag })

  await runInternalTask(
    'tasks.docker.tasks.provider.tasks.push',
    {
      ...args,
      command: 'push',
      params: {
        ...args.params,
        context: 'base',
        image: 'keg-base',
        build: !exists,
        tag,
      }
    }
  )

}

module.exports = {
  push: {
    name: 'push',
    alias: [ 'psh' ],
    action: pushBase,
    description: `Pushes a new keg-base docker image to the provider`,
    example: 'keg base push',
    locationContext: DOCKER.LOCATION_CONTEXT.REPO,
    options: mergeTaskOptions(`base`, `push`, `push`),
  }
}