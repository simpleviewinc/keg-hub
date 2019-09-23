const path = require('path')

const allFiles = [
  './buildAliases',
  './buildAssets',
  './buildClientList',
  './buildConstants',
  './getAppConfig',
  './contentResolver',
  './setup',
  './setupClient',
  './webResolver',
]

module.exports = () => {
  allFiles.map(file => {
    delete require.cache[require.resolve(path.join(__dirname, file))]
  })
}
