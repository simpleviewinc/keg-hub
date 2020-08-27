const path = require('path')
const { Logger } = require('KegLog')
const { executeCmd } = require('KegProc')
const { isFunc, pickKeys } = require('@svkeg/jsutils')
const { getRepoPath } = require('../getters/getRepoPath')
const { generalError } = require('../error/generalError')

// TODO: Convert repo object to pretty prints
const convertToPretty = repoObj => {
  
  return repoObj
}

/**
 * Checks the format a repo should be in and converts it
 * <br/>Used to print the repos in easy to read format
 * @function
 * @param {Object} repoObj - Repo object built by the buildRepo method
 * @param {Object} package - The pacakge.json Object for the repo
 * @param {string} format - Format the repoObj should be converted to
 *
 * @returns {*} - repoObj in the converted format
 */
const convertFormat = (repoObj, package, format) => {
  return format === 'pretty'
    ? convertToPretty(repoObj)
    : repoObj
}

/**
 * Helper script to find the sub-repos of the keg-hub
 * @string
 */
const findSubNodeModules = 'find * -maxdepth 0 -type d | grep -Ev \'^(_)|node_modules\''

/**
 * Tries to load the package.json file of a repo
 * <br/>Logs warning if file can not be found
 * @function
 * @param {Object} repoPath - Path to the repo
 * @param {Object} repo - Name of the repo folder
 *
 * @returns {Object} - Loaded package.json object for the repo
 */
const getPackageJson = (repoPath, repo) => {
  try {
    return require(path.resolve(repoPath, 'package.json'))
  }
  catch(error){
    Logger.warn(`Missing package.json file in keg-hub/repos folder "${repo}"!`)
    Logger.info(`Repo "${repo}" will not be included in task execution!`)
    return false
  }
}

/**
 * Builds a repoObj in a default format
 * <br/>Logs warning if file can not be found
 * @function
 * @param {Object} repo - Name of the repo folder
 * @param {Object} hubReposPath - Path to the keg-hub/repos folder
 * @param {Object} args - Passed from the task caller
 * @param {Object} args.format - Repo format the method should respond with
 *
 * @returns {*} - Formatted repo information
 */
const buildRepo = (repo, hubReposPath, { format }) => {

  const repoPath =  path.join(hubReposPath, repo)
  const package = getPackageJson(repoPath, repo)

  return !package
    ? false
    : convertFormat({
        repo,
        location: repoPath,
        ...pickKeys(package, [
          'name',
          'version',
          'description'
        ])
      }, package, format)
}

/**
 * Loads information about the repos in then keg-hub/repos folder
 * @function
 * @param {Object} args - Define how the repos information should be gathered
 * @param {Object} args.context - Filter which repos should be returned
 * @param {Object} args.callback - Callback method to override the default
 * @param {Object} args.format - Repo format the method should respond with
 *
 * @returns {Array} - Group of promises resolving to formatted repo information
 */
const getHubRepos = async (args={}) => {
  const { callback, context:filter } = args

  const hubReposPath = path.join(getRepoPath('hub'), 'repos')
  const { data, error } = await executeCmd(findSubNodeModules, { cwd: hubReposPath })
  cb = isFunc(callback) ? callback : buildRepo

  return error
    ? generalError(error.stack)
    : Promise.all(
        data.trim()
          .split('\n')
          .reduce((repos, repo) => {

            const repoData = filter !== 'all' && !repo.includes(filter)
              ? false
              : cb(repo, hubReposPath, args)

            return repoData
              ? repos.concat([ repoData ])
              : repos

          }, [])
      )

}

module.exports = {
  getHubRepos
}