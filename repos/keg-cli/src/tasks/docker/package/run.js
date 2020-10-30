const docker = require('KegDocCli')
const { Logger } = require('KegLog')
const { pathExists } = require('KegFileSys')
const { DOCKER } = require('KegConst/docker')
const { isUrl, get } = require('@keg-hub/jsutils')
const { parsePackageUrl } = require('KegUtils/package/parsePackageUrl')
const { addProxyOptions } = require('KegUtils/proxy/addProxyOptions')
const { buildContainerContext } = require('KegUtils/builders/buildContainerContext')
const { CONTAINER_PREFIXES, KEG_DOCKER_EXEC, KEG_EXEC_OPTS } = require('KegConst/constants')
const { PACKAGE } = CONTAINER_PREFIXES
const proxyLabelPort = 'traefik.http.services.herkin.loadbalancer.server.port'

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
  * ----------- Step 4 ----------- *
  * Get the options for the docker run command
  */
  let opts = [ `-it` ]
  cleanup && opts.push(`--rm`)
  opts.push(`--network ${network || contextEnvs.KEG_DOCKER_NETWORK || DOCKER.KEG_DOCKER_NETWORK }`)


  /*
  * ----------- Step 4.1 ----------- *
  * Parse the image labels looking for docker-compose or traefik labels
  * Update the traefik host label to use the branch
  * Clear out the docker-compose labels, so it does not think it controls this container
  */
  const imgInspect = await docker.image.inspect({ image: id || parsed.image })
  const imgLabels = get(imgInspect, 'Config.Labels', {})

  let labelContext = cmdContext
  Object.entries(imgLabels).map(([ key, value ]) => {
    if(!key.includes('traefik') && !key.includes('com.docker.compose')) return

    if(key.includes('com.docker.compose')) opts.push(`--label ${key}`)

    if(key.includes('traefik.http.routers') && value.includes('Host(')){
      labelContext = key.split('.rule')[0].replace('traefik.http.routers.', '')
      opts.push(`--label ${key}=${value.replace(labelContext, (labelContext || parsed.image) + '-' + parsed.tag)}`)
    }

  })

  // Commenting out for now until the label issue can be resolved
  // Currently the labels of the image are saved with the image
  // So they reused when the image is run again at a later time
  // Which means we can't define custom labels here
  // If we to define more then one router on a container,
  // Traefic kills all routing for both routers, and the container can not be accessed
  // 
  // To fix me need to modify the image before it's packaged, and remove the labels from it
  // This will then allow us to define our own labels when it's run at a later time

  // const port = imgInspect && imgInspect.Config.Labels[proxyLabelPort]
  // const imgInspect = await docker.image.inspect({ image: id || parsed.image })
  // const port = imgInspect && imgInspect.Config.Labels[proxyLabelPort]
  // opts = addProxyOptions(
  //   opts,
  //   { contextEnvs: { ...containerContext.contextEnvs, KEG_PROXY_PORT: port } },
  //   { ...parsed, context: cmdContext },
  //   network
  // )
  
  
  const defCmd = `/bin/bash ${ contextEnvs.DOC_CLI_PATH }/containers/${ cmdContext }/run.sh`

  /*
  * ----------- Step 5 ----------- *
  * Run the docker image as a container
  */
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
