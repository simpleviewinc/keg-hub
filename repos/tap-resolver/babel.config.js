const runSetup = require('./src/runSetup')
const { getPlatformData, getResolverFile, validateBabel } = require('./src/babel')
const { PLATFORM, NODE_ENV, KEG_COMPONENT_RESOLVER } = process.env

/**
 * Sets up the babel config based on the PLATFORM ENV and the passed in options
 * @param {Object} options - Settings to built the babel config
 * @param {Object} options.config - Joined Tap and Keg configs
 * @param {string} options.tapPath - Path to the tap
 * @param {string} options.kegPath - Path to the keg
 *
 * @returns {Object}  - built babel config
 */
const babelSetup = options => {

  const { tapPath, kegPath } = options

  // Validate the passed in options
  validateBabel(options)

  // Cache the platform type
  options.isWeb = PLATFORM === 'web'

  // Get custom or default resolver files
  const contentResolver = getResolverFile(options, 'contentResolver')
  const webResolver = getResolverFile(options, 'webResolver')
  const componentResolver = getResolverFile(options, 'componentResolver')

  // If isWeb, then use the componentResolver for all direct alias calls
  // This is used for rollup, where this works
  // When using webpack, it will call the resolvePath function, which is set to webResolver
  const useResolver = options.isWeb ? KEG_COMPONENT_RESOLVER && componentResolver : contentResolver

  // Run the setup to get tap extensions, and alias helper
  const { buildAliases, EXTENSIONS } = runSetup(options, useResolver)

  // Get custom or default babel platform options
  const babelOpts = getPlatformData(options, 'babel')

  // Set the presets and plugins based on the platform type
  const babel = {
    presets: [ ...babelOpts.presets ],
    plugins: [
      ...babelOpts.plugins,
      // Build the module-resolver, and add the alias based on platform type
      [ 'module-resolver', {
        root: [ kegPath ],
        cwd: kegPath,
        extensions: EXTENSIONS,
        // Aliases work differently in webpack, so add the webResolver method helper for alias mapping
        resolvePath: options.isWeb && webResolver || undefined,
        alias: {
          ...buildAliases(),
          ...getPlatformData(options, 'aliases')
        }
      }]
    ]
  }

  return { ...babel, env: { test: { ...babel }}}

}

module.exports = NODE_ENV === 'resolver-test'
  ? {}
  : babelSetup
