/**
 * All allowed log method types
 * @type {Object}
 */
const logTypes = [
  `log`,
  `trace`,
  `debug`,
  `info`,
  `dir`,
  `warn`,
  `error`,
]

/**
 * Helper to log messages when not in production
 * @function
 * @param {string} type - Type of log message. Must be one of log, info, dir, warn, error
 * @param {Array} toLog - Data to be logged
 *
 * @returns {Void}
 */
export const Logger = (type, ...toLog) => {
  const method = logTypes.includes(type)
    ? type === `warn` ? `info` : type
    : toLog.unshift(type) && `log`

  process.env.NODE_ENV !== 'production' &&
    console[method] &&
    console[method](...toLog)
}

logTypes.map(type => Logger[type] = (...toLog) => Logger(type, ...toLog))

