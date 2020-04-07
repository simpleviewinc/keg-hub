module.exports = {
  ...require('./buildDockerCmd'),
  ...require('./getDirsToMount'),
  ...require('./getVolumeMounts'),
  ...require('./dockerError'),
  ...require('./getBuildTags'),
}