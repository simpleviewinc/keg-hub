const { git } = require('KegGitCli')
const { getGitPath } = require('KegUtils/git/getGitPath')

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
  const { context, location, env, tap, ...gitParams } = params

  await git.repo.log({
    ...gitParams,
    location: getGitPath(globalConfig, tap || context) || location,
  })

}

module.exports = {
  log: {
    name: 'log',
    alias: [ 'lg' ],
    action: gitLog,
    description: `Logs a git repository commit history!`,
    example: 'keg git log <options>',
    options: {
      context: {
        alias: [ 'name' ],
        description: 'Context or name of the repo to log, may also be a linked tap',
        example: 'keg git log context=core',
      },
      location: {
        alias: [ 'loc' ],
        description: `Location where the git log command will be run. Use when context option is "undefined"`,
        example: 'keg git log location=<path/to/git/repo>',
        default: process.cwd()
      },
      tap: {
        description: 'Name of the tap to build a Docker image for',
        example: 'keg git log --tap visitapps',
      },
      graph: {
        description: 'Log commit history as a graph',
        example: 'keg log --graph',
        default: false,
      },
      decorate: {
        description: 'Decorate the commit history log',
        example: 'keg log --decorate',
        default: false,
      },
      pretty: {
        description: 'Pretty print the commit history',
        example: 'keg log --pretty',
        default: false,
      },
      abbrev: {
        description: 'Abbreviate git commit comments',
        example: 'keg log --abbrev',
        default: false,
      }
    }
  }
}
