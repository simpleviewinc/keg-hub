const { reduceObj, snakeCase, styleCase, trainCase } = require('jsutils')

/**
 * Builds the mount path for the sync between the local host and docker container
 * @function
 * @param {string} args.from - Location on the local host to be synced
 * @param {string} args.to - Location on the docker container to be synced
 * @param {string} args.container - The id of the container to sync with
 * @param {string} args.type - The id of the container to sync with
 *
 * @returns {string} - Joined create arguments as a string
 */
const buildMountPath = ({ local, remote, container, type='docker' }) => {
  remote = remote[0] !== '/' ? `/${remote}` : remote
  
  const remotePath = container ? `${ container }${ remote }` : remote
  const fullRemotePath = type ? `${ type }://${ remotePath }` : remotePath

  return `${ local } ${ fullRemotePath }`
}


/**
 * Builds the ignore arguments for the create command 
 * @function
 * @param {Array} ignore - Array of paths to ignore
 *
 * @returns {string} - Joined ignore arguments as a string
 */
const buildIgnore = (ignore=[]) => {
  return ignore.reduce((ignored, ignore) => {
    return !ignore
      ? ignored
      : ignored
        ? `${ ignored } --ignore=${ ignore }`.trim()
        : `--ignore=${ ignore }`.trim()
  }, '')
}

/**
 * Builds the argument for the create command 
 * @function
 * @param {Array} ignore - Array of paths to ignore
 * @param {Object} create - Key/Values Arguments object for the create command
 *
 * @returns {string} - Joined create arguments as a string
 */
const buildMutagenArgs = ({ ignore, args }) => {
  const mutagenArgs = reduceObj(args, (key, value, buildArgs) => {
    const useKey = trainCase(key)
    return value === true
      ? `${ buildArgs } --${ useKey }`
      : value !== null && value !== undefined
        ? `${ buildArgs } --${ useKey }=${ value }`
        : buildArgs
  }, '')
  
  return `${ mutagenArgs } ${ buildIgnore(ignore) }`.trim()
}

module.exports = {
  buildIgnore,
  buildMountPath,
  buildMutagenArgs,
}