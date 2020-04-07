const { DOCKER } = require('KegConst')
const { reduceObj, softFalsy } = require('jsutils')

/**
 * Loops over the passed in args and maps them to the docker constants
 * Matching keys will use the passed in value or the constants value
 * @example
 * const dockerArgs = getDockerArgs({ network: true, file: '/repo/Dockerfile' })
 * @param {Object} args - Key/Values to map to docker arguments
 * @param {string|boolean} args.file - Dockerfile to use for the docker command
 * @param {string|boolean} args.network - Type of docker network setup to use
 * @param {string|boolean} args.attached - Docker container interactive mode
 * @param {string|boolean} args.detached - Docker container detached mode
 * @param {string} [dockerCmd=''] - Docker command to add args to
 *
 * @returns {string} - Joint docker command arguments
 */
const getDockerArgs = (cmd, args, dockerCmd='') => {
  
  const cmdOpts = DOCKER[cmd.toUpperCase()]
  const checkArgs = { ...cmdOpts.DEFAULTS, ...args }

  return reduceObj(cmdOpts.VALUES, (key, value, joinedArgs) => {

    // Ensure both detached and attached are not added to the docker args
    if(key === 'detached' && args.attached) return joinedArgs
    if(key === 'attached' && args.detached) return joinedArgs
    
    // Get the key value from the args object
    const argVal = checkArgs[key]

    // Ensure if the key exists in the args object, otherwise set to empty string
    const addArg = !softFalsy(argVal)
      ? ''
      : argVal === true
        ? value
        : argVal

    // Join and return the args
    return `${joinedArgs} ${addArg}`.trim()
  }, dockerCmd)

}

module.exports = {
  getDockerArgs
}