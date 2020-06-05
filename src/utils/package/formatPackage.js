const path = require('path')

/**
 * @param {Object} package - github package object as returned by the graphql github api
 * @return {Object} package - an object with keys: image, owner, repo, versions, nameWithOwner
 *  - image {String}: the name of the docker image 
 *  - owner {String}: the owner/account of the package
 *  - repo {String}: the name of the repo the package was submitted to
 *  - versions {Array}: array of available versions. Each item is an object with { id, version } props
 */
const formatPackage = package => {
  const [ owner, image ] = package.nameWithOwner.split('/')
  const versions = package.versions.nodes
  const repo = package.repository.name
  const packagePath = path.join(owner, repo, image)

  return {
    image,
    owner,
    repo,
    versions,
    path: packagePath,
    nameWithOwner: package.nameWithOwner,
  }
}


module.exports = {
  formatPackage
}