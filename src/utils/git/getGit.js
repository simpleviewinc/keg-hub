const { deepMerge } = require('jsutils')
const { buildGitSSH } = require('KegUtils/git/buildGitSSH')
const { getGlobalConfig } = require('KegUtils/globalConfig')
const { limboify } = require('KegUtils/helpers')

const defGitOpts = {
  log: false,
  ssh: true,
}

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
const setupGitSSH = (globalConfig, git) => {
  const sshCmd = buildGitSSH(globalConfig || getGlobalConfig())
  git.env('GIT_SSH_COMMAND', sshCmd)
}

/**
 * Loads simple-git for a git directory
 * @param {string} gitRepoDir - Directory to load simple-git for
 * @param {boolean} log - If output should be piped to stdout / stderr
 *
 * @returns {Object} - Loads simple-git module
 */
const loadSimpleGit = (globalConfig, gitRepoDir, { log, ssh }) => {
  const git = require('simple-git/promise')(gitRepoDir)
  ssh && setupGitSSH(globalConfig, git)
  log && gitOutputHandler(git)

  return git
}


/**
 * Loads the simple-git module, then wraps all functions of simple-git with limbo
 * @param {string} gitRepoDir - Directory to load simple-git for
 * @param {boolean} log - If output should be piped to stdout / stderr
 *
 * @returns Object with all simple-git functions wrapped with limbo
 */
const getGit = (gitRepoDir, globalConfig, options={}, ) => {
  return limboify(loadSimpleGit(
    globalConfig,
    gitRepoDir,
    deepMerge(defGitOpts, options),
  ))
}

module.exports = {
  getGit
}
