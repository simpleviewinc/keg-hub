
module.exports = {
  ...require('./buildGitSSH'),
  ...require('./getGitKey'),
  ...require('./getGitUrl'),
  ...require('./gitKeyExists')
}