module.exports = {
  ...require('./generalError'),
  ...require('./throwDockerCreds'),
  ...require('./throwExitError'),
  ...require('./throwGitCmd'),
  ...require('./throwNoAction'),
  ...require('./throwNoConfigPath'),
  ...require('./throwNoFileExists'),
  ...require('./throwNoTask'),
  ...require('./throwNoTapLink'),
  ...require('./throwRequired'),
  ...require('./throwWrap'),
  ...require('./throwWrongPassword'),
}