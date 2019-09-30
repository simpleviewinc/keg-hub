const path = require('path')
const tapConstants = require('./tapConstants')

module.exports = () => {
  tapConstants.cacheFiles.map(file => {
    delete require.cache[require.resolve(path.join(__dirname, file))]
  })
}
