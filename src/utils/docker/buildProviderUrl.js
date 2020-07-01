const { buildDockerLogin } = require('../builders/buildDockerLogin')
const { getRepoName } = require('../globalConfig/getRepoName')

/**
 * returns the full github url based on the params
 * @param {string} repository
 * @param {string} tap 
 * @param {string} user 
 * 
 * @returns {Promise<string>}
 */
const getUserUrl = async (repository, tap, user) => {

  // Get the repo name, if the image is base, then use keg-core
  const repo = await getRepoName(repository, tap)
  return `${ user }/${ repo }`
}

/**
 * Builds the provider url based on the docker login creds
 * @param {Object} image - Docker API image object
 * @param {Object} args - args Object passed to the Task calling this method
 *
 * @returns {Promise<string>} - Url of the docker registry provider
 */
const buildProviderUrl = async (image, args) => {
  const { params } = args

  // Build the docker login object to get the url to push the image as well as the user
  const login = await buildDockerLogin(params)
  
  const namespace = params.namespace 
    ? login.namespace 
    : await getUserUrl(image.repository, params.tap, login.user)

  return `${ login.providerUrl }/${ namespace }`
}

module.exports = {
  buildProviderUrl
}