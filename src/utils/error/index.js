module.exports = {
  ...require('./generalError'),
  ...require('./throwDockerCreds'),
  ...require('./throwExitError'),
  ...require('./throwGitCmd'),
  ...require('./throwNoRepo'),
  ...require('./throwNoAction'),
  ...require('./throwNoConfigPath'),
  ...require('./throwNoFileExists'),
  ...require('./throwNoGitBranch'),
  ...require('./throwNoTask'),
  ...require('./throwNoTapLink'),
  ...require('./throwRequired'),
  ...require('./throwWrap'),
  ...require('./throwWrongPassword'),
}