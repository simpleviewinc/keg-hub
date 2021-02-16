import { isEmpty, pipeline, isStr, uniqArr } from '@keg-hub/jsutils'
import { useState, useMemo } from 'react'

/**
 * Returns true if aString includes bString as a substring after applying the functions identified by transformFuncs
 * @param {String} aString
 * @param {String} bString
 * @param {Array} transformFuncs functions which transform aString and bString before the substring check
 * @example stringIncludes("I can say my abcs all day", "ÁBC", [ignoreCase, ignoreAccents]) // returns true
 */
const stringIncludes = (aString, bString, transformFuncs = []) => {
  if (!isStr(aString) || !isStr(bString)) {
    console.error(`args in stringIncludes must be a string. Found: `, {
      aString,
      bString,
    })
    return false
  }
  const resultA = pipeline(aString, ...transformFuncs)
  const resultB = pipeline(bString, ...transformFuncs)
  return resultA.includes(resultB)
}

/** Returns String s in lower case */
const ignoreCase = str => str.toLowerCase()

/** Returns String s normalized without accents, so Á is converted to A*/
const ignoreAccents = str =>
  str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')

/**
 * Returns a new array containing a subset of possibleValues, each of which is:
 *  - unique; and
 *  - either a substring of `text` or the same string.
 *
 * The filter ignores cases and accents.
 * @param {String} text
 * @param {Array} possibleValues - string array
 * @returns - the new array of strings
 */
export const getFilteredStrings = (text, possibleValues) => {
  const isMatch = item =>
    item && stringIncludes(item, text, [ ignoreCase, ignoreAccents ])

  const items = possibleValues.filter(isMatch)

  // remove duplicates
  return uniqArr(items)
}

/**
 *
 * @param {String} text
 * @param {Array<String>} menuItems
 */
const getAutocompleteItems = (text, menuItems) =>
  getFilteredStrings(text, menuItems)
    .map(text => ({ text, key: text }))

/**
 * Custom hook for acquiring menu items that are filtered based on text.
 * @param {String} text
 * @param {Array} menuItems - all menu items
 * @return {Array} - [ autocompleteItems, setSelectedItem, selectedItem ]
 */
export const useAutocompleteItems = (text, menuItems) => {
  // const [ autocompleteItems, setAutocompleteMenuItems ] = useState([])
  // const [ selectedItem, setSelectedItem ] = useState(null)

  // when text changes, update the autocomplete fields
  // useEffect(() => {
  //   // hide the auto complete menu when text is empty or if user selected an item. Otherwise, update menu
  //   isEmpty(text) || selectedItem === text
  //     ? setAutocompleteMenuItems([])
  //     : setAutocompleteMenuItems(getAutocompleteItems(text, menuItems))
  // }, [ text, menuItems, selectedItem ])

  // console.log({ autocompleteItems, menuItems: menuItems.map(v => ({ text: v, key: v})) })

  // return [ autocompleteItems, setSelectedItem, selectedItem ]

  const [ selectedItem, setSelectedItem ] = useState(null)

  const items = useMemo(
    () => isEmpty(text) || selectedItem === text
      ? [] 
      : getAutocompleteItems(text, menuItems), 
    [ text, menuItems, selectedItem ]
  )

  return [ items, setSelectedItem, selectedItem ]
}
