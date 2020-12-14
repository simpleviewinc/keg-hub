const path = require('path')
const { Logger } = require('KegLog')
const { executeCmd } = require('KegProc')
const { readFileSync } = require('KegFileSys/fileSys')
const { isFunc, pickKeys } = require('@keg-hub/jsutils')
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
    const rawdata = readFileSync(path.resolve(repoPath, 'package.json'))
    return JSON.parse(rawdata)
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
 * @returns {Object} - Formatted repo information
 */
const buildRepo = (repo, hubReposPath, args) => {
  const { format, callback, full } = args

  const repoPath =  path.join(hubReposPath, repo)
  const package = getPackageJson(repoPath, repo)

  return isFunc(callback)
    ? callback(
        repo,
        package,
        { ...args, location: repoPath, reposPath: hubReposPath }
      )
    : !package
      ? false
      : full
        ? { repo, location: repoPath, package }
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
 * Runs keg-hub commands against repos synchronously
 * @function
 * @param {Object} repos - All repos to run command on
 * @param {Object} hubReposPath - Path to the keg-hub/repos folder
 * @param {Object} args - Passed from the task caller
 *
 * @returns {Array} - Formatted repo information
 */
const runCmdSync = async (repos, hubReposPath, args) => {

  const { context:filter } = args

  return repos.reduce(async (toResolve, repo) => {
      const responses = await toResolve

      const repoData = filter !== 'all' && !repo.includes(filter)
        ? false
        : await buildRepo(repo, hubReposPath, args)
      
      repoData && responses.push(repoData)

      return responses

    }, Promise.resolve([]))

}

/**
 * Runs keg-hub commands against repos asynchronously
 * @function
 * @param {Object} repos - All repos to run command on
 * @param {Object} hubReposPath - Path to the keg-hub/repos folder
 * @param {Object} args - Passed from the task caller
 *
 * @returns {Array} - Formatted repo information
 */
const runCmdAsync = async (repos, hubReposPath, args) => {
  const { context:filter } = args

  const response = await Promise.all(
    repos.reduce((repos, repo) => {

      const repoData = filter !== 'all' && !repo.includes(filter)
        ? false
        : buildRepo(repo, hubReposPath, args)

      return repoData
        ? repos.concat([ repoData ])
        : repos

    }, [])
  )

  return response
}


/**
 * Loads information about the repos in the keg-hub/repos folder
 * @function
 * @param {Object} args - Define how the repos information should be gathered
 * @param {string} args.context - Filter which repos should be returned (keg, retheme, components, etc)
 * @param {Object} args.callback - Callback method to override the default
 * @param {Object} args.format - Repo format the method should respond with
 * @param {Boolean} args.sync - whether to run the cmd synchronously or not
 * @param {Boolean} args.full
 * 
 * @returns {Array} - Group of promises resolving to formatted repo information
 */
const getHubRepos = async (args={}) => {
  const { sync } = args

  const hubReposPath = path.join(getRepoPath('hub'), 'repos')
  const { data, error } = await executeCmd(findSubNodeModules, { cwd: hubReposPath })
  error && generalError(error.stack)

  const repos = data.trim().split('\n')

  return sync
    ? runCmdSync(repos, hubReposPath, args)
    : runCmdAsync(repos, hubReposPath, args)

}

module.exports = {
  getHubRepos
}
