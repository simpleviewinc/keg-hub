const { Logger } = require('KegLog')
const { spawnCmd } = require('KegProc')
const { ask } = require('@keg-hub/ask-it')
const { getHubRepos } = require('../hub/getHubRepos')
const { versionService } = require('./versionService')
const { get, deepMerge } = require('@keg-hub/jsutils')
const { generalError } = require('../error/generalError')
const { confirmExec } = require('../helpers/confirmExec')

const getPublishContext = (globalConfig, context, publishArgs) => {
  // Get the publish context from the globalConfig, and merge with passed in publish args
  return deepMerge(
    {
      tasks: {
        install: true,
        test: true,
        build: true,
        version: true,
        publish: true,
      }
    },
    get(globalConfig, `publish.${context}`),
    publishArgs
  )
}

const getPublishContextOrder = (repos, publishContext, { context }) => {
  const publishOrder = (publishContext || get(globalConfig, `publish.${context}`)).order

  !publishOrder && generalError(`Publish context order ${context} does not exist!`)

  const indexRepos = repos.reduce((toPublish, repo) => {
    const publishIndex = publishOrder.indexOf(get(repo, 'package.name'))
    return publishIndex === -1
      ? toPublish
      : { ...toPublish, [publishIndex]: repo }
  }, {})

  // Get the indexes and sort them to get the correct order
  // Then get the repo for that index and return it
  return Object.keys(indexRepos).sort()
    .map(index => {
      return indexRepos[index]
    })
}

const confirmPublish = async context => {
  const resp = await ask.confirm(`Confirm publish with config ${context}?`)
  if(resp) return true
  
  Logger.warn(`Publish with config ${context} cancelled!`)
  process.exit(0)
}

const runYarnScript = async (publishContext, repo, script) => {
  logFormal(repo, `Running yarn ${script.trim()}...`)

  // Run the yarn script from the package.json of the repo
  const scriptRep = await spawnCmd(
    `yarn ${script.trim()}`.trim(),
    { cwd: repo.location },
    false
  )

  scriptRep && publishError(publishContext, repo, script)

  return true
}

const logFormal = (repo, message) => {
  Logger.empty()
  Logger.highlight(``, `[${repo.repo.toUpperCase()}]`, message)
  Logger.empty()
}

const publishError = (publishContext, repo, fail, message) => {
  Logger.error(`Error publishing context ${publishContext.name}!`)
  Logger.error(`Repo ${repo.repo} failed when running ${fail}!`)
  message && Logger.message(message)
  process.exit(0)
}

const runPublishContext = (toPublish, repos, params={}, publishContext) => {
  const { install, test, build, version, publish } = publishContext.tasks
  
  return toPublish.reduce(async (toResolve, repo) => {
    const updated = await toResolve
    logFormal(repo, `Running publish service`)

    // Install all dependencies
    install && await runYarnScript(publishContext, repo, `install`)

    // Run the repo's tests
    test && await runYarnScript(publishContext, repo, `test`)

    // Build the repo
    build && await runYarnScript(publishContext, repo, `build`)

    // Update the version of the repo
    version && await versionService(
      { params: { ...params, repo, repos }},
      publishContext
    )

    // Publish to NPM
    publish && await runYarnScript(publishContext, repo, `publish`)

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