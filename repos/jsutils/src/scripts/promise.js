/** @module promise */

'use strict'

import { isObj } from './object'
import { isFunc } from './method'

/**
 * Converts a standard callback method into Promise
 * @param {function} method - method to turn into a promise
 * @return method as a promise
 */
export const promisify = method => {
  if(!isFunc(method)) throw `Argument must be a function`

  return (...args) => {
    return new Promise((res, rej) => {
      // If the last arg is not a function, just return the resolved method
      if(!isFunc(args[args.length -1]))
        return res(method(...args))

      // Remove the callback method
      args.pop()
      // Replace it with the promise resolve / reject
      args.push((...cbData) => {
        // If the cbData first arg is not falsy, then reject the promise
        // Otherwise resolve it
        return cbData && cbData[0]
          ? rej(...cbData)
          : res(...cbData)
      })

      // Call the method, and return it
      return method(...args)
    })
  }
}


const isTest = process.env.NODE_ENV === 'test'

/**
 * Creates an array of Object default properties not to convert into promises
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
    'toString',
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

/**
 * Stops execution for a given amount of time
 * @function
 * @param {number} time - Amount of time to wait
 * @return { void }
 */
export const wait = time => (new Promise((res, rej) => setTimeout(() => res(true), time)))