const getters = require('./getters')
const terminal = require('./terminal')
const globalConfig = require('./globalConfig')


module.exports = {
  ...globalConfig,
  ...getters,
  ...terminal
}