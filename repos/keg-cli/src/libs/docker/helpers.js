const { Logger } = require('KegLog')
const { NEWLINES_MATCH, SPACE_MATCH } = require('KegConst/patterns')
const { DOCKER } = require('KegConst/docker')
const { CLI_KEY_MAP } = DOCKER
const {
  camelCase,
  isArr,
  isFunc,
  isObj,
  isStr,
  snakeCase,
  toStr,
  reduceObj
} = require('@svkeg/jsutils')

/**
 * Throws an error with the passed in message
 * @function
 * @param {string} message - Message for the thrown error
 *
 * @returns {void}
 */
const throwFailedCmd = (message=`Docker API command Failed!`) => {
  throw new Error(message)
}

/**
 * Throws an error when a docker type can not be found
 * @function
 * @param {string} message - Message for the thrown error
 *
 * @returns {void}
 */
const noItemFoundError = (type, name) => {
  Logger.empty()
  Logger.error(`  Docker API command failed:`)
  Logger.info(`  Could not find docker ${type} from ${ name }!`)
  Logger.empty()

  throwFailedCmd()
}

/**
 * Throws an error when no item argument is passed to a docker command
 * @function
 * @param {string} cmd - Docker command that requires an item argument
 * @param {boolean} [shouldThrow=false] - Should an error be throw
 *
 * @returns {boolean} If shouldThrow is false, then return false.
 */
const noItemError = (cmd, shouldThrow=false) => {
  Logger.empty()
  Logger.error(`  Docker API command failed:`)
  Logger.info(`  The "${ cmd }" command requires an object argument with an item key to run!`)
  Logger.empty()

  if(!shouldThrow) return false
  
  throwFailedCmd()
}

/**
 * Throws an error when invalid arguments are passed to the docker login command
 * @function
 * @param {string} providerUrl - Url to log into
 * @param {string} user - User name to login with
 * @param {string} token - API token to access the providers API
 *
 * @returns {void}
 */
const noLoginError = (providerUrl, user, token) => {
  const missing = !providerUrl ? 'providerUrl' : !user ? `user` : `token`

  Logger.empty()
  Logger.error(`  Docker login failed!`)
  Logger.info(`  Docker login requires a ${ missing } argument!`)
  Logger.empty()

  throwFailedCmd(`Docker login Failed!`)

}

/**
 * Logs message when a docker command completes successfully
 * @function
 * @param {string} cmd - Docker command that was run
 * @param {string} message - Overrides the default message to log
 *
 * @returns {boolean} - true
 */
const cmdSuccess = (cmd, res, message) => {
  return res
}

/**
 * Error logger for docker commands. Logs the passed in error, then exits
 * @param {string} error - The error to be logged
 * @param {*} errResponse - Response to return after logging the error.
 *                          Exists the process it errResponse is falsy
 *
 * @returns {*} - Passed in errResponse
 */
const apiError = (error, errResponse, skipError) => {

  // Check if we should skip logging the error
  if(skipError) return errResponse

  const toLog = isStr(error)
    ? error
    : isObj(error) && error.stack
      ? error.stack
      : toStr(error)

  Logger.empty()
  Logger.error(`  Docker Api Error:`)
  Logger.error(` `, toLog.split(NEWLINES_MATCH).join('\n  '))
  Logger.empty()


  // If the errResponse is not undefined, return it... otherwise exit the process!
  return errResponse !== undefined  ? errResponse : process.exit(1)
}

/**
 * Formats the docker cli response into an array of items based on the format
 * @function
 * @param {string} data - response data from the docker CLI
 * @param {string} format - Output format of the data
 *
 * @returns {Array} - JSON array of items
 */
const apiSuccess = (data, format, skipError) => {
  return format === 'json' ? jsonOutput(data, skipError) : data
}

/**
 * Formats the docker json output into an object
 * Docker `--format json` flag gives a weird string json output
 * This helper cleans up the output, so it can be properly parsed as JSON
 * @function
 * @param {string} data - Output of a docker command in table format 
 *
 * @returns {Object} - Formatted docker output as an object
 */
