const { ask } = require('KegQuestions')
const docker = require('KegDocCli')
/**
 * Prompts user to select a container from the current docker containers
 *
 * @returns {Object} the selected containers
 */
const containerSelect = async () => {
  const containers = await docker.container.list()
  const items = containers.map(cont => `${cont.names} | ${ cont.image } | ${ cont.id }`)
  const index = await ask.promptList(
    items,
    'Docker Containers: ( Name | Image | ID )',
    'Select a container:'
  )

  return containers[index]
}

module.exports = {
  containerSelect
}
