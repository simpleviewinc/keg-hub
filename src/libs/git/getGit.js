const { limbo, reduceObj, isFunc } = require('jsutils')
const { GIT_SSH_COMMAND } = require('KegConst')

/**
 * Pipes the git command output to stdout/stderr
 * @param {*} git - Simple-Git module
 *
 * @returns {void}
 */
const gitOutputHandler = git => {
  git.outputHandler((command, stdout, stderr) => {
    stdout.pipe(process.stdout)
    stderr.pipe(process.stderr)
  })
}

/**
 * Adds ssh arguments to all git calls
 * @param {*} git - Simple-Git module
 *
 * @returns {void}
 */
const setupGitSSH = (git) => {
  git.env('GIT_SSH_COMMAND', GIT_SSH_COMMAND)
}

/**
 * Loads simple-git for a git directory
 * @param {string} gitRepoDir - Directory to load simple-git for
 * @param {boolean} log - If output should be piped to stdout / stderr
 *
 * @returns {Object} - Loads simple-git module
 */
const loadSimpleGit = (gitRepoDir, log) => {
  const git = require('simple-git/promise')(gitRepoDir)
  setupGitSSH(git)
  log && gitOutputHandler(git)

  return git
}

/**
 * Converts all simple-git functions into a limbo function from jsutils
 * @param {Object} obj - object to add limbo to child functions
 *
 * @returns {Object} - Object with all functions wrapped with limbo
 */
const limboify = obj => {
  return reduceObj(obj, (key, val, updated) => {
    if(!isFunc(val)) return updated

    function withLimbo(...args){ return limbo(val.apply(obj, args)) }
    updated[key] = withLimbo.bind(obj)

    return updated
  }, {})
}

/**
 * Loads the simple-git module, then wraps all functions of simple-git with limbo
 * @param {string} gitRepoDir - Directory to load simple-git for
 * @param {boolean} log - If output should be piped to stdout / stderr
 *
 * @returns Object with all simple-git functions wrapped with limbo
 */
const getGit = (gitRepoDir, log) => {
  return limboify(loadSimpleGit(gitRepoDir, log))
}

module.exports = {
  getGit
}