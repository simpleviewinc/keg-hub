const path = require('path')
const appRoot = require('app-root-path').path
const runSetup = require('./src/setup')
const buildTapList = require('./src/buildTapList')
const getAppConfig = require('./src/getAppConfig')
const { get, isObj } = require('jsutils')
const { PLATFORM, NODE_ENV } = process.env
/**
 * Gets the platform data based on the PLATFORM ENV
 * If isWeb, tries to pull from conf.web; else pulls from conf.native else returns conf
 *
 * @param {Object} conf - object to pull config data from
 * @param {boolean} isWeb - if the PLATFORM ENV equals web
 * @returns
 */
const getPlatformData = (conf, isWeb) => {
  return !isObj(conf)
    ? {}
    : isWeb && isObj(conf.web)
      ? conf.web
      : isObj(conf.native)
        ? conf.native
        : conf
}
/**
 * Loads a resolver file from the app config if defined, or uses the default
 * @param {Object} appConfig - default app.json config
 * @param {string} type - Type of resolver file to load ( contentResolver || webResolver )
 *
 * @returns {function} - Loaded resolver file
 */
const getResolverFile = (appConfig, type) => {
  try {
    const resolverPath = get(appConfig, [ 'tapResolver', 'paths', type ])
    const resolver = resolverPath && path.join(appRoot, resolverPath)
    if (resolver) console.log(`Using custom resolver for ${type}`)

    return resolver
      ? require(resolver)
      : require(`./src/${type}`)
  }
  catch (e){
    console.log(`Error loading custom resolver for ${type}`)
    console.error(e.message)
    console.error(e.stack)

    return require(`./src/${type}`)
  }
}
/**
 * Sets up the babel config based on the PLATFORM ENV and the app config in app.json
 *
 * @returns {Object} - built babel config
 */
const babelSetup = () => {

  const isWeb = PLATFORM === 'web'
  const appConfig = getAppConfig(appRoot)
  const platformConfAliases = getPlatformData(get(appConfig, [ 'tapResolver', 'aliases' ]), isWeb)
  const babelConf = getPlatformData(get(appConfig, [ 'tapResolver', 'babel' ]), isWeb)
  const contentResolver = getResolverFile(appConfig, 'contentResolver')
  const webResolver = getResolverFile(appConfig, 'webResolver')

  // Build list of local taps from root_dir/taps AND root_dir/node_module/zr-rn-taps
  buildTapList(appRoot, appConfig)
  // Run the setup to get tap extensions, and alias helper
  const { buildAliases, EXTENSIONS } = runSetup(appRoot, appConfig, contentResolver)
  // Set the presets and plugins based on the platform type
  const presets = [ ...babelConf.presets ]
  const plugins = [ ...babelConf.plugins ]

  // Build the module-resolver, and add the alias based on platform type
  plugins.push([
    'module-resolver', {
      root: [ appRoot ],
      cwd: appRoot,
      extensions: EXTENSIONS,
      // Aliases work differently in webpack, so add the webResolver method helper for alias mapping
      resolvePath: isWeb && webResolver || undefined,
      alias: {
        ...buildAliases(),
        ...platformConfAliases
      }
    } ])

  return {
    presets,
    plugins,
    env: {
      test: {
        presets,
        plugins
      }
    }
  }

}

module.exports = NODE_ENV === 'resolver-test'
  ? {}
  : babelSetup()
