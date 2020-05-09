module.exports = {
  ...require('./addComposeFiles'),
  ...require('./buildDockerCmd'),
  ...require('./dockerError'),
  ...require('./getBuildArgs'),
  ...require('./getBuildTags'),
  ...require('./getDockerArgs'),
  ...require('./buildDockerMounts'),
  ...require('./getVirtualIP'),
}