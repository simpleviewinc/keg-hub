const path = require('path')
const appRoot = require('app-root-path').path
const runSetup = require('./src/setup.js')
const buildClientList = require('./src/buildClientList.js')
const getAppConfig = require('./src/getAppConfig')
const { get, isObj } = require('jsutils')
const { PLATFORM, NODE_ENV } = process.env

const getPlatformData = (conf, isWeb) => {
  return !isObj(conf)
    ? {}
    : isWeb && isObj(conf.web)
      ? conf.web
      : isObj(conf.native)
        ? conf.native
        : conf
}

const babelSetup = () => {

  const isWeb = PLATFORM === 'web'
  const appConfig = getAppConfig(appRoot)
  const aliases = getPlatformData(get(appConfig, ['clientResolver', 'aliases']), isWeb)
  const babelConf = getPlatformData(get(appConfig, ['clientResolver', 'babel']), isWeb)

  // Build list of local clients from root_dir/clients AND root_dir/node_module/zr-rn-clients
  buildClientList(appRoot, appConfig)
  // Run the setup to get client extensions, and alias helper
  const { buildAliases, EXTENSIONS } = runSetup(appRoot, appConfig)

  // Set the presets and plugins based on the platform type
  const presets = [ ...babelConf.presets ]
  const plugins = [ ...babelConf.plugins ]
  
  // Build the module-resolver, and add the alias based on platform type
  plugins.push([
    'module-resolver',
    {
      root: [ appRoot ],
      cwd: appRoot,
      extensions: EXTENSIONS,
      alias: {
        ...buildAliases(),
        ...aliases,
    }
  }])

  return {
    presets,
    plugins,
    env: {
      test: {
        presets,
        plugins,
      }
    }
  }
  
}

module.exports = NODE_ENV === 'resolver-test'
  ? {}
  : babelSetup()
