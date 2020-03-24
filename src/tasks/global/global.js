const gitCmds = require('./git')
const { isFunc } = require('jsutils')
const { executeTask } = require('KegRunTask')


const globalDefCmd = args => {

  console.log(`---------- global command ----------`)

  const { command, options, tasks, globalConfig } = args

  // Check if it's a git command, and if so execute it
  if(gitCmds[command])
    return executeTask(command, options, gitCmds[command], tasks, globalConfig)


}

module.exports = globalDefCmd