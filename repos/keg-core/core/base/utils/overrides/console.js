import './platform'

const isProduction = () => typeof __DEV__ === 'undefined' && !global.__DEV__
// const isServer = typeof window === 'undefined'

const IGNORE_WARN = [
  'Remote debugger is in a background tab which may cause apps to perform slowly',
  'Require cycle:',
  'Warning: componentWillMount',
  'Warning: componentWillReceiveProps',
]

const oldLog = console.log
console.log = function() {
  return !isProduction() && oldLog.apply(console, arguments)

  // if(isServer) return oldLog.apply(console, arguments)

  // let trace
  // try{ throw new Error('|--[SV-KEG-TRACE-KEY]--|') }
  // catch(e){
  //   trace = e
  //     .stack
  //     .split('\n')
  //     .map(line => line.trim())
  //     .slice(2, 3)
  //     .pop()
  //     .replace(/^at/, '')
  // }

  // !isProduction() && oldLog.apply(console, Array.from([ `${trace}\n\n`, ...arguments, '\n\n' ]))
}

// Overwrite the main console.warn to add log helper info, and ignore warnings
const oldWarn = console.warn
console.warn = function() {
  if (isProduction()) return

  const args = Array.from(arguments)

  // Check if the warning should be ignored
  if (
    typeof args[0] === 'string' &&
    IGNORE_WARN.some(inWarn => args[0].startsWith(inWarn))
  )
    return

  // Call the original warning log
  oldWarn.apply(console, [ ...args ])
}
