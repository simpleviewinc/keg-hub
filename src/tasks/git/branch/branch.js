const { throwWrap } = require('KegUtils/error/throwWrap')
const { list } = require('./list')
const { get, isFunc } = require('jsutils')

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

  // Auto call the list task if we reach the gitBranch root task
  const list = get(args, `task.tasks.list.action`)
  const res = isFunc(list) ? list(args) : throwWrap(`Git branch "list" task not found!`)

}

module.exports = {
  branch: {
    name: 'branch',
    alias: [ 'br' ],
    action: gitBranch,
    description: `Run git branch commands on a repo.`,
    example: 'keg branch <options>',
    tasks: {
      list,
      ...require('./current'),
    },
    options: {
      ...list.options
    }
  }
}