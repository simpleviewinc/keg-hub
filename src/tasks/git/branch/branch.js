const { getGit, gitBranchPrint } = require('KegLibs/git')
const { getPathFromConfig, getTapPath } = require('KegUtils/globalConfig')
const { getArguments } = require('KegUtils/task')

/**
 * Git commit task
 * @param {Object} args - arguments passed from the runTask method
 * @param {string} args.command - Initial command being run
 * @param {Array} args.options - arguments passed from the command line
 * @param {Object} args.tasks - All registered tasks of the CLI
 * @param {Object} globalConfig - Global config object for the keg-cli
 *
 * @returns {void}
 */
const gitBranch = async args => {
  const { command, options, tasks, globalConfig } = args
  const params = getArguments(args)
  const name = params.name || options[1] || 'cli'
  
  // TODO: All this can be moved to the getGit helper
  let gitPath = getPathFromConfig(globalConfig, name)
  gitPath = gitPath || getTapPath(globalConfig, name)
  if(!gitPath) throw new Error(`Git path does not exist for ${name}`)
  
  git = getGit(gitPath)

  const [ err, data ] = await git.branch('--all')
  err ? console.error(err.stack) : gitBranchPrint(data)

}

module.exports = {
  branch: {
    name: 'branch',
    alias: [ 'br' ],
    action: gitBranch,
    description: `Run git branch commands on a repo.`,
    example: 'keg branch <options>',
    options: {
      name: {
        description: 'Name of the repository to run the branch command on'
      },
      action: {
        description: 'git branch action to run on the repo'
      }
    }
  }
}