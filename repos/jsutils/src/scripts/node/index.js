const loadModule = require('./loadModule')
const cmd = require('./cmd')

module.exports = {
  ...cmd,
  loadModule,
}