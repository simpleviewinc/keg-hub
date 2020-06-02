const { reduceObj } = require('jsutils')
const { spawnCmd } = require('KegProc')

const gitLogArgs = {
  abbrev: 'abbrev-commit',
  pretty: 'pretty=oneline',
}

/**
* Finds the arguments that should be passed to the git log command
* @param {Object} params - Parsed params passed from the command line
*
* @returns {string} - Built argument string
*/
const getLogArgs = params => {
  return reduceObj(params, (key, value, joined) => {
    return gitLogArgs[key] 
      ? `${joined} --${gitLogArgs[key]}`
      : value === true
        ? `${joined} --${key}`
        : joined
  }, '').trim()
}

/**
 * Git log task
 * @param {Object} args - arguments passed from the runTask method
 * @param {string} args.command - Initial command being run
 * @param {Array} args.options - arguments passed from the command line
 * @param {Object} args.tasks - All registered tasks of the CLI
 * @param {Object} globalConfig - Global config object for the keg-cli
 *
 * @returns {void}
 */
const gitLog = async args => {
  const { command, options, params, tasks, globalConfig } = args
  await spawnCmd(`git log ${getLogArgs(params)}`.trim())
}

module.exports = {
  log: {
    name: 'log',
    alias: [ 'lg' ],
    action: gitLog,
    description: `Logs a git repository commit history!`,
    example: 'keg log <options>',
    options: {
      graph: {
        description: 'Log commit history as a graph'
      },
      decorate: {
        description: 'Decorate the commit history log'
      },
      pretty: {
        description: 'Pretty print the commit history'
      },
      abbrev: {
        description: 'Abbreviate git commit comments'
      }
    }
  }
}