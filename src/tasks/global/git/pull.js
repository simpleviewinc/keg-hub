
const gitPullRepo = () => {
  console.log(`--- gitPullRepo ---`)
}

module.exports = {
  name: 'pull',
  action: gitPullRepo,
  description: `Pulls a git repository from github!`,
  example: 'keg pull <options>'
}