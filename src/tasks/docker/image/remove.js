const { get } = require('jsutils')
const { throwRequired, generalError } = require('KegUtils/error')
const { getPathFromConfig, getTapPath } = require('KegUtils/globalConfig')
const { spawnCmd, executeCmd } = require('KegProc')
const { BUILD } = require('KegConst/docker/build')
const docker = require('KegDocApi')

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
const removeDockerImage = async args => {
  const { params } = args
  const { name, force } = params

  // Ensure we have an image to remove by checking for a mapped name, or use original
  const imgName = get(BUILD, `${name && name.toUpperCase()}.ENV.IMAGE`, name)
  !imgName && generalError(`The docker "image remove" command requires a name argument!`)

  // Get the image meta data
  const image = await docker.image.get(imgName)

  // Ensure we have the image meta data, and try to remove by imageId
  ;!image || !image.imageId
    ? generalError(`The docker image "${ imgName }" does not exist!`)
    : await docker.image.remove(`${ image.imageId } ${ force ? `--force` : '' }`.trim())

}

module.exports = {
  remove: {
    name: 'remove',
    alias: [ 'rm', 'rmi' ],
    action: removeDockerImage,
    description: `Remove docker image by name`,
    example: 'keg docker image remove <options>',
    options: {
      name: {
        description: 'Name of the container to run the command on',
        example: 'keg docker image remove --name core',
      },
      force: {
        description: 'Add the force argument to the docker command',
        example: 'keg docker image remove --force ',
      },
    },
  }
}
