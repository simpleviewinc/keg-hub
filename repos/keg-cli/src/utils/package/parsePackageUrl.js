
/**
 * Parse a package url into named parts
 * @function
 * @example
 * parsePackageUrl('docker.pkg.github.com/lancetipton/keg-core/keg-core:1591977796609')
 * @param {string} url - Package URL to be parsed
 *
 * @returns {Object} - Parse package url as key value pairts
 */
const parsePackageUrl = (url='') => {
  const [ provider, account, repo, imageTag ] = url.split('/')
  const [ image, tag ] = imageTag.split(':')

  return { account, image, provider, repo, tag }
}

module.exports = {
  parsePackageUrl
}