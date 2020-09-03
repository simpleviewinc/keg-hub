const { get } = require('@keg-hub/jsutils')
const { askForPackage } = require('./askForPackage')
const { formatPackage } = require('./formatPackage')
const { getAllPackages } = require('./getAllPackages')
const { PACKAGE_TYPES } = require('KegConst/packages')
const { getContainerConst } = require('../docker/getContainerConst')
const { throwPackageError } = require('../error/throwPackageError')
const TEST_ENV = process.env.NODE_ENV === 'test'

/**
 * Gets the package that matches the context for the image name
 * @param {Array<Object>} packages - all packages to choose from
 * @param {String} context - the docker image context
 * @param {String} tap - Name of the tap, when context is 'tap'
 * @return {Object} package - an object with keys: image, owner, repo, versions, nameWithOwner
 */
const packageFromContext = (packages, context, tap) => {
  // Get the imageContext from the passed in context
  // Use `keg$-{context}` if no image context name can be found
  const imageContext = getContainerConst(context, `env.image`, `keg-${context}`)

  // Find the pages base on the image name and image context
  return packages.find(p => {
    const [ _, imageName ] = p.nameWithOwner.split('/')
    // Check if the image name matches the imageContext
    // Or if the image is named after the tap,
    // Or if the repo is named after the tap
    return imageName === imageContext ||
      imageName === tap ||
      p.repo === tap
  })
}

/**
 * Gets the package based on the passed in params, user and type
 * @param {Object} params - Key/Value pair passed in from the terminal
 * @param {String} user - Who the package belongs to
 * @return {Object} type - Type of package to get
 */
const getPackage = async ({ params, user, type }) => {
  const { context, repo, tap } = params

  // TODO: If a tap is passed in 
  // Add method to pull tap git information from a linked tap
  // Then use that info to find the right package

  // get all the docker packages available for the context / user
  const rawPackages = await getAllPackages({
    user,
    params,
    __TEST__: TEST_ENV,
    packageType: get(PACKAGE_TYPES, `.${ type.toUpperCase() }`, type)
  })

  // Format the packages then get all the packages for the repo, if --repo was passed in
  // Also check for a tap, to see if a tap matches the package repo || image
  const packages = rawPackages
    .map(formatPackage)
    .filter(package => ( !repo || repo === package.repo ) || (tap && tap === package.repo))

  // Get the package that matches the context
  // If nothing can be found, then ask which package to use
  const package = context &&
    packageFromContext(packages, context, tap) ||
    await askForPackage(packages, user)

  // Ensure we have a package to return
  return package || throwPackageError(`No package found that matches context "${context}"`)

}



module.exports = {
  getPackage
}