import './platform'
import { isStr } from 'jsutils'

const logMethods = {
  ...console
}

const  { NODE_ENV } = process.env
const IGNORE_WARN = [
  'Remote debugger is in a background tab which may cause apps to perform slowly',
  'Require cycle:',
  'Require cycles',
  'Warning: componentWillMount',
  'Warning: componentWillReceiveProps',
  'react-native-screens is not fully supported',
]

const isProduction = NODE_ENV === 'production' ||
  ( typeof __DEV__ === 'undefined' && !global.__DEV__ )

const overrideConsole = type => {
  function override(...args) {
    // Check if the warning should be ignored
    !isProduction &&
      isStr(args[0]) &&
      // Check if the warning exists in the ignore warning array
      !IGNORE_WARN.some(ingnorMessage => args[0].trim().startsWith(ingnorMessage)) &&
      // Call the original warning log
      logMethods[type].apply(console, [ ...args ])
  }

  return override
}

// Overwrite the main console.warn to add log helper info, and ignore warnings
console.log = overrideConsole('log')
console.info = overrideConsole('info')
console.warn = overrideConsole('warn')
