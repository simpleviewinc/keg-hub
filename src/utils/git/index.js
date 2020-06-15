
module.exports = {
  ...require('./buildGitSSH'),
  ...require('./getGitKey'),
  ...require('./getGit'),
  ...require('./getGitPath'),
  ...require('./getGitUrl'),
  ...require('./getRemoteUrl'),
  ...require('./getGitConfigItem'),
  ...require('./printGitBranches'),
  ...require('./gitKeyExists')
}