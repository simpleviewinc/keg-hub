import { pipeline, isObj, isFunc, validate, get } from '@ltipton/jsutils'
import * as KegPlugins from './plugins'

/**
 * Validates the plugin object
 * @param {Object} plugin
 * @returns { boolean } - true if the plugin is a function
 */
const isValidPlugin = plugin => {
  const [valid] = validate(
    { plugin },
    { plugin: isFunc },
    { prefix: `Plugin ${get(plugin, 'name')}:` }
  )
  return valid
}

/**
 * List of plugins that conform to the spec, to be used with the store
 */
export const Plugins = Object.values(KegPlugins).filter(isValidPlugin)

/**
 * Exit helper to stop all plugins
 */
const exit = () => {
  throw new Error('Exit plugin pipeline')
}

/**
 * Verifies that the plugin has returned an object with a processed action
 * @param {Object} result
 */
const isValidPluginOutput = (plugin, result) => {
  const valid = isObj(result) && isObj(result.action)
  !valid &&
    console.error(
      'Plugin',
      plugin.name || plugin,
      'did not return the expected result object of form { action: { ... }}, so it will be skipped.'
    )
  return valid
}

/**
 * A list of plugin onDispatch functions. Any invalid output will be omitted from the pipeline
 * @see isValidPluginOutput
 */
const updateFunctions = Plugins.map(plugin => params => {
  const pluginResult = plugin(params)

  // if plugin was invalid, just return the params again
  return isValidPluginOutput(plugin, pluginResult) ? pluginResult : params
})

/**
 * Passes the state and action through all the plugins
 * that conduct side effects or transform the state/action before reaching
 * the app reducers
 * @param {Object} action
 */
export const runPlugins = ({ action }) => {
  if (!Plugins || !Plugins.length) return { action }

  try {
    return pipeline({ action, exit }, ...updateFunctions)
  }
  catch (err) {
    console.error(err)
    return { action }
  }
}
