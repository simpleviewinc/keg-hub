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
const { getPublishContext } = require('../publish/getPublishContext')
const { getPublishContextOrder } = require('../publish/getPublishContextOrder')
const { getVersionUpdate, getValidSemver } = require('KegUtils/version')

/**
 * Validates the package command and runs it if exists
 * @param {Object} repo 
 * @param {Boolean} runTask - to run the task or not
 * @param {string} scriptName - name of the script cmd to run
 * @param {Function} errorCB - called when the script being executed throws an error
 * 
 * @returns {Void}
 */
const validatePublishTask = async (repo, runTask, scriptName, errorCB) => {
  logFormal(repo, `${runTask ? 'Running' : 'Skipping'} yarn ${scriptName}...`)
  if (runTask) {
    exists(get(repo, `package.scripts.${scriptName}`))
      ? await runRepoScript(repo, scriptName, errorCB)
      : Logger.warn(`could not find script '${scriptName}', skipping`)
  }
}

/**
 * Attempts to rollback changes made to a repo using git
 * @function
 * @param {Object} repo - Repo to be rolled back
 * @param {Object} publishArgs - Define the state or the repo being published
 * @param {string} publishArgs.currentBranch
 * @param {string} publishArgs.newVersion - i.e '1.0.0'
 * @param {Boolean} publishArgs.wasPublished - whether yarn publish was executed
 * @param {{number:Number, name:string}} publishArgs.step - current step information
 * @param {boolean} [confirm=true] - Should the updates be confirmed by the user
 *
 * @returns {Void}
 */
const rollbackChanges = async (repo, publishArgs, confirm=true) => {
  const { originalBranch, currentBranch, newVersion, wasPublished, step } = publishArgs

  logFormal(repo, `Publish service failed on step ${step.number}!\nRolling back publish changes...`)

  const doGitReset = confirm
    ? await ask.confirm(`Confirm running a full git reset. ALL CHANGES WILL BE LOST`)
    : true

  if(!doGitReset) {
    Logger.warn(`Canceling git reset. Rollback did not complete. Current git branch is not clean!`)
    process.exit(0)
  }
  if(step.number > 3 && wasPublished)
    return Logger.warn(`\nCan not rollback changes, version ${newVersion} was already published to NPM!\n`)

  if(!currentBranch)
    return Logger.warn(`\nCan not rollback changes, Original git branch does not exist!\n`)

  // Do a full git reset
  logFormal(repo, `Resetting git to branch ${currentBranch}`)
  await runGitCmd(`reset --hard HEAD`, repo.location)
  await runGitCmd(`clean -fd`, repo.location)

  if(currentBranch !== originalBranch){
    // checkout the original branch
    await runGitCmd(`checkout ${originalBranch}`, repo.location)
    // delete the generated release branch
    await runGitCmd(`branch -D ${currentBranch}`, repo.location)
  }

  logFormal(repo, `Finished rolling back changes.`)

  process.exit(0)
}

/**
 * Asks the user to confirm publishing the repo
 * @function
 * @param {string} context - Repo context to be published to be rolled back
 *
 * @returns {Promise<Boolean>} true if the repo context should be published
 */
