import { KeyStore } from 'KegNative/keyStore'
import { ActionTypes, Values } from 'KegConstants'
import { get, exists, eitherArr, isStr } from '@keg-hub/jsutils'

const {
  Plugins: {
    LocalStorage: { LOADED_FROM_STORAGE },
  },
} = Values

// action types to which the plugin responds
const updateTypes = new Set([
  ActionTypes.UPSERT_ITEMS,
  ActionTypes.UPSERT_ITEM,
  ActionTypes.SET_ITEM,
  ActionTypes.SET_ITEMS,
  ActionTypes.REMOVE_ITEM,
])

/**
 * Helper for logging errors in the plugin
 * @param {string} msg
 */
const logError = msg => console.error(`Plugins - LocalStorage: ${msg}`)

/**
 * @param {object} action
 * @returns { boolean } true if the action payload should be persisted to local storage
 */
const shouldPersistPayload = action =>
  !action[LOADED_FROM_STORAGE] &&
  updateTypes.has(action.type) &&
  get(action, 'payload.plugins.localStorage.persist')

/**
 * Removes or stores the item path(s) specified in action.plugins.persist from localStorage.
 * @param {Object} params
 * @param {Object} params.action
 * @param {(string || Array<string>)?} params.action.plugins.persist - the path or paths to persist from the item(s)
 */
export const LocalStorage = ({ action = {} } = {}) => {
  if (!shouldPersistPayload(action)) return { action }

  const { type, payload = {} } = action
  const { item, items, plugins } = payload
  const data = payload.key ? item : items

  const persistValue = plugins?.localStorage?.persist
  const paths = eitherArr(persistValue, [persistValue])

  paths.map(path => {
    if (!isStr(path) || !path.length)
      return logError(
        `Invalid path to ${
          type === ActionTypes.REMOVE_ITEM ? 'remove' : 'persist'
        }: "${path}"`
      )

    // if the user defined a specific property in the path to persist (e.g. 'dayNumber'
    // in the path 'settings.agenda.dayNumber'), we need to extract the value for that
    // property from the item/items and store that in local storage
    const [ pathCategory, pathKey, ...propertyKeys ] = path.split('.')

    // if category does not match payload, or if the path contains a key that does not match
    // the payload, we should not persist.
    if (
      pathCategory !== payload.category ||
      (exists(pathKey) && pathKey !== payload.key)
    )
      return logError(
        `Persist path must start with the same category and key as the payload.\n
        payload category and key:  "${payload.category}.${payload.key}"\n
        payload.plugins.localStorage.persist: "${path}"`
      )

    // extract the value -- if no property keys are set, then this just returns the item(s)
    const value = get(data, propertyKeys, data)

    // remove or store the value, depending on the action type
    return type === ActionTypes.REMOVE_ITEM
      ? KeyStore.removeItem(path)
      : KeyStore.setItem(path, JSON.stringify(value))
  })

  return { action }
}
