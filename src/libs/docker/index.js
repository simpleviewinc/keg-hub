module.exports = {
  ...require('./addComposeFiles'),
  ...require('./buildDockerCmd'),
  ...require('./buildDockerMounts'),
  ...require('./dockerError'),
  ...require('./getBuildArgs'),
  ...require('./getBuildTags'),
  ...require('./getContext'),
  ...require('./getDockerArgs'),
  ...require('./getVirtualIP'),
  ...require('./getDockerMachineEnv')
}