const { Logger } = require('KegLog')
const { git } = require('KegGitCli')
const { exists } = require('@keg-hub/jsutils')
const { getGitPath } = require('KegUtils/git')
const { generalError } = require('KegUtils/error')

/**
 * Git fetch task
 * @param {Object} args - arguments passed from the runTask method
 * @param {string} args.command - Initial command being run
 * @param {Array} args.options - arguments passed from the command line
 * @param {Object} args.tasks - All registered tasks of the CLI
 * @param {Object} globalConfig - Global config object for the keg-cli
 *
 * @returns {void}
 */
const gitFetch = async args => {
  const { params,  globalConfig, __internal={} } = args
  const { skipLog } = __internal
  const { context, location: repoPath, tap, env, log, ...fetchParams } = params

  // Get the path to the repo
  const location = repoPath || context && getGitPath(globalConfig, tap || context) || process.cwd()

  // Fetch the branches for the location
  const resp = await git.repo.fetch({ ...fetchParams, log: exists(skipLog) && !skipLog || log, location })

  // Log out that the task finished, if logs are not being skipped
  !skipLog && Logger.spacedMsg(`Finished fetching branches!`)

}

module.exports = {
  fetch: {
    name: 'fetch',
    action: gitFetch,
    description: `Pulls a git repository from github!`,
    example: 'keg fetch <options>',
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
      all: {
        description: `Fetch all branches from all remotes`,
        default: true
      },
      prune: {
        alias: [ 'clean' ],
        description: `Remove old or deleted local branches the no longer exists on a remote`,
        default: true
      },
      force: {
        description: `Force the git fetch action, including pruning local branches`,
        default: false
      },
      sub: {
        alias: [ 'submodules', 'modules', 'recurse' ],
        description: `Recursively fetch submodules`,
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
