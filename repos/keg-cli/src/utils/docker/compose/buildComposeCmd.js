const path = require('path')
const { Logger } = require('KegLog')
const { DOCKER } = require('KegConst/docker')
const { loadTemplate } = require('KegUtils/template')
const { GLOBAL_INJECT_FOLDER } = require('KegConst/constants')
const { generalError } = require('KegUtils/error/generalError')
const { getComposeContextData } = require('./getComposeContextData')
const { get, isStr, exists, reduceObj } = require('@keg-hub/jsutils')
const { writeFile, mkDir, pathExists } = require('KegFileSys/fileSys')
const { generateComposeLabels } = require('KegUtils/proxy/generateComposeLabels')
const { CONTAINERS } = DOCKER

const composeArgs = {
  build: {
    clean: '--force-rm',
    cache: '--no-cache',
    nocreate:`--no-recreate`,
    pull: '--pull',
    recreate: '--force-recreate',
  },
  up: {
    abort: '--abort-on-container-exit',
    build: '--build',
    nobuild: '--no-build',
    nocreate:`--no-recreate`,
    recreate: '--force-recreate',
    orphans: '--remove-orphans',
  }
}

/**
 * Writes the injected compose file to the global injected folder
 * @function
 * @param {string} injectedCompose - Path to the injected-compose.yml file
 * @param {Object} data - Data to fill the compose template with
 *
 * @returns {boolean} - If the file was added
 */
const writeInjectedCompose = async (injectedCompose, data) => {
  await mkDir(GLOBAL_INJECT_FOLDER)

  const template = await loadTemplate('injected-compose', data)
  const [ err, saved ] = await writeFile(injectedCompose, template)

  err && generalError(`ERROR: Can not write injected compose file.\n${ err.stack }`)

  return saved
}

/**
 * Adds the injected-compose.template.yml file
 * @function
 * @param {string} data - Data to fill the template with
 *
 * @returns {string} - Filled docker-compose.yml template file
 */
const addInjectedTemplate = async (dockerCmd, data={}, composeData) => {

  // Build the path of the injected compose file, based on the proxyDomain ( app name + git branch name )
  const injectedCompose = path.join(GLOBAL_INJECT_FOLDER, `${composeData.proxyDomain || composeData.image}.yml`)
  const dockCmdWithCompose = `${dockerCmd} -f ${injectedCompose}`

  // Check if it already exists, and if it does, then just return
  // Don't auto remove the inject compose file
  const [ err, exists ] = await pathExists(injectedCompose)
  if(exists) return dockCmdWithCompose

  if(!composeData || !composeData.image){
    Logger.warn(`Could not build injected compose file. Invalid composeData object, missing image or proxyDomain!`, composeData)
    return dockerCmd
  }

  // Join the composeData and the generated labels together, and write the injected compose file
  await writeInjectedCompose(injectedCompose, {
    ...composeData,
    generatedLabels: composeData.proxyDomain ? generateComposeLabels({ ...data, ...composeData }) : ''
  })

  return dockCmdWithCompose
}

/**
 * Builds a docker-compose file argument based on the passed in args
 * @function
 * @param {string} dockerCmd - Docker command to add the compile file paths to
 * @param {string} context - Context the docker command is being run in ( core / tap )
 * @param {string} env - Name of the ENV that defines the file path of the compose file
 * @param {string} composeFile - compose file path to override pulling from container ENVs
 *
 * @returns {string} - dockerCmd string with the file path added
 */
const addComposeFile = (dockerCmd='', container, env, composeFile) => {
  const compPath = composeFile || get(CONTAINERS, `${ container }.ENV.${ env }`)
  const addedComposeFile = compPath ? `-f ${ compPath }` : ''

  return `${dockerCmd} ${ addedComposeFile }`.trim()
}

/**
 * Adds the paths to the docker compose file for the env
 * @function
 * @param {string} dockerCmd - Docker command to add the compile file paths to
 * @param {Object} args - Arguments passed on from the current Task
 * @param {string} args.cmdContext - Current docker image context
 * @param {Object} args.params - Parse options passed from the cmd line
 * @param {Object} args.globalConfig - CLI Global Config object
 * @param {Object} args.contextEnvs - ENVs for the current context
 * 
 *
 * @returns {string} - dockerCmd string with the file paths added
 */
