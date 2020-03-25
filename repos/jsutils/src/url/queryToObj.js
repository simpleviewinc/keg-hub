/** @module url */

import { isArr } from '../array/isArr'

/**
 * takes a raw querystring input and converts it to an object
 * @param {String} string - querystring to parse into an object
 * @function
 * @returns {Object}
 */
export const queryToObj = string => {

  const currentQueryItems = {}
  const stringSplit = string.split('?')
  const querystring = stringSplit[ stringSplit.length -1 ]
  
  if(!querystring) return currentQueryItems

  const split = querystring.split('&')

  split.length &&
    split.map(item => {

      const components = item.split('=')
      if (components.length <= 1) return currentQueryItems

      // split on the first instance of '=', so we join the rest if any
      const itemSplit = [components.shift(), components.join('=')]

      if (itemSplit.length === 2) {
        
        // if the value contains special char ',' then make it into an array
        const array = decodeURIComponent(itemSplit[1]).split(',')
        if (array && array.length > 1)
          currentQueryItems[itemSplit[0]] = array
        
        // check if key already exists
        else if (itemSplit[0] in currentQueryItems) {
           // convert to array or append to it
           const val = currentQueryItems[itemSplit[0]]
           currentQueryItems[itemSplit[0]] = isArr(val) 
             ? val.push(decodeURIComponent(itemSplit[1])) 
             : [val, decodeURIComponent(itemSplit[1])]        
        }
        else
          currentQueryItems[itemSplit[0]] = decodeURIComponent(itemSplit[1])
      }
    })

  return currentQueryItems
}
