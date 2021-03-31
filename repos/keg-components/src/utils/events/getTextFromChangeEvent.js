import { getPlatform } from 'KegGetPlatform'
import { get } from '@keg-hub/jsutils'

/**
 * Returns the text value from the event object in an onChange callback for input.
 * The text is a different path/property depending on the platform.
 * @param {Object} event
 */
export const getTextFromChangeEvent = event => {
  const isWeb = getPlatform() === 'web'
  return isWeb
    ? get(event, 'target.value') // web
    : get(event, 'nativeEvent.text') // native
}
