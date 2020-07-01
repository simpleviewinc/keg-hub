module.exports = {
  ...require('./executeTask'),
  ...require('./getParams'),
  ...require('./getTask'),
  ...require('./findTask'),
  ...require('./runInternalTask'),
  ...require('./optionsAsk'),
  ...require('./validateTask'),
  ...require('./convertParamsToEnvs')
}