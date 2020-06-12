
module.exports = {
  ...require('./buildGlobalTaskAlias'),
  ...require('./buildDocContextCmd'),
  ...require('./buildDockerImage'),
  ...require('./buildDockerLogin'),
  ...require('./buildLocationContext'),
  ...require('./buildTaskAlias'),
  ...require('./buildTapContext'),
}