const { Logger } = require('KegLog')

const generalError = (message) => {

  Logger.error(message)
  Logger.empty()

  throw new Error(`Task failed!`)
}

module.exports = {
  generalError
}