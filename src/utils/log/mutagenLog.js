const { Logger } = require('KegLog')

const mutagenLog = (start='', highlight='', end='') => {
  Logger.log(`\n ${ start }`, Logger.colors.cyan(highlight), end)
  Logger.empty()
}

module.exports = {
  mutagenLog
}
