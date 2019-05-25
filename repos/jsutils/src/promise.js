'use strict'

import { isObj } from './object'
import { isFunc } from './method'

const promisifyFill = method => {
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

const promisify = typeof window === 'undefined'
  ? require('util').promisify
  : promisifyFill

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
 * @param  { object } object
 *
 * @return { object } - object with Async methods added
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
 * Converts Objects method properties into promiseAsync
 * allow using promisifyAll
 *
 * @param  { object } object
 *
 * @return { object } - promisified object
 */
const promisifyAll = object => {
  if(!isObj(object)) return object

  addAsync(object)
  const proto = Object.getPrototypeOf(object)

  proto &&
    Object.getPrototypeOf(proto) !== null &&
    addAsync(proto)

  return object
}


module.exports = {
  promisifyAll,
  promisify
}
