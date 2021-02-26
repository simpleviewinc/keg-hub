const loadModule = require('./loadModule')
const cmd = require('./cmd')
const universalMethods = require('../../build/cjs/index')
const tryRequire = require('./tryRequire')

module.exports = {
  ...universalMethods,
  ...cmd,
  ...tryRequire,
  loadModule,
}