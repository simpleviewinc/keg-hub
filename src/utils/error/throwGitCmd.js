const { Logger } = require('KegLog')

const throwGitCmd = (args, error) => {
  const { command, task, tasks } = args
  Logger.error(`\n Task '${task.name}' failed git command with ERROR:\n ${error.message}\n`)
  Logger.empty()

  throw new Error(`Task failed!`)
}

module.exports = {
  throwGitCmd
}