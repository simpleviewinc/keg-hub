import { limbo, isStr, isEmpty, validate } from '@keg-hub/jsutils'
const isDev = process.env.NODE_ENV !== 'production'

/**
 * Helper method to log a warning when a method has not been overwritten
 * @function
 * @param {string} methodName - Name of the method that was not overwritten
 * @param {string} logMessage - Function to log the warning message
 *
 * @returns {null}
 */
const noOverride = (methodName, logMessage) => {
  logMessage(
    `warn`,
    `The ${methodName} method should be overwritten from a child class!`
  )

  return null
}

/**
 * Base Class for the KeyStorage class. Ensures all required methods exist
 * @class
 */
class BaseStorage {
  /**
   * Creates a promise around a passed in function
   * Wraps the promise with limbo to get a consistent response an catch errors
   * @function
   * @param {function} wrappedFn - Function to wrap in a promise
   *
   * @returns {Array} - limbo response array with a length of 2 => [ error, value ]
   */
  createPromise = wrappedFn =>
    // Wrap in limbo to get a consistent response
    limbo(
      new Promise((res, rej) => {
        // Try an call the passed in wrapped function
        try {
          res(wrappedFn())
        }
        catch (err) {
          // Catch any errors and reject the promise
          rej(err)
        }
      })
    )

  /**
   * Validates the key for a storage function
   * @param {*} key
   */
  validateKey = key => {
    const [valid] = validate(
      { key },
      { key: key => isStr(key) && !isEmpty(key) }
    )

    return valid
  }

  /**
   * Logs a message to the console when not in production
   * If passed in type is Error, then throw the error when not in production
   * @function
   * @param {string} [type='warn'] - Type of message to log
   * @param {Any} message - message to be loged
   *
   * @returns {void}
   */
  logMessage = (type = 'log', ...message) => {
    // If we are in production, just return
    if (!isDev) return

    // If it's an error, then Throw
    if (type === 'error') throw new Error(...message)

    // Log all passed in messages message
    console[type](...message)
  }

  /**
   * Placeholder method that should be overwritten by a child class
   * @function
   * @returns {null}
   */
  getItem = async () => noOverride(`getItem`, this.logMessage)

  /**
   * Placeholder method that should be overwritten by a child class
   * @function
   * @returns {null}
   */
  setItem = async () => noOverride(`setItem`, this.logMessage)

  /**
   * Placeholder method that should be overwritten by a child class
   * @function
   * @returns {null}
   */
  removeItem = async () => noOverride(`removeItem`, this.logMessage)
}

export { BaseStorage }
