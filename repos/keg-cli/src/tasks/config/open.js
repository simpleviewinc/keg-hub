const { runInternalTask } = require('KegUtils/task/runInternalTask')


/**
 * Opens CLI global config in the editor set in the globalConfig
 * @function
 * @param {Object} args - arguments passed from the runTask method
 * @param {Object} args.globalConfig - Global config object for the keg-cli
 *
 * @returns {void}
 */
const openConfig = args => {

  return runInternalTask('tasks.open', {
    ...args,
    command: 'open',
    params: { name: 'config' },
  })

}

module.exports = {
  open: {
    name: 'open',
    action: openConfig,
    description: `Opens the global config in an editor`,
    example: 'keg config open'
  }
}