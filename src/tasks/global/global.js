const { throwWrap } = require('KegUtils')
const { executeTask } = require('KegRunTask')
const { get, isFunc, isStr } = require('jsutils')

/**
 * Checks all global sub-tasks for sub-sub-tasks
 * This allows calling the cli like keg branch || keg git branch
 * @param {Object} globalTasks - All global tasks
 * @param {string} command - Tasks to run from the command line
 *
 * @returns {Object} - Found task to run
 */
const checkGlobalSubTasks = (globalTasks, command) => {
  return Object.keys(globalTasks).reduce((task, key) => {
    return task || get(globalTasks, `${ key }.tasks.${ command }`, task)
  }, null) || get(globalTasks, command)
}

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
  
  const globalTasks = get(tasks, `global.tasks`)
  
  let subTask = options[0] && command === 'global'  || command === 'glob' || command === 'gl'
    ? get(globalTasks, options[0])
    : checkGlobalSubTasks(globalTasks, command)

  subTask = isStr(subTask) ? tasks[subTask] : subTask

  // Check if it's a sub-command, and if so execute it
  subTask
    ? executeTask({
        command,
        options,
        task: subTask,
        tasks,
        globalConfig
      })
    : throwWrap(`Could not find global sub-command ${ command } ${ options[0] }!`)
}

/**
 * Builds the alias and tasks for all global tasks, and their sub-tasks
 *
 * @returns {Object} - Contains global alias and tasks
 */
const buildAliasTasks = () => {
  const built = {
    alias: [ 'glob', 'gl' ],
    tasks: {
      ...require('./git'),
      ...require('./config'),
      ...require('./general'),
      ...require('./setup'),
    }
  }

  return Object.keys(built.tasks)
    .reduce((aliasTasks, key) => {
      const subSubTasks = Object.keys(get(built, `tasks.${key}.tasks`, {}))
      const subSubAlias = get(built, `tasks.${key}.alias`, [])
      aliasTasks.alias = [ ...aliasTasks.alias, key, ...subSubTasks, ...subSubAlias ]

      return aliasTasks
    }, built)

}

module.exports = {
  global: {
    name: 'global',
    ...buildAliasTasks(),
    action: globalDefCmd,
    description: 'Keg CLI global specific tasks',
    example: 'keg global <command> <options>'
  }
}
