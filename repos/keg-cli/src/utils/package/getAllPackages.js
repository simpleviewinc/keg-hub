const axios = require('axios')
const { get, limbo, keyMap } = require('@svkeg/jsutils')
const { generalError } = require('KegUtils/error')
const { buildDockerLogin } = require('KegUtils/builders/buildDockerLogin')
const { getRepoName } = require('KegUtils/globalConfig/getRepoName')
const { getAllPackagesMock } = require('KegMocks/github/api')

/**
 * Builds the headers, with bearer token to make the github API call to 
 * @param {Object} [headers={}] - Headers to use in the query
 * @param {string} token - Github API token to authorize the user
 *
 * @returns {Object} - Built request headers
 */
const buildHeaders = (headers={}, token) => {
  return {
    ...headers,
    Accept: 'application/vnd.github.v3+json',
    Authorization: `bearer ${ token }`
  }
}

/**
 * Builds the query, with the user to make the github API
 * @param {string} user - Github user
 * @param {string} type - package type (@see constants/packages/types.js
 * @param {number} amount - Amount of packages to return in the reponse
 *
 * @returns {Object} - Built request query
 */
const buildQuery = (user, type, amount=20) => {
  const packageTypeQuery = type ? ` packageType: ${ type },` : ''

  // NOTE: this includes preview-stage queries for the github api. 
  // This is bound to change and most of these are already deprecated.
  // Expect to need to update this soon.
  return {
    query : `{
      user(login: "${ user }") {
        registryPackagesForQuery(first: ${ amount },${packageTypeQuery} query:"is:private") {
          totalCount nodes {
            repository {
              name
            }
            nameWithOwner versions(first: ${ amount }) {
              nodes {
                id
                version
              }
            }
          }
        }
      }
    }`
  }
}

/**
 * Makes api calls to Github, and pulls in docker packages for a users
 * @param {Object} args - Arguments passed from the parent task
 *
 * @returns {Array} - Found github docker packages
 */
const getAllPackages = async args => {
  const { params, packageType, amount, user } = args
  const { token, user: localDockerUser } = await buildDockerLogin(params)

  const [ err, resp ] = args.__TEST__
    ? await getAllPackagesMock()
    : await limbo(axios({
        url: 'https://api.github.com/graphql',
        method: 'post',
        headers: buildHeaders({}, token),
        data: buildQuery(
          user || localDockerUser,
          packageType,
          amount
        )
      }))

  // even if there wasn't an error thrown by the axios call directly, the api might have reported 
  // errors related to the graphql query inside resp.data.errors
  const responseErrors = get(resp, 'data.errors', [])

  return err
    ? generalError(err.message)
    : responseErrors.length
      ? responseErrors.map(err => generalError(err.message))
      : get(resp, `data.data.user.registryPackagesForQuery.nodes`) || []
}

module.exports = {
  getAllPackages,
}

/*

// ---- Get github packages for organization ----

curl -X POST \
-H "Accept: application/vnd.github.v3+json" \
-H "Authorization: bearer TOKEN" \
-d '{"query":"{ organization(login: \"OWNER\") { registryPackagesForQuery(first: 10, query:\"is:private\") { totalCount nodes { nameWithOwner versions(first: 10) { nodes { id version } } } } }}"}' \ https://api.github.com/graphql

*/