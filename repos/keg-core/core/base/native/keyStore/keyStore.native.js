import * as SecureStore from 'expo-secure-store'
import { BaseStorage } from './baseStorage'
import { limbo } from '@ltipton/jsutils'

/**
 * Storage Class for native. Saves and retrieves data from local storage
 * @class
 */
class Storage extends BaseStorage {
  constructor(props) {
    super(props)
  }

  /**
   * Gets data from local storage by key using getItemAsync provided by expo
   * https://docs.expo.io/versions/v36.0.0/sdk/securestore/
   * @function
   * @param {string} key - Name of the stored value
   * @param {Object} options - See provided link above
   *
   * @returns {Promise} - Will reject if an error occurred while retrieving the value
   */
  getItem = async (key, value, options) => {
    const [ err, response ] = await limbo(SecureStore.getItemAsync(key, options))

    return err ? this.logMessage('error', err.stack) : response
  }

  /**
   * Saves data to local storage by key using setItemAsync provided by expo
   * https://docs.expo.io/versions/v36.0.0/sdk/securestore/
   * @function
   * @param {string} key - Name of the stored value
   * @param {any} value - The value to store. Size limit is 2048 bytes
   * @param {Object} options - See provided link above
   *
   * @returns {Promise} - Will reject if value cannot be stored on the device.
   */
  setItem = async (key, value, options) => {
    const [ err, response ] = await limbo(
      SecureStore.setItemAsync(key, value, options)
    )

    return err ? this.logMessage('error', err.stack) : response
  }

  /**
   * Deletes data from local storage by key using deleteItemAsync provided by expo
   * https://docs.expo.io/versions/v36.0.0/sdk/securestore/
   * @function
   * @param {string} key - Name of the stored value
   * @param {Object} options - See provided link above
   *
   * @returns {Promise} - Will reject if the value couldn't be deleted.
   */
  removeItem = async (key, options) => {
    const [ err, response ] = await limbo(
      SecureStore.deleteItemAsync(key, options)
    )

    return err ? this.logMessage('error', err.stack) : response
  }
}

const KeyStore = new Storage()

export { KeyStore }
