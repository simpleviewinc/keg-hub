
let SHOW_LOGS
let METH_DEF = 'dir'
let PREFIX = 'type'
const LOG_TYPES = [
  'error',
  'info',
  'log',
  'dir',
  'warn',
]
const isTest = process.env.NODE_ENV === 'test'

/**
 * Turns logs on || off
 * Set the default log method
 * Add a prefix to all log message
 * @param  { boolean } log - log values
 * @param  { string } methDef - default log method
 * @param  { string } prefix - string to add to all logs
 * @return { void }
 */
export const setLogs = (log, methDef, prefix) => {
  SHOW_LOGS = log
  METH_DEF = methDef || METH_DEF || 'dir'
  PREFIX = prefix || PREFIX || 'type'
}


export const reset = () => {
  SHOW_LOGS = undefined
  METH_DEF = 'dir'
  PREFIX = 'type'
}

/**
 * Logs a string to the inspector, uses the last argument to determine the log type
 * @param  { array } args - to be passed to the log call
 * @return { void }
 */
export const logData = (...args) => {
  if(!args.length) return
  
  let type = args.length === 1 ? METH_DEF : args.pop()
  if(!SHOW_LOGS && type !== 'error') return
  else if(typeof args[0] === 'string'){
    if(PREFIX === 'type')
      args[0] = `[ ${type.toUpperCase()} ] ${args[0]}`
    else if(PREFIX)
      args[0] = `${PREFIX} ${args[0]}`
  }

  LOG_TYPES.indexOf(type) !== -1
    ? console[type](...args)
    : console.dir(...args, type)
}

isTest && (module.exports.getShowLogs = () => SHOW_LOGS)
