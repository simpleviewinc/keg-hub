const docker = require('KegDocCli')
const { Logger } = require('KegLog')
const { isUrl, get } = require('@keg-hub/jsutils')
const { parsePackageUrl } = require('KegUtils/package/parsePackageUrl')
const { addProxyOptions } = require('KegUtils/proxy/addProxyOptions')
const { buildContainerContext } = require('KegUtils/builders/buildContainerContext')
const { CONTAINER_PREFIXES, KEG_DOCKER_EXEC, KEG_EXEC_OPTS } = require('KegConst/constants')
const { PACKAGE } = CONTAINER_PREFIXES


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
    params: { ...params, context: isInjected ? context : parsed.image },
  })
  const { cmdContext, contextEnvs, location } = containerContext

  /*
  * ----------- Step 4 ----------- *
  * Get the options for the docker run command
  */

  let opts = [ `-it` ]
  cleanup && opts.push(`--rm`)

  opts = addProxyOptions(opts, containerContext, parsed, network)
  const defCmd = `/bin/bash ${ contextEnvs.DOC_CLI_PATH }/containers/${ cmdContext }/run.sh`

  /*
  * ----------- Step 5 ----------- *
  * Run the docker image as a container
  */
  try {
    await docker.image.run({
      ...parsed,
      opts,
      location,
      envs: { ...contextEnvs, [KEG_DOCKER_EXEC]: KEG_EXEC_OPTS.packageRun },
      name: containerName,
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
