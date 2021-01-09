const { get, isStr } = require('@keg-hub/jsutils')
const getAppConfig = require('@keg-hub/tap-resolver/src/resolvers/getAppConfig')
const fs = require('fs')
const path = require('path')

/**
 * @param {string} tapPath - path to the current tap's root
 * @param {string} corePath - path to keg-core's root
 * @return {Object} - object containing tap and core's app configs and package json objects
 *  - used to resolve replacement values for envs of form "<tap|core>.<package|config>.<some_property>"
 */
const buildReplaceContext = (tapPath, corePath) => {
  const buildContext = rootPath => ({
    package: rootPath ? require(path.join(rootPath, 'package.json')) : {},
    config: rootPath ? getAppConfig(rootPath, false, false) : {},
  })

  return {
    core: buildContext(corePath),
    tap: buildContext(tapPath),
  }
}

/**
 *
 * @param {Object} replaceContext - context object produced by `buildReplaceContext`
 * @return {Object} - object of env entries pulled from tap config and core config,
 * dynamically replacing any values of form `<tap|core>.<package|config>.<some_property>`
 */
const buildEnvs = replaceContext => {
  const tapEnvs = get(replaceContext, 'tap.config.keg.envs')
  const coreEnvs = get(replaceContext, 'core.config.keg.envs')

  const envs = {
    ...coreEnvs,
    ...tapEnvs,
  }

  return Object.entries(envs).reduce((replacements, [ key, value ]) => {
    const fallback =
      isStr(value) && (value.startsWith('tap.') || value.startsWith('core.'))
        ? undefined
        : value
    const replacement = get(replaceContext, value, fallback)
    replacements[key] = JSON.stringify(replacement)
    return replacements
  }, {})
}

/**
 * @param {string} tapPath - path to the current tap's root
 * @param {string} corePath - path to keg-core's root
 * @return {Object} - all replacement definitions from the tap and core,
 * merged into one object, compatible with plugins like `@rollup/plugin-replace`
 * and `webpack.DefinePlugin`
 *
 * To define a new env, edit your tap config (e.g. tap.js) with a new `keg.envs`
 * property. Each key-value in that object will replace the key in the app with
 * the specified value. The value can also be of form
 *  `<tap|core>.<package|config>.<some_property>`
 * to dynamically pull from the app configs or package.json.
 */
const getKegEnvs = (tapPath, corePath) => {
  if (!fs.existsSync(tapPath) && !fs.existsSync(corePath)) {
    console.error(
      'Cannot get envs. Expected at least one path to exist on system: ',
      { tapPath, corePath }
    )
    return {}
  }

  const replaceContext = buildReplaceContext(tapPath, corePath)

  return buildEnvs(replaceContext)
}

module.exports = { getKegEnvs }
