const { Logger } = require('KegLog')
const { getHubRepos } = require('../hub/getHubRepos')
const { generalError } = require('../error/generalError')
const { spawnCmd } = require('KegProc')
const { get } = require('@keg-hub/jsutils')
const { confirmExec } = require('../helpers/confirmExec')
const { versionService } = require('./versionService')

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

const updateVersions = (toPublish, repos, params, publishContext) => {
  return toPublish.reduce(async (toResolve, repo) => {
    const updated = await toResolve
    const update = await versionService(
      { params: { ...params, repo, repos }},
      publishContext
    )

    update && updated.push(update)

    return updated
  }, Promise.resolve([]))
}

const confirmPublish = async context => {
  return confirmExec({
    confirm: `Confirm publish with config ${context}?`,
    cancel: `Publish with config ${context} cancelled!`,
    preConfirm: true,
    execute: async () => {
      return true
    },
  })
}


const publishService = async (args) => {
  const { params, globalConfig } = args
  const { context, version } = params

  const confirm = await confirmPublish(context)
  if(!confirm) return

  // Get all repos / package.json
  const repos = await getHubRepos({
    ...params,
    sync: true,
    context: 'all',
    full: true,
  })

  !repos && generalError(`No keg-hub repos could be found!`)

  // Get the publish context from the globalConfig
  const publishContext = get(globalConfig, `publish.${context}`)
  !publishContext && generalError(`Publish context ${context} does not exist!`)
  
  // Get all the repo's to be published
  const toPublish = getPublishContextOrder(repos, publishContext, params)

  // Update the version of the repos, and 
  await updateVersions(toPublish, repos, params, publishContext)

}

module.exports = {
  publishService
}