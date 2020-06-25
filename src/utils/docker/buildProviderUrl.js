const { throwNoRepo } = require('../error/throwNoRepo')
const { buildDockerLogin } = require('../builders/buildDockerLogin')
const { getRepoName } = require('../globalConfig/getRepoName')
const { getGlobalConfig } = require('../globalConfig/getGlobalConfig')

/**
 * Builds the provider url based on the docker login creds
 * @param {Object} image - Docker API image object
 * @param {Object} args - args Object passed to the Task calling this method
 *
 * @returns {string} - Url of the docker registry provider
 */
const buildProviderUrl = async (image, args) => {
  const { params } = args

  // Build the docker login object to get the url to push the image as well as the user
  const login = await buildDockerLogin(params)

  // Get the repo name, if the image is base, then use keg-core
  login.repo = getRepoName(image.repository)
  !login.repo && throwNoRepo(image.repository)

  const namespace = params.namespace && login.namespace || `${ login.user }/${ login.repo }`

  return `${ login.providerUrl }/${ namespace }`
}

module.exports = {
  buildProviderUrl
}