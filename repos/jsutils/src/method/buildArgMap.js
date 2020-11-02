/** @module functions */

import { isArr } from '../array/isArr'
import { isObj } from '../object/isObj'
import { exists } from '../ext/exists'

/**
 * Helper for buildArgMap, validating function input is an array or Arguments object
 * @param {*} args 
 * @return {boolean} true if valid
 */
const validateArgs = (args) => {
  // check if is an array or if it's an Arguments object
  if (isArr(args) || (isObj(args) && exists(args.length))) return true

  console.error('Args must be an array or array-like.\nFound: ', typeof args, args)
  return false
}

// a symbol that uniquely identifies that a branch of the 
// array map tree is a "leaf", meaning it holds the
// a value of an inserted array (the key)
const leafId = Symbol()

/**
 * Returns an instance of a map-like object that can accept arrays as keys. 
 * It uses shallow comparisons of each element in the array, so even if two arrays 
 * are not referentially equal, they would still map to the same value, 
 * provided that their elements (at same indices) are shallow equal 
 * @function
 * @example
 * const map = buildArgMap()
 * const args = [ 1, { a: 1 }, 'hi' ]
 * map.set(args, 5)
 * map.get([ 1, args[1], 'hi']) // 5
 * map.set(args, 5)
 * map.has([1]) // false
 * map.has(args) // true
 * map.size // 1
 */
export const buildArgMap = () => {

  // use a standard JS map so we can insert reference types too
  const argMap = new Map()

  return {
    /**
     * Sets the value in the map, using the args array as its key
     * @param {Array | Arguments} args
     * @param {*} value
     * @return {boolean} true if the set was successful
     */
    set: (args, value) => {
      if (!validateArgs(args)) return false

      if (args.length === 0) {
        argMap.set(leafId, value)
        return true
      }

      let currentMap = argMap
      for (let i = 0; i < args.length; i++) {
        const key = args[i]

        !currentMap.has(key) && currentMap.set(key, new Map())

        currentMap = currentMap.get(key)
      }

      // the current map is now the final branch, so we can set the value using
      // the leaf symbol
      currentMap.set(leafId, value)

      return true
    },

    /**
     * @param {Array | Arguments} args
     * @return {boolean} true if the map has a value stored for the args array
     * or undefined if the input is invalid
     */
    has: args => {

      if (!validateArgs(args)) return undefined

      let currentMap = argMap

      for (let i = 0; i < args.length; i++) {
        const key = args[i]
        if (!currentMap.has(key)) return false
        currentMap = currentMap.get(key)
      } 

      return currentMap.has(leafId)
    },

    /**
     * @param {Array | Arguments} args
     * @return {*} the stored value, as identified by the args array key
     * or undefined if input is invalid
     */
    get: args => {
      if (!validateArgs(args)) return undefined

      if (args.length === 0)
        return argMap.get(leafId)

      let currentMap = argMap
      let next = null

      for (let i = 0; i < args.length; i++) {
        const key = args[i]
        next = currentMap.get(key)
        if (!isObj(next)) return undefined

        const isEnd = i === (args.length - 1)
        if (isEnd) return next?.get(leafId)
        else (currentMap = next)
      }
    },
    get size () { return argMap.size },
    toString: () => JSON.stringify(argMap),
  }
}

