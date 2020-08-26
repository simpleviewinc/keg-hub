const { deepClone, get, isArr, reduceObj, set } = require('@svkeg/jsutils')
const { addGlobalOptions } = require('../task/globalOptions')

/**
 * Finds the alias of passed in task, and adds it to the task object with reference to same value
 * @param {Object} task - Task with alias
 *
 * @returns {Object} - Tasks object with name and alias set
 */
const buildTaskData = (task, parent) => {
  if(!task.name)
  throw new Error(
    `Required task name could not be found for task: ${JSON.stringify(task, null, 2)}`
  )

  // Add the parent named reference to the task object
  task.parent = task.parent || parent

  // Wrap the task be it's name into a new object
  // This way we can add the alias to the same object at the same level as the default task
  // Then when an alias is used to run a task
  // We can find the real task at the same level of the alias
  const namedTask = { [task.name]: task }
  const alias = get(task, 'alias')

  // Loop over each alias, and map the alias name to the task original name
  // At the same level of the object
  isArr(alias) && alias.reduce((update, al) => {
    update[al] = task.name

    return update
  }, namedTask)

  // Next loop over any subtasks and do the same thing
  const subTasks = get(namedTask, `${task.name}.tasks`)

  // Build subTask alias by looping over each sub task and calling buildTaskData again
  set(namedTask, `${task.name}.tasks`, reduceObj(subTasks, (key, value, existingTasks) => ({
    ...existingTasks,
    ...buildTaskData(value, task.name, parent)
  }), subTasks))

  // Add the global options for every tasks, and return
  return addGlobalOptions(namedTask, task.name, parent)

}

module.exports = {
  buildTaskData
}