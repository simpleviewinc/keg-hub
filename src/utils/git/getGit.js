
const getGit = (gitRepoDirectory) => {
  return require('simple-git')(gitRepoDirectory)
}

module.exports = {
  getGit
}