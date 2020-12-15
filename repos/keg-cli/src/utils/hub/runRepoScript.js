const { Logger } = require('KegLog')
const { runYarnScript } = require('../helpers/runYarnScript')

/**
 * Runs a specific script from the repo
 * 
 * @function
 * @param {Object} repo 
 * @param {string} script - name of the script in package.json
 * @param {Function} errorCb - called if the script throws or fails
 * @param {Boolean} log - show log message or not
 * 
 * @return {Boolean} - whether  the call was successful or not
 */
const runRepoScript = (repo, script, errorCb, log) => {
  log && Logger.log(`Running yarn ${script.trim()} for repo ${repo.repo} ...`)

  // Run the yarn script from the package.json of the repo
  return runYarnScript(
    repo.location,
    script,
    errorCb,
    false
  )
}


module.exports = {
  runRepoScript
}