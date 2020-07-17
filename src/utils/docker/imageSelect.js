const { ask } = require('askIt')
const docker = require('KegDocCli')
/**
 * Prompts user to select a container from the current docker containers
 *
 * @returns {Object} the selected containers
 */
const imageSelect = async () => {
  const images = await docker.image.list()
  if(!images.length) return

  const items = images.map(img => `${img.rootId} | ${ img.repository } | ${ img.id }`)
  const index = await ask.promptList(
    items,
    'Docker Images: ( Root ID | Repository | ID )',
    'Select an Image:'
  )

  return images[index]
}

module.exports = {
  imageSelect
}
