const { get, deepMerge } = require('@keg-hub/jsutils')

/**
 * Gets the publish context from the global config and merges it with the passed in config
 * @function
 * @param {Object} globalConfig - Global cli config object
 * @param {string} context - Name of the publish context to get
 * @param {Object} publishArgs - publish context args passed in from the command line
 *
 * @returns {Object} - Merged publish context config 
 */
const getPublishContext = (globalConfig, context, publishArgs) => {
  // Get the publish context from the globalConfig, and merge with passed in publish args

  return deepMerge(
    get(globalConfig, `publish.default`),
    get(globalConfig, `publish.${context}`),
    publishArgs
  )
}

module.exports = {
  getPublishContext
}