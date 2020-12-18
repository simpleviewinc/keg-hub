const { pushOptions } = require('./pushOptions')
const { buildOptions } = require('./buildOptions')
const { deepMerge, isFunc, isObj } = require('@keg-hub/jsutils')
const { startServiceOptions } = require('./startServiceOptions')

const optionTypes = {
  build: buildOptions,
  push: pushOptions,
  startService: startServiceOptions,
}

/**
 * Builds the options for a task
 * @param {Object} task - Name of the task calling the compose service
 * @param {Object} action - Name of the action calling the compose service
 * @param {Object|string} options - Options to build
 * @param {Object} overrides - Override the default options
 *
 * @returns {Object} - Options for tasks using the compose service
 */
const mergeTaskOptions = (task='', action='', options, overrides={}) => {
  return deepMerge({
    // Add the overrides here, so key order matches 
    ...overrides,
    // If options is an object add it, or try to lookup the options in optionTypes
    ...(
      isObj(options)
        ? options
        : isFunc(optionTypes[options])
          ? optionTypes[options](task, action)
          : optionTypes[options] || {}
    ),
  }, overrides)
}

module.exports = {
  mergeTaskOptions
}