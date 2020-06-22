const { isObj, isFunc, reduceObj } = require('jsutils')
const { buildTaskAlias } = require('../utils/builders/buildTaskAlias')

/**
 * Initializes tasks for the CLI. Loads all default and custom tasks
 * @param {Object|Function} tasks - CLI tasks to load
 * @param {Object} config - CLI global config object
 *
 * @returns {Object} - All loaded CLI tasks
 */
const initialize = (tasks, name, config) => {
  const parentTasks = isFunc(tasks) ? tasks(config) : isObj(tasks) ? tasks : {}

  return reduceObj(parentTasks, (key, value, updates) => {
    const parentTask = parentTasks[key]
    return {
      ...updates,
      ...buildTaskAlias(parentTask, name),
    }
  }, {})

}

module.exports = config => {
  return {
    ...initialize(require('./cli'), 'cli', config),
    ...initialize(require('./components'), 'components', config),
    ...initialize(require('./config'), 'config', config),
    ...initialize(require('./core'), 'core', config),
    ...initialize(require('./docker'), 'docker', config),
    ...initialize(require('./git'), 'git', config),
    ...initialize(require('./global'), 'global', config),
    ...initialize(require('./generate'), 'generate', config),
    ...initialize(require('./mutagen'), 'mutagen', config),
    ...initialize(require('./tap'), 'tap', config),
    ...initialize(require('./network'), 'network', config),
  }
}