const { Logger } = require('KegLog')
const { getHubRepos } = require('KegUtils/hub/getHubRepos')
const { spawnCmd } = require('KegProc')
const { get } = require('@keg-hub/jsutils')
const { runYarnScript } = require('KegUtils/helpers/runYarnScript')

// Update the Max listeners, to ensure all processes can exit properly
process.setMaxListeners(Infinity)

/**
 * Allowed yarn commands that can run for every repo
 * All other commands must be defined in the scripts object of the package.json
 */
const allowedNotDefined = [
  'install',
  'add',
  'remove'
]

/**
 * Runs the passed in script from the package.json of the passed in repos
 * <br/>If the script does not exist, it skips it
 * @function
 * @param {Array} repos - All repos that the script should run on
 * @param {string} script - Name of the script to run
 * @param {string} script - Name of the script to run
 *
 * @returns {Void}
 */
const runScript = (repo, package, args={}) => {
  const { location, script='' } = args

  const firstWord = script.split(' ')[0]
  const isAllowed = allowedNotDefined.includes(firstWord)

  if(!location || (!isAllowed && (!script || !get(package, `scripts.${script}`))))
    return false

  Logger.log(
    Logger.colors.brightWhite(`Running`),
    Logger.colors.brightCyan(`"yarn ${script}"`),
    Logger.colors.brightWhite(`for repo`),
    Logger.colors.brightCyan(`"${repo}"`),
  )

  return runYarnScript(location, script)
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
  const { params } = args

  Logger.empty()

  await getHubRepos({
    ...params,
    callback: runScript,
  })

  Logger.empty()
  return true

}

module.exports = {
  run: {
    name: 'run',
    alias: [ 'rn' ],
    description: 'Run package.json scripts for Keg Hub repos',
    action: runRepos,
    example: 'keg hub run <options>',
    options: {
      script: {
        description: 'Name of the script in package.json to run',
        example: 'keg hub run --script',
        require: true,
      },
      context: {
        alias: [ 'ctx', 'filter', 'ftr', 'scope', 'scp' ],
        description: 'Filter which repo(s) to run the script on!',
        example: 'keg hub run --context cli',
        default: 'all'
      },
      sync: {
        alias: [ 'sy' ],
        description: 'Run all commands synchronously',
        example: 'keg hub run --sync false',
        default: true
      }
    }
  }
}
