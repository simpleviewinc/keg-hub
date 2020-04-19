const { get, isFunc } = require('jsutils')
const { executeTask } = require('KegRunTask')

/**
 * Default global task
 * @param {Object} args - arguments passed from the runTask method
 * @param {string} args.command - Initial command being run
 * @param {Array} args.options - arguments passed from the command line
 * @param {Object} args.tasks - All registered tasks of the CLI
 * @param {Object} globalConfig - Global config object for the keg-cli
 *
 * @returns {void}
 */
const globalDefCmd = args => {

  const { command, options, tasks, globalConfig } = args
  const subCmd = get(tasks, `global.tasks.${ command }`)

  // Check if it's a sub-command, and if so execute it
  if(subCmd)
    return executeTask({
      command,
      options,
      task: subCmd,
      tasks,
      globalConfig
    })

}

module.exports = globalDefCmd