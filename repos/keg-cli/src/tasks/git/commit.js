const { Logger } = require('KegLog')

const setupGitConfig = (git, email, user) => {
  // add local git config like username and email
  git.addConfig('user.email', email)
  git.addConfig('user.name', user)
}

/**
 * Builds Git url to push commit to
 * @param {string} user - Name of the user attached to the commit
 * @param {string} token - Git token for auth with the provider
 * @param {string} repo - Name of the repo to push the commit to
 *
 * @returns {string} - Built git url
 */
const buildGitUrl = (user, token, repo) => {
  return `https://${token}@github.com/${user}/${repo}`
}

/**
 * Creates a new git commit
 * @param {Object} args - arguments passed from the runTask method
 * @param {string} args.command - Initial command being run
 * @param {Array} args.options - arguments passed from the command line
 * @param {Object} args.tasks - All registered tasks of the CLI
 * @param {Object} globalConfig - Global config object for the keg-cli
 *
 * @returns {void}
 */
const doCommit = async (git, args) => {
  const { params } = args
  const { files, message, branch, remote } = params

  // Add the files for the commit
  const { errAdd, successAdd } = await git.add(files || '.')
  errAdd && generalError(`Failed to stage files for git commit`, errAdd)

  // Commit files as Initial Commit
  const { errCommit, successCommit } = await git.commit(message)
  errCommit && generalError(`Failed to create git commit`, errCommit)

  const { errPush, successPush } = await git.push(remote, branch)
  errPush && generalError(`Failed to push commit to git remote`, errPush)

  Logger.success(`Git commit and push to remote successful!`)

}


/**
 * Git commit task
 * @param {Object} args - arguments passed from the runTask method
 * @param {string} args.command - Initial command being run
 * @param {Array} args.options - arguments passed from the command line
 * @param {Object} args.tasks - All registered tasks of the CLI
 * @param {Object} globalConfig - Global config object for the keg-cli
 *
 * @returns {void}
 */
const gitCommitRepo = async args => {

  // TODO: Update to use libs/git
  // await doCommit(git, args)

}

module.exports = {
  commit: {
    name: 'commit',
    action: gitCommitRepo,
    description: `Commit changes to a repo.`,
    example: 'keg commit <options>'
  }
}
