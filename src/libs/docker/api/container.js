const { dockerCmd} = require('./helpers')
const { isArr, toStr, isStr } = require('jsutils')

/**
 * Calls the docker api and gets a list of current containers
 * @function
 * @param {Object} params - arguments used to modify the docker api call
 *
 * @returns {Array} - JSON array of containers
 */
const list = (params={}) => {
  const { opts } = params

  return dockerCmd({
    ...params,
    opts: ['container', 'ls', '-a'].concat(
      isArr(opts) ? opts : isStr(opts) ? opts.split(' ') : []
    )
  })
}

module.exports = {
  list 
}