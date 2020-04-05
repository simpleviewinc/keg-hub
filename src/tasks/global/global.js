const gitCmds = require('./git')
const setupCmds = require('./setup')
const { isFunc } = require('jsutils')
const { executeTask } = require('KegRunTask')

const globalDefCmd = args => {

  const { command, options, tasks, globalConfig } = args
  const useSubCmd = gitCmds[command] || setupCmds[command]

  // Check if it's a sub-command, and if so execute it
  if(useSubCmd)
    return executeTask({
      command,
      options,
      task: useSubCmd,
      tasks,
      globalConfig
    })

}

module.exports = globalDefCmd