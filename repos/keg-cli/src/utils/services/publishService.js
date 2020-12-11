const { git } = require('KegGitCli')
const { Logger } = require('KegLog')
const { spawnCmd } = require('KegProc')
const { ask } = require('@keg-hub/ask-it')
const { copySync, emptyDirSync } = require('KegFileSys/fileSys')
const { get, exists } = require('@keg-hub/jsutils')
const { getHubRepos } = require('../hub/getHubRepos')
const { versionService } = require('./versionService')
const { generalError } = require('../error/generalError')
const { runRepoScript } = require('../hub/runRepoScript')
const { throwPublishError } = require('../error/throwPublishError')
const { getPublishContext } = require('../publish/getPublishContext')
const { getPublishContextOrder } = require('../publish/getPublishContextOrder')
const { isValidSemver } = require('../version/validateVersion')
/**
 * Attempts to rollback changes made to a repo using git
 * @function
 * @param {Object} repo - Repo to be rolled back
 * @param {Object} publishArgs - Define the state or the repo being published
 *
 * @returns {Void}
 */
const rollbackChanges = async (repo, publishArgs) => {
  const { currentBranch, newVersion, wasPublished, step } = publishArgs

  logFormal(repo, `Publish service failed on step ${step[1]}!\nRolling back publish changes...`)

  const doGitReset = await ask.confirm(`Confirm running a full git reset. ALL CHANGES WILL BE LOST`)
  if(!doGitReset) return Logger.warn(`Canceling git reset. Rollback did not complete. Current git branch is not clean!`)

  if(step[0] > 3 && wasPublished)
    return Logger.warn(`\nCan not rollback changes, version ${newVersion} was already published to NPM!\n`)

  if(!currentBranch)
    return Logger.warn(`\nCan not rollback changes, Original git branch does not exist!\n`)

  // Do a full git reset
  logFormal(repo, `Resetting git to branch ${currentBranch}`)
  await runGitCmd(`reset --hard HEAD`, repo.location)
  await runGitCmd(`clean -fd`, repo.location)

  logFormal(repo, `Finished rolling back changes.`)

  return null
}

/**
 * Asks the user to confirm publishing the repo
 * @function
 * @param {string} context - Repo context to be published to be rolled back
 *
 * @returns {Boolean} true if the repo context should be published
 */
const confirmPublish = async context => {
  const resp = await ask.confirm(`Confirm publish with config ${context}?`)
  if(resp) return true
  
  Logger.warn(`Publish with config ${context} cancelled!`)
  process.exit(0)
}

/**
 * gets a valid semver input (minor, major, patch, 1.0.0, etc.)
 * @function
 *
 * @returns {string} - valid semver value
 */
const getValidSemver = async () => {
  const resp = await ask.input(`Please enter a valid version:`)  
  return isValidSemver(resp) && resp
}

/**
 * Logs a formal message that includes the repos name
 * @function
 * @param {Object} repo - Repo the log is about
 * @param {string} message - Text to be logged
 *
 * @returns {Void}
 */
const logFormal = (repo, message) => {
  Logger.empty()
  Logger.highlight(``, `[${repo.repo.toUpperCase()}]`, message)
  Logger.empty()
}

/**
 * TODO: refactor this to use the Git library
 * Runs a git command in a child process
 * 
 * @function
 * @param {Object} cmd - Command to be run
 * @param {string} location - Location where the command will be run
 *
 * @returns {*} - Response from the git command
 */
const runGitCmd = (cmd, location) => {
  return spawnCmd(
    `git ${cmd.trim()}`,
    { cwd: location },
    false
  )
}

/**
 * TODO: refactor this to use the Git library
 * Runs a set of git commands to create a new branch, commit the changes, and push to a remote
 * 
 * @function
 * @param {Object} repo - Repo object containing meta-data about the current repo
 * @param {Object} publishContext - Defines how the repo should be published
 * @param {Object} publishArgs - Define the state or the repo being published
 * @param {Object} updated - Any repos that have already been published, within the publishContext
 * 
 * @returns {array} - Passed in updated array, with the passed in repo added
 */
