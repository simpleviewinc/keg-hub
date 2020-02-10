const FS = require('./fs')
const Rimraf = require('./rimraf')
const paths = require('./paths')
const configs = require('./configs')
const webResolver = require('./base/webResolver')
const options = { config: configs.config, kegPath: paths.kegPath, tapPath: paths.tapPath }

module.exports = {
  FS,
  Rimraf,
  webResolver,
  ...paths,
  ...configs,
  options
}
