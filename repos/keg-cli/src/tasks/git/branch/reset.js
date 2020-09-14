const { ask } = require('@keg-hub/ask-it')
const { Logger } = require('KegLog')
const { git } = require('KegGitCli')
const { getGitPath } = require('KegUtils/git/getGitPath')
const { generalError } = require('KegUtils/error')
const { confirmExec } = require('KegUtils/helpers/confirmExec')

/**
 * Git branch reset task
 * @param {string} branch - Branch to run action on
 * @param {Array} branches - Array of all current branches
 * @param {Object} location - Location of the repo for the branches
 * @param {Object} params - Parsed options from the cmd line
 *
 * @returns {void}
 */
const branchReset = async (args) => {
  const { globalConfig, params, __internal={} } = args
  const { context, location, log, tap } = params
  const { __skipLog } = __internal
  const gitPath = getGitPath(globalConfig, tap || context) || location
  !gitPath && generalError(`Git path does not exist for ${ tap || context || location }`)

  confirmExec({
    confirm: `This permanently deletes all un-tracked files from $1. Are you sure?`,
    success: `Git branch reset success!`,
    cancel: `Git branch reset canceled!`,
    preConfirm: !confirm,
    execute: async () => {
      // Make call to reset the git branch
      const resp = await git.branch.reset({ location: gitPath, log: !__skipLog && log })

      console.log(resp)

      // log && Logger.log(resp)
      // Logger.empty()

    },
  })

}

module.exports = {
  reset: {
    name: 'reset',
    alias: [ 'clean' ],
    description: 'Resets a git branch, by removes all changes and untracked files',
    action: branchReset,
    options: {
      context: {
        description: 'Name of location of the git repo to clean',
        example: 'keg git branch reset --context core',
      },
      confirm: {
        description: 'Confirm before resetting the branch.',
        example: 'keg git branch reset --confirm false',
        default: true,
      },
      log: {
        alias: [ 'lg' ],
        description: `Logs the git command being run`,
        example: 'keg git branch --log false',
        default: true
      },
    }
  }
}
