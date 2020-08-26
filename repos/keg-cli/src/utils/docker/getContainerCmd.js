const { get } = require('@svkeg/jsutils')
const docker = require('KegDocCli')
const { DOCKER } = require('KegConst/docker')
const { getContainerConst } = require('./getContainerConst')
const { throwNoDockerImg } = require('../error/throwNoDockerImg')

/**
 * Removes the [] in from the Docker container cmd returned from the docker cli
 * @param {string} cmd - Command returned from the CLI
 *
 * @returns {string} - Cleaned Docker container command
 */
const cleanCmd = cmd => {
  const cleaned = cmd[0] === '[' ? cmd.substr(1) : cmd
  return cleaned[ cleaned.length -1 ] === ']'
    ? cleaned.slice(0, -1)
    : cleaned
}

/**
 * Finds the docker CMD for the container
 * @param {string} args.image - Name of the docker image to get the command from
 * @param {string} args.context - Docker container context
 *
 * @returns {string} - Docker container command
 */
const getContainerCmd = async args => {
  const { image, context } = args
  const imgRef = image || (context && getContainerConst(context, `ENV.IMAGE`))
  !imgRef && throwNoDockerImg(image || context)

  const cmd = await docker.image.getCmd({ image: imgRef })

  return cmd && cleanCmd(cmd.replace('\n', ''))

}

module.exports = {
  getContainerCmd
}