const gitBranchCommitUpdates = async (repo, publishContext, publishArgs, updated) => {
  const {
    remote='origin',
    branch,
    message,
  } = publishContext.tasks
  
  const { newVersion } = publishArgs
  
  try {

    // Build a new branch for the version
    publishArgs.step = [ 5, 'git-branch']
    const newBranch = branch || `${repo.repo}-${newVersion || 'build-&-publish'}`
    publishArgs.newBranch = newBranch

    // Create a new branch for the repo and version
    publishArgs.step = [ 6, 'git-checkout']
    await runGitCmd(`checkout -b ${newBranch}`, repo.location)
    publishArgs.currentBranch = newBranch

    // Add the build changes
    publishArgs.step = [ 7, 'git-add']
    await runGitCmd(`add .`, repo.location)

    // Commit the changes
    publishArgs.step = [ 8, 'git-commit']
    message = get(publishContext, 'tasks.message', `Updating ${repo.repo} to version ${newVersion}!`)
    await runGitCmd(`commit -m \"${message}\"`, repo.location)

    // Push the branch to github
    publishArgs.step = [ 9, 'git-push']
    await runGitCmd(`push ${remote} ${newBranch}`, repo.location)
  }
  catch(err){
    Logger.error(`Error creating git branch`, err.stack)
    // Add rollback call here
    await rollbackChanges(repo, publishArgs)
  }

  // Add the update to updated, so we know this repo was published
  updated.push(repo)

  return updated

}

/**
 * Runs a set of yarn commands to test, build and publish a repo
 * @function
 * @param {Object} repo - Repo object containing meta-data about the current repo
 * @param {Object} publishContext - Defines how the repo should be published
 * @param {Object} publishArgs - Define the state or the repo being published
 * 
 * @returns {Boolean} - True if the repo was published to npm
 */
const repoYarnCommands = async (repo, publishContext, publishArgs) => {

  const {
    test,
    build,
    publish,
    access='public',
  } = publishContext.tasks
  const { newVersion } = publishArgs

  try {
    // Callback when an error is thrown for a repo script
    const scriptError = script => async () => {
      // throwPublishError(publishContext, repo, script)
      Logger.error(`Error running script ${script}`)
      await rollbackChanges(repo, publishArgs)

      return false
    }

    // Run the repos tests
    publishArgs.step = [ 2, 'test']
    logFormal(repo, `${test ? 'Running' : 'Skipping'} yarn test...`)
    test && await runRepoScript(repo, `test`, scriptError(`test`))

    // Build the repo
    publishArgs.step = [ 3, 'build']
    logFormal(repo, `${build ? 'Running' : 'Skipping'} yarn build...`)
    build && await runRepoScript(repo, `build`, scriptError(`build`))

    // Publish to NPM
    publishArgs.step = [ 4, 'publish']
    logFormal(repo, `${publish ? 'Running' : 'Skipping'} yarn publish...`)
    publish && await runRepoScript(repo, `publish --access ${access} --new-version ${newVersion}`, scriptError(`publish`))

    return true

  }
  catch(err){
    Logger.error(`Error publishing ${repo.repo}`)
    await rollbackChanges(repo, publishArgs)

    return false
  }

}

/**
 * Copies over new build files to the current repos node_modules
 * @param {Object} currentRepo 
 * @param {Array} repos - array of all repos
 */
const copyBuildFiles = (currentRepo, repos) => {
  logFormal(currentRepo, `Copying dependency build files`)
  repos.map((repo) => {
    const packageName = get(repo, 'package.name')
    // check if current repo's deps contain last repo as dependencies
    if(get(currentRepo, `package.dependencies.${packageName}`)
      || get(currentRepo, `package.peerDependencies.${packageName}`)
      || get(currentRepo, `package.devDependencies.${packageName}`)
    ) {
      // copy over /build folder from previous repo
      const from = `${get(repo, 'location')}/build`
      const to = `${get(currentRepo, 'location')}/node_modules/${packageName}/build`
      emptyDirSync(to)
      copySync(from, to)
    }
  })
}

