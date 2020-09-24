const { Logger } = require('KegLog')
const { spawnCmd } = require('KegProc')
const { ask } = require('@keg-hub/ask-it')
const { get } = require('@keg-hub/jsutils')
const { getHubRepos } = require('../hub/getHubRepos')
const { versionService } = require('./versionService')
const { generalError } = require('../error/generalError')
const { runRepoScript } = require('../hub/runRepoScript')
const { throwPublishError } = require('../error/throwPublishError')
const { getPublishContext } = require('../publish/getPublishContext')
const { getPublishContextOrder } = require('../publish/getPublishContextOrder')


const confirmPublish = async context => {
  const resp = await ask.confirm(`Confirm publish with config ${context}?`)
  if(resp) return true
  
  Logger.warn(`Publish with config ${context} cancelled!`)
  process.exit(0)
}

const logFormal = (repo, message) => {
  Logger.empty()
  Logger.highlight(``, `[${repo.repo.toUpperCase()}]`, message)
  Logger.empty()
}

const runGitCmd = (cmd, location) => {
    // Run the yarn script from the package.json of the passed in location
  return spawnCmd(
    `git ${cmd.trim()}`,
    { cwd: location },
    false
  )
}

const runPublishContext = (toPublish, repos, params={}, publishContext) => {
  const {
    install,
    test,
    build,
    version,
    publish,
    access='public',
    message,
  } = publishContext.tasks

  if(!toPublish.length) return Logger.warn(`No repos found to publish for context ${publishContext.name}`)

  return toPublish.reduce(async (toResolve, repo) => {
    const updated = await toResolve

    // Update the version of the repos
    const { newVersion } = version
    ? await versionService(
        { params },
        { publishContext, repo, repos }
      )
    : {}

    logFormal(repo, `Running publish service`)

    // Callback when an error is throw for a repo script
    const scriptError = script => () => throwPublishError(publishContext, repo, script)

    // Install all dependencies
    install && await runRepoScript(repo, `install`, scriptError(`install`))

    // Run the repo's tests
    test && await runRepoScript(repo, `test`, scriptError(`test`))

    // Build the repo
    build && await runRepoScript(repo, `build`, scriptError(`build`))

    // Publish to NPM
    publish && await runRepoScript(repo, `publish --access ${access}`, scriptError(`publish`))

    const gitBranchName = `${repo.repo}:${newVersion || 'build-&-publish'}`
    const gitRemoteName = `origin`
    // Create a new branch for the repo and version
    await runGitCmd(`checkout -b ${gitBranchName}`, repo.location)

    // Add the build changes
    await runGitCmd(`add .`, repo.location)

    // Commit the changes
    message = get(publishContext, 'tasks.message', `Updating ${repo.repo} to version ${version}!`)
    await runGitCmd(`commit -m \"${message}\"`, repo.location)

    // Push the branch to github
    await runGitCmd(`push ${gitRemoteName} ${gitBranchName}`, repo.location)

    // Add the update to updated, so we know this repo was published
    updated.push(repo)

    return updated
  }, Promise.resolve([]))
}

const publishService = async (args, publishArgs) => {
  const { params, globalConfig } = args
  const { context, version } = params

  await confirmPublish(context)

  // Get all repos / package.json
  const repos = await getHubRepos({
    ...params,
    sync: true,
    context: 'all',
    full: true,
  })

  !repos && generalError(`No keg-hub repos could be found!`)

  // Get the publish context from the globalConfig, and merge with passed in publish args
  const publishContext = getPublishContext(globalConfig, context, publishArgs)

  // Get all the repo's to be published
  const toPublish = getPublishContextOrder(repos, publishContext, params)

  // Update the version of the repos, and 
  await runPublishContext(toPublish, repos, params, publishContext)

}

module.exports = {
  publishService
}