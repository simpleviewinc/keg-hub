const { dockerCmd, compareItems } = require('./helpers')
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

/**
 * Removes a docker container based on passed in toRemove argument
 * @function
 * @param {string} toRemove - Docker container to be removed
 *
 * @returns {string} - Response from the docker cli command
 */
const remove = (toRemove, skipError=true, errResponse=false) => {
  return dockerCmd({
    skipError,
    errResponse,
    asStr: true,
    opts: ['container', 'rm'].concat([ toRemove ])
  })
} 

/**
 * Checks if an container already exists ( is built )
 * @function
 * @param {string} compare - Value to compare each container with
 * @param {string|function} doCompare - How to compare each container
 *
 * @returns {boolean} - Based on if the container exists
 */
const exists = async (compare, doCompare, format) => {
  // Get all current containers
  const containers = await list({ errResponse: [], format })

  // If we have containers, try to find the one matching the passed in argument
  return containers &&
    containers.length &&
    containers.some(container => compareItems(
      container,
      compare,
      doCompare,
      [ 'containerId', 'names' ]
    ))
}

module.exports = {
  exists,
  list,
  remove,
}