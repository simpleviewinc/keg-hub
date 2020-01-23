import * as BaseContainers from 'SVContainers'
import { navigation } from 'SVAppConfig'
import { Values } from 'SVConstants'

/**
 * @summary gets the component that's tied to the passed in Key. Returns fallback container if no match found
 *
 * @param {String} key - containerKey. Refer to containerKeyMaps.json
 * @param {Object} containers - list of containers to check against. Default Base Containers
 * @param {String} defaultContainerName - default container to show if mapping DNE
 *
 * @returns {React.Component}
 */
export const getComponentWithKey = (
  key,
  containers = BaseContainers,
  defaultContainerName
) => {
  // find the container mapped to the containerKey
  const keyMap = navigation.containerMaps.find(obj => obj['key'] === key)

  // configure the Component
  return !keyMap
    ? defaultContainerName && defaultContainerName in containers
      ? containers[defaultContainerName]
      : containers[Values.PageNotFoundContainer]
    : containers[keyMap.container]
}
