module.exports = {
  ...require('./api'),
  ...require('./addComposeFiles'),
  ...require('./buildDockerCmd'),
  ...require('./buildDockerMounts'),
  ...require('./dockerError'),
  ...require('./getBuildArgs'),
  ...require('./getBuildTags'),
  ...require('./getDockerArgs'),
  ...require('./getVirtualIP'),
  ...require('./getDockerMachineEnv'),
}