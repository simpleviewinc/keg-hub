const { Logger } = require('KegLog')

/**
 * Add remote to a git repo
 * @param {string} remote - Name of the remote
 * @param {string} url - Url of the remote
 *
 * @returns {*} - Response of the addRemote method
 */
const addRemote = (remote, url) => {
  Logger.pair(`Adding git remote`, `${remote} => ${url}`)
  // Add remote repo url as origin to repo
  return simpleGitPromise.addRemote(remote, url)
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
 * Git remote add task
 * @param {Object} args - arguments passed from the runTask method
 * @param {string} args.command - Initial command being run
 * @param {Array} args.options - arguments passed from the command line
 * @param {Object} args.tasks - All registered tasks of the CLI
 * @param {Object} globalConfig - Global config object for the keg-cli
 *
 * @returns {void}
 */
const remoteAdd =  async args => {
  console.log(`---------- Remote Add ----------`)
  const { params } = args
  const { remote, url } = params

  // TODO: Update to use libs/git
  // const gitUrl = buildGitUrl(url)
  // const [ err, data ] = await limbo(addRemote(remote, url))
  // return err ? false : true

}

module.exports = {
  add: {
    name: 'add',
    alias: [ 'a' ],
    action: remoteAdd,
    description: 'Add a remote from a git',
    example: 'keg git remote add <options>',
    options: {
      remote: {
        description: 'Name of the git remote. ( origin )',
        default: 'origin'
      },
      url: {
        description: 'Url of the git remote',
        required: true,
      }
    }
  }
}