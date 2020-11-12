const docker = require('KegDocCli')
const { Logger } = require('KegLog')
const { pathExists } = require('KegFileSys')
const { DOCKER } = require('KegConst/docker')
const { logVirtualUrl } = require('KegUtils/log')
const { isUrl, get } = require('@keg-hub/jsutils')
const { proxyLabels } = require('KegConst/docker/labels')
const { buildLabel } = require('KegUtils/docker/getBuildLabels')
const { removeLabels } = require('KegUtils/docker/removeLabels')
const { parsePackageUrl } = require('KegUtils/package/parsePackageUrl')
const { checkContainerExists } = require('KegUtils/docker/checkContainerExists')
const { buildContainerContext } = require('KegUtils/builders/buildContainerContext')
const { CONTAINER_PREFIXES, KEG_DOCKER_EXEC, KEG_EXEC_OPTS } = require('KegConst/constants')
const { PACKAGE } = CONTAINER_PREFIXES

/**
 * Loops the proxy labels and builds them in a format the docker run command needs
 * <br>Also gets the value for the proxy host so it can be logged
 * @function
 * @param {Array} optsWLabels - Options to pass to the docker run command
 * @param {Object} args - Contains values used to create the proxy labels
 * @param {string} args.proxyDomain - The subdomain for the proxy url
 * @param {string} args.contextEnvs - Environment variables of the image
 *
 * @returns {Object} - The options array with the proxy labels and the full proxy url
 */
const addProxyLabels = (optsWLabels, args) => {
  const builtOpts = [ ...optsWLabels ]
  let fullProxyUrl
  proxyLabels.map(labelData => {
    const [ key, valuePath, label ] = labelData
    const value = get(args.contextEnvs, key.toUpperCase(), get(args, valuePath))

    const builtLabel = value && buildLabel('', label, args, key, value)
    builtLabel && builtOpts.push(builtLabel)
    // Check if the key is for the proxy host, and get the url to be logged
    builtLabel && 
      key === 'KEG_PROXY_HOST' &&
      (fullProxyUrl = builtLabel.split('`')[1])

  })

  return { builtOpts, fullProxyUrl }
}

/**
 * Checks if the proxy host label already exists
 * <br>If it does not, it will try to build them based on the ENVs
 * <br>Logs out the proxy url for accessing the container in the browser
 * @function
 * @param {Array} optsWLabels - Options to pass to the docker run command
 * @param {Object} imgLabels - Labels already on the docker image
 * @param {Object} args - Contains values used to create the proxy labels
 * @param {string} args.proxyDomain - The subdomain for the proxy url
 * @param {string} args.contextEnvs - Environment variables of the image
 *
 * @returns {Array} - Built options array with the proxy labels added if needed
 */
const checkProxyUrl = (optsWLabels, imgLabels, args) => {
  // Get the proxy url from the label, so it can be printed to the terminal
  let proxyUrl = Object.entries(imgLabels)
    .reduce((proxyUrl, [ key, value ]) => {
      return value.indexOf(`Host(\``) === 0  ? value.split('`')[1] : proxyUrl
    }, false)

  // If no proxyUrl is set, then the proxy labels don't exist
  // So make call to try and add them to the image
  // Otherwise use the labels from the image, and don't add the proxy labels to the options array
  const { builtOpts, fullProxyUrl } = !proxyUrl
    ? addProxyLabels(optsWLabels, args)
    : { builtOpts: optsWLabels, fullProxyUrl: proxyUrl }

  // Log out the proxy url for easy access
  logVirtualUrl(fullProxyUrl)

  return builtOpts
}

/**
 * Builds a docker container so it can be run
 * @function
 * @param {Array} opts - Options to pass to the docker run command
 * @param {string} imageRef - Reference used to find the docker image
 * @param {Object} parsed - The parsed docker package url
 *
 * @returns {Array} - Opts array with the labels to be overwritten
 */
const setupLabels = async (opts, imageRef, parsed, contextEnvs={}) => {
  let optsWLabels = [ ...opts ]
  const imgInspect = await docker.image.inspect({ image: imageRef })

  // If the image can't be found, just return
  if(!imgInspect) return optsWLabels

  // Clear out the docker-compose labels, so it does not think it controls this container
  optsWLabels = await removeLabels(imgInspect, 'com.docker.compose', optsWLabels)

  // Get the image labels and Envs that were built with the image
  const imgLabels = get(imgInspect, 'Config.Labels', {})

  // Convert the image ENV's from an array to an object so it can be merged with the contextEnvs
  const imgEnvs = get(imgInspect, 'Config.Env', [])
    .reduce((envObj, env) => {
      const [ key, value ] = env.split('=')
      key && value && (envObj[key] = value)

      return envObj
    }, {})

  // Check if the proxy labels should be added based on the proxy url label
  return checkProxyUrl(optsWLabels, imgLabels, {
    proxyDomain: `${parsed.image}-${parsed.tag}`,
    contextEnvs: { ...contextEnvs, ...imgEnvs }
  })

}

/**
 * Builds a docker container so it can be run
 * @function
 * @param {Object} args - arguments passed from the runTask method
 * @param {string} args.command - Initial command being run
 * @param {Array} args.options - arguments passed from the command line
 * @param {Object} args.tasks - All registered tasks of the CLI
 * @param {Object} args.task - The current task being run
 * @param {Object} args.params - Formatted options as an object
 * @param {Object} globalConfig - Global config object for the keg-cli
 *
 * @returns {Object} - Build image as a json object
 */
