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

const runPublishContext = (toPublish, repos, params={}, publishContext) => {
  const { install, test, build, version, publish } = publishContext.tasks

  if(!toPublish.length) return Logger.warn(`No repos found to publish for context ${publishContext.name}`)

  return toPublish.reduce(async (toResolve, repo) => {
    const updated = await toResolve

    // Update the version of the repos
    version && await versionService(
      { params },
      { publishContext, repo, repos }
    )

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
    publish && await runRepoScript(repo, `publish`, scriptError(`publish`))

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