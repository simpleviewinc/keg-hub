
module.exports = {
  ...require('./buildGlobalTaskAlias'),
  ...require('./buildDocContextCmd'),
  ...require('./buildDockerImage'),
  ...require('./buildDockerLogin'),
  ...require('./buildContainerContext'),
  ...require('./buildTaskAlias'),
  ...require('./buildTapContext'),
  ...require('./checkBuildImage'),
}