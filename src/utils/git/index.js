
module.exports = {
  ...require('./buildGitSSH'),
  ...require('./getGitKey'),
  ...require('./getGitUrl'),
  ...require('./getGitConfigItem'),
  ...require('./gitKeyExists')
}