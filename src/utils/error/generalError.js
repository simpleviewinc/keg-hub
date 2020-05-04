const { Logger } = require('KegLog')

const generalError = (...message) => {
  Logger.error(`\n ${message.join('\n ')}\n`)
  throw new Error(`Task failed!`)
}

module.exports = {
  generalError
}