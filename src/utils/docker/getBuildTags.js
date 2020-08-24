const { isArr, get } = require('@svkeg/jsutils')
const { DOCKER } = require('KegConst/docker')

/**
 * Finds the tag option in the passed in options array
 * Formats found tags option into docker format
 * @param {string} name - Name of the container being built
 * @param {Array} options - Options passed from the command line
 * @param {string} [dockerCmd=''] - Docker command to add mounts to
 *
 * @returns {string} - Formatted string of tags for docker
 */
const getBuildTags = ({ dockerCmd='', version='', ...params }) => {
  const { container, context, image, options, } = params

  // Try to ensure we have a version for the build
  version = version ||
    ( container && get(DOCKER, `CONTAINERS.${ context.toUpperCase() }.ENV.VERSION`, '') )

  // try to ensure we have an image name for the build
  const nameTag = image || context

  // Loop the options and look for any tags
  const tags = isArr(options) && options
    .reduce((tags, option, index) => {

      option === '-t' || option === '--tag' || option === 'tag'
        ? tags.push(options[index + 1])
        : option.indexOf('t=') === 0 ||
          option.indexOf('tag=') === 0 ||
          option.indexOf('tags=') === 0
            ? (() => {
                const optSplit = option.split('=')
                optSplit.shift()
                tags = tags.concat(optSplit[0].split(','))
              })()
            : null

      return tags
    }, [])

  // Build the default tags
  let cmdWithDefTags = `${dockerCmd} -t ${nameTag} -t ${nameTag}:latest`

  // If there's is a version add it as a tag
  if(version) cmdWithDefTags += ` -t ${nameTag}:${version}`

  return tags && tags.length
    ? `${ cmdWithDefTags } -t ${nameTag}:${ tags.join(` -t ${nameTag}:`).trim() }`
    : cmdWithDefTags

}

module.exports = {
  getBuildTags
}