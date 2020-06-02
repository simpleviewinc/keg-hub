const { Logger } = require('KegLog')
const { throwTaskFailed } = require('./throwTaskFailed')

const throwWrongPassword = (extraMessage) => {

  extraMessage && Logger.info(extraMessage)
  Logger.error(`\n You entered an invalid password!`)
  Logger.empty()

  throwTaskFailed()

}

module.exports = {
  throwWrongPassword
}