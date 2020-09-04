const { dockerCli } = require('./commands')
const { isArr, isStr } = require('@keg-hub/jsutils')

/**
 * Calls the docker cli and gets a list of current columes
 * @function
 * @param {Object} args - Arguments used to modify the docker api call
 * @param {string} args.opts - Options used to build the docker command
 * @param {string} args.format - Format of the docker command output
 *
 * @returns {Array} - JSON array of containers
 */
const list = (args={}, opts) => {
  opts = opts || args.opts
  return dockerCli({
    format: args.format || 'json',
    ...args,
    opts: [ `volume`, `ls` ].concat(
      isArr(opts)
        ? opts
        : isStr(opts)
          ? opts.split(' ')
          : []
    )
  })
}


module.exports = {
  list
}