const addComposeFiles = async (dockerCmd, args, composeData) => {

  const curENV = get(args, `params.env`, 'LOCAL')
  const container = get(args, 'cmdContext', '').toUpperCase()

  if(!container) return dockerCmd

  // Check if we should add the injected docker-compose file
  // Add it first, so other compose files can override the injected one as needed
  dockerCmd = composeData
    ? await addInjectedTemplate(dockerCmd, args, composeData)
    : dockerCmd

  const injectedComposePath = get(args, 'params.__injected.composePath')

  // Check if the compose file path has been injected
  // Or get the default docker compose file
  dockerCmd = injectedComposePath
    ? addComposeFile(dockerCmd, container, ``, injectedComposePath)
    : addComposeFile(dockerCmd, container, `KEG_COMPOSE_DEFAULT`)

  // Get the docker compose file from the repo
  dockerCmd = addComposeFile(dockerCmd, container, `KEG_COMPOSE_REPO`)

  // Get the docker compose file for the environment
  dockerCmd = addComposeFile(dockerCmd, container, `KEG_COMPOSE_${ curENV }`)

  // Get the docker compose file for the container and ENV
  dockerCmd = addComposeFile(dockerCmd, container, `KEG_COMPOSE_${ container }_${ curENV }`)

  return dockerCmd
}

/**
 * Conditionally adds a docker argument based on the passed in arguments
 * @function
 * @param {string} dockerCmd - Docker command to add the compile file paths to
 * @param {string} toAdd - The arguments to be added to the docker command
 * @param {boolean} condition - If the argument should be added to the dockerCmd
 *
 * @returns {string} - dockerCmd string with the file paths added
 */
const addDockerArg = (dockerCmd, toAdd, condition) => {
  return condition
    ? `${dockerCmd} ${toAdd}`
    : dockerCmd
}

/**
 * Converts the passed in docker-compose params to to string format
 * @function
 * @param {string} dockerCmd - docker-compose command to add params to
 * @param {Object} params - Parse params passed from the command line
 *
 * @returns {string} - docker command with params added
 */
const addCmdOpts = (dockerCmd, cmdArgs, params) => {
  return reduceObj(params, (key, value, added) => {
    const condition = key === 'cache' ? !Boolean(value) : Boolean(value)

    return !cmdArgs[key]
      ? added
      : addDockerArg(
          added,
          cmdArgs[key],
          condition
        )
  }, dockerCmd)
}

/**
 * Build the docker-compose down args to ensure it cleans up properly
 * @function
 * @param {string} dockerCmd - docker-compose command to add params to
 * @param {string} remove - Args passed in from the command line to define what items to remove
 *
 * @returns {string} - Docker compose command, with remove args added
 */
const getDownArgs = (dockerCmd, params) => {
  const { remove } = params

  return remove.split(',').reduce((builtCmd, toRemove) => {
    if(toRemove === 'all' || toRemove === 'local')
      dockerCmd = `${dockerCmd} -rmi ${toRemove}`
    else if(toRemove === 'v' || toRemove === 'volumes')
      dockerCmd = `${dockerCmd} --volumes`
    else if(toRemove === 'or' || toRemove === 'orphans')
      dockerCmd = `${dockerCmd} --remove-orphans`

    return dockerCmd
  }, dockerCmd)
}

/**
 * Creates the docker-compose up command
 * @function
 * @param {Object} globalConfig - Global config object for the keg-cli
 * @param {string} cmdContext - Context the command is being run in ( core | tap )
 * @param {Object} params - Parse params passed from the command line
 *
 * @returns {string} - Built docker command
 */
const buildComposeCmd = async args => {
  const { cmd, params={} } = args

  // Get the compose data for filling out the injected compose template
  // only if the KEG_NO_INJECTED_COMPOSE env does not exist
  const composeData = !exists(get(args, `contextEnvs.KEG_NO_INJECTED_COMPOSE`)) && await getComposeContextData(args)

  let dockerCmd = `docker-compose`
  dockerCmd = await addComposeFiles(dockerCmd, args, composeData)
  dockerCmd = `${dockerCmd} ${cmd}`
  const cmdArgs = composeArgs[cmd]

  switch(cmd){
    case 'build': {
      dockerCmd = addCmdOpts(dockerCmd, cmdArgs, params)
      break
    }
    case 'up': {
      dockerCmd = addCmdOpts(
        addDockerArg(dockerCmd, '--detach', !Boolean(params.attach)),
        cmdArgs,
        params
      )
    }
    case 'down': {
      dockerCmd = params.remove ? getDownArgs(dockerCmd, params) : dockerCmd
      break
    }
  }

  return { dockerCmd, composeData }
}

module.exports = {
  buildComposeCmd
}

