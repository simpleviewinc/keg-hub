import { BaseStorage } from './baseStorage'

/**
 * Storage Class for web. Saves and retrieves data from local storage
 * @class
 */
class Storage extends BaseStorage {

  constructor(props){
    super(props)
  }

  /**
  * Gets data from local storage by key using window.localStorage
  * @function
  * @param {string} key - Name of the stored value
  *
  * @returns {Promise} - Will reject if an error occurred while retrieving the value
  */
  getItem = async key => {
    const [ err, response ] = await this.createPromise(
      () => window.localStorage.getItem(key)
    )

    return err
      ? this.logMessage('error', err.stack)
      : response
  }

  /**
  * Saves data to local storage by key using using window.localStorage
  * @function
  * @param {string} key - Name of the stored value
  * @param {any} value - The value to store. Size limit is 2048 bytes
  *
  * @returns {Promise} - Will reject if value cannot be stored on the device.
  */
  setItem = async (key, value) => {
    const [ err, response ] = await this.createPromise(
      () => window.localStorage.setItem(key, value)
    )

    return err
      ? this.logMessage('error', err.stack)
      : true
  }

  /**
  * Deletes data from local storage by key using window.localStorage
  * @function
  * @param {string} key - Name of the stored value
  *
  * @returns {Promise} - Will reject if the key / value couldn't be deleted.
  */
  removeItem = async key => {
    const [ err, response ] = await this.createPromise(
      () => window.localStorage.removeItem(key)
    )

    return err
      ? this.logMessage('error', err.stack)
      : true
  }

}

const KeyStore = new Storage()

export {
  KeyStore
}
