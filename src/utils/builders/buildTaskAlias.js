const { deepClone, get, isArr, mapObj, set } = require('jsutils')

/**
 * Finds the alias of passed in task, and adds it to the task object with reference to same value
 * @param {Object} task - Task with alias
 *
 * @returns {Object} - Tasks object with name and alias set
 */
const buildTaskAlias = task => {
  if(!task.name)
  throw new Error(
      `Task name is required, but couldn't be found on the task: ${JSON.stringify(task)}`
    )

  const namedTask = { [task.name]: deepClone(task) }
  const alias = get(task, 'alias')

  // Loop over each alias, and map the alias name to the task original name
  isArr(alias) && alias.reduce((update, al) => {
    update[al] = task.name

    return update
  }, namedTask)

  const subTasks = get(namedTask, `${task.name}.tasks`)

  // Build subTask alias by looping over each sub task and calling buildTaskAlias again
  subTasks && mapObj(subTasks, (key, value) => {
    set(namedTask, `${task.name}.tasks`, {
      ...subTasks,
      ...buildTaskAlias(value)
    })
  })

  return namedTask

}

module.exports = {
  buildTaskAlias
}