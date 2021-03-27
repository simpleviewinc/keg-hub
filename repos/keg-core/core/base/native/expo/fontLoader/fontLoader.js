import * as Font from 'expo-font'
import { isObj } from '@keg-hub/jsutils'

/**
 * Storage Class for native. Saves and retrieves data from local storage
 * @function
 * @param {Object} fontData - Object matching the format of expo-fonts loadAsync method
 * More information here 
 * https://docs.expo.io/versions/latest/sdk/font/
 */
export const fontLoader = async fontData => {
  let fontLoaded = true

  return !isObj(fontData)
    ? false
    : await Font.loadAsync(fontData)
        .catch(err => {
          console.error(err.message)
          fontLoaded = false
        })
        .finally(() => fontLoaded)
}