const { DOCKER } = require('KegConst/docker')
const { runInternalTask } = require('KegUtils/task/runInternalTask')
const { mergeTaskOptions } = require('KegUtils/task/options/mergeTaskOptions')
const { getBaseTag } = require('KegUtils/getters/getBaseTag')

/**
 * Pulls the keg base docker image
 * @param {Object} args - arguments passed from the runTask method
 * @param {string} args.command - Initial command being run
 * @param {Array} args.options - arguments passed from the command line
 * @param {Object} args.tasks - All registered tasks of the CLI
 * @param {Object} globalConfig - Global config object for the keg-cli
 *
 * @returns {void}
 */
const pullBase = async (args) => {
  const { params } = args
  const { build, log, env, tag=env } = params

  return runInternalTask('docker.tasks.provider.tasks.pull', {
    ...args,
    params: {
      ...params,
      context: 'base',
      image: 'keg-base',
      tap: undefined,
      // Try to find the base tag, will default to current env if not tag found
      tag: getBaseTag(params, 'base')
    }
  })

}

module.exports = {
  pull: {
    name: 'pull',
    alias: [ 'pl' ],
    action: pullBase,
    description: `Pushes a new keg-base docker image to the provider`,
    example: 'keg base pull',
    locationContext: DOCKER.LOCATION_CONTEXT.REPO,
    options: mergeTaskOptions(`base`, `pull`, `pull`),
  }
}