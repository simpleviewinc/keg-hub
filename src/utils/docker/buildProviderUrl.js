const { throwNoRepo } = require('KegUtils/error')
const { buildDockerLogin } = require('KegUtils/builders/buildDockerLogin')
const { getRepoName } = require('KegUtils/globalConfig/getRepoName')

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
  const loginArgs = await buildDockerLogin(params)

  // Get the repo name, if the image is base, then use keg-core
  loginArgs.repo = getRepoName(image.repository)
  !loginArgs.repo && throwNoRepo(image.repository)

  return `${ loginArgs.providerUrl }/${ loginArgs.user }/${ loginArgs.repo }`
}

module.exports = {
  buildProviderUrl
}