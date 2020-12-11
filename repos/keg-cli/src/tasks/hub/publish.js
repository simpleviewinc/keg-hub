const { publishService } = require('KegUtils/services/publishService')
const { Logger } = require('KegLog')
const {get} = require('@keg-hub/jsutils')

/**
 * Logs the summary for the publish task
 * @param {Array} param.repos 
 * @param {Array} param.publishContext
 */
const logSummary = ({repos, publishContext}) => {
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
 * @param {Array} args.options - arguments passed from the command line
 * @param {Object} args.tasks - All registered tasks of the CLI
 * @param {Object} globalConfig - Global config object for the keg-cli
 *
 * @returns {void}
 */
const hubPublish = async args => {

  logSummary(await publishService(args))
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
      }
    }
  }
}