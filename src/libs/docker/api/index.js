const { logOutput } = require('./helpers')

module.exports = {
  ...require('./commands'),
  logOutput: logOutput,
  image: require('./image'),
  container: require('./container'),
  machine: require('./machine'),
}