const { Logger } = require('KegLog')

const throwNoFileExists = (filePath, extraMessage) => {
  
  extraMessage && Logger.info(extraMessage)
  Logger.error(`\n No file exists at path ${filePath}.\n`)
  Logger.empty()

  throw new Error(`Task failed!`)
}

module.exports = {
  throwNoFileExists
}