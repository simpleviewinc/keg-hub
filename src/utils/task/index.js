module.exports = {
  ...require('./convertParamsToEnvs'),
  ...require('./executeTask'),
  ...require('./findTask'),
  ...require('./getParams'),
  ...require('./getTask'),
  ...require('./globalOptions'),
  ...require('./optionsAsk'),
  ...require('./runInternalTask'),
  ...require('./validateTask'),
}