const { branchList } = require('./branchList')

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
const gitBranch = args => {
  const { command, options, params, tasks, globalConfig } = args
  const name = params.name || options[1]
  const action = params.action || options[2]
  
  switch(action){
    // Other branch commands here
    default: {
      branchList(name)
    }
  }

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