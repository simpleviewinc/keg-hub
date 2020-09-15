const { Logger } = require('KegLog')
const { git } = require('KegGitCli')
const { ask } = require('@keg-hub/ask-it')
const { exists } = require('@keg-hub/jsutils')
const { getGitPath } = require('KegUtils/git')
const { generalError } = require('KegUtils/error')

/**
 * Git push task
 * @param {Object} args - arguments passed from the runTask method
 * @param {string} args.command - Initial command being run
 * @param {Array} args.options - arguments passed from the command line
 * @param {Object} args.tasks - All registered tasks of the CLI
 * @param {Object} globalConfig - Global config object for the keg-cli
 *
 * @returns {void}
 */
const gitPushRepo = async args => {
  const { params,  globalConfig, __internal={} } = args
  const { skipLog } = __internal
  const { context, location: repoPath, tap, env, log, ...pushParams } = params
  const location = repoPath || context && getGitPath(globalConfig, tap || context) || process.cwd()

  const doPush = pushParams.force
    ? await ask.confirm(`Are you sure you want to force push your local changes?`)
    : true
  
  if(!doPush) return Logger.log(`Canceled git push task!`)

  const { data, exitCode } = await git.branch.push({ ...pushParams, log: exists(skipLog) && !skipLog || log, location })
  
  // Log the outcome of the git push command
  exitCode === 0
    ? !skipLog && log && Logger.spacedMsg(`Finished pulling branch!`)
    : generalError(data || `Failed pulling git branche.\nExit with code "${ resp }"`)
}

module.exports = {
  push: {
    name: 'push',
    action: gitPushRepo,
    description: `Push local changes to a remote branch`,
    example: 'keg push <options>',
    options: {
      context: {
        alias: [ 'name' ],
        description: `Name or context to use when finding the current git branch`,
      },
      location: {
        alias: [ 'path', 'loc' ],
        description: `Full path location of a repository to get the current branch from. Overrides "context" option`,
      },
      tap: {
        description: 'Name of the tap to build a Docker image for',
        example: 'keg git current --tap visitapps',
      },
      force: {
        description: `Force the git fetch action, including pruning local branches`,
        default: false
      },
      log: {
        alias: [ 'lg' ],
        description: `Logs the git command being run`,
        default: false
      },
    }
  }
}
