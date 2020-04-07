module.exports = {
  ...require('./buildDockerCmd'),
  ...require('./getBuildArgs'),
  ...require('./getDockerArgs'),
  ...require('./getDirsToMount'),
  ...require('./getVolumeMounts'),
  ...require('./dockerError'),
  ...require('./getBuildTags'),
}