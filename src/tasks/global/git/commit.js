
const gitCommitRepo = () => {
  console.log(`--- gitCommitRepo ---`)
}

module.exports = {
  name: 'commit',
  action: gitCommitRepo,
  description: `Commit changes to a repo.`,
  example: 'keg commit <options>'
}