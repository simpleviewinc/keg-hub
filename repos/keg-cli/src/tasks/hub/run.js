const { Logger } = require('KegLog')
const { getHubRepos } = require('KegUtils/hub/getHubRepos')

/**
 * Runs the passed in script from the package.json of the passed in repos
 * <br/>If the script does not exist, it skips it
 * @function
 * @param {Array} repos - All repos that the script should run on
 * @param {string} script - Name of the script to run
 *
 * @returns {Void}
 */
const runScript = (repos, script) => {
  // TODO: Add logic to run scripts on repos
}


/**
 * Run package.json scripts in keg-hub repos
 * @param {Object} args - arguments passed from the runTask method
 * @param {string} args.command - Initial command being run
 * @param {Array} args.options - arguments passed from the command line
 * @param {Object} args.tasks - All registered tasks of the CLI
 * @param {Object} globalConfig - Global config object for the keg-cli
 *
 * @returns {void}
 */
const runRepos = async args => {
  const { command, globalConfig, options, params, tasks } = args
  const repos = await getHubRepos({ ...params, callback: runScript })

  return runScript(repo, params.script)

}

module.exports = {
  run: {
    name: 'run',
    alias: [ 'rn' ],
    description: 'Run package.json scripts for Keg Hub repos',
    action: runRepos,
    example: 'keg hub run <options>',
    options: {
      context: {
        alias: [ 'ctx', 'filter', 'ftr', 'scope', 'scp' ],
        description: 'Filter which repo(s) to run the script on!',
        example: 'keg hub run --context cli',
        default: 'all'
      },
      script: {
        description: 'Name of the script in package.json to run',
        example: 'keg hub run --script',
        require: true,
      }
    }
  }
}
