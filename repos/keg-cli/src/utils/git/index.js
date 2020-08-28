
module.exports = {
  ...require('./buildGitSSH'),
  ...require('./getGitConfigItem'),
  ...require('./getGitKey'),
  ...require('./getGitPath'),
  ...require('./getGitUrl'),
  ...require('./getPublicGitKey'),
  ...require('./getRemoteUrl'),
  ...require('./gitKeyExists'),
  ...require('./printGitBranches'),
}