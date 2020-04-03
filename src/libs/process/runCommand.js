const { spawnCmd, asyncCmd } = require('spawn-cmd')

module.exports = {
  executeCmd: asyncCmd,
  spawnCmd,
}