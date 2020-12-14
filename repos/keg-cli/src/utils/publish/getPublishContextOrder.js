const { get } = require('@keg-hub/jsutils')
const { generalError } = require('../error/generalError')

/**
 * Gets the publish context repos in order, based on the repos defined in the publish context
 * @function
 * @param {Array} repos - Repos found in the keg-hub
 * @param {Object} publishContext - Object that defines how the repos should be published
 * @param {Object} publishArgs - publish context args passed in from the command line
 *
 * @returns {Array} - Orders list of repos to be published based on order defined in the publishContext
 */
const getPublishContextOrder = (repos, publishContext, { context }) => {
  const publishOrder = (publishContext || get(globalConfig, `publish.${context}`)).order

  !publishOrder && generalError(`Publish context order ${context} does not exist!`)

  const indexRepos = repos.reduce((toPublish, repo) => {
    const publishIndex = Object.values(publishOrder).indexOf(get(repo, 'package.name'))
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