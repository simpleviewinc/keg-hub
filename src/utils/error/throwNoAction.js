const { Logger } = require('KegLog')
const { printInfo } = require('../log')

const throwNoAction = (args) => {
  const { command, task, tasks } = args
  Logger.error(`\n Task '${task.name}' requires a valid sub-task command. No action exists for this task!`)

  task.alias && printInfo(`  * Alias:`, task.alias.join(' | '))
  task.description && printInfo(`  * Description:`, task.description)
  task.example && printInfo(`  * Example:`, task.example)
  task.tasks && printInfo(`  * Subtasks:`, Object.keys(task.tasks).join(' | '))

  Logger.empty()

  throw new Error(`Task failed!`)

}

module.exports = {
  throwNoAction
}