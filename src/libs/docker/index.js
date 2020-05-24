module.exports = {
  ...require('./api'),
  ...require('./compose'),
  ...require('./buildDockerCmd'),
  ...require('./buildDockerMounts'),
  ...require('./getBuildTags'),
  ...require('./getDockerArgs')
}