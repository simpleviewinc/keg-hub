const { DOCKER } = require('KegConst')
const { reduceObj, get } = require('jsutils')
const { exists } = require('KegUtils/helpers/exists')

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
 * @param {string|boolean} args.nocache - Build docker container without using cache
 * @param {string} [dockerCmd=''] - Docker command to add args to
 *
 * @returns {string} - Joint docker command arguments
 */
const getDockerArgs = ({ args, cmd, context, dockerCmd='' }) => {

  const containerOpts = get(DOCKER, `CONTAINERS.${ context.toUpperCase() }`)
  const checkArgs = { ...containerOpts.DEFAULTS, ...args }

  // Loop the containerOpts.Value object and check for any extra arguments to add
  // Get All values get compared against the checkArgs array
  // If set to true, then the value from containerOpts.VALUES is added to the cmd
  return reduceObj(containerOpts.VALUES, (key, value, joinedArgs) => {

    // Ensure both detached and attached are not added to the docker args
    if(key === 'detached' && args.attached) return joinedArgs
    if(key === 'attached' && args.detached) return joinedArgs

    // Check if cache is explicitly set to false
    // And if so, turn off caching for builds
    if(key === 'nocache')
      return args.cache === false
        ? `${joinedArgs} ${ value }`.trim()
        : joinedArgs


    // Get the key value from the args object
    const argVal = checkArgs[key]

    // Ensure if the key exists in the args object, otherwise set to empty string
    const addArg = exists(argVal) ? argVal === true ? value : argVal : ''

    // Join and return the args
    return `${joinedArgs} ${addArg}`.trim()
  }, dockerCmd)

}

/**
 * Adds the name of the container to the dockerCmd
 * @param {string} name - Name of the container to add to the dockerCmd
 * @param {string} [dockerCmd=''] - Docker command to add the name to
 *
 * @returns {string} - dockerCmd with the name arg added
 */
const addContainerName = (name, dockerCmd='') => {
  return `${dockerCmd} --name ${name}`
}

/**
 * Adds location as a mounted volume to the dockerCmd
 * @param {string} location - Local location of the tap to mount
 * @param {string} [dockerCmd=''] - Docker command to add the mounted tap to
 *
 * @returns {string} - dockerCmd with the mounted tap arg added
 */
const addTapMount = (location, dockerCmd) => {
  return `${dockerCmd} -v ${location}:/keg/tap`
}


const addContainerEnv = (dockerCmd='', options={}) => {
  return Object.keys(options)
    .reduce((cmd, key) => {
        return exists(options[key])
          ? `${cmd} -e ${key.toUpperCase()}=${options[key]}`
          : cmd
      }, dockerCmd)
}

const addDockerArg = (dockerCmd, toAdd, condition) => {
  return condition
    ? `${dockerCmd} ${toAdd}`
    : dockerCmd
}

module.exports = {
  addDockerArg,
  addContainerEnv,
  addContainerName,
  addTapMount,
  getDockerArgs
}