require('module-alias/register')

const path = require('path')
const { ask } = require('@svkeg/ask-it')
const { Logger } = require('KegLog')
const homeDir = require('os').homedir()
const { encrypt } = require('KegCrypto')
const packageJson = require('KegRoot/package.json')
const { getGitUrl } = require('KegUtils/git/getGitUrl')
const { requireFile } = require('KegFileSys/fileSys')
const { throwNoTask } = require('KegUtils/error/throwNoTask')
const cliJson = require('KegRoot/scripts/setup/cli.config.json')
const { throwExitError } = require('KegUtils/error/throwExitError')
const { defPaths } = require('KegUtils/globalConfig/defaultConfig')
const { deepMerge, mapObj, reduceObj, get, set } = require('@svkeg/jsutils')
const { saveGlobalConfig } = require('KegUtils/globalConfig/saveGlobalConfig')
const { GLOBAL_CONFIG_FOLDER, GLOBAL_CONFIG_FILE } = require('KegConst/constants')


// Cache hold for repo map of name to repo name
const gitRepoMap = {}

// KEG CLI paths that can not be overwritten
const NO_CUSTOM = [ 'cli', 'containers', 'keg', 'proxy' ]

/**
 * Helper to try and load the current global config
 *
 * @returns {Object} globalConfig object
 */
const loadCurrentGlobalConfig = async () => {
  try {

    // Load the global config file
    const { data, location } = requireFile(GLOBAL_CONFIG_FOLDER, GLOBAL_CONFIG_FILE)
    if(!data) return false

    // If we get data, then the global config already exists
    // So ask if we should overwrite it
    const overwrite = data && await ask.confirm(
      `Global Config already exists. Would like to overwite it?`
    )

    // If we are overwriting, return the global config
    // Otherwise log and exit
    return overwrite
      ? data
      : (() => {
          Logger.spaceMsg(`  Exiting Global Config setup!`)
          process.exit(0)
        })()

  }
  catch(e){
    Logger.error(e.stack)
    return false
  }
}

/**
 * Helper to get the name of a repo from the path
 *
 * @returns {string} repo - default path of a repo
 */
const getRepoName = repo => {
  const split = repo.split('/')
  const name = split.pop()
  return name || getRepoName(split.join('/'))
}

/**
 * Mapping of repos to paths and names
 * @object
 */
const defRepos = reduceObj(defPaths, (key, defPath, defRepoInfo) => {
  // Create a repo map for git
  gitRepoMap[key] = getRepoName(defPath) 
  // Return the mapped repo object
  return {
    ...defRepoInfo,
    [key]: { name: gitRepoMap[key], location: defPath },
  }
}, {})


/**
 * Helper to log an error when caught
 * @param {Object} error - Error object that was caught
 *
 * @returns {void}
 */
const logError = (error) => {
  error.stack
    ? Logger.error(error.stack)
    : error.message
      ? Logger.error(error.message)
      : Logger.error(error)
}

/**
 * Gets the git user information
 * @param {Object} globalConf - CLI config object being built
 *
 * @returns {Object} globalConf - CLI config object being built
 */
const setupGit = async (globalConf) => {
  const gitObj = deepMerge({}, get(globalConf, `cli.git`, { repos: {} }))

  gitObj.user = await ask.input(`Please enter your github user name`)
  const token = await ask.password(`Please enter your github token`)
  token && ( gitObj.key = encrypt(token) )

  gitObj.sshKey = await ask.input({
    message: `Please enter the path to your github ssh key`,
    default: path.join(homeDir, `.ssh/github`),
  })
  gitObj.orgName = await ask.input({
    message: `Please enter your github organization`,
    default: get(globalConf, `cli.git.orgName`),
  })

  // Add the repo map of local names to git repo names
  set(gitObj, 'repos', gitRepoMap)

  // Add the git object to the globalConfig
  set(globalConf, `cli.git`, gitObj)

  return globalConf
}

/**
 * Builds the keg repo paths on the local machine
 * @param {Object} globalConf - CLI config object being built
 *
 * @returns {Object} globalConf - CLI config object being built
 */
const setupRepos = async (globalConf) => {

  // Gets all custom paths from the user
  const repoPaths = await reduceObj(defPaths, async (key, defPath, customPaths) => {
    const usePaths = await customPaths

    // Check if the path is allowed to be overwritten
    if(NO_CUSTOM.indexOf(key) !== -1){
      usePaths[key] = defPath
      return usePaths
    }

    const { name, location } = defRepos[key]

    // Ask the user where they want it installed
    usePaths[key] = await ask.input({
      message: `Enter the path for ${ name } to be installed?`,
      default: location
    })

    return usePaths

  }, Promise.resolve({}))

  // Add the repoPaths to the globalConfig
  set(globalConf, `cli.paths`, repoPaths)

  return globalConf
}

/**
 * Installs the keg repo paths to the local machine
 * @param {Object} globalConf - CLI config object being built
 *
 * @returns {Object} globalConf - CLI config object being built
 */
