const { publishService } = require('KegUtils/services/publishService')
const { Logger } = require('KegLog')
const { get } = require('@keg-hub/jsutils')

/**
 * Logs the summary for the publish task
 * @param {Array} repos - updated repos
 */
const logSummary = (repos) => {
  if (!repos) return null
  Logger.empty()
  Logger.header(`Publish Summary`)
  Logger.table(repos.map((repo) => {
    return {
      name: repo.repo, 
      newVersion: get(repo, 'newVersion'),
      published: get(repo, 'isPublished')
    }
  }))
  Logger.empty()
}
/**
 * Push Keg Hub repos to NPM and Github
 * @param {Object} args - arguments passed from the runTask method
 * @param {string} args.command - Initial command being run
 * @param {Array} args.params - arguments passed from the command line
 * @param {Object} args.tasks - All registered tasks of the CLI
 * @param {Object} globalConfig - Global config object for the keg-cli
 *
 * @returns {void}
 */
const hubPublish = async args => {

  const { globalConfig, params } = args
  const defaultConfig = get(globalConfig, `publish.default`)
  const validTasks = Object.keys(get(defaultConfig, 'tasks'))
  const publishArgs = { tasks: {} }

  // break up the params into valid publish args
  validTasks.map((key) => {
    if (params[key]) publishArgs.tasks[key] = params[key]
  })

  const result = await publishService(args, publishArgs)
  logSummary(result)
  return true

}

module.exports = {
  publish: {
    name: 'publish',
    alias: [ 'pub' ],
    description: 'Push Keg Hub repos to NPM and Github',
    action: hubPublish,
    example: 'keg hub publish <options>',
    options: {
      context: {
        alias: [ 'ctx' ],
        description: 'Publish context to use from the globalConfig!',
        example: 'keg hub publish --context keg',
        default: 'keg'
      },
      version: {
        alias: [ 'ver' ],
        description: 'The server number or update type (major, minor, patch)',
        example: 'keg hub publish --version <semver type || version number>'
      },
      dryrun: {
        alias: ['dry-run'],
        description: 'Does everything publish would do except pushing to git and publishing to npm',
        example: 'keg hub publish --dry-run',
        default: false
      },
      build: {
        description: 'Runs the `yarn build` command on the repos before publishing',
        example: 'keg hub publish --no-build',
      },
      test: {
        description: 'Runs `yarn test` command on the repos before publishing',
        example: 'keg hub publish --no-test',
      },
      publish: {
        description: 'Publishes to npm after upgrading',
        example: 'keg hub publish --no-publish',
      }
    }
  }
}