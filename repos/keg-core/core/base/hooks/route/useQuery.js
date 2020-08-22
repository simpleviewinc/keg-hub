import { useLocation } from 'SVComponents/router/router'
import { queryToObj, get } from '@ltipton/jsutils'
import { useState, useEffect } from 'react'

/**
 * Returns the querystring object OR the value of a given key. searches the current active route/path
 * @param {String=} key - optional key from the querystring of the current route/path
 *
 * @returns {String|Object} - value of the given key, or 'null' if it doesn't exist || object mapping of querystring
 */
export const useQuery = key => {
  const [ value, setValue ] = useState(null)
  const routeLocation = useLocation()

  // calls only when routeLocation changes
  useEffect(() => {
    // get the value of from querystring if possible
    const path = (routeLocation && routeLocation.search) || ''

    const obj = queryToObj(path)
    // val is a string if key is passed in, otherwise its an obj from querystring
    const val = key ? get(obj, [key], null) : obj

    setValue(val)
  }, [routeLocation.search])

  return value
}
