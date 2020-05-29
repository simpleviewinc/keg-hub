
module.exports = {
  ...require('./buildDockerLogin'),
  ...require('./buildLocationContext'),
  ...require('./buildTaskAlias'),
  ...require('./buildTapContext'),
}