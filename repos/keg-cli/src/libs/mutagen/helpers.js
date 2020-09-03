const { NEWLINES_MATCH, SPACE_MATCH, TAB_MATCH } = require('KegConst/patterns')
const {
  reduceObj,
  snakeCase,
  camelCase,
  trainCase,
  isStr,
  isObj,
  toStr,
  checkCall,
  uniqArr,
  isArr,
} = require('@keg-hub/jsutils')
const { Logger } = require('KegLog')

/**
 * Error handler for error in the Mutagen CLI
 * @function
 * @param {string|Object} error - Error that was thrown
 * @param {boolean} skip - Should error logs be skipped
 *
 * @returns {void}
 */
const cliError = (error, skip=false) => {
  if(skip) return

  const toLog = isStr(error)
    ? error
    : isObj(error) && error.stack
      ? error.stack
      : toStr(error)

  Logger.empty()
  Logger.error(`  Mutagen CLI Error:`)
  Logger.error(` `, toLog.split(NEWLINES_MATCH).join('\n  '))
  Logger.empty()

}

/**
 * Formats the docker cli response into an array of items based on the format
 * @function
 * @param {string} data - response data from the docker CLI
 * @param {string} format - Output format of the data
 *
 * @returns {Array} - JSON array of items
 */
const cliSuccess = (data, format, skipError, isList) => {
  return format !== 'json'
    ? data
    : isList
      ? jsonListOutput(data, skipError)
      : jsonOutput(data, skipError)
}

/**
 * Formats the mutagen output into a json object
 * This helper cleans up the output, so it can be properly parsed as JSON
 * @function
 * @param {string} data - Output of a docker command in table format 
 *
 * @returns {Object} - Formatted mutagen output as an object
 */
const jsonOutput = (data, skipError) => {
  // TODO: parse other json output strings
  return data
}

/**
 * Parses a line for the mutagen sync list output
 * @function
 * @param {string} line - Output of a mutagen command
 *
 * @returns {Object} - Formatted key and value based on the line
 */
const parseListLine = line => {
  // Split the line by :
  let [ key, value ] = line.split(': ')
  key = key.trim()
  value = value && value.trim()

  // Some values are split by the = sign, so validate and parse that if needed
  // Check if theres no value and the key has an equals sign
  if(key.indexOf('=') !== -1 && !value){
    // Use the = sign as the seperator, and get the key value from that
    const [ equalKey, equalValue ] = key.split('=')
    key = equalKey.trim()
    value = equalValue.trim()

    // If still no value, just return false
    if(!value) return {}
  }

  // Check if the last char of the key is a :, ff it is, remove it
  key[key.length - 1] === ':' && ( key = key.replace(':', '') )

  // Convert the key to camelCase
  // And set value to an object if it does not exist
  // Return the parsed key and value
  return {
    key: camelCase(snakeCase(key)),
    value: value || {}
  }

}

/**
 * Formats the mutagen list output into a json object
 * This helper cleans up the output, so it can be properly parsed as JSON
 * @function
 * @param {string} data - Output of a docker command in table format 
 *
 * @returns {Object} - Formatted mutagen list output as an object
 */
const jsonListOutput = (data, skipError) => {
  // Default list text split sync items with long lines in between i.e. '----------'
  // So create a new array with 81 chars and join it to get a 80 char long string of -
  // Then split the output to separate each sync item
  return data.split(new Array(81).join('-'))
    .reduce((items, item) => {
      const built = {}
      let added = false
      let childObj

      // Split the item on new lines, to parse each line individuallys
      item.split(NEWLINES_MATCH).map(lineSplit => {
        const line = lineSplit.replace(/\\t/g, '').trim()
        if(!line) return

        const { key, value } = parseListLine(line)
        // If no value returned, then just return
        if(!value) return

        // Check if it has any tabs and if so, then add it to the childObj
        // If no tabs, then it gets added to the top level built item
        lineSplit.indexOf(`\t`) !== -1
          ? isObj(childObj) && (childObj[key] = value)
          : checkCall(() => {
              added = true
              built[key] = value
              // Reset childObj every time a parent item is set
              // If set to undefined, then next item should be a parent item
              // Which could set the childObj to a new object
              childObj = isObj(value) ? value : undefined
            })
      })
    
      // Check the flag if anything was added
      // If it was add it to the items array, else just return the items array
      return added ? items.concat([ built ]) : items
    }, [])

}

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
const buildIgnore = (ignore={}) => {
  const paths = uniqArr(isArr(ignore.paths) ? ignore.paths : [])
  
  return paths.reduce((ignored, ignore) => {
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
const buildMutagenArgs = ({ ignore, mode, ...args }) => {
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

const cleanPath = (toClean='') => {
  return toClean[ toClean.length - 1 ] === '/'
    ? toClean.slice(0, -1).trim()
    : toClean.trim()
}

module.exports = {
  buildIgnore,
  buildMountPath,
  buildMutagenArgs,
  cleanPath,
  cliError,
  cliSuccess,
}