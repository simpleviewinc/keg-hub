const { DOCKER } = require('KegConst/docker')
const { runInternalTask } = require('KegUtils/task/runInternalTask')
const { checkImageExists } = require('KegUtils/docker/checkImageExists')
const { mergeTaskOptions } = require('KegUtils/task/options/mergeTaskOptions')

/**
 * Pushes a local image registry provider in the cloud
 * @param {Object} args - arguments passed from the runTask method
 * @param {string} args.command - Initial command being run
 * @param {Array} args.options - arguments passed from the command line
 * @param {Object} args.tasks - All registered tasks of the CLI
 * @param {Object} args.task - Current task being run
 * @param {Object} args.params - Formatted key / value pair of the passed in options
 * @param {Object} globalConfig - Global config object for the keg-cli
 *
 * @returns {Promise<Void>}
 */
const tapPush = async (args) => {
  const { params } = args
  const { build, log, env, tag=env } = params
  const exists = await checkImageExists({ image: 'tap', tag })

  await runInternalTask(
    'tasks.docker.tasks.provider.tasks.push',
    {
      ...args,
      command: 'push',
      params: {
        ...args.params,
        context: 'tap',
        image: 'tap',
        tap: 'tap',
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
    action: tapPush,
    description: 'Pushes an image to a Docker registry provider',
    example: 'keg tap push <options>',
    options: mergeTaskOptions(`tap`, `push`, `push`),
  }
}