const { checkCall, isStr } = require('@keg-hub/jsutils')
const { gitCli } = require('./commands')
const { formatRemotes } = require('./helpers')


class Remote {

  constructor(git, options){
    this.git = git
    this.options = options
  }

  add = async () => {
    
  }

  /**
  * Formats the gitCli response for remotes into a json object
  * @memberof Remote
  * @function
  * @param {string} location - Location of the repo to get the remotes of
  * @param {object} options - extra git cli options for git remote command
  * @param {object} cmdOpts - Options to pass the child process
  * 
  * @returns {Promise<Array>} - Formatted remote objects
  */
  list = async (location, options, cmdOpts) => {
    const data = await gitCli({
      opts: 'remote -v',
      ...options,
    }, cmdOpts, location)

    return formatRemotes(data)
  }

  prune = async () => {
    
  }


  remove = async () => {
    
  }


}


module.exports = {
  Remote
}