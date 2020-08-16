module.exports = {
  ...require('./addDefaultOptions'),
  ...require('./checkBoolValue'),
  ...require('./checkQuotedOptions'),
  ...require('./getOptionMeta'),
  ...require('./optionsAsk'),
  ...require('./optionsHasIdentifiers'),
  ...require('./removeOption')
}
