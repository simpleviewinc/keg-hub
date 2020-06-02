const { Logger } = require('KegLog')
const { throwTaskFailed } = require('./throwTaskFailed')

/**
 * Prints CLI unknown task when task can not be found
 * @param {string} repoName - Name of the repo we were looking for
 *
 * @returns {void}
 */
const throwNoRepo = (repoName) => {

  Logger.empty()
  Logger.error(`Unknown repository => ${repoName}`)
  Logger.green(`Please ensure you are using a repository known to the keg-cli`)
  Logger.empty()

  throwTaskFailed()
}

module.exports = {
  throwNoRepo
}