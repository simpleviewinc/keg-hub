const { isObj, isFunc, reduceObj } = require('@keg-hub/jsutils')
const { buildTaskData } = require('../utils/builders/buildTaskData')

/**
 * Initializes tasks for the CLI. Loads all default and custom tasks
 * @param {Object|Function} name - Name of the task file to load
 * @param {Object} globalConfig - CLI global config object
 *
 * @returns {Object} - All loaded CLI tasks
 */
const initialize = (name, globalConfig) => {
  const tasks = require(`./${ name }`)

  const parentTasks = isFunc(tasks) ? tasks(globalConfig) : isObj(tasks) ? tasks : {}

  return reduceObj(parentTasks, (key, value, updates) => {
    const task = parentTasks[key]
    return {
      ...updates,
      ...buildTaskData(task, name),
    }
  }, {})

}

module.exports = globalConfig => {
  return {
    ...initialize('base', globalConfig),
    ...initialize('cli', globalConfig),
    ...initialize('components', globalConfig),
    ...initialize('config', globalConfig),
    ...initialize('core', globalConfig),
    ...initialize('docker', globalConfig),
    ...initialize('git', globalConfig),
    ...initialize('global', globalConfig),
    ...initialize('generate', globalConfig),
    ...initialize('hub', globalConfig),
    ...initialize('mutagen', globalConfig),
    ...initialize('network', globalConfig),
    ...initialize('proxy', globalConfig),
    ...initialize('tap', globalConfig),
  }
}