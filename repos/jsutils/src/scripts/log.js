
let SHOW_LOGS
const isTest = process.env.NODE_ENV === 'test'
const LOG_TYPES = [
  'error',
  'info',
  'log',
  'dir',
  'warn',
]

/**
 * Turns logs on || off
 * @param  { boolean } log - log values
 * @return { void }
 */
export const setLogs = log => (SHOW_LOGS = log)

/**
 * Logs a string to the inspector, uses the last argument to determine the log type
 * @param  { array } args - to be passed to the log call
 * @return { void }
 */
export const logData = (...args) => {
  if(!args.length) return
  
  let type = args.length === 1 ? 'dir' : args.pop()
  if(!SHOW_LOGS && type !== 'error') return
  else if(typeof args[0] === 'string')
    args[0] = `[ ${type.toUpperCase()} ] ${args[0]}`

  LOG_TYPES.indexOf(type) !== -1
    ? console[type](...args)
    : console.dir(...args, type)
}

isTest && (module.exports.getShowLogs = () => SHOW_LOGS)
