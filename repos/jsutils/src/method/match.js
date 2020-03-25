/** @module functions */

import { isArr } from '../array/isArr'
import { typeOf } from '../ext/typeOf'
import { isFunc } from './isFunc'

/**
* Pattern matching function. Iterates through the entries,
* which have the form [ check value or predicate, return value ], and
* when it encounters an entry whose check value matches the matchArg
* (or the predicate returns true when passed the matchArg), it returns
* the return value of that entry.
*
* For the default case: use [ match.default, <your default value> ]
* @function
*
* @param {*} matchArg - the argument to match against the cases
* @param {Array} entries - the cases
* @returns the return value of the first entry with a matching check value, else null
*
* @example 
* const value = 1
* match(value,
*  [ 1, "hello" ],
*  [ x => x > 2, "greater" ] 
*  [ match.default, "defaulted"]
* ) 
* => returns "hello"
* 
* @example 
* const value = 3
* match(value,
*  [ 1, "hello" ],
*  [ x => x > 2, "greater" ] 
* ) 
* => returns "greater"
*
* @example 
* // react reducer:
*function todoReducer(state, action) {
*   const reducer = match(action.type,
*       [ 'ADD-TODO', addTodo ],
*       [ 'REMOVE-TODO', removeTodo ],
*       [ 'UPDATE-TODO', updateTodo ],
*       [ match.default, state ]
*   )
*
*   return reducer(state, action)
*}
*/
export const match = (matchArg, ...args) => {
  if (!args.length) return null

  // check all cases and return a value if a match is found
  for (let entry of args) {
    if (!isArr(entry)) {
      console.error(`Matching case must be an entry (a 2-element array). Found: ${typeOf(entry)}`, entry)
      break
    }
    const [ caseValueOrPredicate, valueOnMatch ] = entry
    if (isFunc(caseValueOrPredicate) && caseValueOrPredicate(matchArg)) return valueOnMatch
    if (caseValueOrPredicate === matchArg) return valueOnMatch
  }

  return null
}

/**
 * The default case function you can use with match. Just returns true so the case value can be used.
 * @function
 * @example
 * match(foo
 *    [ 100, 'a' ],
 *    [ 200, 'b' ],
 *    [ match.default, 'default value' ]
 * )
 */
match.default = () => true

