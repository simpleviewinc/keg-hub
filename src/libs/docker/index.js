module.exports = {
  ...require('./addValueFiles'),
  ...require('./buildDockerCmd'),
  ...require('./dockerError'),
  ...require('./getBuildArgs'),
  ...require('./getBuildTags'),
  ...require('./getDockerArgs'),
  ...require('./buildDockerMounts'),
  ...require('./getVirtualIP'),
}