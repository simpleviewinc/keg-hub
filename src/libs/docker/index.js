module.exports = {
  ...require('./buildDockerCmd'),
  ...require('./getVolumeMounts'),
  ...require('./dockerError'),
  ...require('./getBuildTags'),
}