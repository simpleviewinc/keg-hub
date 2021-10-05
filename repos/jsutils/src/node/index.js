module.exports = {
  ...require('../../build/cjs/index'),
  ...require('./findProc'),
  ...require('./tryRequire'),
  ...require('./loadModule'),
}