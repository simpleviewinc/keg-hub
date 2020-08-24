const path = require('path')
const { validate, isStr, isObj, get } = require('@svkeg/jsutils')

/**
 * Checks if an item is a string or falsy
 * @param {*} item - Thing to check if it's a string or falsy
 */
const strOrNothing = item => !item || isStr(item)

/**
 * Builds the url used to pull the docker image from the provider/registry
 * @param {Object} options - Items used to build the package Url
 * @param {string} options.provider - registry url, defaults to github docker packages
 * @param {string} options.version - used if defined, otherwise uses branch
 * @param {string} options.branch - name of branch. used only if version is undefined. 
 * @param {string} options.package - Package to build the url from
 * @param {string} options.package.owner - (required) User that owns the package
 * @param {string} options.package.repo - (required) name of repo
 * @param {string} options.package.image - (required) name of container/image to pull (e.g keg-base)
 */
const buildPackageURL = (options={}) => {
  const { version, globalConfig, branch='master', package, provider } = options

  // Validate the options to ensure we can build a valid url
  validate(options, {
    $default: isStr,
    version: strOrNothing,
    branch: strOrNothing,
    globalConfig: isObj,
    package: isObj
  })

  // Get the package data
  const { image, repo, owner } = package

  // Get the account from the package owner || the globalConfig organization name
  const account = owner || get(globalConfig, 'cli.git.orgName', 'simpleviewinc')

  // Create a url like: docker.pkg.github.com/simpleviewinc/keg-core/keg-base:1.3.2
  return path.join(provider, account, repo, image) + `:${version || branch}`
}


module.exports = {
  buildPackageURL
}