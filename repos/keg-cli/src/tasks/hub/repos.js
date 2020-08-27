const { Logger } = require('KegLog')
const { getHubRepos } = require('KegUtils/hub/getHubRepos')


/**
 * Get information about the repos in the keg-hub
 * @param {Object} args - arguments passed from the runTask method
 * @param {string} args.command - Initial command being run
 * @param {Array} args.options - arguments passed from the command line
 * @param {Object} args.tasks - All registered tasks of the CLI
 * @param {Object} globalConfig - Global config object for the keg-cli
 *
 * @returns {void}
 */
const hubRepos = async args => {
  const { command, globalConfig, options, params, tasks } = args
  const repos = await getHubRepos({ ...params, format: params.pretty ? 'pretty' : 'json' })

  console.log(`---------- repos ----------`)
  console.log(repos)

  return repos

}

module.exports = {
  repos: {
    name: 'repos',
    alias: [ 'rep', 'rp', 'list', 'ls' ],
    action: hubRepos,
    description: `Get information about the repos in the keg-hub`,
    example: 'keg hub repos <options>',
    options: {
      context: {
        alias: [ 'ctx', 'filter', 'ftr', 'scope', 'scp' ],
        description: 'Filter results based on a repo(s) name',
        example: 'keg hub repos --scope cli',
        default: 'all'
      },
      pretty: {
        alias: [ 'pp' ],
        description: 'Print the repos in pretty format',
        example: 'keg hub repos --pretty',
        default: false
      }
    }
  }
}
