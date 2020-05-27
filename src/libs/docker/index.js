module.exports = {
  ...require('./api'),
  ...require('./compose'),
  ...require('./buildDockerCmd'),
  ...require('./buildDockerMounts'),
  ...require('./getBuildArgs'),
  ...require('./getBuildTags'),
  ...require('./getDockerArgs')
}