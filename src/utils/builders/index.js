
module.exports = {
  ...require('./buildGlobalTaskAlias'),
  ...require('./buildDockerImage'),
  ...require('./buildDockerLogin'),
  ...require('./buildLocationContext'),
  ...require('./buildTaskAlias'),
  ...require('./buildTapContext'),
}