const installRepos = async (globalConf) => {
  // Should we install the repos now?
  const install = await ask.confirm({
    message: `Would you like to install all keg repos now?`,
    default: true
  })

  if(!install) return

  // Gets all custom paths from the user
  const gitConf = get(globalConf, `cli.git`)

  const repoPaths = await mapObj(gitConf.repos, async (key, name, didClone) => {
    const wasCloned = await didClone

    // Check if the repo should be cloned
    if(NO_CUSTOM.indexOf(key) !== -1) return true

    const repoUrl = getGitUrl({ globalConf, name })

    // TODO: Add code to clone the repo locally
    // const [ cloneErr, cloned ] = await git.repo.clone(repoUrl, location)
    // if(cloneErr) return logError(cloneErr)

  }, Promise.resolve(true))

}

/**
 * Sets up the docker provider for the CLI
 * @param {Object} globalConf - CLI config object being built
 *
 * @returns {Object} globalConf - CLI config object being built
 */
const setupDocker = async (globalConf) => {
  const dockerObj = deepMerge({}, get(globalConf, `docker`, {}))

  dockerObj.providerUrl = await ask.input({
    message: `Enter your docker provider url`,
    default: get(globalConf, `docker.providerUrl`),
  })

  dockerObj.user = await ask.input({
    message: `Enter your docker provider user name`,
    default: get(globalConf, `cli.git.user`)
  })

  const isGitHub = dockerObj.providerUrl === get(globalConf, `docker.providerUrl`)
  const hasGitToken = Boolean(get(globalConf, `cli.git.key`))

  if(!isGitHub || !hasGitToken){
    const defToken = `<"Git Token" if provided>`
    const token = await ask.password({
      message: `Enter your docker provider token`,
      default: defToken,
    })
    token && token !== defToken && ( dockerObj.token = token )
  }

  // Add the docker object to the globalConfig
  set(globalConf, `docker`, dockerObj)

  return globalConf
}

/**
 * Sets up the CLI settings
 * @param {Object} globalConf - CLI config object being built
 *
 * @returns {Object} globalConf - CLI config object being built
 */
const setupSettings = async (globalConf) => {
  const settingsObj = deepMerge({}, get(globalConf, `cli.settings`, {}))
  
  // Get the command to open a code editor
  settingsObj.editorCmd = await ask.input({
    message: `Enter command used in the terminal to open your IDE`,
    default: 'code'
  })

  // Should the full stack trace be shown on error
  settingsObj.errorStack = await ask.confirm({
    message: `Show stacktrace on CLI error?`,
    default: get(globalConf, `cli.settings.errorStack`, false)
  })

  // Setup task options ask for required
  settingsObj.task.optionsAsk = await ask.confirm({
    message: `Ask for the value of missing required options when running a task`,
    default: get(globalConf, `cli.settings.task.optionsAsk`, true)
  })

  // Setup docker settings
  settingsObj.docker = settingsObj.docker || {}

  // Should we auto run actions without asking?
  settingsObj.docker.preConfirm = await ask.confirm({
    message: `Auto confirm docker actions?`,
    default: get(globalConf, `cli.settings.docker.preConfirm`, true)
  })

  // NOTE: Most don't know what this is, so just use the default
  // If someone wants to turn it off, then they can update their config
  // Use the new experiment buildkit option for docker build
  // settingsObj.docker.buildKit = await ask.confirm({
  //   message: `Use docker buildkit for building docker images?`,
  //   default: get(globalConf, `cli.settings.docker.buildKit`, true)
  // })

  // Should we auto force docker actions?
  settingsObj.docker.force = await ask.confirm({
    message: `Auto force docker actions? Example: "docker image rm core --force"`,
    default: get(globalConf, `cli.settings.docker.force`, true)
  })

  // Should we auto force docker actions?
  settingsObj.docker.defaultLocalBuild = await ask.confirm({
    message: `Default all docker image builds to use local repositories instead of pulling from a remote.`,
    default: get(globalConf, `cli.settings.docker.defaultLocalBuild`, true)
  })

  // Add the selected settings to the global config
  set(globalConf, `cli.settings`, settingsObj)

  return globalConf

}

/**
 * Saves the global config to the local machine
 * @param {Object} globalConf - CLI config object being built
 *
 * @returns {Object} globalConf - CLI config object being built
 */
const saveConfig = async (globalConf) => {
  return saveGlobalConfig(globalConf)
}

/**
 * Asks the user a few questions to help build out the global config
 *
 * @returns {Object} - Default global config based off user answers
 */
const configSetup = async () => {
  try {

    Logger.header(`Keg Cli Global Config Setup`)

    // Try to get the current global config
    const curGlobalConfig = await loadCurrentGlobalConfig()

    // Create a copy of the default cliJson config
    const globalConf = curGlobalConfig || deepMerge({
      version: packageJson.version,
      name: packageJson.name,
      displayName: "Keg CLI",
    }, cliJson)

    // Setup git config
    await setupGit(globalConf)

    // Setup local repo paths
    await setupRepos(globalConf)

    // Setup the docker provider config
    await setupDocker(globalConf)

    // Setup the KEG-CLI settings
    await setupSettings(globalConf)

    // Install the keg git repos from github
    // await installRepos(globalConf)

    // Finally save the global config
    await saveConfig(globalConf)

    Logger.success(`Global Config was saved!`)

    return globalConf

  }
  catch(err){
    throwExitError(err)
  }

}

// Check if script should be auto-run when running form terminal
!module.parent && configSetup()

module.exports = { configSetup }