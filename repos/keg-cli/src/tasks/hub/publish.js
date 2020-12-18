const { Logger } = require('KegLog')
const { get, mapObj, exists } = require('@keg-hub/jsutils')
const defaultConfig = require('KegScripts/setup/cli.config.json')
const { publishService } = require('KegUtils/services/publishService')

const publishTasks = get(defaultConfig, 'publish.default.tasks')

/**
 * Setup the options object based on the user's keg config
 * 
 * @function
 * @param {Object} tasks - key = task, value = default val. example: { publish: true }
 * 
 * @returns {null|Object}
 */
const setupOptions = (tasks) => {

  if (!tasks) {
    Logger.warn('No publish task found. sync to get latest config: `keg config sync`')
    return null
  }

  const options = {}
  // for each task, generate option obj with generic description
  mapObj(tasks, (key) => {
    options[key] = {
      description: `Will perform ${key} task during the publish service`,
      example: `keg hub publish --${key}`,
    }
  })

  return options
}

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
  validTasks.map((key) => exists(params[key]) && (publishArgs.tasks[key] = params[key]))

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
      dryrun: {
        alias: ['dry-run', 'dr'],
        description: 'Does everything publish would do except pushing to git and publishing to npm',
        example: 'keg hub publish --dry-run',
        default: false
      },
      confirm: {
        description: 'Asks the user to confirm the updates before publishing. Set to false for CI/CD environments',
        example: 'keg hub publish --no-confirm',
        default: true
      },
      version: {
        alias: [ 'ver' ],
        description: 'New version to be published. Must be valid semver or one of major, minor or patch',
        example: 'keg hub publish --version 1.0.0',
      },
      ...setupOptions(publishTasks)
    }
  }
}