const confirmPublish = async context => {
  const resp = await ask.confirm(`Confirm publish with config ${context}?`)
  if(resp) return true
  
  Logger.warn(`Publish with config ${context} cancelled!`)
  process.exit(0)
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
 * @param {Object} publishArgs - Define the state or the repo being published
 * @param {Object} updated - Any repos that have already been published, within the publishContext
 * @param {Object} params - Options passed from the command line
 * 
 * @returns {array} - Passed in updated array, with the passed in repo added
 */
const gitBranchCommitUpdates = async (repo, publishArgs, updated, params) => {

  const { newVersion, context, remote='origin', currentBranch } = publishArgs
  const { dryrun, confirm=true } = params

  try {
    logFormal(repo, `Running commit service`)
    // Build a new branch for the version
    publishArgs.step = { number: 5, name: 'git-branch' }
    const newBranch = `${context}-${newVersion}-${await git.repo.commitHash({ location: repo.location })}`

    // Create a new branch for the repo and version
    publishArgs.step = { number: 6, name: 'git-checkout' }
    if (newBranch !== currentBranch) {
      await runGitCmd(`switch -c ${newBranch}`, repo.location)
      publishArgs.currentBranch = newBranch
    }

    // Add the build changes
    publishArgs.step = { number: 7, name: 'git-add' }
    await runGitCmd(`add --all`, repo.location)

    // Commit the changes
    publishArgs.step = { number: 8, name: 'git-commit' }
    const message = `Updating ${context} to version ${newVersion}`
    !dryrun && await runGitCmd(`commit -m \"${message}\"`, repo.location)

    // Push the branch to github
    publishArgs.step = { number: 9, name: 'git-push' }
    !dryrun && await runGitCmd(`push ${remote} ${newBranch}`, repo.location)
  }
  catch(err){
    Logger.error(`Error creating git branch`, err.stack)
    await rollbackChanges(repo, publishArgs, confirm)
  }

  // Add the update to updated, so we know this repo was published
  return updated.concat([ {...repo, ...publishArgs} ])

}

/**
 * Runs a set of yarn commands to test, build and publish a repo
 * @function
 * @param {Object} repo - Repo object containing meta-data about the current repo
 * @param {Object} publishContext - Defines how the repo should be published
 * @param {Object} publishArgs - Define the state or the repo being published
 * @param {Object} params - Options passed from the command line
 * 
 * @returns {Boolean} - True if the repo was published to npm
 */
const repoYarnCommands = async (repo, publishContext, publishArgs, params) => {

  const {
    test,
    build,
    publish,
    access='public',
  } = publishContext.tasks
  const { newVersion } = publishArgs
  const { dryrun, confirm=true } = params 

  try {
    // Callback when an error is thrown for a repo script
    const scriptError = script => async () => {
      Logger.error(`Error running script ${script}`)
      await rollbackChanges(repo, publishArgs, confirm)
      return false
    }
    // Run the repos tests
    publishArgs.step = { number: 2, name: 'test' }
    await validatePublishTask(repo, test, 'test', scriptError('test'))

    // Build the repo
    publishArgs.step = { number: 3, name: 'build' }
    await validatePublishTask(repo, build, 'build', scriptError('build'))

    // Publish to NPM
    publishArgs.step = { number: 4, name: 'publish' }
    const shouldPublish = publish && !dryrun
    logFormal(repo, `${shouldPublish ? 'Running' : 'Skipping'} yarn publish...`)
    const isPublished = shouldPublish && await runRepoScript(repo, `publish --access ${access} --new-version ${newVersion}`, scriptError(`publish`))

    return isPublished

  }
  catch(err){
    Logger.error(`Error publishing ${repo.repo}`)
    await rollbackChanges(repo, publishArgs, confirm)

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
 * @returns {Array|Boolean} - All updated/published repos or false if something failed
 */
const publishRepos = async (globalConfig, toPublish, repos, params={}, publishContext) => {
  const { commit=false } = publishContext.tasks
  const { versionNumber, context, confirm=true } = params

  if(!toPublish.length)
    return Logger.warn(`No repos found to publish for context ${publishContext.name}`)

  const publishArgs = {}
  // set the original branch
  const branch = await git.branch.name({location: repos[0].location})
  publishArgs.originalBranch = branch

  // current branch gets updated in gitBranchCommitUpdates 
  publishArgs.currentBranch = branch

  return toPublish.reduce(async (toResolve, repo, index) => {
    const updated = await toResolve

    try {
      publishArgs.context = context

      // copy over new dependent build files to current repo node_modules
      index > 0 && copyBuildFiles(repo, toPublish.slice(0, index))

      publishArgs.step = { number: 1, name: 'version' }
      // Update the version of the repos
      await versionService(
        { params, globalConfig, versionNumber },
        { publishContext, repo, repos }
      )

      publishArgs.newVersion = versionNumber
      logFormal(repo, `Running publish service`)
      publishArgs.isPublished = await repoYarnCommands(repo, publishContext, publishArgs, params)

      // Check if we should do the git updates, or just return the updated array
      return commit
        ? gitBranchCommitUpdates(repo, publishArgs, updated, params)
        : updated.concat([ {...repo, ...publishArgs} ])

    }
    catch(err){
      console.log(err)
      Logger.error(`Error publishing ${repo.repo}`)
      return rollbackChanges(repo, publishArgs, confirm)
    }

  }, Promise.resolve([]))
}

/**
 * Loads a publishContext from the globalConfig based on the passed in arguments
 * <br/>Attempts to publish all repos defined in teh loaded publishContext
 * @function
 * @param {Object} args - All arguments passed to the Keg-CLI publish task
 * @param {Object} args.params - Options passed from the command line
 * @param {Object=} publishArgs - options passed in to override the publishContext
 * 
 * @returns {Array=} - returns all updated repos
 */
const publishService = async (args, publishArgs) => {
  const { params, globalConfig } = args
  const { context, confirm=true, version } = params

  // If running without a confirm, then check that we have a version
  !confirm &&
    (!exists(version) || !version) &&
    generalError(`Can not auto-publish without a valid semver version!`)

  confirm && await confirmPublish(context)

  const newVersion = !version
    ? await getValidSemver()
    : version

  // Get all repos / package.json
  const repos = await getHubRepos({
    context: 'all',
    full: true,
  })

  !repos && generalError(`No keg-hub repos could be found!`)

  // Get the publish context from the globalConfig, and merge with passed in publish args
  const publishContext = getPublishContext(globalConfig, context, publishArgs)

  // Get all the repo's to be published
  const toPublish = getPublishContextOrder(repos, publishContext, params)

  // get the actual version number
  const versionNumber = await getVersionUpdate(toPublish[0], newVersion, publishContext, confirm)

  if (!versionNumber) return null
  get(params, 'dryrun') && Logger.subHeader('dry-run: Will NOT Publish or Push to GitHub')

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
  return await publishRepos(globalConfig, toPublish, repos, {...params, versionNumber}, publishContext)
}

module.exports = {
  publishService
}