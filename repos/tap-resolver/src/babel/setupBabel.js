const { get, isObj } = require('jsutils')
const { checkTapKegPath } = require('../helpers')

/**
 * Gets the platform data based on the PLATFORM ENV
 * If isWeb, tries to pull from [key].web; else pulls from [key].native else returns [key]
 * @param {Object} options - Settings to built the babel config
 * @param {Object} options.config - Joined Tap and Keg configs
 * @param {string} options.tapPath - Path to the tap
 * @param {string} options.kegPath - Path to the keg
 * @param {boolean} isWeb - if the PLATFORM ENV equals web
 *
 * @returns {Object} - Platform specific settings for the passed in key
 */
const getPlatformData = (options, key) => {
  const data = get(options, [ 'config', 'keg', 'tapResolver', key ])

  return !isObj(data)
    ? {}
    : options.isWeb && isObj(data.web)
      ? data.web
      : isObj(data.native)
        ? data.native
        : data
}

/**
 * Loads a resolver file from the app config if defined, or uses the default
 * @param {Object} options - Settings to built the babel config
 * @param {Object} options.config - Joined Tap and Keg configs
 * @param {string} options.tapPath - Path to the tap
 * @param {string} options.kegPath - Path to the keg
 * @param {string} type - Type of resolver file to load ( contentResolver || webResolver )
 *
 * @returns {function} - Loaded resolver file
 */
const getResolverFile = (options, type) => {
  try {

    // Get the defined resolver path
    const resolverPath = get(options, [ 'config', 'keg', 'tapResolver', 'paths', type ])

    // Ensure the path exists
    const resolver = resolverPath && checkTapKegPath(
      options.tapPath,
      options.kegPath,
      resolverPath
    )

    if (resolver) console.log(`Using custom resolver for ${type}`)

    // Load the resolved path
    return resolver
      ? require(resolver)
      : require(`../resolvers/${type}`)

  }
  catch (e){
    console.log(`Error loading custom resolver for ${type}`)
    console.error(e.message)
    console.error(e.stack)

    return require(`../resolvers/${type}`)

  }
}

module.exports = {
  getPlatformData,
  getResolverFile
}
