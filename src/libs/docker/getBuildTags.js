const { isArr } = require('jsutils')

/**
 * Finds the tag option in the passed in options array
 * Formats found tags option into docker format
 * @param {string} name - Name of the container being built
 * @param {Array} options - Options passed from the command line
 * @param {string} [dockerCmd=''] - Docker command to add mounts to
 *
 * @returns {string} - Formatted string of tags for docker
 */
const getBuildTags = (name, options, dockerCmd='') => {

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

  return tags && tags.length
    ? `${dockerCmd} -t ${name}:` + tags.join(` -t ${name}:`).trim()
    : dockerCmd

}

module.exports = {
  getBuildTags
}