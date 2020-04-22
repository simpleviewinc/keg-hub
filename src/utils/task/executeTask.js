const { get, isFunc, isStr } = require('jsutils')
const { throwNoAction } = require('KegUtils/error')
const { executeCmd } = require('KegProc')
const { getArguments } = require('./getArguments')
/**
 * Executes the passed in task.
 * <br/> Checks if a tasks has cmd key as a string, and if so runs it in a child process
 * <br/> Of if the cmd key as a function, it is called
 * <br/> The output of the the child process or function is passed to the task action
 * @function
 * @param {string} command - Name of the Keg CLI command to run
 * @param {Object} task - task object that's being executed
 * @param {Object} tasks - Global object containing all CLI tasks
 *
 * @returns {Any} - response from the task.action function
 */
const executeTask = async (args) => {
  const { command, task, tasks, options } = args

  const cmdOutput = isStr(task.cmd)
    ? await executeCmd(task)
    : isFunc(task.cmd)
      ? await task.cmd(command, task, tasks, options)
      : {}

  return isFunc(task.action)
    ? task.action({ ...args, cmdOutput, params: getArguments(args) })
    : throwNoAction(args)

}

module.exports = {
  executeTask
}