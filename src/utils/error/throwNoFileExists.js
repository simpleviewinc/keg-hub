const { Logger } = require('KegLog')

const throwNoFileExists = (filePath, extraMessage) => {
  
  extraMessage && Logger.info(extraMessage)
  Logger.error(`\n File path does not exist at ${filePath}.\n`)
  Logger.empty()

  throw new Error(`Task failed!`)
}

module.exports = {
  throwNoFileExists
}