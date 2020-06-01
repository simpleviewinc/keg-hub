const { Logger } = require('KegLog')


const throwWrap = (message) => {
  (() => {

    Logger.empty()
    Logger.error(message)
    Logger.empty()

    throw new Error(`Task failed!`)
  })()
}

module.exports = {
  throwWrap
}