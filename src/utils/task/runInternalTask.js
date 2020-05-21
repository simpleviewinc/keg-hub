const Tasks = require('KegTasks')
const { get, isFunc, isObj } = require('jsutils')
const { getTask, executeTask } = require('KegUtils/task')
const { throwNoTask } = require('KegUtils/error')

const findTask = (globalConfig, task) => {
  return isStr(task)
    ? getTask(Tasks(globalConfig), ...task.split('.'))
    : isFunc(task)
      ? { action: task }
      : isObj(task) && task
}

const runInternalTask = ({ task, options, globalConfig }) => {
  const taskToRun = findTask(globalConfig, task)
  !taskToRun && throwNoTask(task)

}

module.exports = {
  runInternalTask
}