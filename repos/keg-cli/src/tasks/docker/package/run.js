const docker = require('KegDocCli')
const { Logger } = require('KegLog')
const { ask } = require('@keg-hub/ask-it')
const { isUrl, get } = require('@keg-hub/jsutils')
const { CONTAINER_PREFIXES, KEG_DOCKER_EXEC, KEG_EXEC_OPTS } = require('KegConst/constants')
const { parsePackageUrl } = require('KegUtils/package/parsePackageUrl')
const { getServiceValues } = require('KegUtils/docker/compose/getServiceValues')
const { buildContainerContext } = require('KegUtils/builders/buildContainerContext')

const { PACKAGE } = CONTAINER_PREFIXES

/**
 * Checks if a docker container already exists
 * <br/>If it does, asks user if they want to remove it
 * @function
 * @param {string} container - Name of the container that already exists
 *
 * @returns {string} - Name of the current branch
 */
const checkExists = async container => {
  const exists = await docker.container.get(container)
  if(!exists) return false
  
  Logger.empty()
  Logger.print(
    Logger.colors.brightYellow(`A docker container already exists with the name`),
    Logger.colors.cyan(`"${ container }"\n`),
    Logger.colors.brightRed(`Running container must be removed before this container can be run!`)
  )

  Logger.empty()
  const remove = await ask.confirm(`Would you like to remove it?`)
  Logger.empty()

  return remove
    ? await docker.container.destroy(container) && false
    : true

}

/**
 * TODO: Make this more dynamic, so it can handel of types of containers
 * Should pull in the image to be built, and use the labels from that image
 * If missing the correct labels, then use the current code below
 * Also move this to utils, so it can be reused by other tasks ( i.e. image run task )
*/

/**
 * Adds the required keg-proxy labels to the docker command options
 * <br/>This allows the container to register with the keg-proxy
 * @function
 * @param {Array} opts - Options for the docker run command
 * @param {Object} containerContext - Parsed container context from the buildContainerContext method
 * @param {Object} containerContext.contextEnvs - Envs for the container
 * @param {Object} parsed - Parsed docker package url
 * @param {string} parsed.tag - Tag || branch of the docker package url
 * @param {string} parsed.image - Name of the image to build the container from
 *
 * @returns {Array} - opts array with the keg-proxy labels added
 */
const addProxyOptions = (opts=[], { contextEnvs }, { tag, image }) => {
  const proxyHost = get(contextEnvs, `KEG_PROXY_HOST`, `tap.local.kegdev.xyz`).replace('tap', tag)
  const hostLabel = `traefik.http.routers.${tag}.rule=Host(\`${proxyHost}\`)`
  opts.push(`--label ${hostLabel}`)

  const proxyPort = get(contextEnvs, `DOC_APP_PORT`, get(contextEnvs, `KEG_PROXY_PORT`))
  const portLabel = `traefik.http.services.${tag}.loadbalancer.server.port=${proxyPort}`
  opts.push(`--label ${portLabel}`)
  
  const proxyEntry = `traefik.http.routers.${tag}.entrypoints=keg`
  opts.push(`--label ${proxyEntry}`)

  // TODO: update this to pull from constants, and not be hard coded
  opts.push(`--network keg-hub-net`)

  return opts
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
  const containerName = `${ PACKAGE }-${ parsed.image }-${ parsed.tag }`

  /*
  * ----------- Step 2 ----------- *
  * Pull the image from the provider and tag it
  */
  await docker.pull(packageUrl)
  await docker.image.tag({
    item: packageUrl,
    tag: `${parsed.image}:${parsed.tag}`,
    provider: true
  })

  /*
  * ----------- Step 3 ----------- *
  * Build the container context information
  */
  const containerContext = await buildContainerContext({
    task,
    globalConfig,
    params: { ...params, context: isInjected ? context : parsed.image },
  })
  const { cmdContext, contextEnvs, location } = containerContext

  /*
  * ----------- Step 4 ----------- *
  * Check if a container with the same name is already running
  * If it is, ask the user if they want to remove it
  */
  // const exists = await checkExists(containerName)
  // if(exists) return Logger.info(`Exiting "package run" task!`)

  /*
  * ----------- Step 5 ----------- *
  * Run the image in a container
  */
  let opts = await getServiceValues({
    volumes,
    contextEnvs,
    opts: [ `-it` ],
    composePath: get(params, '__injected.composePath'),
  })

  cleanup && opts.push(`--rm`)
  network && opts.push(`--network ${ network }`)

  opts = addProxyOptions(opts, containerContext, parsed)
  const defCmd = `/bin/bash ${ contextEnvs.DOC_CLI_PATH }/containers/${ cmdContext }/run.sh`

  try {
    await docker.image.run({
      ...parsed,
      opts,
      location,
      envs: { ...contextEnvs, [KEG_DOCKER_EXEC]: KEG_EXEC_OPTS.packageRun },
      name: `${ PACKAGE }-${ parsed.image }-${ parsed.tag }`,
      cmd: isInjected ? command : defCmd,
      overrideDockerfileCmd: Boolean(!isInjected || command),
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
        alias: [ 'name' ],
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
