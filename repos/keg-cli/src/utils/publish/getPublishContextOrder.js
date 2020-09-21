const { get } = require('@keg-hub/jsutils')
const { generalError } = require('../error/generalError')


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


module.exports = {
  getPublishContextOrder
}