const path = require('path')
const { isStr } = require('@svkeg/jsutils')
const tapConstants = require('./tapConstants')
const { configNames } = tapConstants

/**
 * Validates that the source config file name is one of the accepted values in tapConstants.configNames
 * @param {string} srcConfigName 
 */
const validateConfigName = (srcConfigName) => {
  const errorMessage = 'Error: Incorrect App config file name.'

  if (!isStr(srcConfigName))
    throw new Error(`
      ${errorMessage}
      \t - Expected type: "string"
      \t - Found: "${typeof srcConfigName}"
    `)

  const matchesSrc = s => (s === srcConfigName)
  if (!configNames.some(matchesSrc)) {
    throw new Error(`
      ${errorMessage}
      \t - Expected one of: ${JSON.stringify(configNames)}
      \t - Found: ${JSON.stringify(srcConfigName)}
      \t - See ${require.resolve('./tapConstants.js')}
    `)
  }
}

/**
 * Make temp file name, ensuring it has the same name as the 
 * source but with .json extension
 * @param {string} srcConfigName - the file name of the source config.
 */
const buildTempConfigName = (srcConfigName) => {
  validateConfigName(srcConfigName)
  const pathResults = path.parse(srcConfigName)
  return `${pathResults.name}.json`
}

module.exports = { buildTempConfigName, validateConfigName }