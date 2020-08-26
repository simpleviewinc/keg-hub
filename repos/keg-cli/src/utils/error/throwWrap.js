const { Logger } = require('KegLog')


const throwWrap = (...message) => {
  (() => {

    Logger.empty()
    Logger.error(`\n ${message.join('\n ')}\n`)
    Logger.empty()

    throw new Error(`Task failed!`)
  })()
}

module.exports = {
  throwWrap
}