const { Logger } = require('KegLog')
const { throwTaskFailed } = require('./throwTaskFailed')

const throwNoAction = task => {
  Logger.error(`\n Task '${task.name}' requires a valid sub-task. No action exists for this task!`)

  task.alias && Logger.pair(`  * Alias:`, task.alias.join(' | '))
  task.description && Logger.pair(`  * Description:`, task.description)
  task.example && Logger.pair(`  * Example:`, task.example)
  task.tasks && Logger.pair(`  * Subtasks:`, Object.keys(task.tasks).join(' | '))

  Logger.empty()

  throwTaskFailed()

}

module.exports = {
  throwNoAction
}