const { get, reduceObj } = require('@svkeg/jsutils')
const { getGlobalConfig } = require('../globalConfig/getGlobalConfig')
const { getGitKey } = require('../git/getGitKey')
const { getGitConfigItem } = require('../git/getGitConfigItem')
const { throwDockerCreds } = require('../error/throwDockerCreds')

/**
 * Validates the login creds to ensure all keys exist
 * @function
 * @param {creds} - Creds passed in from the command line
 * @param {string} creds.provider - The url used to log into the provider
 * @param {string} creds.user - User used to login to the provider
 * @param {string} creds.token - Auth token for the docker registry provider
 *
 * @returns {Object} - The built login creds
 */
const validateLoginCreds = creds => {
  return reduceObj(creds, (key, value, validated) => {
    key !== 'namespace' && !value && throwDockerCreds(creds, key)
    return creds
  }, creds)
}

/**
 * Builds the login creds for a docker registry provider
 * @function
 * @param {creds} - Creds passed in from the command line
 * @param {string} creds.provider - The url used to log into the provider
 * @param {string} creds.user - User used to login to the provider
 * @param {string} creds.token - Auth token for the docker registry provider
 *
 * @returns {Object} - The built login creds
 */
const buildDockerLogin = async ({ user, token, provider, namespace }) => {
  const globalConfig = getGlobalConfig()

  return validateLoginCreds({
    token: token || await getGitKey(globalConfig),
    user: user || get(globalConfig, 'docker.user') || await getGitConfigItem('user.name'),
    providerUrl: provider || get(globalConfig, 'docker.providerUrl'),
    namespace: namespace && get(globalConfig, 'docker.namespace'),
  })

}

module.exports = {
  buildDockerLogin
}