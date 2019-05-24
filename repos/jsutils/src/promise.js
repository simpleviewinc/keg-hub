'use strict'

const promisify = typeof window === 'undefined'
  ? require('util').promisify
  : method => {
    if(typeof method !== 'function')
      throw `Argument must be a function`

    return (...args) => {
      return new Promise((res, rej) => {
        if(typeof args[args.length -1] !== 'function')
          return res(method(...args))

        const cb = args.pop()
        args.push((...cbData) => {
          return cbData && cbData[0]
            ? rej(...cbData)
            : res(...cbData)
        })
      })
    }
  }

const isTest = process.env.NODE_ENV === 'test'
/**
 * Creates an array of Object default properties not to convert into promises
 */
const defObjProps = Array.from([ 'caller', 'callee', 'arguments' ])
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
  if (isTest || !object.__IS_PROMISIFIED__) {
    for (const prop of Object.getOwnPropertyNames(object)) {
      if (
        prop.indexOf('Async') === -1 &&
        !defObjProps[prop] &&
        !object[`${prop}Async`] &&
        !(Object.getOwnPropertyDescriptor(object, prop) || {}).get &&
        typeof object[prop] === 'function'
      )
        object[`${prop}Async`] = promisify(object[prop])
    }
    object.__IS_PROMISIFIED__ = true
  }
  return object
}
/**
 * Converts Objects method properties into promiseAsync methods ( Like Bluebird )
 * Eventually want to remove Bluebird, this is a helper method
 * to allow using promisifyAll, but due to other Bluebird deps it's not being used
 * Currently works fine, but can't be used at the same time as Bluebird
 *
 * @param  { object } object
 *
 * @return { object } - promisified object
 */
const promisifyAll = object => {
  addAsync(object)
  const proto = Object.getPrototypeOf(object)
  proto && addAsync(proto)

  return object
}

if(promisify){
  module.exports = {
    promisifyAll: isTest ? promisifyAll : Promise.promisifyAll
  }
}
