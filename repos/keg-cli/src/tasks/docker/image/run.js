
const docker = require('KegDocCli')
const { get } = require('@keg-hub/jsutils')
const { CONTAINERS } = require('KegConst/docker/containers')
const { imageSelect } = require('KegUtils/docker/imageSelect')
const { removeLabels } = require('KegUtils/docker/removeLabels')
const { CONTAINER_PREFIXES } = require('KegConst/constants')
const { throwDupContainerName } = require('KegUtils/error/throwDupContainerName')
const { buildContainerContext } = require('KegUtils/builders/buildContainerContext')
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

const getImageTag = ({ context, image, tag }) => {
  return context && context.includes(':')
    ? context.split(':')
    : [context, tag]
}

const getImageContext = async (args, image, tag) => {
  const { globalConfig, params, task } = args

  // Get the context data for the command to be run
  const imageContext = await buildContainerContext({
    task,
    globalConfig,
    params: { ...params, image, tag },
  })

  // Build the name for the container
  const container = await buildContainerName(imageContext.cmdContext)

  return {
    ...imageContext,
    container,
    tag : imageContext.tag,
    image: imageContext.rootId,
  }
}

const getImageData = async (args, imageName, tag) => {
  const { globalConfig, task, params } = args

  const image = (params.image || imageName) &&
    await docker.image.get(params.image || imageName) ||
    await imageSelect(args)

  // Get the context data for the command to be run
  const imageContext = await buildContainerContext({
    task,
    globalConfig,
    params: { ...params, context: image.rootId },
  })

  // Build the name for the container
  const container = await buildContainerName(imageContext.cmdContext)

  return {
    ...imageContext,
    container,
    tag: image.tag | tag,
    image: image.rootId,
  }

}

/**
 * Called when the container to run already exists
 * Default is to throw an error, unless skipError is true
 * @param {string} container - Name of container that exists
 * @param {Object} exists - Container json object data
 * @param {Object} imageContext - Meta data about the image to be run
 * @param {boolean} skipError - True the throwing an error should be skipped
 *
 * @returns {Object} - Joined imageContext and exists object
 */
const handelContainerExists = (container, exists, imageContext, skipExists) => {
  return skipExists
    ? { ...imageContext, ...exists, }
    : throwDupContainerName(container)
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
  const { globalConfig, params, task, __internal={} } = args
  const { context, connect, cleanup, cmd, entry, log, network, options, volumes } = params
  const [imageName, tagName] = getImageTag(params)

  const imageContext = context
    ? await getImageContext(args, imageName, tagName)
    : await getImageData(args, imageName, tagName)

  const { tag, location, contextEnvs, container, image } = imageContext

  const exists = await docker.container.get(container)

  if(exists)
    return handelContainerExists(
      container,
      exists,
      imageContext,
      __internal.skipExists
    )

  let opts = connect
    ? options.concat([ `-it` ])
    : options.concat([ `-d` ])

  cleanup && opts.push(`--rm`)
  entry && opts.push(`--entrypoint ${ entry }`)

  // Clear out the docker-compose labels, so it does not think it controls this container
  opts = await removeLabels(image, 'com.docker.compose', opts)

  await docker.image.run({
    tag,
    log,
    opts,
    entry: cmd,
    image,
    location,
    envs: contextEnvs,
    name: container,
  })

  const runningContainer = await docker.container.get(container)
  return runningContainer
    ? { ...imageContext, ...runningContainer }
    : imageContext

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
      connect: {
        alias: [ 'conn', 'con', 'it' ],
        description: 'Auto connects to the docker containers stdio',
        example: 'keg docker image run --connect false',
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
      cmd: {
        alias: [ 'command', 'entry' ],
        description: 'Overwrite entry of the image. Use escaped quotes for spaces ( bin/bash )',
        example: 'keg docker image run --cmd \\"node index.js\\"',
        default: '/bin/bash'
      },
      entry: {
        alias: [ 'entrypoint', 'ent' ],
        description: 'Overwrite ENTRYPOINT of the image. Use escaped quotes for spaces ( bin/bash)',
        example: 'keg tap run --entry node'
      },
      log: {
        description: 'Log the docker run command to the terminal',
        example: 'keg docker image run --log',
        default: false,
      },
      network: {
        alias: [ 'net' ],
        description: 'Set the docker run --network option to this value',
        example: 'keg docker package run --network host'
      },
      tag: {
        description: 'Tag of the image to be run',
        example: 'keg docker image run --context core --tag updates',
      },
      volumes: {
        description: 'Mount the local volumes defined in the docker-compose config.yml.',
        example: 'keg docker package run --volumes false',
        default: true
      },
    },
  }
}
