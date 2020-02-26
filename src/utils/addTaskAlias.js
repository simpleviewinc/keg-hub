const { get, isArr } = require('jsutils')

/**
 * Finds the alias of passed in task, and adds it to the task object with reference to same value
 * @param {Object} task - Task with alias
 * @param {String} file - File the task was loaded from
 *
 * @returns {Object} - Tasks object with name and alias set
 */
const addTaskAlias = (task, file) => {
  if(!task.name) throw new Error(`Task name is required, but could not find taks name for ${file}`)
  
  const namedTask = { [task.name]: task }

  const alias = get(task, 'alias')
  
  return !isArr(alias)
    ? namedTask
    : alias.reduce((update, al) => {
        update[al] = task.name

        return update
      }, namedTask)
}

module.exports = {
  addTaskAlias
}