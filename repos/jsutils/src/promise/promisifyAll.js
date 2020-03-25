/** @module promise */

import { isObj } from '../object/isObj'
import { isFunc } from '../method/isFunc'
import { promisify } from './promisify'

/**
 * Creates an array of Object default properties not to convert into promises
 * @ignore
 */
const defObjProps = Array
  .from([
    'caller',
    'callee',
    'arguments',
    'apply',
    'bind',
    'call',
    'toString',
    '__proto__',
    '__defineGetter__',
    '__defineSetter__',
    'hasOwnProperty',
    '__lookupGetter__',
    '__lookupSetter__',
    'isPrototypeOf',
    'propertyIsEnumerable',
    'valueOf',
    'toLocaleString'
  ])
  .concat(Object.getOwnPropertyNames(Object.prototype))
  .reduce((map, functionName) => {
    map[functionName] = true
    return map
  }, {})

/**
 * Loops an object and looks for any methods that belong to the object, then add an Async version
 * @memberof promise
 * @param {Object} object
 * @return {Object} - object with Async methods added
 */
const addAsync = object => {
  if (!object.__IS_PROMISIFIED__) {
    for (const prop of Object.getOwnPropertyNames(object)) {
      const isAsync = prop.indexOf('Async') !== -1 || object[`${prop}Async`]
      if (isAsync || defObjProps[prop]) continue

      if(isFunc(object[prop]))
        object[`${prop}Async`] = promisify(object[prop])
      else {
        const getValue = Object.getOwnPropertyDescriptor(object, prop).get
        if(isFunc(getValue)) object[`${prop}Async`] = promisify(getValue)
      }
    }
    object.__IS_PROMISIFIED__ = true
  }

  return object
}

/**
 * Converts Objects method properties into promiseAsync. allow using promisifyAll
 * @function
 * @param {Object} object
 * @return {Object} - promisified object
 */
export const promisifyAll = object => {
  if(!isObj(object)) return object

  addAsync(object)
  const proto = Object.getPrototypeOf(object)

  proto &&
    Object.getPrototypeOf(proto) !== null &&
    addAsync(proto)

  return object
}
