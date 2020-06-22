const { getGlobalConfig } = require('./getGlobalConfig')

const getRepoPath = (container, tap) => {
  const globalConfig = getGlobalConfig()
  return container !== 'tap'
    ? getPathFromConfig(globalConfig, container)
    : getTapPath(globalConfig, tap)
}