const { setLogs } = require('jsutils')
const buildAliases = require('./builders/buildAliases')
const buildConstants = require('./builders/buildConstants')
const { validateApp } =  require('./helpers')
const defContentResolver = require('./resolvers/contentResolver')

setLogs(process.env.LOG, `log`, `[ Tap Resolver ]`)

/**
 * Setups up the project to load the tap
 * @param {Object} options - Settings to built the babel config
 * @param {Object} options.config - Joined Tap and Keg configs
 * @param {string} options.tapPath - Path to the tap
 * @param {string} options.kegPath - Path to the keg
 * @param {function} contentResolver - Function to help resolve file paths
 *
 * @return {Object} - Alias map to load files
 */
module.exports = (options, contentResolver) => {

  // Ensure the required app data exists
  validateApp(options.kegPath, options.config)

  // Ensure we have a contentResolver
  contentResolver = contentResolver || defContentResolver

  // Build out the Tap / Keg constant
  const {
    ALIASES,
    APP_CONFIG,
    BASE_CONTENT,
    BASE_PATH,
    DYNAMIC_CONTENT,
    EXTENSIONS,
    HAS_TAP
  } = buildConstants(options)

  // Build out the Tap / Keg aliases
  const aliasesBuilder = buildAliases(
    APP_CONFIG,
    contentResolver,
    { ...ALIASES },
    {
      base: BASE_CONTENT,
      basePath: BASE_PATH,
      dynamic: DYNAMIC_CONTENT,
      tap: HAS_TAP,
      extensions: EXTENSIONS
    }
  )

  return {
    EXTENSIONS,
    // aliasesBuilder is a function that returns a function
    // Which allows us to build the aliases when the babel config get's built
    buildAliases: aliasesBuilder,
  }
}
