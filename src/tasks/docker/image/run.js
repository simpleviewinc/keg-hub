
const { get } = require('jsutils')
const { spawnCmd } = require('KegProc')
const { buildLocationContext } = require('KegUtils/builders')
const { CONTAINERS } = require('KegConst/docker/containers')
const docker = require('KegDocCli')

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
  const { name, entry, cleanup } = params

  // Set the context as the name, becuase it's needed in buildLocationContext helper
  params.context = params.context || name

  const imgName = get(CONTAINERS, `${name && name.toUpperCase()}.ENV.IMAGE`, name)

  // Get the context data for the command to be run
  const { cmdContext, contextEnvs, location, tap } = await buildLocationContext({
    globalConfig,
    task,
    params,
  })

  // TODO: IF exists, then ask user to either remove running container or rename the new container
  const imgContainer = `img-${imgName}`
  const exists = await docker.container.exists(
    imgContainer,
    container => container.names === imgContainer,
    'json'
  )

  const opts = [ `-it` ]
  cleanup && opts.push(`--rm`)

  await docker.image.run({
    opts,
    entry,
    location,
    envs: contextEnvs,
    name: `img-${imgName}`,
    image: imgName,
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
      name: {
        description: 'Name of the image to run',
        example: 'keg docker image run --name core',
        default: 'core'
      },
      cleanup: {
        description: 'Auto remove the docker container after exiting',
        example: `keg docker image run  --cleanup false`,
        default: true
      },
      entry: {
        description: 'Overwrite entry of the image. Use escaped quotes for spaces ( bin/bas h)',
        example: 'keg docker image run --entry \\"node index.js\\"',
        default: '/bin/bash'
      },
    },
  }
}
