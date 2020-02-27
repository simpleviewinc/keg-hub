const getters = require('./getters')
const git = require('./git')
const terminal = require('./terminal')
const globalConfig = require('./globalConfig')


module.exports = {
  ...git,
  ...globalConfig,
  ...getters,
  ...terminal
}