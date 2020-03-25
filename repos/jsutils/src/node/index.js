const loadModule = require('./loadModule')
const cmd = require('./cmd')
const universalMethods = require('../index')

module.exports = {
  ...universalMethods,
  ...cmd,
  loadModule,
}