const { Logger } = require('KegLog')
const { throwTaskFailed } = require('./throwTaskFailed')

const throwGitCmd = (args, error) => {
  const { command, task, tasks } = args

  Logger.error(`\n Task '${task.name}' failed git command with ERROR:\n ${error.message}\n`)
  Logger.empty()

  throwTaskFailed()
}

module.exports = {
  throwGitCmd
}