
module.exports = {
  ...require('./buildGlobalTaskAlias'),
  ...require('./buildDockerLogin'),
  ...require('./buildLocationContext'),
  ...require('./buildTaskAlias'),
  ...require('./buildTapContext'),
}