const dockerPackageRun = async args => {
  const { globalConfig, options, params, task, tasks } = args
  const {
    command,
    context,
    cleanup,
    network,
    name,
    package,
    provider,
    repo,
    user,
    version,
    volumes
  } = params

  const isInjected = params.__injected ? true : false

  // TODO: Add check, if a context is provided, and no package
  // Then use the package utils to get a list of all packages for that context
  // Allow the user to select a package from the list
  // Or if a package is provided, build the packageUrl url

  /*
  * ----------- Step 1 ----------- *
  * Get the full package url
  */
  const packageUrl = isUrl(package)
    ? package
    : isUrl(provider)
      ? `${provider}/${package}`
      : `${ get(globalConfig, `docker.providerUrl`) }/${ package }`

  const parsed = parsePackageUrl(packageUrl)
  const containerName = name || `${ PACKAGE }-${ parsed.image }-${ parsed.tag }`
  const imageTaggedName = `${parsed.image}:${parsed.tag}`

  /*
  * ----------- Step 2 ----------- *
  * Pull the image from the provider and tag it
  */
  await docker.pull(packageUrl)
  await docker.image.tag({
    item: packageUrl,
    tag: imageTaggedName,
    provider: true
  })

  /*
  * ----------- Step 3 ----------- *
  * Build the container context information
  */
  const containerContext = await buildContainerContext({
    task,
    globalConfig,
    params: { image: parsed.image, tag: parsed.tag },
  })
  const { cmdContext, contextEnvs, location, id } = containerContext
  const [error, locExists] = await pathExists(location)
  cmdLocation = locExists ? location : undefined

  /*
  * ----------- Step 3.1 ----------- *
  * Check if the container already exists, and if it should be removed!
  */
  const containerExists = await checkContainerExists({
    id,
    args,
    context: parsed.image,
    containerRef: containerName,
  })
  if(containerExists)
    return Logger.highlight(`Exiting task because container`, `"${containerExists}"`, `is still running!\n`)

  /*
  * ----------- Step 4 ----------- *
  * Get the options for the docker run command
  */
  let opts = [ `-it` ]
  cleanup && opts.push(`--rm`)
  opts.push(`--network ${network || contextEnvs.KEG_DOCKER_NETWORK || DOCKER.KEG_DOCKER_NETWORK }`)
  opts = await setupLabels(opts, id || parsed.image, parsed, contextEnvs)

  /*
  * ----------- Step 5 ----------- *
  * Run the docker image as a container
  */
  // TODO: investigate using the cmd from the image.inspect call => const imgCmd = get(imgInspect, 'Config.Cmd', [])
  const defCmd = `/bin/bash ${ contextEnvs.DOC_CLI_PATH }/containers/${ cmdContext }/run.sh`

  try {
    await docker.image.run({
      ...parsed,
      opts,
      cmd: command,
      name: containerName,
      location: cmdLocation,
      cmd: isInjected ? command : defCmd,
      overrideDockerfileCmd: Boolean(command),
      envs: {
        ...contextEnvs,
        [KEG_DOCKER_EXEC]: KEG_EXEC_OPTS.packageRun,
        ...((command || contextEnvs.KEG_EXEC_CMD) && { KEG_EXEC_CMD: command || contextEnvs.KEG_EXEC_CMD })
      },
    })
  }
  catch(err){
    Logger.error(err.stack)
    process.exit(1)
  }

}

module.exports = {
  run: {
    name: 'run',
    action: dockerPackageRun,
    description: `Runs a git pr docker image in a container`,
    example: 'keg docker package run <options>',
    options: {
      package: {
        description: 'Pull request package url or name',
        example: `keg docker package --package lancetipton/keg-core/keg-core:bug-fixes`,
        required: true,
        ask: {
          message: 'Enter the docker package url or path (<user>/<repo>/<package>:<tag>)',
        }
      },
      command: {
        alias: [ 'cmd' ],
        description: 'Overwrites the default yarn command. Command must exist in package.json scripts!',
        example: 'keg docker package run --command dev ( Runs "yarn dev" )',
      },
      branch: {
        description: 'Name of branch name that exists as the image name',
        example: 'keg docker package run --branch develop',
      },
      context: {
        allowed: [],
        description: 'Context of the docker package to run',
        example: 'keg docker package run --context core',
        enforced: true,
      },
      cleanup: {
        alias: [ 'clean', 'rm' ],
        description: 'Auto remove the docker container after exiting',
        example: `keg docker package run --cleanup false`,
        default: true
      },
      network: {
        alias: [ 'net' ],
        description: 'Set the docker run --network option to this value',
        example: 'keg docker package run --network host'
      },
      name: {
        description: 'Set the name of the docker container being run',
        example: 'keg docker package run --name my-container',
      },
      provider: {
        alias: [ 'pro' ],
        description: 'Url of the docker registry provider',
        example: 'keg docker package run --provider docker.pkg.github.com'
      },
      repo: {
        description: 'The name of the repository holding docker images to pull',
        example: 'keg docker package run --repo keg-core',
      },
      user: {
        alias: [ 'usr' ],
        description: 'User to use when logging into the registry provider. Defaults to the docker.user property in your global config.',
        example: 'keg docker package run --user gituser',
      },
      version: {
        description: 'The version of the image to use',
        example: 'keg docker package run --version 0.0.1',
      },
      volumes: {
        description: 'Mount the local volumes defined in the docker-compose config.yml.',
        example: 'keg docker package run --volumes',
        default: false
      },
    }
  }
}
