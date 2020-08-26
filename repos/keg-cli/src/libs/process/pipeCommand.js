const { Logger } = require('KegLog')
const { Loading } = require('./loading')
const { spawnCmd } = require('@svkeg/spawn-cmd')
const { get, checkCall, deepMerge, isFunc, isArr } = require('@svkeg/jsutils')


/**
 * Helper to log errors to the terminal
 * @param {Object} logs - Log Config for the currently running process
 * @param {string} data - Text to be printed if not filtered
 *
 * @returns {void}
 */
const noBypassLog = (logs, data, type) => {
  logs.clearOnBypassLog && console.clear()
  Logger.empty()
  Logger.empty()

  logs.noBypassLog && Logger.error(logs.noBypassLog)
  process[type] ? process[type].write(data) : Logger.log(data)

  Logger.empty()
}

/**
 * Checks the passed in data to see if it should be filtered
 * @param {Object} logs - Log Config for the currently running process
 * @param {string} data - Text to be printed if not filtered
 *
 * @returns {boolean} - True if the data should filtered / False if data should be printed
 */
const filterLog = (logs, data) => {
  // Check if the data is in the filters array
  return logs.filters && logs.filters
    .reduce((inFilter, filter) => {
      return inFilter || data.trim().indexOf(filter) === 0
    }, false)
}

/**
 * Checks the passed in data to see if it should be logged even when logging is off
 * @param {Object} logs - Log Config for the currently running process
 * @param {string} data - Text to be printed if not filtered
 *
 * @returns {boolean} - False if the filter should be bypassed
 */
const filterBypass = (logs, data) => {
  // Check if the data should bypass the filter and force log
  return !(logs.filterBypass && logs.filterBypass
    .reduce((inBypass, bypass) => {
      return inBypass || data.trim().indexOf(bypass) === 0
    }, false))
}

/**
 * Handler for logging data passed in from an event callback
 * @param {function} eventCb - Override for an event callback
 * @param {string} type - type or callback event for stdio
 * @param {Object} config - Log Config for the currently running process
 * @param {string} data - Text to be logged
 * @param {string} procId - Id of the process that's firing the event callback
 *
 * @returns {void}
 */
const handleLog = (eventCb, type, loading, logs, data, procId) => {
  try {
    const shouldFilter = loading && loading.active
      ? filterBypass(logs, data)
      : filterLog(logs, data)

    loading && loading.active && loading.progress(shouldFilter && 1, data)

    return !shouldFilter
      ? isFunc(eventCb)
        ? eventCb(data, procId)
        : checkCall(() => {
          loading && loading.active
            ? noBypassLog(logs, data)
            : process[type] && process[type].write(data)
        })
      : null
  }
  catch(err){
    // This should be a cli dev only error
    // Most user should not see this displayed
    // This throws when there is an error in the event handling code
    // NOT when there is an error in the pipeCmd Process
    Logger.error(err.message)
  }
}

/**
 * Handles when the piped process exits
 * <br/> Stops the loader and calls the passed in onExit method
 * @param {Object} config - Log Config for the currently running process
 * @param {Object} loading - Instance of the Loading class
 *
 * @returns {Object} - Event listener for onExit
 */
const handleExit = (config, loading) => {
  return (...args) => {
    loading && isFunc(loading.loader.stop) && loading.loader.stop()
    return checkCall(config.onExit, ...args)
  }
}

/**
 * Builds event listeners that filter out logs based on passed in filters
 * @param {Object} config - Log Config for the currently running process
 *
 * @returns {Object} - Event listeners with filters
 */
const buildEvents = (config={}, logs, loadingConf) => {
  const filter = get(logs, 'filter')
  const onStdOut = get(config, 'onStdOut')
  const onStdErr = get(config, 'onStdErr')

  // If filter set to true, or there's no event callbacks, just return empty
  if(filter !== true && (!onStdOut && !onStdErr)) return {}

  loading = loadingConf && new Loading({}, loadingConf)

  // Create event handler callbacks
  return {
    onStdOut: (...args) => handleLog(onStdOut, 'stdout', loading, logs, ...args),
    onStdErr: (...args) => handleLog(onStdErr, 'stderr', loading, logs, ...args),
    onExit: handleExit(config, loading)
  }
}

/**
 * Executes an child process, with stdio set to pipe
 * @param {string} cmd - Command to be run
 * @param {Array} options - extra options to pass to the child process
 * @param {string} location - Where the command should be run
 *
 * @returns {*} - Response from async exec cmd
 */
const pipeCmd = (cmd, options={}, location=process.cwd()) => {
  // Pull the logConfig from the passed in options
  // This way we can pass all other options to the spawnCmd call
  const { logs={}, loading, ...cmdOpts } = options

  const spawnOpts = {
    ...cmdOpts,
    // Build the event listeners to allow log filtering
    ...buildEvents(options, logs, loading),
    // Set the location where the command should be run
    cwd: options.cwd || location,
    // Ensure the stdio gets set to pipe
    options: { ...cmdOpts.options, stdio: 'pipe' }
  }

  // Execute the command, and return the response
  return spawnCmd(cmd, spawnOpts)

}


module.exports = {
  pipeCmd,
}