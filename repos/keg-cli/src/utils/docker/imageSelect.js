const { ask } = require('@keg-hub/ask-it')
const docker = require('KegDocCli')
/**
 * Prompts user to select a container from the current docker containers
 *
 * @returns {Object} the selected containers
 */
const imageSelect = async () => {
  const images = await docker.image.list()
  if(!images.length) return

  const items = images.map(img => `${img.rootId} | ${ img.repository } | ${ img.tag } | ${ img.id }`)
  const index = await ask.promptList(
    items,
    'Docker Images: ( Root ID | Repository | Tag | ID )',
    'Select an Image:'
  )

  return images[index]
}

module.exports = {
  imageSelect
}
