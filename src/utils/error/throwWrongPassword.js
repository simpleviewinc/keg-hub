const { Logger } = require('KegLog')

const throwWrongPassword = (extraMessage) => {

  extraMessage && Logger.info(extraMessage)
  Logger.error(`\n You entered an invalid password!`)
  Logger.empty()

  throw new Error(`Task failed!`)

}

module.exports = {
  throwWrongPassword
}