import { KeyStore } from 'KegNative/keyStore'
import { validate, get, set } from '@keg-hub/jsutils'
import { isValidStoragePath, isValidKeyStore } from './validators'
import { upsert } from 'KegActions/items'
import { Values } from 'KegConstants'

const { LOADED_FROM_STORAGE } = Values.Plugins?.LocalStorage

/**
 * Attempts to parse the value pulled from localStorage.
 * @param {string} path
 * @param {string} localStorageValue
 * @returns {*} the parsed value, or null if unparseable
 */
const parseValue = (path, localStorageValue) => {
  let parsedValue
  try {
    parsedValue = JSON.parse(localStorageValue)
  }
  catch (err) {
    console.warn('Could not parse local storage for path', path, '\n\t', err)
    parsedValue = undefined
  }

  !parsedValue &&
    console.warn(
      `Path "${path}" contained no value in localStorage, so nothing is loaded`
    )

  return parsedValue
}

/**
 * Builds an item object for loadFromLocalStorage.
 * Uses the keys with the value, if keys exist, otherwise just returns value
 * @param {Array<string>} keys
 * @param {*} value
 * @example
 * buildItem(['a', 'b'], 55) -> { a: { b: 55 }}
 * buildItem([], 55) -> 55
 */
const buildItem = (keys, value) => {
  const itemPathValue = get(value, keys, value)
  return keys.length ? set({}, keys, itemPathValue) : value
}

/**
 * Loads a path from localStorage, then calls onLoad with item category, key, and data
 * onLoad defaults to upserting the loaded data into the items store
 * @param {Object} params
 * @param {string} params.path - path to value in localStorage and items store tree. Example: 'users.adam', where 'users' is the items category and 'adam' is the key
 * @param {Object?} params.storage - an instance of the Storage class defined in keg-core, with getItem/setItem functions for localStorage
 * @param {Function?} params.onLoad - callback for loaded data from local storage, of form: ({ category, key, item, items, meta }) => { ... }. Defaults to updating the store.
 * @return {void}
 */
export const loadFromLocalStorage = async (params = {}) => {
  const { path, storage = KeyStore, onLoad = upsert } = params

  const [valid] = validate(
    { path, storage },
    {
      path: isValidStoragePath,
      storage: isValidKeyStore,
    }
  )
  if (!valid) return Promise.reject('Invalid input')

  // destructure out the category, key, and property path from the path string
  const [ category, key, ...propertyKeys ] = path.split('.')

  // get the data from local storage
  const localStorageValue = await storage.getItem(path)

  // parse it, since it was stored as a string
  const parsedValue = parseValue(path, localStorageValue)

  // if no value is stored, there is nothing to load, so return
  if (!parsedValue) return Promise.resolve()

  const item = key && buildItem(propertyKeys, parsedValue)
  const items = !key && parsedValue

  // call the callback, which by default will upsert the item or items into the items store
  onLoad({
    category,
    key,
    item,
    items,
    meta: { [LOADED_FROM_STORAGE]: true },
  })
}
