const path = require('path')
const { isFunc } = require('@keg-hub/jsutils')
const { validateApp } = require('../helpers')
/**
 * Adds dynamic content to the aliasMap of base content if a tap is set
 * @param {Object} aliasMap - object that holds all path alias
 * @param {Object} content - object that holds the content paths
 * @param {Object} content.base - base paths that can not be overwritten
 * @param {string} content.basePath - path the to the base content
 * @param {Object} content.dynamic - paths that can be overwritten by the tap
 * @param {boolean} content.extensions - allowed file extensions
 * @param {boolean} content.tap - flag for it the tap's name is set
 *
 * @return {Object} - Alias map to load files
 */
const buildDynamicAliases = (appConfig, contentResolver, aliasMap, content) => {
  // Ensure there a tap exists and the contentResolver is a function
  const useResolver = content.tap && isFunc(contentResolver)

  // Add dynamic content
  return Object.keys(content.dynamic).reduce((updatedMap, key, value) => {
    // If we have a tap, use the contentResolver method to resolve the path
    // Otherwise set the path to the basePath
    updatedMap[key] = useResolver
      ? contentResolver(appConfig, updatedMap, content, content.dynamic[key])
      : path.join(content.basePath, content.dynamic[key])

    // return the update map
    return updatedMap
  }, aliasMap)
}

/**
 * Builds the path to taps custom content
 * Example - SVComponents | loads files from taps folder or base folder
 * @param {Object} appConfig - app.json config file
 * @param {function} contentResolver - Function to help resolve file paths
 * @param {Object} aliasMap - object that holds all path alias
 * @param {Object} content - object that holds the content paths
 * @param {Object} content.base - base paths that can not be overwritten
 * @param {string} content.basePath - path the to the base content
 * @param {Object} content.dynamic - paths that can be overwritten by the tap
 * @param {boolean} content.extensions - allowed file extensions
 * @param {boolean} content.tap - flag for it the tap's name is set
 *
 * @return {Object} - Alias map to load files
 */
module.exports = (appConfig, contentResolver, aliasMap, content) => {
  // Ensure the required app data exists
  validateApp('_', appConfig)

  // Wrap the exposed function with a function to get access to the original passed in args
  return () => {
    // Build dynamic content folder paths
    aliasMap = buildDynamicAliases(
      appConfig,
      contentResolver,
      aliasMap,
      content
    )

    // Map the base content to the path from the base
    // This ensures the paths can not be overwritten
    return Object.keys(content.base).reduce((updatedMap, key) => {
      // Set the path to the base path
      updatedMap[key] = path.join(content.basePath, content.base[key])

      // return the update map
      return updatedMap
    }, aliasMap)
  }
}
