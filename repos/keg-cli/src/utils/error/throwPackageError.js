const { Logger } = require('KegLog')
const { throwTaskFailed } = require('./throwTaskFailed')

const throwPackageError = (...message) => {
  Logger.error(`\n Package Error: ${ message.join(' ') }\n`)
  Logger.empty()

  throwTaskFailed()
}

module.exports = {
  throwPackageError
}