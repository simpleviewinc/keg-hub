import { useCallback, useMemo } from 'react'
import { uniqArr, identity, pipeline } from '@keg-hub/jsutils'

/**
 * //TODO: add to jsutils
 * Helper for userExternalSet. 
 * Returns a new array containing all the elements of `array`, except for `element`
 * 
 * @param {Array<*>} array
 * @param {*} element
 * @param {Function?} selector - optional fn returning a property of an element to compare for omission
 * @returns {Array} subset of array without element
 */
const omitElement = (array, element, selector=identity) => {
  const id = selector(element)

  return array?.reduce((result, next) => {
    // only include the next item in the result array if it is not equal to
    // the `element` (checking using the selector function)
    selector(next) === id &&
      result.push(next)

    return result
  }, [])
}

const isMember = (arr, element, selector=identity) => {
  const id = selector(element)
  return arr?.some(
    item => selector(item) === id
  )
}

/**
 * Provides a set-like interface to an external array `arr`.
 * If it determines a mutation needs to occur, it will call `setArr` with
 * the a new array that has the mutation applied.
 * 
 * By default, useExternalSet determines if an element exists in the set
 * using reference equality. If you would like to use a different method,
 * pass in your own comparison function.
 * 
 * 
 * @param {Array} arr
 * @param {Function} setArr
 * @param {Function?} comparisonFn - optional fn to used to check element membership. 
 *  Must have signature: (elementToCheck, existingElement) => boolean (is equal)
 *  Usually only necessary for non-primitive types.
 * @returns {Object} set-like interface to arr
 * 
 * @example
 * const users = useSelector(store => store.items.userIds) 
 * const usersSet = useExternalSet(users, setUsersInStore, (a, b) => a.id === b.id)
 * usersSet.data // === [ { id: '1' }, { id: '2'}, { id: '3'} ]
 * usersSet.delete({ id: '4'}) // does nothing, since the id doesn't exist
 * usersSet.add({ id: '4' }) // calls setUsersInStore with an array including additional user with id 4
 * usersSet.has({ id: '4' }) // true
 * usersSet.add({ id: '4' }) // does nothing
 * usersSet.delete({ id: '4' }) // calls setUsersInStore with an array that omits user id 4
 */
export const useExternalSet = (arr, setArr, selector) => {

  // checks if arr contains the element, using the comparisonFn if defined
  const contains = useCallback(
    (arr, element) => isMember(arr, element, selector),
    [ selector ],
  )

  return useMemo(
    () => ({
      // access to the underlying array
      data: arr,

      /**
       * Adds the element to the set, if it doesn't exist, else does nothing
       * @param {*} element - to add
       * @returns {boolean} true if an element was added to the set
       */
      add: element => {
        if (!arr || contains(arr, element)) return false
        pipeline(
          [ ...arr, element ], 
          (_ => uniqArr(_, selector)),
          setArr
        )
        return true
      },

      /**
       * Deletes the element from the set, if it existed, else does nothing
       * @param {*} element - to remove
       * @returns {boolean} true if an element was deleted from the set
       */
      delete: element => {
        if (!contains(arr, element)) return false
        pipeline(omitElement(arr, element, selector), setArr)
        return true
      },

      /**
       * @param {*} element - to check if present
       * @returns {boolean} true if element exists in the set
       */
      has: element => contains(arr, element, selector),

    }),
    [ arr, setArr, contains ]
  )
}