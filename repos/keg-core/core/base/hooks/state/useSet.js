import { useState } from 'react'
import { useExternalSet } from './useExternalSet'

/**
 * Stores elements as react state, while also ensuring no duplicates.
 * Returns a set-like object
 * @param {Array<*>} initialData
 * @param {Function?} selector (@see: `useExternalSet` selector docs)
 * @return {Object} set-like object, with methods `add`, `has`, `delete`. To access the underlying
 * data, use the `data` property (which returns an array). Calling one of the mutation functions, add or delete,
 * **may** initiate a react state update, rerendering any components depending on `data`.
 * No state updates are queued if you try to add an element that already exists or delete an element that doesn't.
 *
 * @example
 * const initialUsers = [ { name: 'Steve' } ]
 * const users = useSet(initialUsers, usr => usr.name)
 * users.data // [ { name: 'Steve' } ]
 * users.has(initialUsers[0]) // true
 * users.delete(initialUsers[0]) // true
 * users.data // rerenders with []
 * users.add({ name: 'Bob' }) // true
 * users.add({ name: 'Bob' }) // false
 * users.data // rerenders with [{ name: 'Bob' }]
 */
export const useSet = (initialData = [], selector) => {
  const [ data, setData ] = useState(initialData)
  return useExternalSet(data, setData, selector)
}
