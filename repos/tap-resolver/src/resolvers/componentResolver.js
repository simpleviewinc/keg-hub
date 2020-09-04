const webResolver = require('./webResolver')
const contentResolver = require('./contentResolver')
const { get } = require('@keg-hub/jsutils')
const { validateApp } = require('../helpers')

/**
 * Checks if the path is a root index file
 * <br/>Loads the custom index file name from the config
 * @param  { Object } appConfig - Active tap config object
 * @param  { string } resolvedPath - Full path to file being imported
 *
 * @return { string|boolean } - Root index file || false
 */
const isIndexPath = (appConfig, resolvedPath) => {
  const folderRootConfig = 'keg.tapResolver.paths.folderRootFile'
  const rootFileName = get(appConfig, folderRootConfig, 'index')

  return resolvedPath.split('/').pop() === rootFileName ? rootFileName : false
}

/**
 * Returns new string without the trailing forward slash '/', if it is present on str
 * @param {string} str
 */
const withoutTrailingSlash = str => {
  if (!str || !str.length) return str
  return str[str.length - 1] === '/' ? str.substring(0, str.length - 1) : str
}

/**
 * Gets the path to the alias, from the full path of the required file is a root index file
 * @example - KegUtils/helpers/object/index.js
 * @param  { string } resolvedPath - Full path to file being imported
 * @param  { string } sourcePath - Original path with alias
 * @param  { string } indexPath - Path to the index file ( Normally just 'index.js' )
 *
 * @return { string } - Path to the alias, NOT the actual required file path
 */
const getRootPath = (resolvedPath, sourcePath, indexPath) => {
  const [ , ...sourceFileParts ] = sourcePath.split('/')
  const sourceFilePath = sourceFileParts.concat([indexPath]).join('/')

  const result = resolvedPath.replace(sourceFilePath, '')

  return withoutTrailingSlash(result)
}

/**
 * Gets the path to the alias, from the full path of the required file
 * @example - KegUtils/helpers/object.js
 * @param  { string } resolvedPath - Full path to file being imported
 * @param  { string } sourcePath - Original path with alias
 *
 * @return { string } - Path to the alias, NOT the actual required file path
 */
const getAliasPath = (resolvedPath, sourcePath) => {
  const [ , ...sourceFileParts ] = sourcePath.split('/')
  const partsAsPath = sourceFileParts.join('/')
  const lastPartIndex = resolvedPath.lastIndexOf(partsAsPath)

  const result = resolvedPath.slice(0, lastPartIndex)

  return withoutTrailingSlash(result)
}

/**
 * Helper to pass the correct arguments to the webResolver
 * <br/>Called from rollup's node-resolver plugin
 * @param  { Object } appConfig - Active tap config object
 * @param  { Object } aliasMap - Key Value pair of mapped alises to paths or functions
 * @param  { Object } content - Content built tap config run through the tap-resolver
 * @param  { string } type - folder to search for file i.e. components/assets
 *
 * @return { string|any } - Response from the webResolver method ( path to alias )
 */
module.exports = (appConfig, aliasMap, content, type) => {
  validateApp('_', appConfig)

  return (alias, current, sourcePath) => {
    const resolvedPath = webResolver(sourcePath, current, {
      ...content,
      alias: { [alias]: contentResolver(appConfig, aliasMap, content, type) },
    })

    if (!sourcePath.includes('/')) return resolvedPath

    const indexPath = isIndexPath(appConfig, resolvedPath)

    const result = indexPath
      ? getRootPath(resolvedPath, sourcePath, indexPath)
      : getAliasPath(resolvedPath, sourcePath)

    return result
  }
}
