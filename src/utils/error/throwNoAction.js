const { Logger } = require('KegLog')

const throwNoAction = (args) => {
  const { command, task, tasks } = args
  Logger.error(`\n Task '${task.name}' requires a valid sub-task command. No action exists for this task!`)

  task.alias && Logger.message(`  * Alias:`, task.alias.join(' | '))
  task.description && Logger.message(`  * Description:`, task.description)
  task.example && Logger.message(`  * Example:`, task.example)
  task.tasks && Logger.message(`  * Subtasks:`, Object.keys(task.tasks).join(' | '))

  Logger.empty()

  throw new Error(`Task failed!`)

}

module.exports = {
  throwNoAction
}