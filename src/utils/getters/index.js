const getConfig = require('./getConfig')
const getTask = require('./getTask')
const getConfigPath = require('./getConfigPath')


module.exports = {
  ...getConfig,
  ...getConfigPath,
  ...getTask,
}