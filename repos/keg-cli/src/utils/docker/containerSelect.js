const { ask } = require('@keg-hub/ask-it')
const docker = require('KegDocCli')
const { checkCall } = require('@keg-hub/jsutils')
const { throwNoContainers } = require('../error/throwNoContainers')

/**
 * @param {string} labels - all labels stored as a single csv string
 * @return {string} the domain label value
 */
const getDomain = labels => {
  const split = labels 
    ? labels.split(',')
    : []

  const domain = split.reduce((result, next) => {
    if (result) return result
    const [ key, value ] = next.split('=')
    return (key === 'com.keg.proxy.domain')
      ? value
      : result
  }, null)

  // return the domain, or if not found, the proxy's dashboard
  return domain || 'local.kegdev.xyz'
}

/**
 * Prompts user to select a container from the current docker containers
 * @param {function} filter - Method to filter which containers are displayed. Must return array
 *
 * @returns {Object} the selected containers
 */
const containerSelect = async (filter, throwError=true) => {
  const containers = await docker.container.list()

  // If no containers available, then check if we should call throwError
  // Otherwise just return null
  if(!containers.length){
    return throwError
      ? throwNoContainers()
      : null
  }

  // Filter the containers if filter method passed
  const filtered = checkCall(filter, containers) || containers

  // Get a string of each container to print to terminal
  const items = filtered.map(cont => `${cont.name} | ${ cont.image } | ${ getDomain(cont.labels) } | ${ cont.id }`)

  const index = await ask.promptList(
    items,
    'Docker Containers: ( Name | Image | Domain | ID )',
    'Select a container:'
  )

  return containers[index]
}

module.exports = {
  containerSelect
}
