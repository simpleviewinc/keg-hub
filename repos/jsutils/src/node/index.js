const loadModule = require('./loadModule')
const universalMethods = require('../../build/cjs/index')
const tryRequire = require('./tryRequire')

module.exports = {
  ...universalMethods,
  ...tryRequire,
  loadModule,
}