/**
 * Runs yarn and git commands to publish the repos defined in the publish context
 * @function
 * @param {Object} globalConfig - Global cli config object
 * @param {Array} toPublish - Repos to be published
 * @param {Array} repos - All found repos
 * @param {Object} params - Options passed from the command line
 * @param {Object} publishContext - Object from the global config that defines the repos to be published
 * 
 * @returns {Array} - All updated/published repos
 */
const publishRepos = (globalConfig, toPublish, repos, params={}, publishContext) => {
  const { version, commit=false } = publishContext.tasks

  if(!toPublish.length)
    return Logger.warn(`No repos found to publish for context ${publishContext.name}`)


  return toPublish.reduce(async (toResolve, repo, index) => {
    const updated = await toResolve
    const publishArgs = {}

    try {
      // Get the current git branch
      publishArgs.currentBranch = await git.branch.name({location: repo.location})

      // copy over new dependent build files to current repo node_modules
      index > 0 && copyBuildFiles(repo, toPublish.slice(0, index))

      publishArgs.step = [ 1, 'version']
      // Update the version of the repos
      const { newVersion } = version
        ? await versionService(
            { params, globalConfig },
            { publishContext, repo, repos }
          )
        : {}
      publishArgs.newVersion = newVersion
      logFormal(repo, `Running publish service`)
      publishArgs.success = await repoYarnCommands(repo, publishContext, publishArgs)

      // Check if we should do the git updates, or just return the updated array
      return !publishArgs.success
        ? false
        : commit
          ? gitBranchCommitUpdates(repo, publishContext, publishArgs, updated)
          : updated.concat([ {...repo, ...publishArgs} ])

    }
    catch(err){
      console.log(err)
      Logger.error(`Error publishing ${repo.repo}`)
      return rollbackChanges(repo, publishArgs)
    }

  }, Promise.resolve([]))
}

/**
 * Loads a publishContext from the globalConfig based on the passed in arguments
 * <br/>Attempts to publish all repos defined in teh loaded publishContext
 * @function
 * @param {Object} args - All arguments passed to the Keg-CLI publish task
 * @param {Object} args.params - Options passed from the command line
 * @param {Object} publishArgs - Extra arguments to defined how the repos should be published
 * 
 * @returns {{newVersion:string, repos:Array}} - returns all updated repos and the updated version
 */
const publishService = async (args, publishArgs) => {
  const { params, globalConfig } = args
  const { context, version } = params

  await confirmPublish(context)
  const newVersion = !version
    ? await getValidSemver()
    : version

  // Get all repos / package.json
  const repos = await getHubRepos({
    sync: true,
    context: 'all',
    full: true,
  })

  !repos && generalError(`No keg-hub repos could be found!`)

  // Get the publish context from the globalConfig, and merge with passed in publish args
  const publishContext = getPublishContext(globalConfig, context, publishArgs)

  // Get all the repo's to be published
  const toPublish = getPublishContextOrder(repos, publishContext, params)
  
  // run yarn install on all toPublish repos prior to any package json updates
  // then we can just copy over new build files to their node_modules
  // for cases when: 1. publish == false; 2. possible install delay after publishing to npm
  const { install } = publishContext.tasks
  await Promise.all(toPublish.map(async (repo) => {
    logFormal(repo, `${install ? 'Running' : 'Skipping'} yarn install...`)
    install && await runRepoScript(repo, `install`)
  }))

  // Update the version of the repos, commit and publish based on the publishContext
  // return a list of updated repos
  const updatedRepos = await publishRepos(globalConfig, toPublish, repos, {...params, version: newVersion}, publishContext)

  return {
    repos: updatedRepos,
    publishContext
  }
}

module.exports = {
  publishService
}