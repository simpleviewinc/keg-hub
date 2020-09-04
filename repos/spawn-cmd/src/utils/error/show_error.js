const { logData } = require('@keg-hub/jsutils')

module.exports =  (err, exit) => {
  err.message && logData(err.message, 'error')
  err.stack && logData(err.stack, 'error')

  // Exit on error
  exit && process.exit(1)
}