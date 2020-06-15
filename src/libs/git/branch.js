const { mapObj, reduceObj } = require('jsutils')
const { gitCli } = require('./commands')


class Branch {

  constructor(git, options){
    this.git = git
    this.options = options
  }

  /**
  * Gets all git branches for the passed in location
  * @param {string} location - Location where the git command should be run
  *
  * @returns {Array} - All git branches
  */
  list = async (location=process.cwd(), options) => {
    const branches = await gitCli({
      opts: [ 'git', 'branch' '-v', '--all', '--no-color', '--no-abbrev' ],
      ...options,
    }, {}, location)
    
    return branches
  }

  /**
  * Gets the current branch as an object from the passed in branches
  * @param {*} { branches } - Git object response from simple-git module
  *
  * @returns {Object} - Current branch object
  */
  current = (location=process.cwd(), branches) => {
    branches = branches || await this.list(location)
    return branches && reduceObj(branches, (key, value, found) => {
      return !found && value && value.current ? value : found
    }, null)
  }

}


module.exports = {
  Branch,
}