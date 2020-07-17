
const { get } = require('@ltipton/jsutils')
const docker = require('KegDocCli')
const { spawnCmd } = require('KegProc')
const { HTTP_PORT_ENV } = require('KegConst/constants')
const { CONTAINERS } = require('KegConst/docker/containers')
const { imageSelect } = require('KegUtils/docker/imageSelect')
const { buildContainerContext } = require('KegUtils/builders/buildContainerContext')
const { CONTAINER_PREFIXES } = require('KegConst/constants')
const { IMAGE } = CONTAINER_PREFIXES

const buildContainerName = async cmdContext => {

  const imgName = get(
    CONTAINERS,
    `${ cmdContext.toUpperCase() }.ENV.IMAGE`,
    cmdContext
  )

  const imgContainer = `${ IMAGE }-${ imgName }`
  const exists = await docker.container.exists(
    imgContainer,
    container => container.name === imgContainer,
    'json'
  )

  return imgContainer
}

const getImageContext = async (args) => {
  const { globalConfig, params, task } = args
  const { tag } = params

  // Get the context data for the command to be run
  const { cmdContext, contextEnvs, image, location, tap } = await buildContainerContext({
    globalConfig,
    task,
    params,
  })

  // Build the name for the container
  const container = await buildContainerName(cmdContext)

  return { container, contextEnvs, image, location, tag, tap }
}

const getImageData = async args => {
  const { globalConfig, task, params } = args

  const image = params.image &&
    await docker.image.get(params.image) ||
    await imageSelect(args)

  // Get the context data for the command to be run
  const containerContext = await buildContainerContext({
    task,
    globalConfig,
    params: { ...params, context: image.rootId },
  })

  // Build the name for the container
  const container = await buildContainerName(containerContext.cmdContext)

  return {
    ...containerContext,
    container,
    tag: image.tag,
    image: image.rootId,
  }

}

/**
 * Maps the defined ports in the ENVS to -p docker argument
 * <br/>This allows those ports to be exposed outside the container
 * @param {Object} envs - Defined environment variables for the container
 *
 * @returns {Array} - ENV ports in docker argument format
 */
const addExposedPorts = envs => {
  return Object.keys(envs).reduce((ports, key) => {
    return key.includes('_PORT')
      ? key === HTTP_PORT_ENV
        ? ports.concat([ `-p 80:${envs[key]}` ])
        : ports.concat([ `-p ${envs[key]}:${envs[key]}` ])
      : ports
  }, [])
}

/**
 * Run a docker image command
 * @param {Object} args - arguments passed from the runTask method
 * @param {string} args.command - Initial command being run
 * @param {Array} args.options - arguments passed from the command line
 * @param {Object} args.tasks - All registered tasks of the CLI
 * @param {Object} globalConfig - Global config object for the keg-cli
 *
 * @returns {void}
 */
const runDockerImage = async args => {
  const { globalConfig, params, task } = args
  const { context, cleanup, entry, log, options } = params

  const imageContext = context
    ? await getImageContext(args)
    : await getImageData(args)

  const { tag, location, contextEnvs, container, image } = imageContext

  let opts = options.concat([ `-it` ])
  cleanup && opts.push(`--rm`)
  opts = opts.concat(addExposedPorts(contextEnvs))

  await docker.image.run({
    tag,
    log,
    opts,
    entry,
    image,
    location,
    envs: contextEnvs,
    name: container,
  })

}

module.exports = {
  run: {
    name: 'run',
    alias: [ 'rn', 'connect', 'con' ],
    action: runDockerImage,
    description: `Run a docker image as a container and auto-conntect to it`,
    example: 'keg docker image run <options>',
    options: {
      context: {
        alias: [ 'name' ],
        description: 'Name of the image to run',
        example: 'keg docker image run --context core'
      },
      cleanup: {
        alias: [ 'clean', 'rm' ],
        description: 'Auto remove the docker container after exiting',
        example: `keg docker image run  --cleanup false`,
        default: true
      },
      image: {
        description: 'Image id of the image to run',
        example: 'keg docker image run --image <id>'
      },
      options: {
        alias: [ 'opts' ],
        description: 'Extra docker run command options',
        example: `keg docker image run --options \\"-p 80:19006 -e MY_ENV=data\\"`,
        default: []
      },
      entry: {
        description: 'Overwrite entry of the image. Use escaped quotes for spaces ( bin/bas h)',
        example: 'keg docker image run --entry \\"node index.js\\"',
        default: '/bin/sh'
      },
      log: {
        description: 'Log the docker run command to the terminal',
        example: 'keg docker image run --log',
        default: false,
      },
      tag: {
        description: 'Tag of the image to be run',
        example: 'keg docker image run --context core --tag updates',
      }
    },
  }
}
