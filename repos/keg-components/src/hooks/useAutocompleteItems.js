import { isEmpty, pipeline, isStr, isObj } from '@keg-hub/jsutils'
import { useState, useMemo } from 'react'

/**
 * @param {string} str
 * @returns {string} str in lower case
 */
const ignoreCase = str => str.toLowerCase()

/**
 * @param {string} str
 * @returns {string} str normalized without accents, so Á is converted to A
 */
const ignoreAccents = str =>
  str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')

/**
 * Formats the menu item to be an object, or null if invalid type
 * @param {Object | String} item
 * @return {Object?} returns null if invalid, otherwise an object in form { key, text }
 */
const formatItem = item => {
  if (isObj(item) && isStr(item.text))
    return item.key ? item : { text: item.text, key: item.text }
  else if (isStr(item)) return { text: item, key: item }
  else return null
}

/**
 *
 * @param {string} text - user input text
 * @param {Object} item - one of the possible autocomplete values, of form { text, key }
 * @return {boolean} true if the text matches the item's text, ignoring casing and accents
 */
const textMatches = (text, item) => {
  const itemComparisonStr = pipeline(item.text, ignoreCase, ignoreAccents)
  const textComparisonStr = pipeline(text, ignoreCase, ignoreAccents)
  return itemComparisonStr.includes(textComparisonStr)
}

/**
 * Returns a new array containing a subset of possibleValues, each of which is:
 *  - unique; and
 *  - either a substring of `text` or the same string.
 * The filtering ignores casing and accents.
 * @param {String} text - text to check (e.g. user input so far)
 * @param {Array<string | Object>} possibleValues - string or object { text, key? } array
 * @returns {Array<Object>} the new array of items, without duplicates
 */
export const getItemsMatchingText = (text, possibleValues) => {
  if (!isStr(text)) return []

  // in one pass: format values, keep the matching ones, and ignore duplicates (by key) and invalid items
  const result = possibleValues.reduce(
    (state, nextItem) => {
      // ensure item is of form { key, text }
      const formattedItem = formatItem(nextItem)

      // invalid item, so just ignore
      if (!formattedItem) return state

      // add the item if it matches the text and we haven't seen its key before
      if (
        textMatches(text, formattedItem) &&
        !state.keys.has(formattedItem.key)
      ) {
        state.keys.add(formattedItem.key)
        state.arr.push(formattedItem)
      }

      return state
    },
    { arr: [], keys: new Set() }
  )

  return result.arr
}

/**
 * Custom hook for acquiring menu items that are filtered based on matches to `text`.
 * @param {String} text - user input
 * @param {Array<string> | Array<object>} menuItems - all menu items
 * @return {Array} - [
 *  autocompleteItems: subset of menuItems that have an overlap with text. These will be formatted to object form.
 *  setSelectedItem: callback to set the currently selected item in the autocomplete component
 *  selectedItem: the currently selected item
 * ]
 */
export const useAutocompleteItems = (text, menuItems) => {
  const [ selectedItem, setSelectedItem ] = useState(null)

  const items = useMemo(
    () =>
      isEmpty(text) || selectedItem?.text === text
        ? []
        : getItemsMatchingText(text, menuItems),
    [ text, menuItems, selectedItem ]
  )

  return [ items, setSelectedItem, selectedItem ]
}
