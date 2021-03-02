/** @module regex */

import { isStr } from '../string'
import { isArr } from '../array'
import { getRegexSource } from './getRegexSource'

/**
 * Helper for `joinRegex` that parses the args
 * @param {...*} args 
 * @return {Array} [
 *  expressions array,
 *  options string
 * ]
 */
const parseArgs = args => {
  if (isArr(args[0])) return [ args[0], args[1] ]
  const last = args[args.length - 1]
  const options = isStr(last) ? last : undefined
  const expressions = options
    ? args.splice(0, args.length - 1)
    : args
  return [ expressions, options ]
}

/**
 * Joins regex together in one expression
 * @param {...RegExp} expressions array of regex instances. 
 * You can technically use strings as well, but be careful that it's not the last element of a spread call, or that will be interpreted as the "options" string.
 * @param {string} options - options string (the second argument of RegExp constructor)
 * @example
 * // calling using spread args
 * const joined = joinRegex(/[A-z]+/, /[0-9]/, 'g')
 * joined === /([A-z]+|[0-9])/g
 * @example
 * // calling with an array
 * const joined = joinRegex([ ...allMyRegEx ], 'gi')
 */
export const joinRegex = (...args) => {
  const [ expressions, options ] = parseArgs(args)

  // join the regex together in a capture group with the | operator
  const source = expressions.reduce(
    (joined, next) => {
      const nextSource = getRegexSource(next)
      return !nextSource
        ? joined
        : joined === ''
          ? nextSource
          : `${joined}|${nextSource}`
    },
    ''
  )

  return new RegExp(`(${source})`, options)
}
