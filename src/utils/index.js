const getters = require('./getters')
const git = require('./git')
const globalConfig = require('./globalConfig')

module.exports = {
  ...git,
  ...globalConfig,
  ...getters,
}