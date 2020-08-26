const { Logger } = require('KegLog')
const { Repo } = require('./repo')
const { Remote } = require('./remote')
const { Branch } = require('./branch')
const { gitSSHEnv, buildCmdOpts } = require('./helpers')
const { gitCli } = require('./commands')

class Git {

  constructor(options){
    this.branch = new Branch(this, options)
    this.repo = new Repo(this, options)
    this.remote = new Remote(this, options)

    options.sshKey && this.setSSHKey(options.sshKey)
  }

  /**
  * Sets ssh options to the GIT_SSH_COMMAND env
  * @memberof Git
  * @param {Object} cmdOpts - Options to pass to the spawnCmd
  *
  * @returns {void}
  */
  setSSHKey = keyPath => {
    if(!keyPath)
      return Logger.warn(`git.setSSHKey requires a path to the ssh key as the first argument!`)

    this.ssh = gitSSHEnv(keyPath)
  }

  /**
  * Force cleans a repos changes
  * @memberof Git
  * @param {Object} cmdOpts - Options to pass to the spawnCmd
  *
  * @returns {void}
  */
  reset = async cmdOpts => {
    await gitCmd(`git clean -f .`, buildCmdOpts(cmdOpts, args))
    return gitCmd(`git reset --hard`, buildCmdOpts(cmdOpts, args))
  }

}

const git = new Git({})

module.exports = {
  Git,
  git
}