
const { Logger } = require('KegLog')
const { throwTaskFailed } = require('./throwTaskFailed')

const throwMissingFile = (app, injectPath, fileName) => {
  Logger.error(`The app ${ app } has a container folder, but it's missing a ${ fileName } file.\n`)
  Logger.highlight(`Ensure the file`, fileName, `Exists at ${ injectPath }!`)

  throwTaskFailed()
}

module.exports = {
  throwMissingFile
}