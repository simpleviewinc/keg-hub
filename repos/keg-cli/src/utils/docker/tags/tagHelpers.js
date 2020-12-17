const path = require('path')
const { Logger } = require('KegLog')
const { git } = require('KegGitCli')
const { get, isArr } = require('@keg-hub/jsutils')

/**
 * Loops through the tags array, cleans them up, then returns them
 * @type function
 * @param {Array} tags - Custom tags passed from the command line
 *
 * @returns {Array} - Tags to be added to the built image
 */
const tagsFromParams = tags => {
  // Loop the tags and ensure they are not empty strings
  return isArr(tags) && tags.length
    ? tags.reduce((customTags, tag) => {
        const addTag = tag && tag.trim()
        addTag && customTags.push(addTag)

        return customTags
      }, [])
    : []
}

/**
 * Gets the location on the repo having it's image built
 * @type function
 * @param {Object} containerContext - Metadata about the image to be built ( from buildContainerContext helper )
 * @param {Array} loc - Custom location defined from the param object
 *
 * @returns {string} - Found local location of the repo being built
 */
const getLocation = (containerContext, loc) => {
  const contextPath = containerContext && get(containerContext, 'contextEnvs.KEG_CONTEXT_PATH')
  const location = contextPath || loc
  return location || Logger.warn(`Could not build image tag.\nRepo location could not be found!\n`)
}

/**
 * Gets a value from the args data based on the key
 * @type function
 * @param {Object} args - Data that can be used in tags through dynamic keys 
 * @param {Array} key - Name of the key on the args object
 *
 * @returns {*} - Values found for the key on the args object
 */
const getPassedOptionTag = (args={}, key) => {
  return args.params[key]
}

/**
 * Gets the package.json version if it exists at the passed in location from containerContext or params.location
 * @type function
 * @param {Object} containerContext - Metadata about the image to be built ( from buildContainerContext helper )
 * @param {Array} params - Options passed from the command line
 *
 * @returns {Promise[string]} - Current version in the package.json
 */
const getPackageVersionTag = async ({ containerContext, params }) => {
  const location = getLocation(containerContext, params.location)
  if(!location) return false

  try {
    const packageJson = require(path.join(location, 'package.json'))
    if(!packageJson) throw new Error('No package.json')

    return packageJson.version
  }
  catch(err){
    Logger.warn(`Could not build tag from Package.json version.\nFile could not be found at ${location}!\n`)
  }
}

/**
 * Gets a git repos current commit hash or branch name based on the containerContext and location
 * @type function
 * @param {Object} args.containerContext - Metadata about the image to be built from buildContainerContext
 * @param {Array} args.params - Options passed from the command line
 * @param {string} method - Type string data to get from the git repo ( 'commit' === 'commit hash' )
 *
 * @returns {Promise[string]} - Current commit hash or branch name
 */
const getRepoGitTag = ({ containerContext, params }, method) => {
  const location = getLocation(containerContext, params.location)

  return !location
    ? Logger.warn(`Could not build tag from git repo. Location argument not found!\n`)
    : method === 'commit'
      ? git.repo.commitHash({ location })
      : git.branch.name({ location })
}

module.exports = {
  getPassedOptionTag,
  getPackageVersionTag,
  getRepoGitTag,
  tagsFromParams,
}