const jsonOutput = (data, skipError) => {
  return data.split('\n')
    .reduce((items, item) => {
      if(!item.trim()) return items

      try {
        const parsed = JSON.parse(item.replace(/\\"/g, ''))
        const built = {}
        Object.keys(parsed).map(key => {
          // Check if there's an alt key to use instead of the default
          const useKey = CLI_KEY_MAP[key] || key
          built[camelCase(snakeCase(useKey))] = parsed[key]
        })

      // Adds rootId key, which removes and docker repository content
      // This allows us to pull from a remote provider, and compare just the original image name
        if(built.repository)
          built.rootId = built.repository.indexOf('/') !== -1
            ? built.repository.split('/').pop()
            : built.repository

        return items.concat([ built ])
      }
      catch(err){
        return apiError(err, items, skipError)
      }

    }, [])
}

/**
 * Formats the docker table output into an object
 * @function
 * @param {string} data - Output of a docker command in table format 
 *
 * @returns {Object} - Formatted docker output as an object
 */
const tableOutput = data => {
  const lines = data.toLowerCase().split(NEWLINES_MATCH)
  const headers = lines.shift().split(SPACE_MATCH)

  return lines.reduce((mapped, line) => {
    return !line.trim()
      ? mapped
      : mapped.concat([
          line
            .split(SPACE_MATCH)
            .reduce((item, content, index) => {
              const key = headers[index]
              item[camelCase(key)] = content

              return item
            }, {})
        ])

  }, [])
}


/**
 * Convert port response from docker cli to json object
 * @function
 * @param {string} data - Output of a docker command as a string
 *
 * @returns {Object} - Formatted docker output as an object
 */
const portAsJSON = (data, port) => {
  return port
    ? { [ parseInt(data.split(':')[1]) ]: parseInt(port) }
    : data.split('\n')
      .reduce((items, item) => {
        if(!item.trim()) return items
      
        const [ contPort, localPort ] = item.split(' -> ')
        items[ parseInt(localPort.split(':')[1]) ] = parseInt(contPort)

        return items

      }, {})

}

/**
 * Compares the passed in item's keys with the compare argument
 * @function
 * @param {Object} item - Item to compare
 * @param {string} compare - Value to compare each item with
 * @param {string|function} doCompare - How to compare each container
 * @param {Array} defCompareKeys - If no doCompare is passed, use the default keys for compare
 *
 * @returns {Boolean} - If the compare values match
 */
const compareItems = (item, compare, doCompare, defCompareKeys=[]) => {
  return isStr(doCompare)
    ? item[doCompare] === compare
    : isFunc(doCompare)
      ? doCompare(item, compare)
      : defCompareKeys.some(key => item[key] === compare)
}

/**
 * Converts a key and value into docker env ( -e key=value )
 * @function
 * @param {Object} key - Name of the env
 * @param {Object} value - value of the env
 * @param {string} [cmd=''] - Cmd to add the env to
 *
 * @returns {string} - Passed in cmd, with the key/value converted to docker env
 */
const asContainerEnv = (key, value, cmd='') => {
  return value && `${cmd} -e ${ key }=${ value }`.trim() || cmd
}

/**
 * Converts an object into docker run envs ( -e key=value )
 * @function
 * @param {Object} [envs={}] - Envs to be converted
 * @param {string} [cmd=''] - Cmd to add the Envs to
 *
 * @returns {string} - Passed in cmd, with the envs converted to docker envs
 */
const toContainerEnvs = (envs={}, cmd='') => {
  return reduceObj(envs, asContainerEnv, cmd).trim()
}

/**
 * Converts a key and value into docker build-args ( --build-arg key=value )
 * @function
 * @param {Object} key - Name of the build-arg
 * @param {Object} value - value of the build-arg
 * @param {string} [cmd=''] - Cmd to add the build-args to
 *
 * @returns {string} - Passed in cmd, with the key/value converted to docker build-args
 */
const asBuildArg = (key, value, cmd='', filters=[]) => {
  return !filters.includes(key) && value
    ? `${cmd} --build-arg ${ key }=${ value }`.trim()
    : cmd
}

/**
 * Converts an object into docker build-args ( --build-arg key=value )
 * @function
 * @param {Object} [envs={}] - Envs to be converted
 * @param {string} [cmd=''] - Cmd to add the build-args to
 *
 * @returns {string} - Passed in cmd, with the envs converted to docker build-args
 */
const toBuildArgs = (envs={}, cmd='', filters=[]) => {
  return !isObj(envs)
    ? cmd
    : reduceObj(
        envs,
        (key, value, buildCmd) => asBuildArg(key, value, buildCmd, filters),
        cmd
      ).trim()
}

const getCmdParams = (args, ext={}) => {
  return isStr(args) ? { item: args, ...ext } : { ...ext, ...args }
}


/**
 * Builds the names for a container and image based on the passed in params
 * @function
 * @param {Object} args - Use to build the names
 * @param {Object} args.image - Image Object returned from get image
 * @param {string} args.name - Custom name for the container
 * @param {string} args.tag - Tag of the image
 *
 * @returns {Object} - Contains the container and image names
 */
const buildNames = ({ image, name, tag }) => {
  const container = isStr(name)
    ? name
    : isStr(image)
      ? `img-${image}`
      : `img-${image.name}`

  let imgName = isStr(image) ? image : image.name

  imgName = isStr(tag)
    ? tag.indexOf(image) !== 0
      ? `${ image }:${ tag }`
      : tag
    : imgName

  return { image: imgName, container }
}

module.exports = {
  asBuildArg,
  asContainerEnv,
  apiError,
  apiSuccess,
  buildNames,
  compareItems,
  cmdSuccess,
  getCmdParams,
  noItemError,
  noItemFoundError,
  portAsJSON,
  toBuildArgs,
  toContainerEnvs,
}
