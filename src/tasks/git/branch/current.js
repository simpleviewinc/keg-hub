const { getGit, gitCurrentBranch, getGitPath } = require('KegUtils/git')
const { Logger } = require('KegLog')
const { throwNoGitBranch } = require('KegUtils/error/throwNoGitBranch')
const { DOCKER } = require('KegConst/docker')
const { git } = require('KegGitCli')

/**
 * Git branch task
 * @param {Object} args - arguments passed from the runTask method
 * @param {string} args.command - Initial command being run
 * @param {Array} args.options - arguments passed from the command line
 * @param {Object} args.tasks - All registered tasks of the CLI
 * @param {Object} globalConfig - Global config object for the keg-cli
 *
 * @returns {void}
 */
const currentBranch = async args => {

  const { params,  globalConfig, __skipLog } = args
  const { context, path: repoPath } = params

  // Get the path to the repo
  const location = repoPath || context && getGitPath(globalConfig, context)

  // // Ensure a repo path could be found
  !location && throwNoGitBranch(repoPath || context)

  const curBranch = await git.branch.current(location)

  // If no current branch, then throw error
  // Otherwise log the current branch
  !curBranch.current
    ? generalError(`Could not get the current branch for ${ context || repoPath }`)
    : !__skipLog && Logger.spacedMsg(`Current Branch:`, curBranch.name)

  // // Return the current branch
  return curBranch

}

module.exports = {
  current: {
    name: 'current',
    alias: [ 'cur', 'cr', 'active' ],
    action: currentBranch,
    description: `Get the current git branch from a path`,
    example: 'keg branch current <options>',
    options: {
      context: {
        alias: [ 'name' ],
        allowed: DOCKER.IMAGES,
        description: `Name or context to use when finding the current git branch`,
        enforce: true
      },
      path: {
        description: `Full path location of a repository to get the current branch from. Overrides "context" option`,
        enforce: true
      }
    }
  }
}