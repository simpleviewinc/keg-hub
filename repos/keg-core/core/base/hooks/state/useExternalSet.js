import { useCallback, useMemo } from 'react'
import { uniqArr, identity, pipeline } from '@keg-hub/jsutils'

/**
 * Helper for `useExternalSet`, checking if element
 * is a member of `arr`, using the `selector` to
 * get the right comparison value.
 * @param {Array<*>} arr
 * @param {*} element
 * @param {Function?} selector - gets the prop to compare the elements with
 */
const isMember = (arr, element, selector = identity) => {
  const id = selector(element)
  return arr?.some(item => selector(item) === id)
}

/**
 * Provides a set-like interface to an external array `arr`.
 * If it determines a mutation needs to occur, it will call `setArr` with
 * the a new array that has the mutation applied.
 *
 * By default, useExternalSet determines if an element exists in the set
 * using reference equality. If you would like to use a different method,
 * pass in your own selector function.
 *
 *
 * @param {Array} arr
 * @param {Function} setArr
 * @param {Function?} selector - optional fn to used to get the primitive property for checking element membership.
 *  Usually only necessary for reference types. Should have signature (element) => <some primitive property>
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
export const useExternalSet = (arr, setArr, selector = identity) => {
  // checks if arr contains the element, using the comparisonFn if defined
  const contains = useCallback(
    (arr, element) => isMember(arr, element, selector),
    [selector]
  )

  return useMemo(
    () => ({
      /**
       * Provides access to the underlying array. Components using this
       * may rerender when mutations are requested with add or delete
       */
      data: arr,

      /**
       * Adds the element to the set, if it doesn't exist, else does nothing
       * @param {*} element - to add
       * @returns {boolean} true if an element was added to the set
       */
      add: element => {
        if (!arr || contains(arr, element)) return false
        pipeline([ ...arr, element ], _ => uniqArr(_, selector), setArr)
        return true
      },

      /**
       * Deletes the element from the set, if it existed, else does nothing
       * @param {*} element - to remove
       * @returns {boolean} true if an element was deleted from the set
       */
      delete: element => {
        if (!contains(arr, element)) return false
        pipeline(
          arr.filter(x => selector(x) !== selector(element)),
          setArr
        )
        return true
      },

      /**
       * Clears the set of all elements
       */
      clear: () => {
        setArr([])
      },

      /**
       * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/entries
       */
      entries: () => arr.map(element => [ element, element ]),

      /**
       * Helper to iterate over each element
       */
      forEach: fn => arr.forEach(fn),

      /**
       * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/values
       */
      values: () => arr.values(),

      /**
       * Allows iteration
       * @example
       * const vals = useExternalSet(...)
       * for (const element of vals) { ... }
       */
      [Symbol.iterator]: () => arr.values(),

      /**
       * @param {*} element - to check if present
       * @returns {boolean} true if element exists in the set
       */
      has: element => contains(arr, element, selector),
    }),
    [ arr, setArr, contains ]
  )
}
